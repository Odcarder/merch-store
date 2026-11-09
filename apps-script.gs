/**
 * @OnlyCurrentDoc
 * Limits this script to the one spreadsheet it is attached to,
 * not your other Google Sheets or Drive files.
 */

// Paste this into Extensions > Apps Script in a Google Sheet. See README.md.
// It saves one row per person (a resubmission replaces the earlier row)
// and keeps a "To Order" tab with the total quantity of each item.

var ORDERS = "Orders", TOTALS = "To Order", SETTINGS = "Settings";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.action === "checkPasscode") return out(checkPasscode(d.passcode));
    if (!d.name || !d.lines || !d.lines.length) return out({ok: false, error: "empty order"});
    var sh = sheet(ORDERS, ["Name", "Items", "Order total", "Budget", "Over budget?", "Submitted", "key", "json", "Email"]);
    var approved = false;
    if (d.override) {
      if (!checkPasscode(d.passcode).valid) return out({ok: false, error: "bad passcode"});
      approved = true;
    }
    if (d.total > d.budget && !approved) return out({ok: false, error: "over budget"});
    var summary = d.lines.map(function (l) { return l.qty + " x " + l.name; }).join(", ");
    if (sh.getRange(1, 9).getValue() === "") sh.getRange(1, 9).setValue("Email");
    var row = [d.name, summary, d.total, d.budget, d.total > d.budget ? (approved ? "APPROVED OVERAGE" : "YES") : "", new Date(), d.key, JSON.stringify(d.lines), String(d.email || "").slice(0, 120)];
    var last = sh.getLastRow(), at = 0;
    if (last > 1) {
      var keys = sh.getRange(2, 7, last - 1, 1).getValues();
      for (var i = 0; i < keys.length; i++) if (keys[i][0] === d.key) { at = i + 2; break; }
    }
    if (at) sh.getRange(at, 1, 1, row.length).setValues([row]); else sh.appendRow(row);
    refreshTotals();
    return out({ok: true});
  } catch (err) {
    return out({ok: false, error: String(err)});
  } finally {
    lock.releaseLock();
  }
}

// Checks the manager override passcode, which lives in the "Settings" tab (cell B1).
// Leave B1 empty to turn overrides off. After 10 wrong guesses in 15 minutes it locks.
function checkPasscode(p) {
  var s = sheet(SETTINGS, []);
  if (s.getLastRow() < 1) {
    s.getRange(1, 1, 4, 2).setValues([
      ["Override passcode (type it in B1)", ""],
      ["How it works", "Members who enter this code on the store page can order over their budget. Empty B1 = overrides off."],
      ["Failed attempts (automatic)", 0],
      ["Attempt window start (automatic)", ""]
    ]);
    s.setColumnWidth(1, 260); s.setColumnWidth(2, 420);
  }
  var real = String(s.getRange(1, 2).getValue() || "").trim();
  var now = Date.now(), start = Number(s.getRange(4, 2).getValue()) || 0, fails = Number(s.getRange(3, 2).getValue()) || 0;
  if (now - start > 15 * 60 * 1000) { fails = 0; start = now; }
  if (fails >= 10) return {ok: true, valid: false, locked: true};
  if (real && p && String(p).trim() === real) return {ok: true, valid: true};
  s.getRange(3, 2).setValue(fails + 1);
  s.getRange(4, 2).setValue(start || now);
  Utilities.sleep(1500);
  return {ok: true, valid: false, locked: false, enabled: !!real};
}

function doGet() { return out({ok: true, status: "merch store endpoint is running", version: "override-v1"}); }

var SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];

function sizeRank(s) {
  var i = SIZE_ORDER.indexOf(s);
  if (i >= 0) return i;
  var n = parseFloat(s);
  return isNaN(n) ? 1000 : 100 + n;
}

// Pure function: takes every ordered line and returns the rows to show.
// style is "h" (header), "g" (item heading), "s" (size line) or "t" (total).
function buildTotals(allLines) {
  var groups = {};
  allLines.forEach(function (l) {
    var parts = String(l.id).split("|"), base = parts[0], size = parts[1] || "";
    var name = size ? String(l.name).replace(/\s*\([^)]*\)$/, "") : String(l.name);
    var g = groups[base] || (groups[base] = {name: name, price: l.price, sizes: {}});
    g.sizes[size] = (g.sizes[size] || 0) + l.qty;
  });
  var rows = [["Item / size", "Unit price", "Qty to order", "Cost"]], style = ["h"], tq = 0, tc = 0;
  Object.keys(groups).sort(function (a, b) { return groups[a].name.localeCompare(groups[b].name); }).forEach(function (k) {
    var g = groups[k];
    var sizes = Object.keys(g.sizes).sort(function (a, b) { return sizeRank(a) - sizeRank(b) || a.localeCompare(b); });
    var q = sizes.reduce(function (s, z) { return s + g.sizes[z]; }, 0);
    tq += q; tc += q * g.price;
    if (sizes.length === 1 && sizes[0] === "") {
      rows.push([g.name, g.price, q, g.price * q]); style.push("g");
    } else {
      rows.push([g.name, "", q, g.price * q]); style.push("g");
      sizes.forEach(function (z) {
        rows.push(["      " + (z || "(no size)"), g.price, g.sizes[z], g.price * g.sizes[z]]); style.push("s");
      });
    }
  });
  if (rows.length > 1) { rows.push(["Total", "", tq, tc]); style.push("t"); }
  return {rows: rows, style: style};
}

function refreshTotals() {
  var sh = sheet(ORDERS, []), n = sh.getLastRow(), all = [];
  if (n > 1) sh.getRange(2, 8, n - 1, 1).getValues().forEach(function (r) {
    if (r[0]) all = all.concat(JSON.parse(r[0]));
  });
  var res = buildTotals(all), rows = res.rows, st = res.style;
  var t = sheet(TOTALS, []);
  t.clear();
  var range = t.getRange(1, 1, rows.length, 4);
  range.setValues(rows);
  range.setFontWeights(st.map(function (s) { var w = (s === "s") ? "normal" : "bold"; return [w, w, w, w]; }));
  range.setBackgrounds(st.map(function (s) {
    var c = s === "h" ? "#d9d9d9" : s === "g" ? "#f1f1f1" : s === "t" ? "#d9ead3" : "#ffffff";
    return [c, c, c, c];
  }));
  t.getRange(2, 2, Math.max(rows.length - 1, 1), 1).setNumberFormat("$#,##0.00");
  t.getRange(2, 4, Math.max(rows.length - 1, 1), 1).setNumberFormat("$#,##0.00");
  t.setColumnWidth(1, 340);
  t.setFrozenRows(1);
}

function sheet(name, header) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); if (header.length) { s.appendRow(header); s.setFrozenRows(1); } }
  return s;
}
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
