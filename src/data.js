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

const ASSISTANT_NAME = "Andy";

const DAY = 864e5;
function d(n){ return new Date(Date.now() + n * DAY).toISOString(); }

/* ---- Timpte models, one entry per model, numbers from the spec sheets ----
   suits = the kinds of load Andy and the Finder will match it to            */
const MODELS = {
  "514": {
    model: "Timpte 514 EZ Load", type: "ezload", img: "card-514", video: "514-utv", spec: "timpte-514-ez-load.pdf",
    gallery: ["g-514-1", "g-514-2", "g-514-3", "g-514-4"],
    payload: 3720, gvwr: 5000, empty: 1280, deck: "14' x 78\"", deckFt: 14, width: "102\" overall", length: "19' 1\"",
    loading: "Powered EZ Load deck", angle: 4, angleText: "Under 4°", axles: "Single 5,000 lb rubber torsion",
    hitch: "Bumper pull (2-5/16\" ball)", brakes: "Electric, self-adjusting", tires: "ST225/75R15E, 10 ply",
    blurb: "Single-axle EZ Load with a powered deck that drops low, so mowers, golf carts and side-by-sides drive straight on.",
    feat: ["Under 4° load angle", "Single axle", "1,280 lb empty"],
    features: ["Powered EZ Load deck system, loading angle under 4°", "14' x 78\" deck, 18\" deck height", "5,000 lb rubber torsion axle", "(4) D-rings with 20 mounting locations", "Electric self-adjusting brakes", "LED lighting"],
    suits: ["mower", "utv", "car"]
  },
  "720": {
    model: "Timpte 720 EZ Load", type: "ezload", img: "card-720", video: null, spec: "timpte-720-ez-load.pdf",
    gallery: ["g-720-1", "g-720-2", "g-720-3", "g-720-4"],
    payload: 5020, gvwr: 7000, empty: 1980, deck: "19' 6\" x 82.5\"", deckFt: 19.5, width: "102\" overall", length: "24' 5\"",
    loading: "Powered EZ Load deck", angle: 4, angleText: "Under 4°", axles: "Tandem 3,500 lb rubber torsion",
    hitch: "Bumper pull (2-5/16\" ball, adjustable)", brakes: "Electric, self-adjusting", tires: "ST205/75R14D, 8 ply",
    blurb: "7K EZ Load with a 19' 6\" deck. Low enough for a lowered car, light enough for most half-tons.",
    feat: ["Under 4° load angle", "Tandem axle", "5,020 lb payload"],
    features: ["Powered EZ Load deck system, loading angle under 4°", "19' 6\" x 82.5\" deck, 22.5\" deck height", "Tandem 3,500 lb rubber torsion axles", "(4) D-rings with 24 mounting locations", "Adjustable coupler", "LED lighting"],
    suits: ["car", "utv", "mower"]
  },
  "1020": {
    model: "Timpte 1020 EZ Load", type: "ezload", img: "card-1020", video: "1026-launch", spec: "timpte-10k-ez-load.pdf",
    gallery: ["g-1020-1", "g-1020-2", "g-1020-3", "g-1020-4"],
    payload: 7580, gvwr: 10000, empty: 2420, deck: "19' 6\" x 81\"", deckFt: 19.5, width: "102\" overall", length: "24' 6\"",
    loading: "Powered EZ Load deck", angle: 4, angleText: "Under 4°", axles: "Tandem 5,000 lb rubber torsion",
    hitch: "Bumper pull (2-5/16\" ball, adjustable)", brakes: "Electric, self-adjusting", tires: "ST225/75R15E, 10 ply",
    blurb: "10K EZ Load for heavier cars, trucks and compact tractors. L-track on three sides makes tie-down quick.",
    feat: ["Under 4° load angle", "L-track tie-downs", "7,580 lb payload"],
    features: ["Powered EZ Load deck system, loading angle under 4°", "19' 6\" x 81\" deck, 24\" deck height", "Tandem 5,000 lb rubber torsion axles", "(4) movable D-rings in integrated L-track, front and both sides", "4 stake pockets", "LED lighting"],
    suits: ["car", "utv", "mower"]
  },
  "1026": {
    model: "Timpte 1026 EZ Load", type: "ezload", img: "card-1026", video: "1026-launch", spec: "timpte-10k-ez-load.pdf",
    gallery: ["g-1026-1", "g-1026-2", "g-1026-3", "g-1026-4"],
    payload: 7360, gvwr: 10000, empty: 2640, deck: "26' x 81\"", deckFt: 26, width: "102\" overall", length: "31' 2\"",
    loading: "Powered EZ Load deck", angle: 4, angleText: "Under 4°", axles: "Tandem 5,000 lb rubber torsion",
    hitch: "Bumper pull (2-5/16\" ball, adjustable)", brakes: "Electric, self-adjusting", tires: "ST225/75R15E, 10 ply",
    blurb: "The longest deck in the EZ Load line: 26 feet. A Jeep and a side-by-side, or a car with room to spare.",
    feat: ["26' deck", "Under 4° load angle", "7,360 lb payload"],
    features: ["Powered EZ Load deck system, loading angle under 4°", "26' x 81\" deck, 24\" deck height", "Tandem 5,000 lb rubber torsion axles", "(4) movable D-rings in integrated L-track", "8 stake pockets", "LED lighting"],
    suits: ["car", "utv", "mower"]
  },
  "1420ST": {
    model: "Timpte 1420 Split Tilt", type: "tilt", img: "card-1420st", video: "split-tilt-walkaround", spec: "timpte-14k-split-tilt.pdf",
    gallery: ["g-1420st-1", "g-1420st-2", "g-1420st-3", "g-1420st-4"],
    payload: 11320, gvwr: 14000, empty: 2680, deck: "16' tilt + 4' stationary x 82-3/8\"", deckFt: 20, width: "102\" overall", length: "24' 6\"",
    loading: "Split tilt deck", angle: 12, axles: "Tandem 7,000 lb rubber torsion",
    hitch: "Bumper pull (2-5/16\" ball, adjustable)", brakes: "Electric, self-adjusting", tires: "ST235/80R16E, 10 ply",
    blurb: "14K split tilt for skid steers and mini excavators. The 16-foot tilt section drops while the 4-foot front deck stays put.",
    feat: ["12° tilt", "11,320 lb payload", "18 stake pockets"],
    features: ["16' tilt deck + 4' stationary deck, 82-3/8\" wide", "22\" deck height, 12° loading angle", "Tandem 7,000 lb rubber torsion axles", "18 stake pockets", "Side crank jack, 12,000 lb", "Adjustable 2-5/16\" coupler", "LED lighting"],
    suits: ["compact", "miniex", "utv", "mower", "car"]
  },
  "1624ST": {
    model: "Timpte 1624 Split Tilt", type: "tilt", img: "card-1624st", video: "split-tilt-walkaround", spec: "timpte-16k-split-tilt.pdf",
    gallery: ["g-1624st-1", "g-1624st-2", "g-1624st-3", "g-1624st-4"],
    payload: 12800, gvwr: 16000, empty: 3200, deck: "18' tilt + 6' stationary x 82-3/8\"", deckFt: 24, width: "102\" overall", length: "29' 1\"",
    loading: "Split tilt deck", angle: 12, axles: "Tandem 8,000 lb rubber torsion",
    hitch: "Bumper pull (2-5/16\" ball, adjustable)", brakes: "Electric, self-adjusting", tires: "ST235/80R16G, 14 ply",
    blurb: "16K split tilt with an 18-foot tilt and a 6-foot front deck, for bigger track loaders and a mini-ex with attachments.",
    feat: ["16K GVW", "12,800 lb payload", "8K axles"],
    features: ["18' tilt deck + 6' stationary deck, 82-3/8\" wide", "22\" deck height, 12° loading angle", "Tandem 8,000 lb rubber torsion axles", "ST235/80R16G 14-ply tires", "18 stake pockets", "Side crank jack, 12,000 lb", "LED lighting"],
    suits: ["compact", "miniex", "heavy", "utv", "car"]
  },
  "1414D": {
    model: "Timpte 1414 Dump", type: "dump", img: "card-1414d", video: null, spec: "timpte-14k-dump.pdf",
    gallery: [],
    payload: 10540, gvwr: 14000, empty: 3460, deck: "14' box x 82\" inside, 24\" sides", deckFt: 14, width: "102\" overall", length: "",
    loading: "Dexter scissor hoist", angle: null, axles: "Tandem 7,000 lb rubber torsion",
    hitch: "Bumper pull (2-5/16\" ball, adjustable)", brakes: "Electric, self-adjusting", tires: "ST235/80R16E, 10 ply",
    blurb: "14K aluminum dump with a 14-foot box, a scissor hoist and a rear gate that swings like a barn door or spreads.",
    feat: ["10,540 lb payload", "Scissor hoist", "Mesh tarp"],
    features: ["Aluminum construction with no structural welds", "14' x 82\" box, 24\" sides", "Dexter scissor hoist", "Barn door / spreader combo rear gate", "Full-length mesh tarp", "A-frame toolbox, spare tire and mount", "Rear stabilizers", "Tandem 7,000 lb rubber torsion axles"],
    suits: ["material", "mower"]
  },
  "1614D": {
    model: "Timpte 1614 Dump", type: "dump", img: "card-1614d", video: null, spec: "timpte-16k-dump.pdf",
    gallery: [],
    payload: 12400, gvwr: 16000, empty: 3600, deck: "14' box x 82\" inside, 24\" sides", deckFt: 14, width: "102\" overall", length: "",
    loading: "Dexter scissor hoist", angle: null, axles: "Tandem 8,000 lb rubber torsion",
    hitch: "Bumper pull (2-5/16\" ball, adjustable)", brakes: "Electric, self-adjusting", tires: "ST235/80R16, 14 ply",
    blurb: "16K aluminum dump for landscapers, contractors and cleanup crews. More payload than the 14K, same 14-foot box.",
    feat: ["12,400 lb payload", "8K axles", "Mesh tarp"],
    features: ["Aluminum construction with no structural welds", "14' x 82\" box, 24\" sides", "Dexter scissor hoist", "Barn door / spreader combo rear gate", "Full-length mesh tarp", "A-frame toolbox, spare tire and mount", "Rear stabilizers", "Tandem 8,000 lb rubber torsion axles"],
    suits: ["material", "mower"]
  },
  "1620DO": {
    model: "Timpte 1620 Deck Over", type: "deckover", img: "card-1620do", video: null, spec: "timpte-deck-over-2026.pdf",
    gallery: ["g-1620do-1", "g-1620do-2", "g-1620do-3", "g-1620do-4"],
    payload: 12940, gvwr: 16000, empty: 3060, deck: "20' x 98.25\" (incl. 60\" dovetail)", deckFt: 20, width: "102\" overall, 98.25\" deck", length: "25' 8\"",
    loading: "Dovetail + 50/50 ramps (approx. 4')", angle: 14, axles: "Tandem 8,000 lb rubber torsion",
    hitch: "Bumper pull (2-5/16\" ball, adjustable)", brakes: "Electric, self-adjusting", tires: "ST235/80R16G, 14 ply",
    blurb: "16K deck over: the full 98-inch deck sits above the wheels, with a 5-foot dovetail and 50/50 ramps. Updated design for 2026.",
    feat: ["98\" wide deck", "12,940 lb payload", "50/50 ramps"],
    features: ["20' x 98.25\" usable deck over the wheels", "60\" dovetail with approx. 4' 50/50 ramps", "35\" deck height, 14° loading angle", "Tandem 8,000 lb rubber torsion axles", "24 stake pockets", "2026 update: up to 520 lb more payload than the previous model"],
    suits: ["compact", "miniex", "heavy", "car", "utv"]
  },
  "1620GN": {
    model: "Timpte 1620 Gooseneck", type: "gooseneck", img: "card-1620gn", video: "gooseneck-launch", spec: "timpte-16k-gooseneck.pdf",
    gallery: ["g-1620gn-1", "g-1620gn-2", "g-1620gn-3", "g-1620gn-4"],
    payload: 12480, gvwr: 16000, empty: 3460, deck: "20' x 98.25\" (incl. 60\" dovetail)", deckFt: 20, width: "102\" overall, 98.25\" deck", length: "28' 7\"",
    loading: "Dovetail + ramps (approx. 4')", angle: 14, axles: "Tandem 7,000 lb rubber torsion",
    hitch: "Gooseneck (2-5/16\" ball)", brakes: "Electric, self-adjusting", tires: "ST235/80R16E, 10 ply",
    blurb: "16K gooseneck deck over for longer runs and bigger machines. Toolbox with chain rack, chain tray and spare tire come standard.",
    feat: ["Gooseneck", "12,480 lb payload", "Dual 12K jacks"],
    features: ["20' x 98.25\" usable deck", "60\" dovetail with approx. 4' ramps", "35\" deck height, 14° loading angle", "Tandem 7,000 lb rubber torsion axles", "Dual 12,000 lb jacks", "Toolbox with chain rack, chain tray, spare tire and mount, front bump rail"],
    suits: ["heavy", "compact", "miniex", "car", "utv"]
  }
};

/* One physical unit on the lot (sample stock built from real models) */
function stock(key, o) { return Object.assign({ year: 2026 }, MODELS[key], o); }

const DATA = {
  business: {
    name: "Timeless Trailers",
    phone: "704-589-3100",
    tel: "+17045893100",
    hours: "Mon–Fri 9am–5pm",
    address: "4417-A Helms Road, Waxhaw, NC 28173",
    maps: "https://www.google.com/maps/dir/?api=1&destination=4417-A+Helms+Road%2C+Waxhaw%2C+NC+28173",
    modelsCarried: 19,
    timpte: "https://www.timpteequipmenttrailers.com"
  },

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

  /* Sample stock built from real models. Prices and stock numbers are SAMPLE. */
  inventory: [
    stock("1614D", { id: "TT-0142", price: 18400, status: "lot", added: d(-21) }),
    stock("1614D", { id: "TT-0143", price: 18400, status: "lot", added: d(-9) }),
    stock("1414D", { id: "TT-0150", price: 16200, status: "lot", added: d(-14) }),
    stock("1420ST", { id: "TT-0138", price: 17900, status: "lot", added: d(-30) }),
    stock("1420ST", { id: "TT-0165", price: 17900, status: "order", eta: "late October", added: d(-2) }),
    stock("1624ST", { id: "TT-0147", price: 21900, status: "lot", added: d(-6) }),
    stock("1620GN", { id: "TT-0129", price: 21500, status: "lot", added: d(-75) }),
    stock("1620DO", { id: "TT-0152", price: 17600, status: "lot", added: d(-11) }),
    stock("1020", { id: "TT-0155", price: 14900, status: "lot", added: d(-12) }),
    stock("1020", { id: "TT-0156", price: 14900, status: "order", eta: "mid November", added: d(-1) }),
    stock("720", { id: "TT-0160", price: 10900, status: "lot", added: d(-4) }),
    stock("1026", { id: "TT-0133", price: 16400, status: "lot", added: d(-40) }),
    stock("514", { id: "TT-0158", price: 6950, status: "hold", added: d(-18) })
  ],

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

  team: [
    { name: "Matt Lyons", role: "Owner", note: "Answers the phone, walks the lot with you and stands behind every unit he sells." },
    { name: "Kayla Brooks", role: "Sales & parts (sample)", note: "Quotes, parts orders and keeping the lead board moving." }
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
  }
};
