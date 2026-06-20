/* =======================================================================
   POLYGON UNIT TOOL — BACKEND (Google Apps Script)
   This turns a Google Sheet into the database for the label system.
   Follow SETUP.md to install it. You do not need to change anything here.
   ======================================================================= */

var SHEET_NAME = 'Labels';
var HEADERS = ['id', 'product', 'productCode', 'date', 'time', 'isoTimestamp'];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
  }
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ---- Saving a new label (called by print.html via POST) ---- */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action !== 'save') return json_({ ok: false, error: 'unknown action' });
    var sh = getSheet_();
    sh.appendRow([
      data.id || '',
      data.product || '',
      data.productCode || '',
      data.date || '',
      data.time || '',
      data.iso || new Date().toISOString()
    ]);
    return json_({ ok: true, id: data.id });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/* ---- Lookups (called by label.html and dashboard.html via GET) ---- */
function doGet(e) {
  var p = e.parameter || {};
  var sh = getSheet_();
  var values = sh.getDataRange().getValues();   // includes header row
  var rows = values.slice(1);

  // 1) Per-day counts for the dashboard
  if (p.action === 'stats') {
    var stats = {};
    rows.forEach(function (r) {
      var date = r[3];                            // 'date' column
      if (!date) return;
      date = String(date).slice(0, 10);
      stats[date] = (stats[date] || 0) + 1;
    });
    return json_({ stats: stats });
  }

  // 2) Single label lookup for the scan page
  if (p.id) {
    for (var i = 0; i < rows.length; i++) {
      if (String(rows[i][0]) === String(p.id)) {
        var r = rows[i];
        return json_({
          found: true,
          id: r[0], product: r[1], productCode: r[2],
          date: String(r[3]).slice(0, 10), time: r[4], iso: r[5]
        });
      }
    }
    return json_({ found: false });
  }

  return json_({ ok: true, message: 'Polygon label backend is running.' });
}
