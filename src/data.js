"use strict";
/* ==========================================================================
   TIMELESS TRAILERS · v3 concept (lite)
   --------------------------------------------------------------------------
   EDIT HERE. Everything the site shows comes from ASSISTANT_NAME, MODELS and DATA.

   REAL (from Timpte's 2026 spec sheets): model names and every spec number
   in MODELS below (payload, GVW, empty weight, deck, loading angle, axles,
   tires, hitch), plus the photos, videos and spec-sheet PDFs.
   SAMPLE (for the mock-up): prices, stock numbers, what's on the lot, the
   demo people, quotes, leads, machine weights and truck tow ratings.
   ========================================================================== */

/* CONFIG, MODELS, INVENTORY and PARTS come from src/config.json, models.json, inventory.json and parts.json;
   build.py puts them in front of this file. Edit those files, not this one, for anything about this dealer. */
const ASSISTANT_NAME = CONFIG.assistant.name;

const DAY = 864e5;
function d(n){ return new Date(Date.now() + n * DAY).toISOString(); }

/* MODELS: see src/models.json (one entry per Timpte model, numbers from the spec sheets). */

const DATA = {
  business: CONFIG.business,

  /* Sample financing terms used by every payment estimate */
  finance: { apr: 8.49, term: 60, downPct: 10, terms: [24, 36, 48, 60, 72] },

  /* Sample quote fees */
  fees: { doc: 199, titleTag: 105, taxRate: 0.0675, taxLabel: "Est. sales tax (sample 6.75%)" },

  types: { tilt: "Split Tilt", deckover: "Deck Over", gooseneck: "Gooseneck", dump: "Dump", ezload: "EZ Load" },
  series: { tilt: "Powerhouse", deckover: "Powerhouse", gooseneck: "Powerhouse", dump: "Powerhouse", ezload: "Motorsports" },

  categories: [
    { type: "tilt", title: "Split Tilt", blurb: "Tilt decks for skid steers and mini excavators. No ramps to lift.", img: "g-1420st-1", tile: "tile-tilt", series: "Powerhouse" },
    { type: "deckover", title: "Deck Over", blurb: "A full 98-inch deck above the wheels for wide machines and vehicles.", img: "g-1620do-1", tile: "tile-deckover", series: "Powerhouse" },
    { type: "gooseneck", title: "Gooseneck", blurb: "Steadier on long runs with bigger machines.", img: "g-1620gn-1", tile: "tile-gooseneck", series: "Powerhouse" },
    { type: "dump", title: "Dump", blurb: "Aluminum dump boxes with no structural welds. Nothing to rust out.", img: "card-1614d", tile: "tile-dump", series: "Powerhouse" },
    { type: "ezload", title: "EZ Load", blurb: "Powered decks that drop low for cars, UTVs, mowers and golf carts.", img: "g-1020-1", tile: "tile-ezload", series: "Motorsports" }
  ],

  /* Videos (compressed copies of Timpte's dealer videos, in site/video/) */
  videos: {
    "split-tilt-walkaround": { title: "Split Tilt walk-around", len: "4:00" },
    "gooseneck-launch": { title: "16K Gooseneck first look", len: "1:07" },
    "1026-launch": { title: "10K EZ Load: meet the 1026", len: "0:56" },
    "514-utv": { title: "514 EZ Load: loading a UTV", len: "0:37" },
    "torsion-axle": { title: "Timpte's rubber torsion suspension", len: "1:25" }
  },

  /* Units on the lot: src/inventory.json. Each unit is its model's specs plus stock number, status, price and date. */
  inventory: INVENTORY.units.map(u => Object.assign({ year: 2026 }, MODELS[u.key], u, { added: u.added || d(-(u.addedDaysAgo || 0)) })),

  /* Defaults used when Andy (or the Add trailer form) adds a new unit */
  typeDefaults: {
    tilt: { img: "card-1420st", payload: 11320, gvwr: 14000, empty: 2680, deckFt: 20, width: "102\" overall", loading: "Split tilt deck", angle: 12, axles: "Tandem 7,000 lb rubber torsion", hitch: "Bumper pull", suits: ["compact", "miniex", "utv", "mower", "car"] },
    deckover: { img: "card-1620do", payload: 12940, gvwr: 16000, empty: 3060, deckFt: 20, width: "102\" overall, 98.25\" deck", loading: "Dovetail + 50/50 ramps", angle: 14, axles: "Tandem 8,000 lb rubber torsion", hitch: "Bumper pull", suits: ["compact", "miniex", "heavy", "car", "utv"] },
    gooseneck: { img: "card-1620gn", payload: 12480, gvwr: 16000, empty: 3460, deckFt: 20, width: "102\" overall, 98.25\" deck", loading: "Dovetail + ramps", angle: 14, axles: "Tandem 7,000 lb rubber torsion", hitch: "Gooseneck", suits: ["heavy", "compact", "miniex", "car", "utv"] },
    dump: { img: "card-1614d", payload: 12400, gvwr: 16000, empty: 3600, deckFt: 14, width: "102\" overall", loading: "Dexter scissor hoist", angle: null, axles: "Tandem 8,000 lb rubber torsion", hitch: "Bumper pull", suits: ["material", "mower"] },
    ezload: { img: "card-720", payload: 5020, gvwr: 7000, empty: 1980, deckFt: 19.5, width: "102\" overall", loading: "Powered EZ Load deck", angle: 4, angleText: "Under 4°", axles: "Tandem 3,500 lb rubber torsion", hitch: "Bumper pull", suits: ["car", "utv", "mower"] }
  },

  /* The full Timpte lineup Timeless can order (model numbers from the spec sheets) */
  lineup: [
    { cat: "tilt", model: "Timpte Split Tilt", name: "Split Tilt", use: "1420 · 1424 · 1624", img: "g-1624st-1", label: "Powerhouse" },
    { cat: "deckover", model: "Timpte Deck Over", name: "Deck Over", use: "1420 · 1426 · 1620 · 1626", img: "card-1620do", label: "Powerhouse" },
    { cat: "gooseneck", model: "Timpte Gooseneck", name: "Gooseneck", use: "1620 · 1626 · 1620HD · 1626HD", img: "g-1620gn-1", label: "Powerhouse" },
    { cat: "dump", model: "Timpte Dump", name: "Dump", use: "1414 · 1416 · 1614 · 1616", img: "card-1614d", label: "Powerhouse" },
    { cat: "ezload", model: "Timpte EZ Load", name: "EZ Load", use: "514 · 720 · 1020 · 1026", img: "card-1020", label: "Motorsports" }
  ],

  /* "What are you hauling?" matcher */
  matcher: {
    machine: { img: "card-1420st", tag: "Start here", name: "Timpte 1420 Split Tilt", type: "tilt", why: "Tilts to the ground so tracked and wheeled machines drive straight on. No ramps to lift.", ask: "Tell us the machine and its operating weight." },
    heavy:   { img: "card-1620gn", tag: "Start here", name: "Timpte 1620 Gooseneck", type: "gooseneck", why: "A 98-inch deck, 12,480 lb of payload and a steadier gooseneck ride for bigger machines and longer runs.", ask: "Tell us the machine, weight and your truck." },
    car:     { img: "card-720", tag: "Start here", name: "Timpte 720 EZ Load", type: "ezload", why: "The powered deck drops to a loading angle under 4°, so low cars load without scraping.", ask: "Send the car and your tow vehicle." },
    toys:    { img: "card-1026", tag: "Start here", name: "Timpte 1026 EZ Load", type: "ezload", why: "26 feet of deck: room for a Jeep and a side-by-side, or a car with room to spare.", ask: "Tell us what you'll load and how often." },
    dirt:    { img: "card-1614d", tag: "On the lot now", name: "Timpte 1614 Dump", type: "dump", why: "Aluminum dump box with no structural welds, a scissor hoist and 12,400 lb of payload.", ask: "Tell us the material and typical load." },
    light:   { img: "card-514", tag: "Start here", name: "Timpte 514 EZ Load", type: "ezload", why: "Single axle, 1,280 lb empty, and a deck that drops low so mowers and golf carts drive straight on.", ask: "Tell us what you haul and your tow vehicle." }
  },

  /* Load categories the Finder and the "What are you hauling?" picker use (labels only; Andy handles weights and fit) */
  loadCats: [
    { k: "compact",  label: "Skid steer or track loader", sub: "Compact equipment" },
    { k: "miniex",   label: "Mini excavator", sub: "Tracked, with blade and boom" },
    { k: "heavy",    label: "Bigger machines", sub: "Larger equipment and long hauls" },
    { k: "car",      label: "A car or truck", sub: "Daily, classic or race car" },
    { k: "utv",      label: "UTVs, Jeeps, toys", sub: "Weekend and farm use" },
    { k: "material", label: "Dirt, mulch, debris", sub: "Landscaping and cleanup" },
    { k: "mower",    label: "Mowers and light loads", sub: "Lawn care and utility" }
  ],

  addons: [
    { id: "spare", label: "Spare tire on aluminum wheel + mount", price: 289, types: ["tilt", "deckover", "gooseneck", "dump", "ezload"], rec: true },
    { id: "straps", label: "Ratchet strap kit (4)", price: 119, types: ["ezload"], rec: true },
    { id: "chains", label: "Chain and binder kit", price: 229, types: ["tilt", "deckover", "gooseneck"], rec: true },
    { id: "tarp", label: "Electric tarp upgrade", price: 649, types: ["dump"], rec: false },
    { id: "winch", label: "Winch plate + 9,500 lb winch", price: 849, types: ["ezload"], rec: false },
    { id: "lock", label: "Coupler lock", price: 59, types: ["tilt", "deckover", "gooseneck", "dump", "ezload"], rec: false },
    { id: "jack", label: "Powered tongue jack", price: 349, types: ["tilt", "deckover", "dump"], rec: false }
  ],

  parts: [
    { id: "P-101", name: "LED stop/turn/tail light kit (pair)", price: 89, cat: "Lighting", fits: ["tilt", "deckover", "gooseneck", "dump", "ezload"], kw: ["light", "tail", "lamp", "led"] },
    { id: "P-108", name: "7-way plug with 8 ft cord", price: 54, cat: "Lighting", fits: ["tilt", "deckover", "gooseneck", "dump", "ezload"], kw: ["plug", "7-way", "wiring", "cord"] },
    { id: "P-102", name: "ST235/80R16 spare on aluminum wheel", price: 329, cat: "Tires & wheels", fits: ["tilt", "deckover", "gooseneck", "dump"], kw: ["tire", "spare", "wheel"] },
    { id: "P-103", name: "ST225/75R15 spare on aluminum wheel", price: 239, cat: "Tires & wheels", fits: ["ezload"], kw: ["tire", "spare", "wheel"] },
    { id: "P-106", name: "Hub and bearing kit, 7K axle", price: 164, cat: "Axles & brakes", fits: ["tilt", "deckover", "gooseneck", "dump"], kw: ["bearing", "hub", "axle"] },
    { id: "P-107", name: "Bearing repack kit, 3.5K axle", price: 38, cat: "Axles & brakes", fits: ["ezload"], kw: ["bearing", "repack", "grease"] },
    { id: "P-112", name: "12 in electric brake magnets (pair)", price: 112, cat: "Axles & brakes", fits: ["tilt", "deckover", "gooseneck", "dump", "ezload"], kw: ["brake", "magnet"] },
    { id: "P-105", name: "Breakaway kit with battery and charger", price: 96, cat: "Axles & brakes", fits: ["tilt", "deckover", "gooseneck", "dump", "ezload"], kw: ["breakaway", "battery"] },
    { id: "P-104", name: "2-5/16 in adjustable coupler", price: 118, cat: "Hitch", fits: ["tilt", "deckover", "gooseneck", "dump", "ezload"], kw: ["coupler", "hitch", "ball"] },
    { id: "P-109", name: "2 in ratchet straps (4-pack)", price: 72, cat: "Tie-downs", fits: ["tilt", "deckover", "gooseneck", "dump", "ezload"], kw: ["strap", "ratchet", "tie"] },
    { id: "P-110", name: "Weld-on D-ring, 10,000 lb", price: 18, cat: "Tie-downs", fits: ["tilt", "deckover", "gooseneck", "dump", "ezload"], kw: ["d-ring", "d ring", "ring"] },
    { id: "P-113", name: "Tilt-deck rubber stop bumper", price: 34, cat: "Deck", fits: ["tilt"], kw: ["bumper", "stop", "rubber", "tilt"] },
    { id: "P-111", name: "Replacement roll tarp, 14 ft", price: 189, cat: "Deck", fits: ["dump"], kw: ["tarp"] },
    { id: "P-114", name: "Dump hydraulic fluid, 1 gal", price: 29, cat: "Hydraulics", fits: ["dump"], kw: ["fluid", "hydraulic", "oil"] }
  ],

  services: [
    { id: "inspect", name: "Annual safety inspection", price: "$129", desc: "Lights, brakes, bearings, tires, tie-downs and frame, with a written checklist.", kw: ["inspect", "inspection", "check-up", "checkup"] },
    { id: "bearings", name: "Bearing repack", price: "$249 tandem", desc: "Pull hubs, clean, inspect races, repack and set preload.", kw: ["bearing", "hub", "grease", "wheel noise"] },
    { id: "brakes", name: "Brake adjust and test", price: "$99", desc: "Adjust shoes, test magnets and the breakaway system.", kw: ["brake", "stopping", "breakaway"] },
    { id: "lights", name: "Lighting and wiring", price: "from $85", desc: "Track down the short, fix the ground, replace lamps and plugs.", kw: ["light", "wiring", "plug", "short", "lamp"] },
    { id: "hyd", name: "Dump hydraulic service", price: "$179", desc: "Fluid, filter, hoses and cylinder check on dump trailers.", kw: ["hydraulic", "dump", "cylinder", "pump", "leak"] },
    { id: "warranty", name: "Warranty work", price: "No charge if covered", desc: "We handle the Timpte claim and the repair here in Waxhaw.", kw: ["warranty", "crack", "weld", "defect"] }
  ],

  maintenance: [
    ["Every trip", "Lights, tire pressure, coupler latch, safety chains, breakaway cable"],
    ["First 50 miles", "Re-torque lug nuts, check brake adjustment"],
    ["Every 3 months", "Brake adjustment, tie-down and deck inspection"],
    ["Every 12 months or 12,000 mi", "Bearing repack, full brake inspection, annual safety inspection"],
    ["Dump trailers, every 6 months", "Hydraulic fluid level, hoses and cylinder pins"]
  ],

  /* Who's on the About page. Kayla is a sample name until Matt gives us his real team. */
  team: CONFIG.team,

  /* @demo */
  /* Everything from here to the end of DATA is demo-site only. build.py cuts it out of the public site. */
  personas: [
    { id: "dana", role: "customer", name: "Dana Whitfield", short: "Dana W.", title: "Shopping for a car hauler", phone: "704-555-0148", email: "dana.w@example.com", town: "Monroe, NC", truck: "Chevy Silverado 1500",
      story: "Restoring a '67 Mustang. Needs a car hauler a half-ton can pull.",
      tryList: [`Ask ${ASSISTANT_NAME} if the Mustang fits the 720 EZ Load`, "Compare two car haulers", "Hold a unit, then see it in My Account"] },
    { id: "marcus", role: "customer", name: "Marcus Bell", short: "Marcus B.", title: "Owns a 2024 1420 Split Tilt", company: "Bell Grading & Landscaping", phone: "980-555-0112", email: "marcus@example.com", town: "Indian Trail, NC", truck: "Ford F-250",
      story: "Runs a track loader and a mini-ex. Bought a 1420 Split Tilt here in 2024.",
      tryList: ["Order parts that fit the Split Tilt", `Ask ${ASSISTANT_NAME} to open a service ticket`, "Check the warranty date in My Account"] },
    { id: "matt", role: "owner", name: "Matt Lyons", short: "Matt L.", title: "Owner", phone: "704-589-3100",
      story: `Sees every lead, quote and ticket. Edits inventory by asking ${ASSISTANT_NAME}.`,
      tryList: [`Tell ${ASSISTANT_NAME}: drop the 1614 dump to $15,900`, "Drag a lead from New to Contacted", "Pull the latest specs from Timpte"] },
    { id: "kayla", role: "staff", name: "Kayla Brooks", short: "Kayla B.", title: "Sales & parts", phone: "704-589-3100",
      story: "Works the lead board and the parts counter.",
      tryList: ["Move a parts order to Ready for pickup", "Mark a unit sold", "Schedule an open service ticket"] }
  ],

  testimonials: [
    { q: "Told them I run a track loader and pull with a 2500. They had the right tilt on the lot and I hauled it home the same afternoon.", who: "Jason R.", what: "Grading contractor, Monroe" },
    { q: "My old steel dump rusted through in five years. This aluminum one weighs less and I carry more mulch per trip.", who: "Karen M.", what: "Landscaper, Waxhaw" },
    { q: "They talked me out of the bigger car hauler because my half-ton couldn't handle it. Appreciated the straight answer.", who: "Dave P.", what: "Weekend racer, Weddington" }
  ],

  /* Starting demo records. Reset demo returns to exactly this. */
  seed: {
    saved: { dana: ["TT-0160", "TT-0155"], marcus: ["TT-0147"] },
    owned: [
      { id: "OWN-1", userId: "marcus", year: 2024, model: "Timpte 1420 Split Tilt", type: "tilt", img: "card-1420st", vin: "4TMST2024SAMPLE381", purchased: "2024-05-14", warrantyEnds: "2027-05-14" }
    ],
    holds: [
      { id: "H-7000", userId: null, trailerId: "TT-0158", name: "Ray Simmons", phone: "704-555-0177", created: d(-1), expires: d(1), status: "Active" }
    ],
    quotes: [
      { id: "Q-2041", userId: "dana", name: "Dana Whitfield", phone: "704-555-0148", trailerId: "TT-0160", addons: ["spare", "straps"], created: d(-2), status: "Sent" },
      { id: "Q-2038", userId: null, name: "Tony Ruiz", phone: "704-555-0190", trailerId: "TT-0129", addons: ["spare", "chains"], created: d(-5), status: "Sent" },
      { id: "Q-2035", userId: null, name: "Lena Park", phone: "803-555-0123", trailerId: "TT-0142", addons: ["spare"], created: d(-9), status: "Accepted" }
    ],
    partsOrders: [
      { id: "PO-3107", userId: "marcus", name: "Marcus Bell", phone: "980-555-0112", items: [["P-101", 1], ["P-109", 1]], created: d(-3), status: "Ready for pickup" },
      { id: "PO-3109", userId: null, name: "Greg Holt", phone: "704-555-0133", items: [["P-106", 2]], created: d(-1), status: "Ordered" }
    ],
    tickets: [
      { id: "SR-1041", userId: "marcus", name: "Marcus Bell", phone: "980-555-0112", unit: "2024 Timpte 1420 Split Tilt", service: "Annual safety inspection", notes: "Due before spring season.", date: d(6), created: d(-4), status: "Scheduled" },
      { id: "SR-1039", userId: null, name: "Jim Carter", phone: "704-555-0161", unit: "2022 Timpte 1614 Dump", service: "Lighting and wiring", notes: "Left turn signal out.", date: d(0), created: d(-6), status: "In progress" }
    ],
    leads: [
      { id: "L-501", name: "Tony Ruiz", phone: "704-555-0190", interest: "1620 Gooseneck for a CAT 305", source: `${ASSISTANT_NAME} chat`, stage: "Quoted", created: d(-5) },
      { id: "L-502", name: "Lena Park", phone: "803-555-0123", interest: "1614 Dump", source: "Quote form", stage: "Won", created: d(-9) },
      { id: "L-503", name: "Ray Simmons", phone: "704-555-0177", interest: "514 EZ Load (on hold)", source: "Hold", stage: "Contacted", created: d(-1) },
      { id: "L-504", name: "Dana Whitfield", phone: "704-555-0148", interest: "720 EZ Load", source: `${ASSISTANT_NAME} chat`, stage: "Quoted", created: d(-2) },
      { id: "L-505", name: "Sam Ortega", phone: "704-555-0102", interest: "Split Tilt for a mini-ex", source: "Quote form", stage: "New", created: d(0) },
      { id: "L-506", name: "Priya Nair", phone: "980-555-0156", interest: "UTV hauler, two side-by-sides", source: "Phone", stage: "New", created: d(-1) },
      { id: "L-507", name: "Bill Hester", phone: "704-555-0119", interest: "Car hauler", source: "Walk-in", stage: "Lost", created: d(-12) }
    ]
  },
  /* @end-demo */
};
