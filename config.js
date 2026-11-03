// ===== EDIT THIS FILE to change your store. =====
window.STORE_CONFIG = {
  title: "Member Merch Store",

  // Everyone gets this budget (in dollars) unless listed under "members" below.
  defaultBudget: 50,

  // Paste your Google Apps Script web app URL here (see README.md, step 1).
  // Leave empty to test: the page will show an order summary to copy instead.
  endpoint: "https://script.google.com/macros/s/AKfycbwesGPYTGrmLwp7RX5yC4SYNeL3ohiSfcnRT_QzOHKPpYdRxi3BUOHDSbhg-SGgAjqZ/exec",

  // Set to false when you want to stop taking orders.
  open: true,

  // Custom budgets. Use lowercase names. Anyone not listed gets defaultBudget.
  members: {
    // "jane smith": 75,
  },

  // If true, only names listed in "members" can order (a simple guest list).
  requireListedName: false,

  // Your merchandise. Add  sizes: ["S","M","L"]  to any item that needs a size
  // (leave it out for one-size items). Each id must be unique and never change once orders exist.
  items: [
    { id: "tshirt",  name: "T-Shirt",      price: 18, sizes: ["S", "M", "L", "XL"], desc: "Soft cotton, unisex fit" },
    { id: "hoodie",  name: "Hoodie",       price: 38, sizes: ["S", "M", "L", "XL"], desc: "Midweight pullover" },
    { id: "cap",     name: "Baseball Cap", price: 15, desc: "Adjustable strap" },
    { id: "mug",     name: "Ceramic Mug",  price: 12, desc: "12 oz, dishwasher safe" },
    { id: "tote",    name: "Tote Bag",     price: 10, desc: "Heavy canvas" },
    { id: "sticker", name: "Sticker Pack", price: 5,  desc: "Set of 5" }
  ]
};
