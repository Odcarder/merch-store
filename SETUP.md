# Merch store

A static store page (hosted free on GitHub Pages) that saves orders to a Google Sheet. Members need no accounts.

## 1. Create the order sheet (about 5 minutes)

1. Create a new Google Sheet. Open **Extensions > Apps Script**.
2. Delete the placeholder code and paste in everything from `apps-script.gs`. Save.
3. Click **Deploy > New deployment**. Choose type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click Deploy and approve the permissions prompt. Copy the **Web app URL**.
   - The script is limited to this one spreadsheet (it has the `@OnlyCurrentDoc` line at the top). The prompt should say it wants to "See, edit, create, and delete only the spreadsheet that this application is bound to". If it says "all your spreadsheets", stop and check that line is at the top of the script.
   - You must create the script from inside this sheet (Extensions > Apps Script), not from script.google.com, or it won't be tied to one sheet.
5. Open `config.js` and paste the URL into `endpoint: ""`.

The sheet will get two tabs: **Orders** (one row per person; resubmitting replaces their row) and **To Order** (total quantity of each item).

If you change the script later, use **Deploy > Manage deployments > Edit > New version** so the URL stays the same.

## 2. Put the site on GitHub Pages

1. Create a GitHub repository and upload `index.html` and `config.js` (the other files are optional).
2. In the repo go to **Settings > Pages**. Under Build and deployment choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
3. After a minute your store is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`. Share that link.

## Changing items, prices and budgets

Edit `config.js` on GitHub (pencil icon) and commit. Changes go live in a minute or so.

- `defaultBudget`: dollars each person may spend.
- `members`: custom budgets by lowercase name, e.g. `"jane smith": 75`.
- `requireListedName: true`: only listed names can order.
- `open: false`: stop taking orders.

## Things to know

- Budgets are enforced in the browser. Someone technical could bypass them, so the **Orders** tab has an "Over budget?" column that flags any order above its budget.
- There are no logins. Anyone with the link can order under any name. If that matters, use `requireListedName` and share the link only with members.
- If you change an item's price after orders exist, earlier orders keep the price they were placed at.
