/* =======================================================================
   POLYGON UNIT TOOL — SETTINGS
   Edit the values below. You do NOT need to touch any other file.
   ======================================================================= */

window.UNIT_CONFIG = {

  /* 1) The address where these pages are hosted (no trailing slash).
        The QR code links here. Fill this in AFTER you deploy (see SETUP.md).
        Example: "https://polygon-unit.netlify.app"                         */
  BASE_URL: "",

  /* 2) The Google Apps Script web-app URL (the database).
        You get this in SETUP.md after deploying APPS_SCRIPT.gs.
        Example: "https://script.google.com/macros/s/AKfy...../exec"        */
  API_URL: "",

  /* 3) Thermal label size. Change if your labels differ.                   */
  LABEL_W: "90mm",
  LABEL_H: "60mm",

  /* 4) The product list shown in the dropdown.
        name = what staff see / what prints.
        code = short tag used inside the barcode ID (keep it short, no spaces). */
  PRODUCTS: [
    { name: "Spoon S1",                 code: "SPS1" },
    { name: "Spoon S2",                 code: "SPS2" },
    { name: "Fork F1",                  code: "FKF1" },
    { name: "Fork F2",                  code: "FKF2" },
    { name: "Fork F3",                  code: "FKF3" },
    { name: "Ice cream spoon",          code: "ICS"  },
    { name: "Coloured ice cream spoon", code: "CICS" },
    { name: "Coloured spoon",           code: "CSP"  },
    { name: "Knife",                    code: "KNF"  }
  ]
};
