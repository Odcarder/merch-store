/**
 * @OnlyCurrentDoc
 * Limits this script to the one spreadsheet it is attached to,
 * not your other Google Sheets or Drive files.
 */

// Paste this into Extensions > Apps Script in a Google Sheet. See README.md.
// It saves one row per person (a resubmission replaces the earlier row)
// and keeps a "To Order" tab with the total quantity of each item.

var ORDERS = "Orders", TOTALS = "To Order";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (!d.name || !d.lines || !d.lines.length) return out({ok: false, error: "empty order"});
    var sh = sheet(ORDERS, ["Name", "Items", "Order total", "Budget", "Over budget?", "Submitted", "key", "json"]);
    var summary = d.lines.map(function (l) { return l.qty + " x " + l.name; }).join(", ");
    var row = [d.name, summary, d.total, d.budget, d.total > d.budget ? "YES" : "", new Date(), d.key, JSON.stringify(d.lines)];
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

function doGet() { return out({ok: true, status: "merch store endpoint is running"}); }

function refreshTotals() {
  var sh = sheet(ORDERS, []), n = sh.getLastRow(), agg = {};
  if (n > 1) sh.getRange(2, 8, n - 1, 1).getValues().forEach(function (r) {
    JSON.parse(r[0]).forEach(function (l) {
      var a = agg[l.id] || (agg[l.id] = {name: l.name, price: l.price, qty: 0});
      a.qty += l.qty;
    });
  });
  var t = sheet(TOTALS, ["Item", "Unit price", "Qty to order", "Cost"]);
  if (t.getLastRow() > 1) t.getRange(2, 1, t.getLastRow() - 1, 4).clearContent();
  var rows = Object.keys(agg).sort().map(function (k) { var a = agg[k]; return [a.name, a.price, a.qty, a.price * a.qty]; });
  if (rows.length) t.getRange(2, 1, rows.length, 4).setValues(rows);
}

function sheet(name, header) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); if (header.length) { s.appendRow(header); s.setFrozenRows(1); } }
  return s;
}
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
