// ===== EDIT THIS FILE to change your store. =====
window.STORE_CONFIG = {
  title: "YLJ Vol. 136 Swag Order",
  subtitle: "Order your swag for this year! All prices include customization and are rounded up to the nearest dollar. Clothing items need a size. Your cart can't go over your budget.",

  // Everyone gets this budget (in dollars) unless listed under "members" below.
  defaultBudget: 230,

  // Google Apps Script web app URL where orders are saved (see SETUP.md).
  endpoint: "https://script.google.com/macros/s/AKfycbwesGPYTGrmLwp7RX5yC4SYNeL3ohiSfcnRT_QzOHKPpYdRxi3BUOHDSbhg-SGgAjqZ/exec",

  // Set to false when you want to stop taking orders.
  open: true,

  // Custom budgets. Use lowercase names. Anyone not listed gets defaultBudget.
  members: {
    // "jane smith": 75,
  },

  // If true, only names listed in "members" can order (a simple guest list).
  requireListedName: false,

  // Your merchandise. Add  sizes: [...]  to any item that needs a size, and
  // images: ["images/file.jpg", ...] for photos. Each id must be unique and
  // must not change once orders exist.
  items: [
    { category: "Drinkware", id: "owala", name: "Owala FreeSip 32 oz Water Bottle", price: 43, images: ["images/owala.jpg"], desc: "Approx. price, customized" },
    { category: "Drinkware", id: "pint", name: "Pint Glass", price: 5, images: ["images/pint.jpg"], desc: "16 oz, approx. price" },
    { category: "Bags", id: "backpack", name: "Port Authority Daily Commute Backpack", price: 30, images: ["images/backpack.jpg"], desc: "Price starts at $30" },
    { category: "Bags", id: "duffel", name: "Harriton ClimaBloc Convertible Garment Duffel Bag", price: 66, images: ["images/duffel-1.jpg", "images/duffel-2.jpg"], desc: "" },
    { category: "Bags", id: "toiletry", name: "Lululemon Dual-Compartment Toiletry Bag", price: 73, images: ["images/toiletry.jpg"], desc: "" },
    { category: "Tops", id: "halfzip", name: "Lululemon Smooth Spacer Half Zip Colourblock", price: 124, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/halfzip-colourblock.jpg"], desc: "" },
    { category: "Tops", id: "polartec", name: "Lululemon Polartec Fleece", price: 127, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/polartec.jpg"], desc: "" },
    { category: "Tops", id: "define", name: "Lululemon Define Jacket", price: 153, sizes: ["0", "2", "4", "6", "8", "10", "12", "14"], images: ["images/define-jacket.jpg"], desc: "" },
    { category: "Tops", id: "quincefleece", name: "Quince Fleece Full-Zip", price: 67, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/quince-fleece.jpg"], desc: "" },
    { category: "Tops", id: "rugby", name: "Vuori Long Sleeve Cypress Rugby", price: 138, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/rugby.jpg"], desc: "" },
    { category: "Tops", id: "hoodie", name: "Champion Hoodie", price: 39, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/champion-hoodie.jpg"], desc: "" },
    { category: "Tops", id: "boyfriendcrew", name: "Quince Organic Cotton Boyfriend Crew Sweater, Navy", price: 55, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/boyfriend-crew.jpg"], desc: "" },
    { category: "Tops", id: "crewneck", name: "Quince Organic Cotton Crewneck Sweater, Navy", price: 65, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/crewneck.jpg"], desc: "" },
    { category: "Bottoms", id: "wideleg", name: "Vuori Halo Essential Wideleg Pant", price: 133, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/wideleg.jpg"], desc: "" },
    { category: "Bottoms", id: "seaside", name: "Vuori Seaside Sweatpant", price: 143, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/seaside.jpg"], desc: "" },
    { category: "Bottoms", id: "joggers", name: "Gymshark Straight-Leg Joggers, Deep Blue", price: 44, sizes: ["XS", "S", "M", "L", "XL"], images: ["images/gymshark.jpg"], desc: "" },
    { category: "Accessories", id: "charger", name: "4,000 mAh Solar Portable Charger", price: 15, images: ["images/charger.jpg"], desc: "" },
    { category: "Accessories", id: "lighter-black", name: "Lighter, Black Matte with Color Image", price: 25, images: ["images/lighter-black.jpg"], desc: "" },
    { category: "Accessories", id: "lighter-brass", name: "Lighter, High Polish Brass Engraved", price: 39, images: ["images/lighter-brass.jpg"], desc: "" },
    { category: "Accessories", id: "umbrella", name: "42-inch 3-Section Auto-Open Umbrella", price: 24, images: ["images/umbrella.jpg"], desc: "" }
  ]
};
