# Polygon Unit Tool — Setup (one-time, ~15 minutes)

This folder is a small system for your production unit:

| File | What it is |
|------|------------|
| `print.html` | The **printer station** — staff pick a product and print a 90×60 mm label with a QR code. |
| `label.html` | The **scan page** — what opens on a phone when the QR is scanned; shows the label's details. |
| `dashboard.html` | The **dashboard** — how many labels were made per day. |
| `config.js` | The **only file you edit** — your settings (product list, web address, database link). |
| `APPS_SCRIPT.gs` | The **database code** you paste into Google (below). |

You'll do three things: **(A)** set up the Google Sheet database, **(B)** put the files online for free, **(C)** fill in `config.js`.

---

## A) Create the database (Google Sheet + Apps Script)

1. Go to <https://sheets.google.com> and create a **new blank spreadsheet**. Name it e.g. *Polygon Labels*.
2. In the menu: **Extensions → Apps Script**. A code editor opens.
3. Delete whatever is in the editor, then open `APPS_SCRIPT.gs` from this folder, **copy everything**, and paste it in. Click the **Save** icon.
4. Click **Deploy → New deployment**.
   - Click the gear ⚙ next to "Select type" → choose **Web app**.
   - **Description:** anything (e.g. "Polygon labels").
   - **Execute as:** *Me*.
   - **Who has access:** **Anyone**.  ← important, so the pages can reach it.
   - Click **Deploy**. Approve the permissions when Google asks (choose your account → *Advanced* → *Go to project (unsafe)* → *Allow*. This is safe — it's your own script).
5. Copy the **Web app URL** it shows (ends in `/exec`). Keep it for step C.

> Whenever you change `APPS_SCRIPT.gs` later, use **Deploy → Manage deployments → Edit (pencil) → New version → Deploy** so the URL stays the same.

---

## B) Put the files online (free) — choose ONE

### Option 1 — Netlify Drop (easiest, no account needed to try)
1. Go to <https://app.netlify.com/drop>.
2. Drag this entire **`unit-tool`** folder onto the page.
3. It gives you a URL like `https://something-random.netlify.app`. That's your **BASE_URL**.
   (Create a free Netlify account to keep it permanently and rename it.)

### Option 2 — GitHub Pages
1. Create a free GitHub account and a new repository.
2. Upload the contents of this `unit-tool` folder.
3. **Settings → Pages →** deploy from the `main` branch. It gives you a URL like
   `https://yourname.github.io/reponame`. That's your **BASE_URL**.

> The QR codes link to BASE_URL, so it must be a public web address (not a file on your PC), otherwise phones can't open it.

---

## C) Fill in `config.js`

Open `config.js` (in this folder, or re-upload after editing) and set:

```js
BASE_URL: "https://your-site.netlify.app",          // from step B (no trailing slash)
API_URL:  "https://script.google.com/macros/s/..../exec",  // from step A, step 5
```

The product list and label size are already filled in — edit them here anytime.

**If you edit `config.js`, re-upload it** (drag the folder onto Netlify again, or push to GitHub).

---

## Daily use

- **Print a label:** open `print.html` (bookmark it on the unit PC). Pick the product → **Generate & Print Label**. A new row is saved to your Google Sheet automatically.
- **Scan a label:** open the phone camera, point at the QR. It opens `label.html` showing the product, date/time and ID.
- **See the dashboard:** open `dashboard.html` on any device.

---

## Printer tip (thermal label)

Set the printer's paper/label size to **90 × 60 mm** and margins to **0**. In the browser print dialog choose that label printer, paper size **90×60 mm**, margins **None**, and turn **off** "Headers and footers". Print one test label and scan it to confirm.

## Troubleshooting

- **"printed but NOT saved"** on the printer page → `API_URL` is wrong, or the Apps Script "Who has access" isn't **Anyone**, or no internet.
- **Scan shows "Offline / Not found"** → the label was printed before setup was finished, or `API_URL` is wrong.
- **QR won't scan** → make sure the label printed sharp and not too small; keep the QR at least ~22 mm.
