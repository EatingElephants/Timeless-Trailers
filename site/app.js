"use strict";
const CONFIG = {"_comment": "Everything about THIS dealer lives here. A second dealer is a second copy of this file plus their models, inventory, parts and photos. build.py inlines it into app.js as CONFIG.", "site": {"name": "Timeless Trailers", "tagline": "Built once. Lasts forever.", "url": "https://timeless-trailers.jsalbrig-studio.workers.dev", "indexable": false, "title": "Timeless Trailers · The only Customer Service Center (CSC) in the U.S. that sells Timpte equipment trailers exclusively · Waxhaw, NC", "description": "The only Customer Service Center (CSC) in the U.S. that sells Timpte equipment trailers exclusively. Aluminum split tilt, deck over, gooseneck, dump and EZ Load trailers in Waxhaw, NC, with real specs, photos and video for every model.", "ogTitle": "Timeless Trailers · America's only Timpte-exclusive Customer Service Center", "ogDescription": "Timpte aluminum equipment trailers in Waxhaw, NC. Real specs, photos and video for every model.", "ogImage": "/video/hero-full.webp", "builtBy": "Albright Agency"}, "business": {"name": "Timeless Trailers", "legalName": "Timeless Trailers", "phone": "704-589-3100", "tel": "+17045893100", "email": "", "hours": "Mon–Fri 9am–5pm", "openingHours": {"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "17:00"}, "address": "4417-A Helms Road, Waxhaw, NC 28173", "street": "4417-A Helms Road", "city": "Waxhaw", "state": "NC", "zip": "28173", "maps": "https://www.google.com/maps/dir/?api=1&destination=4417-A+Helms+Road%2C+Waxhaw%2C+NC+28173", "areaServed": ["Waxhaw NC", "Charlotte NC", "Union County NC", "North Carolina", "South Carolina"], "modelsCarried": 19, "brand": "Timpte", "timpte": "https://www.timpteequipmenttrailers.com"}, "assistant": {"name": "Andy", "chat": "https://app.stammer.ai/en/chatbot/embed/6c5361b8-327c-4024-a1e8-6eff602a3384", "voice": "https://app.stammer.ai/en/voice/embed/d44a66c8-dec4-45b3-ad38-7b7ddf60e1a0", "voiceOn": true}, "showPrices": true, "holdHours": 48, "leads": {"to": "", "from": "", "subject": "New lead from the website"}, "analytics": {"cloudflareToken": ""}, "wording": {"exclusive": "The only Customer Service Center (CSC) in the U.S. that sells Timpte equipment trailers exclusively.", "exclusiveShort": "America's only Timpte-exclusive Customer Service Center", "andy": "Andy matches the trailer to your load and truck, then Matt sends your quote the same business day.", "owner": "Matt", "csc": "Customer Service Center (CSC)"}, "team": [{"name": "Matt Lyons", "role": "Owner", "note": "Answers the phone, walks the lot with you and stands behind every unit he sells."}], "showPartsPrices": false, "_commentParts": "showPartsPrices: the catalog's prices show on the Parts page only when this is true (Matt confirms they are customer prices)."};
const MODELS = {"514": {"model": "Timpte 514 EZ Load", "type": "ezload", "img": "card-514", "video": "514-utv", "spec": "timpte-514-ez-load.pdf", "gallery": ["g-514-1", "g-514-2", "g-514-3", "g-514-4"], "payload": 3720, "gvwr": 5000, "empty": 1280, "deck": "14' x 78\"", "deckFt": 14, "width": "102\" overall", "length": "19' 1\"", "loading": "Powered EZ Load deck", "angle": 4, "angleText": "Under 4°", "axles": "Single 5,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball)", "brakes": "Electric, self-adjusting", "tires": "ST225/75R15E, 10 ply", "blurb": "Single-axle EZ Load with a powered deck that drops low, so mowers, golf carts and side-by-sides drive straight on.", "feat": ["Under 4° load angle", "Single axle", "1,280 lb empty"], "features": ["Powered EZ Load deck system, loading angle under 4°", "14' x 78\" deck, 18\" deck height", "5,000 lb rubber torsion axle", "(4) D-rings with 20 mounting locations", "Electric self-adjusting brakes", "LED lighting"], "suits": ["mower", "utv", "car"], "key": "514", "slug": "514-ez-load", "listPrice": null}, "720": {"model": "Timpte 720 EZ Load", "type": "ezload", "img": "card-720", "video": null, "spec": "timpte-720-ez-load.pdf", "gallery": ["g-720-1", "g-720-2", "g-720-3", "g-720-4"], "payload": 5020, "gvwr": 7000, "empty": 1980, "deck": "19' 6\" x 82.5\"", "deckFt": 19.5, "width": "102\" overall", "length": "24' 5\"", "loading": "Powered EZ Load deck", "angle": 4, "angleText": "Under 4°", "axles": "Tandem 3,500 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST205/75R14D, 8 ply", "blurb": "7K EZ Load with a 19' 6\" deck. Low enough for a lowered car, light enough for most half-tons.", "feat": ["Under 4° load angle", "Tandem axle", "5,020 lb payload"], "features": ["Powered EZ Load deck system, loading angle under 4°", "19' 6\" x 82.5\" deck, 22.5\" deck height", "Tandem 3,500 lb rubber torsion axles", "(4) D-rings with 24 mounting locations", "Adjustable coupler", "LED lighting"], "suits": ["car", "utv", "mower"], "key": "720", "slug": "720-ez-load", "listPrice": null}, "1020": {"model": "Timpte 1020 EZ Load", "type": "ezload", "img": "card-1020", "video": "1026-launch", "spec": "timpte-10k-ez-load.pdf", "gallery": ["g-1020-1", "g-1020-2", "g-1020-3", "g-1020-4"], "payload": 7580, "gvwr": 10000, "empty": 2420, "deck": "19' 6\" x 81\"", "deckFt": 19.5, "width": "102\" overall", "length": "24' 6\"", "loading": "Powered EZ Load deck", "angle": 4, "angleText": "Under 4°", "axles": "Tandem 5,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST225/75R15E, 10 ply", "blurb": "10K EZ Load for heavier cars, trucks and compact tractors. L-track on three sides makes tie-down quick.", "feat": ["Under 4° load angle", "L-track tie-downs", "7,580 lb payload"], "features": ["Powered EZ Load deck system, loading angle under 4°", "19' 6\" x 81\" deck, 24\" deck height", "Tandem 5,000 lb rubber torsion axles", "(4) movable D-rings in integrated L-track, front and both sides", "4 stake pockets", "LED lighting"], "suits": ["car", "utv", "mower"], "key": "1020", "slug": "1020-ez-load", "listPrice": null}, "1026": {"model": "Timpte 1026 EZ Load", "type": "ezload", "img": "card-1026", "video": "1026-launch", "spec": "timpte-10k-ez-load.pdf", "gallery": ["g-1026-1", "g-1026-2", "g-1026-3", "g-1026-4"], "payload": 7360, "gvwr": 10000, "empty": 2640, "deck": "26' x 81\"", "deckFt": 26, "width": "102\" overall", "length": "31' 2\"", "loading": "Powered EZ Load deck", "angle": 4, "angleText": "Under 4°", "axles": "Tandem 5,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST225/75R15E, 10 ply", "blurb": "The longest deck in the EZ Load line: 26 feet. A Jeep and a side-by-side, or a car with room to spare.", "feat": ["26' deck", "Under 4° load angle", "7,360 lb payload"], "features": ["Powered EZ Load deck system, loading angle under 4°", "26' x 81\" deck, 24\" deck height", "Tandem 5,000 lb rubber torsion axles", "(4) movable D-rings in integrated L-track", "8 stake pockets", "LED lighting"], "suits": ["car", "utv", "mower"], "key": "1026", "slug": "1026-ez-load", "listPrice": null}, "1420ST": {"model": "Timpte 1420 Split Tilt", "type": "tilt", "img": "card-1420st", "video": "split-tilt-walkaround", "spec": "timpte-14k-split-tilt.pdf", "gallery": ["g-1420st-1", "g-1420st-2", "g-1420st-3", "g-1420st-4"], "payload": 11320, "gvwr": 14000, "empty": 2680, "deck": "16' tilt + 4' stationary x 82-3/8\"", "deckFt": 20, "width": "102\" overall", "length": "24' 6\"", "loading": "Split tilt deck", "angle": 12, "axles": "Tandem 7,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16E, 10 ply", "blurb": "14K split tilt for skid steers and mini excavators. The 16-foot tilt section drops while the 4-foot front deck stays put.", "feat": ["12° tilt", "11,320 lb payload", "18 stake pockets"], "features": ["16' tilt deck + 4' stationary deck, 82-3/8\" wide", "22\" deck height, 12° loading angle", "Tandem 7,000 lb rubber torsion axles", "18 stake pockets", "Side crank jack, 12,000 lb", "Adjustable 2-5/16\" coupler", "LED lighting"], "suits": ["compact", "miniex", "utv", "mower", "car"], "key": "1420ST", "slug": "1420-split-tilt", "listPrice": null}, "1424ST": {"model": "Timpte 1424 Split Tilt", "type": "tilt", "img": "card-1420st", "video": "split-tilt-walkaround", "spec": "timpte-14k-split-tilt.pdf", "gallery": ["g-1420st-1", "g-1420st-2", "g-1420st-3", "g-1420st-4"], "payload": 11000, "gvwr": 14000, "empty": 3000, "deck": "18' tilt + 6' stationary x 82-3/8\"", "deckFt": 24, "width": "102\" overall", "length": "28' 6\"", "loading": "Split tilt deck", "angle": 11.5, "axles": "Tandem 7,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16E, 10 ply", "blurb": "14K split tilt with the longer 18-foot tilt section and a 6-foot front deck: room for a skid steer with the attachment riding up front.", "feat": ["11.5° tilt", "11,000 lb payload", "24' of deck"], "features": ["18' tilt deck + 6' stationary deck, 82-3/8\" wide", "22\" deck height, 11.5° loading angle", "Tandem 7,000 lb rubber torsion axles", "18 stake pockets", "Side crank jack, 12,000 lb", "Adjustable 2-5/16\" coupler", "LED lighting"], "suits": ["compact", "miniex", "utv", "mower", "car"], "key": "1424ST", "slug": "1424-split-tilt", "listPrice": null}, "1624ST": {"model": "Timpte 1624 Split Tilt", "type": "tilt", "img": "card-1624st", "video": "split-tilt-walkaround", "spec": "timpte-16k-split-tilt.pdf", "gallery": ["g-1624st-1", "g-1624st-2", "g-1624st-3", "g-1624st-4"], "payload": 12800, "gvwr": 16000, "empty": 3200, "deck": "18' tilt + 6' stationary x 82-3/8\"", "deckFt": 24, "width": "102\" overall", "length": "29' 1\"", "loading": "Split tilt deck", "angle": 12, "axles": "Tandem 8,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16G, 14 ply", "blurb": "16K split tilt with an 18-foot tilt and a 6-foot front deck, for bigger track loaders and a mini-ex with attachments.", "feat": ["16K GVW", "12,800 lb payload", "8K axles"], "features": ["18' tilt deck + 6' stationary deck, 82-3/8\" wide", "22\" deck height, 12° loading angle", "Tandem 8,000 lb rubber torsion axles", "ST235/80R16G 14-ply tires", "18 stake pockets", "Side crank jack, 12,000 lb", "LED lighting"], "suits": ["compact", "miniex", "heavy", "utv", "car"], "key": "1624ST", "slug": "1624-split-tilt", "listPrice": null}, "1420DO": {"model": "Timpte 1420 Deck Over", "type": "deckover", "img": "card-1620do", "video": null, "spec": "timpte-14k-deck-over.pdf", "gallery": ["g-1620do-1", "g-1620do-2", "g-1620do-3", "g-1620do-4"], "payload": 11320, "gvwr": 14000, "empty": 2680, "deck": "20' x 98.25\" (incl. 60\" dovetail)", "deckFt": 20, "width": "102\" overall, 98.25\" deck", "length": "25' 8\"", "loading": "Dovetail + 50/50 ramps (approx. 4')", "angle": 14, "axles": "Tandem 7,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16E, 10 ply", "blurb": "14K deck over: the full 98-inch deck above the wheels, 7K torsion axles and 50/50 ramps. The lighter-duty way into a deck over.", "feat": ["98\" wide deck", "11,320 lb payload", "50/50 ramps"], "features": ["20' x 98.25\" usable deck over the wheels", "60\" dovetail with approx. 4' 50/50 ramps", "35\" deck height, 14° loading angle", "Tandem 7,000 lb rubber torsion axles", "24 stake pockets", "Side crank jack, 12,000 lb"], "suits": ["compact", "miniex", "car", "utv"], "key": "1420DO", "slug": "1420-deck-over", "listPrice": null}, "1426DO": {"model": "Timpte 1426 Deck Over", "type": "deckover", "img": "card-1620do", "video": null, "spec": "timpte-14k-deck-over.pdf", "gallery": ["g-1620do-1", "g-1620do-2", "g-1620do-3", "g-1620do-4"], "payload": 11000, "gvwr": 14000, "empty": 3000, "deck": "25' 4\" x 98.25\" (incl. 60\" dovetail)", "deckFt": 25.3, "width": "102\" overall, 98.25\" deck", "length": "31' 8\"", "loading": "Dovetail + 50/50 ramps (approx. 4')", "angle": 14, "axles": "Tandem 7,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16E, 10 ply", "blurb": "14K deck over with a 25-foot-4 deck: two machines, or a long load, above the wheels on 7K torsion axles.", "feat": ["25' 4\" deck", "11,000 lb payload", "50/50 ramps"], "features": ["25' 4\" x 98.25\" usable deck over the wheels", "60\" dovetail with approx. 4' 50/50 ramps", "35\" deck height, 14° loading angle", "Tandem 7,000 lb rubber torsion axles", "28 stake pockets", "Side crank jack, 12,000 lb"], "suits": ["compact", "miniex", "car", "utv"], "key": "1426DO", "slug": "1426-deck-over", "listPrice": null}, "1620DO": {"model": "Timpte 1620 Deck Over", "type": "deckover", "img": "card-1620do", "video": null, "spec": "timpte-16k-deck-over.pdf", "gallery": ["g-1620do-1", "g-1620do-2", "g-1620do-3", "g-1620do-4"], "payload": 12940, "gvwr": 16000, "empty": 3060, "deck": "20' x 98.25\" (incl. 60\" dovetail)", "deckFt": 20, "width": "102\" overall, 98.25\" deck", "length": "25' 8\"", "loading": "Dovetail + 50/50 ramps (approx. 4')", "angle": 14, "axles": "Tandem 8,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16G, 14 ply", "blurb": "16K deck over: the full 98-inch deck sits above the wheels, with a 5-foot dovetail and 50/50 ramps. Updated design for 2026.", "feat": ["98\" wide deck", "12,940 lb payload", "50/50 ramps"], "features": ["20' x 98.25\" usable deck over the wheels", "60\" dovetail with approx. 4' 50/50 ramps", "35\" deck height, 14° loading angle", "Tandem 8,000 lb rubber torsion axles", "24 stake pockets", "2026 update: up to 520 lb more payload than the previous model"], "suits": ["compact", "miniex", "heavy", "car", "utv"], "key": "1620DO", "slug": "1620-deck-over", "listPrice": null}, "1626DO": {"model": "Timpte 1626 Deck Over", "type": "deckover", "img": "card-1620do", "video": null, "spec": "timpte-16k-deck-over.pdf", "gallery": ["g-1620do-1", "g-1620do-2", "g-1620do-3", "g-1620do-4"], "payload": 12620, "gvwr": 16000, "empty": 3380, "deck": "25' 4\" x 98.25\" (incl. 60\" dovetail)", "deckFt": 25.3, "width": "102\" overall, 98.25\" deck", "length": "31' 8\"", "loading": "Dovetail + 50/50 ramps (approx. 4')", "angle": 14, "axles": "Tandem 8,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16G, 14 ply", "blurb": "16K deck over with a 25-foot-4 deck and 8K torsion axles: the longest bumper-pull deck over in the line, for bigger machines and long loads.", "feat": ["25' 4\" deck", "12,620 lb payload", "50/50 ramps"], "features": ["25' 4\" x 98.25\" usable deck over the wheels", "60\" dovetail with approx. 4' 50/50 ramps", "35\" deck height, 14° loading angle", "Tandem 8,000 lb rubber torsion axles", "28 stake pockets", "Side crank jack, 12,000 lb", "2026 update: up to 520 lb more payload than the previous model"], "suits": ["compact", "miniex", "heavy", "car", "utv"], "key": "1626DO", "slug": "1626-deck-over", "listPrice": null}, "1620GN": {"model": "Timpte 1620 Gooseneck", "type": "gooseneck", "img": "card-1620gn", "video": "gooseneck-launch", "spec": "timpte-16k-gooseneck.pdf", "gallery": ["g-1620gn-1", "g-1620gn-2", "g-1620gn-3", "g-1620gn-4"], "payload": 12480, "gvwr": 16000, "empty": 3460, "deck": "20' x 98.25\" (incl. 60\" dovetail)", "deckFt": 20, "width": "102\" overall, 98.25\" deck", "length": "28' 7\"", "loading": "Dovetail + ramps (approx. 4')", "angle": 14, "axles": "Tandem 7,000 lb rubber torsion", "hitch": "Gooseneck (2-5/16\" ball)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16E, 10 ply", "blurb": "16K gooseneck deck over for longer runs and bigger machines. Toolbox with chain rack, chain tray and spare tire come standard.", "feat": ["Gooseneck", "12,480 lb payload", "Dual 12K jacks"], "features": ["20' x 98.25\" usable deck", "60\" dovetail with approx. 4' ramps", "35\" deck height, 14° loading angle", "Tandem 7,000 lb rubber torsion axles", "Dual 12,000 lb jacks", "Toolbox with chain rack, chain tray, spare tire and mount, front bump rail"], "suits": ["heavy", "compact", "miniex", "car", "utv"], "key": "1620GN", "slug": "1620-gooseneck", "listPrice": null}, "1626GN": {"model": "Timpte 1626 Gooseneck", "type": "gooseneck", "img": "card-1620gn", "video": "gooseneck-launch", "spec": "timpte-16k-gooseneck.pdf", "gallery": ["g-1620gn-1", "g-1620gn-2", "g-1620gn-3", "g-1620gn-4"], "payload": 12220, "gvwr": 16000, "empty": 3780, "deck": "25' 4\" x 98.25\" (incl. 60\" dovetail)", "deckFt": 25.3, "width": "102\" overall, 98.25\" deck", "length": "34' 7\"", "loading": "Dovetail + ramps (approx. 4')", "angle": 14, "axles": "Tandem 7,000 lb rubber torsion", "hitch": "Gooseneck (2-5/16\" ball)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16E, 10 ply", "blurb": "16K gooseneck deck over with a 25-foot-4 deck: two machines on one trip, with the steadier gooseneck ride and dual 12K jacks.", "feat": ["25' 4\" deck", "12,220 lb payload", "Dual 12K jacks"], "features": ["25' 4\" x 98.25\" usable deck", "60\" dovetail with approx. 4' ramps", "35\" deck height, 14° loading angle", "Tandem 7,000 lb rubber torsion axles", "Dual 12,000 lb jacks", "28 stake pockets", "Toolbox with chain rack, chain tray, spare tire and mount, front bump rail"], "suits": ["heavy", "compact", "miniex", "car", "utv"], "key": "1626GN", "slug": "1626-gooseneck", "listPrice": null}, "1620HD": {"model": "Timpte 1620HD Gooseneck", "type": "gooseneck", "img": "card-1620gn", "video": "gooseneck-launch", "spec": "timpte-16khd-gooseneck.pdf", "gallery": ["g-1620gn-1", "g-1620gn-2", "g-1620gn-3", "g-1620gn-4"], "payload": 12540, "gvwr": 16000, "empty": 3530, "deck": "20' x 98.25\" (incl. 60\" dovetail)", "deckFt": 20, "width": "102\" overall, 98.25\" deck", "length": "28' 7\"", "loading": "Dovetail + ramps (approx. 4')", "angle": 14, "axles": "Tandem 8,000 lb rubber torsion", "hitch": "Gooseneck (2-5/16\" ball)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16G, 14 ply", "blurb": "The heavy-duty 1620: the same 20-foot gooseneck deck over built on true 8K axles and 14-ply tires, for crews that load it to the line every day.", "feat": ["True 8K axles", "12,540 lb payload", "14-ply tires"], "features": ["20' x 98.25\" usable deck", "60\" dovetail with approx. 4' ramps", "35\" deck height, 14° loading angle", "Tandem 8,000 lb rubber torsion axles", "ST235/80R16G 14-ply tires", "Dual 12,000 lb jacks", "Toolbox with chain rack, chain tray, spare tire and mount, front bump rail"], "suits": ["heavy", "compact", "miniex", "car", "utv"], "key": "1620HD", "slug": "1620hd-gooseneck", "listPrice": null}, "1626HD": {"model": "Timpte 1626HD Gooseneck", "type": "gooseneck", "img": "card-1620gn", "video": "gooseneck-launch", "spec": "timpte-16khd-gooseneck.pdf", "gallery": ["g-1620gn-1", "g-1620gn-2", "g-1620gn-3", "g-1620gn-4"], "payload": 12140, "gvwr": 16000, "empty": 3860, "deck": "25' 4\" x 98.25\" (incl. 60\" dovetail)", "deckFt": 25.3, "width": "102\" overall, 98.25\" deck", "length": "34' 7\"", "loading": "Dovetail + ramps (approx. 4')", "angle": 14, "axles": "Tandem 8,000 lb rubber torsion", "hitch": "Gooseneck (2-5/16\" ball)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16G, 14 ply", "blurb": "The heavy-duty 1626: a 25-foot-4 gooseneck deck over on true 8K axles and 14-ply tires. The biggest, toughest trailer in the lineup.", "feat": ["25' 4\" deck", "True 8K axles", "12,140 lb payload"], "features": ["25' 4\" x 98.25\" usable deck", "60\" dovetail with approx. 4' ramps", "35\" deck height, 14° loading angle", "Tandem 8,000 lb rubber torsion axles", "ST235/80R16G 14-ply tires", "Dual 12,000 lb jacks", "28 stake pockets", "Toolbox with chain rack, chain tray, spare tire and mount, front bump rail"], "suits": ["heavy", "compact", "miniex", "car", "utv"], "key": "1626HD", "slug": "1626hd-gooseneck", "listPrice": null}, "1414D": {"model": "Timpte 1414 Dump", "type": "dump", "img": "card-1414d", "video": null, "spec": "timpte-14k-dump.pdf", "gallery": [], "payload": 10540, "gvwr": 14000, "empty": 3460, "deck": "14' box x 82\" inside, 24\" sides", "deckFt": 14, "width": "102\" overall", "length": "", "loading": "Dexter scissor hoist", "angle": null, "axles": "Tandem 7,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16E, 10 ply", "blurb": "14K aluminum dump with a 14-foot box, a scissor hoist and a rear gate that swings like a barn door or spreads.", "feat": ["10,540 lb payload", "Scissor hoist", "Mesh tarp"], "features": ["Aluminum construction with no structural welds", "14' x 82\" box, 24\" sides", "Dexter scissor hoist", "Barn door / spreader combo rear gate", "Full-length mesh tarp", "A-frame toolbox, spare tire and mount", "Rear stabilizers", "Tandem 7,000 lb rubber torsion axles"], "suits": ["material", "mower"], "key": "1414D", "slug": "1414-dump", "listPrice": null}, "1416D": {"model": "Timpte 1416 Dump", "type": "dump", "img": "card-1414d", "video": null, "spec": "timpte-14k-dump.pdf", "gallery": [], "payload": 10360, "gvwr": 14000, "empty": 3640, "deck": "16' box x 82\" inside, 24\" sides", "deckFt": 16, "width": "102\" overall", "length": "", "loading": "Dexter scissor hoist", "angle": null, "axles": "Tandem 7,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16E, 10 ply", "blurb": "14K aluminum dump with the longer 16-foot box, for mulch, brush and bulky loads that need room more than weight.", "feat": ["16' box", "10,360 lb payload", "Scissor hoist"], "features": ["Aluminum construction with no structural welds", "16' x 82\" box, 24\" sides", "Dexter scissor hoist", "Barn door / spreader combo rear gate", "Full-length mesh tarp", "A-frame toolbox, spare tire and mount", "Rear stabilizers", "Tandem 7,000 lb rubber torsion axles"], "suits": ["material", "mower"], "key": "1416D", "slug": "1416-dump", "listPrice": null}, "1614D": {"model": "Timpte 1614 Dump", "type": "dump", "img": "card-1614d", "video": null, "spec": "timpte-16k-dump.pdf", "gallery": [], "payload": 12400, "gvwr": 16000, "empty": 3600, "deck": "14' box x 82\" inside, 24\" sides", "deckFt": 14, "width": "102\" overall", "length": "", "loading": "Dexter scissor hoist", "angle": null, "axles": "Tandem 8,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16, 14 ply", "blurb": "16K aluminum dump for landscapers, contractors and cleanup crews. More payload than the 14K, same 14-foot box.", "feat": ["12,400 lb payload", "8K axles", "Mesh tarp"], "features": ["Aluminum construction with no structural welds", "14' x 82\" box, 24\" sides", "Dexter scissor hoist", "Barn door / spreader combo rear gate", "Full-length mesh tarp", "A-frame toolbox, spare tire and mount", "Rear stabilizers", "Tandem 8,000 lb rubber torsion axles"], "suits": ["material", "mower"], "key": "1614D", "slug": "1614-dump", "listPrice": null}, "1616D": {"model": "Timpte 1616 Dump", "type": "dump", "img": "card-1614d", "video": null, "spec": "timpte-16k-dump.pdf", "gallery": [], "payload": 12210, "gvwr": 16000, "empty": 3790, "deck": "16' box x 82\" inside, 24\" sides", "deckFt": 16, "width": "102\" overall", "length": "", "loading": "Dexter scissor hoist", "angle": null, "axles": "Tandem 8,000 lb rubber torsion", "hitch": "Bumper pull (2-5/16\" ball, adjustable)", "brakes": "Electric, self-adjusting", "tires": "ST235/80R16, 14 ply", "blurb": "16K aluminum dump with a 16-foot box and 8K axles: the most room and the most payload of the dump line.", "feat": ["16' box", "12,210 lb payload", "8K axles"], "features": ["Aluminum construction with no structural welds", "16' x 82\" box, 24\" sides", "Dexter scissor hoist", "Barn door / spreader combo rear gate", "Full-length mesh tarp", "A-frame toolbox, spare tire and mount", "Rear stabilizers", "Tandem 8,000 lb rubber torsion axles"], "suits": ["material", "mower"], "key": "1616D", "slug": "1616-dump", "listPrice": null}};
const INVENTORY = {"units": [{"id": "TT-0142", "key": "1614D", "year": 2026, "status": "lot", "price": 18400, "eta": null, "addedDaysAgo": 21}, {"id": "TT-0143", "key": "1614D", "year": 2026, "status": "lot", "price": 18400, "eta": null, "addedDaysAgo": 9}, {"id": "TT-0150", "key": "1414D", "year": 2026, "status": "lot", "price": 16200, "eta": null, "addedDaysAgo": 14}, {"id": "TT-0138", "key": "1420ST", "year": 2026, "status": "lot", "price": 17900, "eta": null, "addedDaysAgo": 30}, {"id": "TT-0165", "key": "1420ST", "year": 2026, "status": "order", "price": 17900, "eta": "late October", "addedDaysAgo": 2}, {"id": "TT-0147", "key": "1624ST", "year": 2026, "status": "lot", "price": 21900, "eta": null, "addedDaysAgo": 6}, {"id": "TT-0129", "key": "1620GN", "year": 2026, "status": "lot", "price": 21500, "eta": null, "addedDaysAgo": 75}, {"id": "TT-0152", "key": "1620DO", "year": 2026, "status": "lot", "price": 17600, "eta": null, "addedDaysAgo": 11}, {"id": "TT-0155", "key": "1020", "year": 2026, "status": "lot", "price": 14900, "eta": null, "addedDaysAgo": 12}, {"id": "TT-0156", "key": "1020", "year": 2026, "status": "order", "price": 14900, "eta": "mid November", "addedDaysAgo": 1}, {"id": "TT-0160", "key": "720", "year": 2026, "status": "lot", "price": 10900, "eta": null, "addedDaysAgo": 4}, {"id": "TT-0133", "key": "1026", "year": 2026, "status": "lot", "price": 16400, "eta": null, "addedDaysAgo": 40}, {"id": "TT-0158", "key": "514", "year": 2026, "status": "hold", "price": 6950, "eta": null, "addedDaysAgo": 18}]};
const PARTS = {"_comment": "From Timpte's Serviceable Parts Catalog Timpte_Equipment_Trailer_Serviceable_Parts_Catalog_051326.pdf. Prices show on the site only when config.json allows.", "catalog": "Timpte_Equipment_Trailer_Serviceable_Parts_Catalog_051326.pdf", "parts": [{"no": "577-302796", "name": "Install Kit 7K Torsion Axle", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 1134.87, "callForPrice": false}, {"no": "577-302797", "name": "Install Kit 7K (R3) Torsion Axle", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 1628.33, "callForPrice": false}, {"no": "577-302906", "name": "Install Kit 5K, 10K (R3) Torsion Axle", "fits": ["5K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": null, "callForPrice": true}, {"no": "182834", "name": "Install Kit 1026 (EZ) Torsion Axle", "fits": ["1026"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": null, "callForPrice": true}, {"no": "577-302520", "name": "Install Kit RDSD Tail Light", "fits": ["5K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 130.11, "callForPrice": false}, {"no": "577-302767", "name": "Install Kit RDSD Tail Light", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 176.78, "callForPrice": false}, {"no": "577-302522", "name": "Install Kit CBSD License Plate", "fits": ["5K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 191.44, "callForPrice": false}, {"no": "577-302764", "name": "Install Kit CBSD License Plate", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 176.78, "callForPrice": false}, {"no": "577-303139", "name": "RDSD Tail Light Bracket Only", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 139.44, "callForPrice": false}, {"no": "577-302759", "name": "Install Kit RDSD Tail Light Assembly", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 314.03, "callForPrice": false}, {"no": "577-303138", "name": "CBSD Tail Light Bracket Only", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 139.44, "callForPrice": false}, {"no": "577-302757", "name": "Install Kit CBSD Tail Light Assembly", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 314.03, "callForPrice": false}, {"no": "577-302504", "name": "CBSD License Plate Bracket Only", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 120.15, "callForPrice": false}, {"no": "577-302762", "name": "CBSD License Plate Assembly", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 185.65, "callForPrice": false}, {"no": "034-301307", "name": "6\" Recess Light Grommet", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 2.06, "callForPrice": false}, {"no": "030-301308", "name": "6\" Red Recess Tail Light", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 14.28, "callForPrice": false}, {"no": "030-302328", "name": "6\" Red Light Flange Rev 3", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 20.25, "callForPrice": false}, {"no": "030-302329", "name": "Snap On Reector Rev 3", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 3.13, "callForPrice": false}, {"no": "030-301759", "name": "License Plate Light", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 5, "price": 11.07, "callForPrice": false}, {"no": "030-51840", "name": "Amber Side Marker Light", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 6, "price": 5.43, "callForPrice": false}, {"no": "030-54116", "name": "Red Side Marker Light", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 6, "price": 5.43, "callForPrice": false}, {"no": "577-302676", "name": "Install Kit 5-Bolt Coupler", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 6, "price": 151.96, "callForPrice": false}, {"no": "577-302674", "name": "Install Kit 3-Bolt Coupler", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 6, "price": 176.3, "callForPrice": false}, {"no": "577-302817", "name": "Install Kit Coupler Ball", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 6, "price": 176.03, "callForPrice": false}, {"no": "577-302804", "name": "Coupler Channel Kit", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 6, "price": 172.81, "callForPrice": false}, {"no": "029-301696", "name": "Tee Union M-JIC6 Adapter", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 6, "price": 5.68, "callForPrice": false}, {"no": "029-301695", "name": "Adapter Cross", "fits": ["7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 6, "price": 8.04, "callForPrice": false}, {"no": "577-302835", "name": "Install Kit Lock Cross Member", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 136.05, "callForPrice": false}, {"no": "577-302561", "name": "Install Kit Lock Rod Weldment", "fits": ["5K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 222.34, "callForPrice": false}, {"no": "577-302837", "name": "Install Kit Lock Rod Weldment", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 250.86, "callForPrice": false}, {"no": "577-302912", "name": "Install Kit Lock Rod Weldment", "fits": ["10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 246.47, "callForPrice": false}, {"no": "577-302553", "name": "Install Kit Lock Handle", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 71.2, "callForPrice": false}, {"no": "577-302559", "name": "Handle Bracket Mount", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 41.75, "callForPrice": false}, {"no": "577-302792", "name": "Install Kit Front CBSD Fender", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 365.46, "callForPrice": false}, {"no": "577-302793", "name": "Install Kit Front RDSD Fender", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 365.46, "callForPrice": false}, {"no": "152924", "name": "Install Kit Gun Metal Gray Front CBSD Fender", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 487.45, "callForPrice": false}, {"no": "152926", "name": "Install Kit Gun Metal Gray Front RDSD Fender", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 487.45, "callForPrice": false}, {"no": "577-302569", "name": "Install Kit Front CBSD Fender", "fits": ["5K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 355.75, "callForPrice": false}, {"no": "577-302573", "name": "Install Kit Front RDSD Fender", "fits": ["5K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 355.75, "callForPrice": false}, {"no": "152931", "name": "Install Kit Gun Metal Gray Front CBSD Fender", "fits": ["5K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": null, "callForPrice": true}, {"no": "152933", "name": "Install Kit Gun Metal Gray Front RDSD Fender", "fits": ["5K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": null, "callForPrice": true}, {"no": "577-302794", "name": "Install Kit Rear Fender", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 298.57, "callForPrice": false}, {"no": "152928", "name": "Install Kit Gun Metal Gray Rear Fender", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 468.08, "callForPrice": false}, {"no": "577-302904", "name": "Install Kit Rear Fender", "fits": ["10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": 282.49, "callForPrice": false}, {"no": "152935", "name": "Install Kit Gun Metal Gray Rear Fender", "fits": ["10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 7, "price": null, "callForPrice": true}, {"no": "150993", "name": "Bearings & Seal Service Kit", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 54.63, "callForPrice": false}, {"no": "150994", "name": "Bearings & Seal Service Kit", "fits": ["10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 98.0, "callForPrice": false}, {"no": "577-302800", "name": "Install Kit 7K", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 53.1, "callForPrice": false}, {"no": "577-302910", "name": "Install Kit 5K, 10K", "fits": ["5K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 109.96, "callForPrice": false}, {"no": "035-300301", "name": "Chrome Cap for 14\" Tire", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 8.95, "callForPrice": false}, {"no": "035-300554", "name": "Chrome Cap for 15\" Tire", "fits": ["5K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 9.42, "callForPrice": false}, {"no": "035-300321", "name": "Snap Cap for Chrome Cap", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 3.63, "callForPrice": false}, {"no": "034-301772", "name": "End Cap for Trailer", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 4.91, "callForPrice": false}, {"no": "035-302251", "name": "1\" x 4\" Red Conspicuity Tape", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 3.43, "callForPrice": false}, {"no": "577-302574", "name": "Install Jack Kit", "fits": ["5K", "7K", "10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 234.83, "callForPrice": false}, {"no": "150151", "name": "Taskmaster Cap Covers 14\"", "fits": ["7K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": 11.2, "callForPrice": false}, {"no": "150152", "name": "Taskmaster Cap Covers 15\"", "fits": ["10K"], "section": "Torsion Parts", "series": "Motorsports", "page": 8, "price": null, "callForPrice": true}, {"no": "152764", "name": "Axle Torsion 7K", "fits": ["7K"], "section": "Ramped Parts", "series": "Motorsports", "page": 9, "price": null, "callForPrice": true}, {"no": "158598", "name": "Axle Torsion 10K", "fits": ["10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 9, "price": null, "callForPrice": true}, {"no": "152766", "name": "7K Fender", "fits": ["7K"], "section": "Ramped Parts", "series": "Motorsports", "page": 9, "price": null, "callForPrice": true}, {"no": "154855", "name": "10K Fender", "fits": ["10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 9, "price": null, "callForPrice": true}, {"no": "158930", "name": "Ramp", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 9, "price": 517.08, "callForPrice": false}, {"no": "151020", "name": "Ramp Pin", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 9, "price": null, "callForPrice": true}, {"no": "153317", "name": "Recessed D-Ring 6,000 lb.", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 9, "price": 43.74, "callForPrice": false}, {"no": "153321", "name": "Rubber Bumper", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 9, "price": null, "callForPrice": true}, {"no": "150167", "name": "Stabilizer Jack AY RT", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 10, "price": null, "callForPrice": true}, {"no": "031-300035", "name": "License Harness", "fits": ["3K", "7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 10, "price": 25.67, "callForPrice": false}, {"no": "151842", "name": "Harness Main CBSD", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 10, "price": null, "callForPrice": true}, {"no": "151843", "name": "Harness Main RDSD", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 10, "price": null, "callForPrice": true}, {"no": "152441", "name": "Junction Box AY", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 10, "price": null, "callForPrice": true}, {"no": "150142", "name": "Lug Nuts", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 10, "price": 0.56, "callForPrice": false}, {"no": "031-302444", "name": "Harness Tail Board ID Lights", "fits": ["7K", "10K"], "section": "Ramped Parts", "series": "Motorsports", "page": 10, "price": null, "callForPrice": true}, {"no": "577-302664", "name": "CBSD - Tail Light Bracket", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 77.71, "callForPrice": false}, {"no": "577-302667", "name": "RDSD - Tail Light Bracket", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 77.71, "callForPrice": false}, {"no": "187437", "name": "Rear Cable", "fits": ["3K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": null, "callForPrice": false}, {"no": "577-302699", "name": "Front Cable", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 72.74, "callForPrice": false}, {"no": "577-302700", "name": "Rear Cable", "fits": ["7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 91.51, "callForPrice": false}, {"no": "577-302693", "name": "1-Pulley", "fits": ["7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 105.6, "callForPrice": false}, {"no": "577-302691", "name": "2-Pulley", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 178.09, "callForPrice": false}, {"no": "577-302689", "name": "3-Pulley", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 210.97, "callForPrice": false}, {"no": "030-301798", "name": "CBSD Brake Lights", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 30.16, "callForPrice": false}, {"no": "030-301799", "name": "RDSD Brake Lights", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 30.16, "callForPrice": false}, {"no": "030-300153", "name": "RDSD Side Marker", "fits": ["3K", "7K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 17.24, "callForPrice": false}, {"no": "030-300154", "name": "CBSD Side Marker", "fits": ["3K", "7K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 17.24, "callForPrice": false}, {"no": "577-302715", "name": "(2) Spring Pins", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 11, "price": 88.74, "callForPrice": false}, {"no": "577-302687", "name": "Lower Swing Arm & Spindle", "fits": ["3K", "7K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 249.99, "callForPrice": false}, {"no": "577-302937", "name": "Lower Swing Arm Spindle CBSD", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 359.88, "callForPrice": false}, {"no": "577-302938", "name": "Lower Swing Arm Spindle RDSD", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 389.21, "callForPrice": false}, {"no": "577-302672", "name": "RDSD Swing Arm", "fits": ["3K", "7K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 679.53, "callForPrice": false}, {"no": "577-302673", "name": "CBSD Swing Arm", "fits": ["3K", "7K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 679.53, "callForPrice": false}, {"no": "577-302924", "name": "CBSD Swing Arm", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": null, "callForPrice": true}, {"no": "577-302925", "name": "RDSD Swing Arm", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": null, "callForPrice": true}, {"no": "577-302680", "name": "Leaf Spring", "fits": ["3K", "7K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 101.54, "callForPrice": false}, {"no": "577-302927", "name": "2,500 lb. Leaf Spring", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 125.04, "callForPrice": false}, {"no": "577-302684", "name": "Spring Shackle", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 24.91, "callForPrice": false}, {"no": "577-302696", "name": "Safety Lock Pin Assembly", "fits": ["3K", "7K", "10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 46.61, "callForPrice": false}, {"no": "577-302930", "name": "Wheel Hub", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 12, "price": 113.33, "callForPrice": false}, {"no": "577-302940", "name": "Brake Backer Plate LH", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 13, "price": 230.92, "callForPrice": false}, {"no": "577-302941", "name": "Brake Backer Plate RH", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 13, "price": 230.92, "callForPrice": false}, {"no": "577-302866", "name": "CBSD Fender Kit", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 13, "price": 247.76, "callForPrice": false}, {"no": "577-302867", "name": "RDSD Fender Kit", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 13, "price": 247.76, "callForPrice": false}, {"no": "577-302665", "name": "Front Fender Kit", "fits": ["3K", "7K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 13, "price": 178.41, "callForPrice": false}, {"no": "577-302669", "name": "RDSD Rear Fender", "fits": ["3K", "7K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 13, "price": 193.42, "callForPrice": false}, {"no": "577-302668", "name": "CBSD Rear Fender", "fits": ["3K", "7K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 13, "price": 193.42, "callForPrice": false}, {"no": "577-302869", "name": "CBSD Rear Fender", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 13, "price": 225.28, "callForPrice": false}, {"no": "577-302870", "name": "RDSD Rear Fender", "fits": ["10K"], "section": "Leaf Spring Parts", "series": "Motorsports", "page": 13, "price": 225.28, "callForPrice": false}, {"no": "035-301515", "name": "Solenoid & Wireless Remote", "fits": ["3K", "5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 14, "price": 147.95, "callForPrice": false}, {"no": "021-300161", "name": "Breakaway Kit", "fits": ["5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 14, "price": 37.65, "callForPrice": false}, {"no": "031-300147", "name": "Junction Box", "fits": ["3K", "5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 14, "price": 43.83, "callForPrice": false}, {"no": "031-301032", "name": "Master Switch", "fits": ["3K", "5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 14, "price": 51.45, "callForPrice": false}, {"no": "035-301984", "name": "Toolbox Ring-handle Latch", "fits": ["3K", "5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 14, "price": 47.27, "callForPrice": false}, {"no": "035-301518", "name": "Gas Struts", "fits": ["3K", "5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 14, "price": 36.75, "callForPrice": false}, {"no": "031-300304", "name": "Trickle Charger", "fits": ["3K", "5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 15, "price": 9.45, "callForPrice": false}, {"no": "029-302205", "name": "Pilot Valve on Blocking Valve", "fits": ["5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 15, "price": 51.56, "callForPrice": false}, {"no": "577-302832", "name": "Wired Remote for Toolbox", "fits": ["3K", "5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 15, "price": 106.81, "callForPrice": false}, {"no": "103373", "name": "Pilot Valve on Pump Assembly", "fits": ["5K", "7K", "10K"], "section": "Toolbox Area", "series": "Motorsports", "page": 15, "price": null, "callForPrice": true}, {"no": "035-302919", "name": "512 Trailer Model Decal", "fits": null, "section": "Trailer Decals", "series": "Motorsports", "page": 16, "price": 20.66, "callForPrice": false}, {"no": "035-302920", "name": "514 Trailer Model Decal", "fits": null, "section": "Trailer Decals", "series": "Motorsports", "page": 16, "price": 20.66, "callForPrice": false}, {"no": "151801", "name": "718 Trailer Model Decal", "fits": null, "section": "Trailer Decals", "series": "Motorsports", "page": 16, "price": null, "callForPrice": true}, {"no": "035-302915", "name": "720 Trailer Model Decal", "fits": null, "section": "Trailer Decals", "series": "Motorsports", "page": 16, "price": 20.66, "callForPrice": false}, {"no": "151802", "name": "Trailer Model Decal", "fits": ["1018"], "section": "Trailer Decals", "series": "Motorsports", "page": 16, "price": 23.22, "callForPrice": false}, {"no": "035-302914", "name": "Trailer Model Decal", "fits": ["1020"], "section": "Trailer Decals", "series": "Motorsports", "page": 16, "price": 20.66, "callForPrice": false}, {"no": "153123", "name": "Trailer Model Decal", "fits": ["1026"], "section": "Trailer Decals", "series": "Motorsports", "page": 16, "price": null, "callForPrice": true}, {"no": "035-300260", "name": "All Pinch Point Decal", "fits": null, "section": "Trailer Decals", "series": "Motorsports", "page": 16, "price": 1.49, "callForPrice": false}, {"no": "577-302551", "name": "512 Install Kit Hydraulic Cylinder Maxxim", "fits": null, "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 379.51, "callForPrice": false}, {"no": "577-302552", "name": "514 Install Kit Hydraulic Cylinder Maxxim", "fits": null, "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 379.51, "callForPrice": false}, {"no": "577-302532", "name": "512 Install Kit Hydraulic Cylinder Wolverine", "fits": null, "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 362.75, "callForPrice": false}, {"no": "577-302544", "name": "514 Install Kit Hydraulic Cylinder Wolverine", "fits": null, "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 362.64, "callForPrice": false}, {"no": "577-303013", "name": "Kit Front Hydraulic Cylinder 7KR3", "fits": ["7K"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 267.99, "callForPrice": false}, {"no": "577-303011", "name": "Kit Rear Hydraulic Cylinder 7KR3", "fits": ["7K"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 267.99, "callForPrice": false}, {"no": "577-302771", "name": "Install Kit Front Hydraulic Cylinder", "fits": ["7K"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 263.61, "callForPrice": false}, {"no": "577-302772", "name": "Install Kit Rear Hydraulic Cylinder", "fits": ["7K"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 263.56, "callForPrice": false}, {"no": "577-302769", "name": "Front Hydraulic Cylinder Kit 720A", "fits": ["7K"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 263.45, "callForPrice": false}, {"no": "577-302770", "name": "Rear Hydraulic Cylinder Kit 720A", "fits": ["7K"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 239.26, "callForPrice": false}, {"no": "577-302916", "name": "Front Hydraulic Cylinder Install Kit", "fits": ["10K"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 373.67, "callForPrice": false}, {"no": "577-302918", "name": "Rear Hydraulic Cylinder Install Kit", "fits": ["10K"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": 374.16, "callForPrice": false}, {"no": "182833", "name": "Hydraulic Locking Cylinder Kit", "fits": ["1026"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": null, "callForPrice": true}, {"no": "182895", "name": "Hydraulic Locking Cylinder with Stop Kit", "fits": ["1026"], "section": "Hydraulics", "series": "Motorsports", "page": 17, "price": null, "callForPrice": true}, {"no": "577-302527", "name": "26\" Hydraulic Hose Service Kit", "fits": ["5K", "7K", "10K"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": 36.06, "callForPrice": false}, {"no": "577-302525", "name": "30\" Hydraulic Hose Service Kit", "fits": ["5K", "7K", "10K"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": 36.03, "callForPrice": false}, {"no": "182832", "name": "38\" Hydraulic Hose Service Kit", "fits": ["1026"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": null, "callForPrice": true}, {"no": "577-302528", "name": "78\" Hydraulic Hose Service Kit", "fits": ["5K"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": 47.27, "callForPrice": false}, {"no": "577-302529", "name": "84\" Hydraulic Hose Service Kit", "fits": ["5K"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": 47.84, "callForPrice": false}, {"no": "577-302531", "name": "90\" Hydraulic Hose Service Kit", "fits": ["5K"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": 48.01, "callForPrice": false}, {"no": "577-302530", "name": "98\" Hydraulic Hose Service Kit", "fits": ["5K"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": 48.14, "callForPrice": false}, {"no": "577-302754", "name": "101\" Hydraulic Hose Service Kit", "fits": ["7K", "10K"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": 51.17, "callForPrice": false}, {"no": "577-302753", "name": "108\" Hydraulic Hose Service Kit", "fits": ["7K", "10K"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": 52.34, "callForPrice": false}, {"no": "182831", "name": "172\" Hydraulic Hose Service Kit", "fits": ["1026"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": null, "callForPrice": true}, {"no": "182830", "name": "176\" Hydraulic Hose Service Kit", "fits": ["1026"], "section": "Hydraulics", "series": "Motorsports", "page": 18, "price": null, "callForPrice": true}, {"no": "035-301256", "name": "Axle Torsion 14K 1,4730", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 20, "price": null, "callForPrice": false}, {"no": "020-302514", "name": "Axle Torsion 16K", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 20, "price": 1720.39, "callForPrice": false}, {"no": "577-302475", "name": "Install Kit CBSD Tail Light Bracket", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 20, "price": 163.81, "callForPrice": false}, {"no": "577-302476", "name": "Install Kit RDSD Tail Light Bracket", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 20, "price": 157.01, "callForPrice": false}, {"no": "577-302469", "name": "Install Kit CBSD - Fender", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 20, "price": 567.29, "callForPrice": false}, {"no": "577-302470", "name": "Install Kit RDSD - Fender", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 20, "price": 567.29, "callForPrice": false}, {"no": "150239", "name": "CBSD Low Prole Fender", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 20, "price": 392.58, "callForPrice": false}, {"no": "150240", "name": "RDSD Low Prole Fender", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 20, "price": 392.58, "callForPrice": false}, {"no": "577-302485", "name": "Install Kit Handle Assembly", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 21, "price": 174.27, "callForPrice": false}, {"no": "577-302491", "name": "Lock Rod Latch", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 21, "price": 261.83, "callForPrice": false}, {"no": "577-302495", "name": "Install Kit Jack Assembly", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 21, "price": null, "callForPrice": true}, {"no": "577-302489", "name": "Install Kit Bump Rail", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 21, "price": 698.85, "callForPrice": false}, {"no": "577-302499", "name": "Install Kit Rub Rail - 38 / \"", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 21, "price": null, "callForPrice": true}, {"no": "577-302501", "name": "Install Kit Rub Rail - 46 / \"", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 21, "price": null, "callForPrice": true}, {"no": "577-302502", "name": "Install Kit Rub Rail - 51 / \"", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 21, "price": null, "callForPrice": true}, {"no": "577-302503", "name": "Install Kit Rub Rail - 56\"", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 21, "price": 119.56, "callForPrice": false}, {"no": "577-302487", "name": "Install Kit Handle Latch Assembly", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 21, "price": null, "callForPrice": true}, {"no": "034-301333", "name": "Black Endcap", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 22, "price": 4.6, "callForPrice": false}, {"no": "577-303103", "name": "Pivot Pin", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 22, "price": null, "callForPrice": true}, {"no": "577-302497", "name": "Hydraulic Control Valve", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 22, "price": null, "callForPrice": true}, {"no": "577-302493", "name": "Coupler Channel Kit", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 22, "price": null, "callForPrice": true}, {"no": "035-301155", "name": "Bronze Bushing", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 22, "price": null, "callForPrice": true}, {"no": "035-301570", "name": "Crank Handle", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 23, "price": 43.25, "callForPrice": false}, {"no": "051-301489", "name": "Bearing Mount Inner Plate", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 23, "price": null, "callForPrice": true}, {"no": "021-301331", "name": "Breakaway Kit & Battery", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 23, "price": 136.72, "callForPrice": false}, {"no": "577-302479", "name": "Install Kit RDSD - Step Mount", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 23, "price": null, "callForPrice": true}, {"no": "577-302478", "name": "Install Kit CBSD - Step Mount", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 23, "price": null, "callForPrice": true}, {"no": "577-302894", "name": "Weldment Deck base Dual Cylinder", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 23, "price": null, "callForPrice": true}, {"no": "577-303106", "name": "Install Kit Tube Pivot AY", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 23, "price": null, "callForPrice": true}, {"no": "577-302896", "name": "Install Kit Tube Pivot AY", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 23, "price": null, "callForPrice": true}, {"no": "029-302860", "name": "Adapter Plug 6 MNPT 5406-6", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 24, "price": null, "callForPrice": true}, {"no": "029-301430", "name": "Valve Check Orice", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 24, "price": 97.35, "callForPrice": false}, {"no": "577-302481", "name": "Install Kit Flange Bearing Holder", "fits": ["14K", "16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 24, "price": null, "callForPrice": true}, {"no": "029-302865", "name": "SAE8-6MNPT HEX (Straight)", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 24, "price": null, "callForPrice": true}, {"no": "029-302880", "name": "6JIC-8ORING (Tee)", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 24, "price": null, "callForPrice": true}, {"no": "577-302985", "name": "Tube Suspension Spacer", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 24, "price": null, "callForPrice": true}, {"no": "577-303104", "name": "Tube Suspension Spacer", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 24, "price": null, "callForPrice": true}, {"no": "032-300320", "name": "Nut Lug - /\"", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 24, "price": 2.29, "callForPrice": false}, {"no": "032-302778", "name": "Nut Lug - /\"", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 24, "price": null, "callForPrice": true}, {"no": "150995", "name": "Bearings & Seal Service Kit", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 25, "price": 89.28, "callForPrice": false}, {"no": "577-302892", "name": "Install Kit Cylinder Mount Reinforcement", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 25, "price": null, "callForPrice": true}, {"no": "041-302046", "name": "Bracket Service Block Stop", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 25, "price": null, "callForPrice": true}, {"no": "041-302816", "name": "Bracket Service Block Stop", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 25, "price": null, "callForPrice": true}, {"no": "150074", "name": "DO 14K Stillwell Cylinder Kit", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 25, "price": 639.15, "callForPrice": false}, {"no": "040-301877", "name": "Plate Service Block Mount", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 25, "price": null, "callForPrice": true}, {"no": "040-302814", "name": "Plate Service Block Mount", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 25, "price": null, "callForPrice": true}, {"no": "577-303071", "name": "DO 14K Cylinder Attachment Kit", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 25, "price": 127.18, "callForPrice": false}, {"no": "577-303115", "name": "14KSTTB Hydraulic Hose 46-1/2\"", "fits": null, "section": "Split Tilt Parts", "series": "Powerhouse", "page": 26, "price": null, "callForPrice": true}, {"no": "577-303116", "name": "14KSTTB Hydraulic Hose 62-1/2\"", "fits": null, "section": "Split Tilt Parts", "series": "Powerhouse", "page": 26, "price": null, "callForPrice": true}, {"no": "577-303160", "name": "14KSTTB Hydraulic Hose 48\"", "fits": null, "section": "Split Tilt Parts", "series": "Powerhouse", "page": 26, "price": null, "callForPrice": true}, {"no": "577-303161", "name": "14KSTTB Hydraulic Hose 50-1/2\"", "fits": null, "section": "Split Tilt Parts", "series": "Powerhouse", "page": 26, "price": null, "callForPrice": true}, {"no": "152872", "name": "16KSTTB Hydraulic Hose 42\"", "fits": null, "section": "Split Tilt Parts", "series": "Powerhouse", "page": 26, "price": null, "callForPrice": true}, {"no": "152871", "name": "16KSTTB Hydraulic Hose 34\"", "fits": null, "section": "Split Tilt Parts", "series": "Powerhouse", "page": 26, "price": null, "callForPrice": true}, {"no": "029-301116", "name": "Hydraulic Cylinder", "fits": ["14K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 26, "price": 330.15, "callForPrice": false}, {"no": "029-302929", "name": "Hydraulic Cylinder", "fits": ["16K"], "section": "Split Tilt Parts", "series": "Powerhouse", "page": 26, "price": 372.88, "callForPrice": false}, {"no": "577-302967", "name": "DO Install Kit 14K DO Axle", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 27, "price": null, "callForPrice": true}, {"no": "577-302969", "name": "DO Install Kit Tail Light Tube", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 27, "price": 419.66, "callForPrice": false}, {"no": "577-302987", "name": "DO Ramp Springs Install Kit", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 27, "price": null, "callForPrice": true}, {"no": "577-302956", "name": "DO Install Kit 14K DO Step", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 28, "price": null, "callForPrice": true}, {"no": "577-302947", "name": "DO Install Kit RDSD Ramp Lock", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 28, "price": 104.69, "callForPrice": false}, {"no": "577-302946", "name": "DO Install Kit CBSD Ramp Lock", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 28, "price": 103.1, "callForPrice": false}, {"no": "577-302949", "name": "DO Install Kit CBSD Ramp Lock Arm", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 28, "price": null, "callForPrice": true}, {"no": "577-302950", "name": "DO Install Kit RDSD Ramp Lock Arm", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 28, "price": null, "callForPrice": true}, {"no": "577-302989", "name": "DO CBSD Ramp Install Kit", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 28, "price": null, "callForPrice": true}, {"no": "577-302990", "name": "DO RDSD Ramp Install Kit", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 28, "price": null, "callForPrice": true}, {"no": "577-302962", "name": "DO Install Kit Jack Handle Mount", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 28, "price": null, "callForPrice": true}, {"no": "026-302698", "name": "DO Jack Handle", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 28, "price": 39.78, "callForPrice": false}, {"no": "577-302965", "name": "DO Install Kit Bump Rail", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 29, "price": null, "callForPrice": true}, {"no": "577-302960", "name": "DO Install Kit Jack Weldment", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 29, "price": null, "callForPrice": true}, {"no": "577-302945", "name": "DO Install Kit Rub Rail", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 29, "price": null, "callForPrice": true}, {"no": "577-302971", "name": "DO Hat Channel Lock Latch", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 29, "price": null, "callForPrice": true}, {"no": "577-302981", "name": "DO Toolbox Mounting Plate", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 29, "price": null, "callForPrice": true}, {"no": "577-302973", "name": "DO Hat Channel Lock Arm Mount", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": 95.28, "callForPrice": false}, {"no": "577-302975", "name": "DO Install Kit Side Marker Bracket", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": null, "callForPrice": true}, {"no": "577-302977", "name": "DO Install Kit Ramp Grab Handle", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": null, "callForPrice": true}, {"no": "577-302994", "name": "DO Ramp Link Weldment", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": null, "callForPrice": true}, {"no": "577-302995", "name": "DO Spring Link Weldment (LH)", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": null, "callForPrice": true}, {"no": "577-302996", "name": "DO Spring Link Weldment (RH)", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": null, "callForPrice": true}, {"no": "577-302983", "name": "DO Install Kit Ramp Pivot Tubes", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": null, "callForPrice": true}, {"no": "577-302979", "name": "DO Install Stake Pocket Replacement", "fits": ["14K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": null, "callForPrice": true}, {"no": "150153", "name": "Taskmaster Cap Covers 16\"", "fits": ["14K", "16K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": null, "callForPrice": true}, {"no": "035-301795", "name": "DO Chrome Cap for 1 \" Tire", "fits": ["14K", "16K"], "section": "Deck Over Parts", "series": "Powerhouse", "page": 30, "price": null, "callForPrice": true}, {"no": "183591", "name": "Landing Leg RH", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 31, "price": null, "callForPrice": true}, {"no": "183592", "name": "Landing Leg LH", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 31, "price": null, "callForPrice": true}, {"no": "183549", "name": "7K Axle", "fits": ["1620", "1626"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 31, "price": null, "callForPrice": true}, {"no": "183551", "name": "8K Axle", "fits": ["1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 31, "price": null, "callForPrice": true}, {"no": "183250", "name": "Landing Leg Cross Shaft", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 31, "price": null, "callForPrice": true}, {"no": "183555", "name": "Front Corner Light Bracket", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 31, "price": null, "callForPrice": true}, {"no": "183598", "name": "Midship Light Bracket", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 31, "price": null, "callForPrice": true}, {"no": "183822", "name": "Spare Tire Mount AY 7K Axle", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 32, "price": null, "callForPrice": true}, {"no": "183824", "name": "Spare Tire Mount AY 8K Axle", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 32, "price": null, "callForPrice": true}, {"no": "183557", "name": "Toolbox", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 32, "price": null, "callForPrice": true}, {"no": "183646", "name": "Toolbox Latch & Plate", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 32, "price": null, "callForPrice": true}, {"no": "183559", "name": "Chain Basket", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 32, "price": null, "callForPrice": true}, {"no": "026-302212", "name": "Landing Leg Crank Handle", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 32, "price": null, "callForPrice": true}, {"no": "183563", "name": "Stake Pockets", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 32, "price": null, "callForPrice": true}, {"no": "183359", "name": "Handle Gasket", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 33, "price": null, "callForPrice": true}, {"no": "183553", "name": "Ramp", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 33, "price": null, "callForPrice": true}, {"no": "183763", "name": "Step", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 33, "price": null, "callForPrice": true}, {"no": "183569", "name": "Step Handle", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 33, "price": null, "callForPrice": true}, {"no": "183565", "name": "Ramp Springs", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 33, "price": null, "callForPrice": true}, {"no": "183642", "name": "Ramp Lock", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 33, "price": null, "callForPrice": true}, {"no": "183640", "name": "Ramp 90-Degree Lock", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 34, "price": null, "callForPrice": true}, {"no": "183670", "name": "Rub Rail 27-9/16\"", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 34, "price": null, "callForPrice": true}, {"no": "183672", "name": "Rub Rail 5-9/16\"", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 34, "price": null, "callForPrice": true}, {"no": "183679", "name": "Coupler Set Screw", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 34, "price": null, "callForPrice": true}, {"no": "184429", "name": "Coupler Set Bolt and Nut", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 34, "price": null, "callForPrice": true}, {"no": "032-44932", "name": "Coupler Bolt", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 34, "price": null, "callForPrice": true}, {"no": "183676", "name": "Coupler Nut", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 35, "price": null, "callForPrice": true}, {"no": "035-303057", "name": "Rubber Bumper", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 35, "price": null, "callForPrice": true}, {"no": "183837", "name": "Bumper Kit", "fits": ["1620", "1626", "1620HD", "1626HD"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 35, "price": null, "callForPrice": true}, {"no": "150996", "name": "Bearings & Seal Service Kit", "fits": ["16K"], "section": "Gooseneck Parts", "series": "Powerhouse", "page": 35, "price": null, "callForPrice": true}, {"no": "186850", "name": "14K Axle", "fits": ["14K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "186848", "name": "16K Axle", "fits": ["16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "187011", "name": "Dump", "fits": ["14K Dump", "16K"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "187072", "name": "Tarp", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "034-48212", "name": "Tarp Handle", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "187031", "name": "Tarp Enclosure", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "187021", "name": "Tarp Bearing", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "187005", "name": "Rear Tarp Tube", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "187007", "name": "Main Tarp Tube", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "186867", "name": "Main Deckboard", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "187013", "name": "Rear Deckboard", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "187015", "name": "Front Deckboard", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "186857", "name": "Lock Rod", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 36, "price": null, "callForPrice": false}, {"no": "186851", "name": "Wear Pad A-Frame", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187023", "name": "Wear Pad 48", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187000", "name": "Stability Jack", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187010", "name": "16K Adjustable Coupler", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187036", "name": "Landing Leg", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187059", "name": "Cam Latch Keeper Lower", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187058", "name": "Cam Latch Keeper Upper", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187040", "name": "Cam Latch Tube Handle", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187055", "name": "Cam Latch Retainer Bracket", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187061", "name": "Cam Latch Hasp", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "186836", "name": "Door Hinge Body (Door Side)", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "186838", "name": "Door Hinge Base (Frame Side)", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187017", "name": "Door Hold Back Latch", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 37, "price": null, "callForPrice": false}, {"no": "187002", "name": "RDSD Door", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "187004", "name": "CBSD Door", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "187027", "name": "Scissor Lift/Cylinder (Complete Hoist)", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "187153", "name": "Hydraulic Cylinder (Cylinder Only)", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "187025", "name": "Pump", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "186859", "name": "Top Rail Front", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "186864", "name": "Top Rail CBSD 14'", "fits": ["1414 Dump", "1614 Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "186865", "name": "Top R ail RDSD 14'", "fits": ["1414 Dump", "1614 Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "186861", "name": "Top Rail CBSD 16'", "fits": ["1416 Dump", "1616 Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "186862", "name": "Top Rail RDSD 16'", "fits": ["1416 Dump", "1616 Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "186390", "name": "Ramp AY TSDT", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "187033", "name": "Ramp Retainment Pin CBSD", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "187034", "name": "Ramp Retainment Pin", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 38, "price": null, "callForPrice": false}, {"no": "187049", "name": "Wall Panel CBSD 14'", "fits": ["1414 Dump", "1614 Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 39, "price": null, "callForPrice": false}, {"no": "187051", "name": "Wall Panel RDSD 14'", "fits": ["1414 Dump", "1614 Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 39, "price": null, "callForPrice": false}, {"no": "187045", "name": "Wall Panel CBSD 16'", "fits": ["1416 Dump", "1616 Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 39, "price": null, "callForPrice": false}, {"no": "187134", "name": "Spreader Gate Frame", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 39, "price": null, "callForPrice": false}, {"no": "187029", "name": "Spreader Gate Release Handle", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 39, "price": null, "callForPrice": false}, {"no": "186855", "name": "Spreader Gate Chain", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 39, "price": null, "callForPrice": false}, {"no": "187136", "name": "Toolbox Lid", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 39, "price": null, "callForPrice": false}, {"no": "187138", "name": "Toolbox Strut", "fits": ["14K Dump", "16K Dump"], "section": "Dump Parts", "series": "Powerhouse", "page": 39, "price": null, "callForPrice": false}, {"no": "035-302921", "name": "Trailer Model Decal", "fits": ["1420"], "section": "Trailer Decals", "series": "Powerhouse", "page": 40, "price": null, "callForPrice": true}, {"no": "035-302922", "name": "Trailer Model Decal", "fits": ["1424"], "section": "Trailer Decals", "series": "Powerhouse", "page": 40, "price": null, "callForPrice": true}, {"no": "035-302923", "name": "Trailer Model Decal", "fits": ["16K"], "section": "Trailer Decals", "series": "Powerhouse", "page": 40, "price": null, "callForPrice": true}, {"no": "183414", "name": "1620GNDO Trailer Model Decal", "fits": null, "section": "Trailer Decals", "series": "Powerhouse", "page": 40, "price": null, "callForPrice": true}, {"no": "183416", "name": "1620GNDOHD Trailer Model Decal", "fits": null, "section": "Trailer Decals", "series": "Powerhouse", "page": 40, "price": null, "callForPrice": true}, {"no": "183412", "name": "1626GNDO Trailer Model Decal", "fits": null, "section": "Trailer Decals", "series": "Powerhouse", "page": 40, "price": null, "callForPrice": true}, {"no": "183415", "name": "1626GNDOHD Trailer Model Decal", "fits": null, "section": "Trailer Decals", "series": "Powerhouse", "page": 40, "price": null, "callForPrice": true}, {"no": "035-61917", "name": "DO Do Not Step Decal", "fits": ["14K", "16K"], "section": "Trailer Decals", "series": "Powerhouse", "page": 40, "price": null, "callForPrice": true}, {"no": "035-29482", "name": "DO Conspicuity Tape", "fits": ["14K", "16K"], "section": "Trailer Decals", "series": "Powerhouse", "page": 40, "price": null, "callForPrice": true}, {"no": "577-302722", "name": "EA Nose Cone", "fits": null, "section": "Accessories", "series": "Both", "page": 41, "price": 131.58, "callForPrice": false}, {"no": "577-302720", "name": "EA Front Panel", "fits": null, "section": "Accessories", "series": "Both", "page": 41, "price": 459.89, "callForPrice": false}, {"no": "577-302724", "name": "EA CBSD Side Panel", "fits": null, "section": "Accessories", "series": "Both", "page": 41, "price": 73.44, "callForPrice": false}, {"no": "577-302725", "name": "EA RDSD Side Panel", "fits": null, "section": "Accessories", "series": "Both", "page": 41, "price": 73.44, "callForPrice": false}, {"no": "577-302718", "name": "EA RDSD Side Panel", "fits": null, "section": "Accessories", "series": "Both", "page": 41, "price": 225.28, "callForPrice": false}, {"no": "577-302717", "name": "EA CBSD Side Panel", "fits": null, "section": "Accessories", "series": "Both", "page": 41, "price": 225.28, "callForPrice": false}, {"no": "035-303012", "name": "100 Black Fastener Caps", "fits": null, "section": "Accessories", "series": "Both", "page": 41, "price": null, "callForPrice": true}]};
/* ==========================================================================
   TIMELESS TRAILERS · site data that isn't about one dealer
   --------------------------------------------------------------------------
   The dealer's own facts live in config.json, models.json, inventory.json and parts.json.
   This file holds the rest: categories, lineup, videos, finder labels, services, maintenance,
   and (demo site only) the sample people and records.
   ========================================================================== */

/* CONFIG, MODELS, INVENTORY and PARTS come from src/config.json, models.json, inventory.json and parts.json;
   build.py puts them in front of this file. Edit those files, not this one, for anything about this dealer. */
const ASSISTANT_NAME = CONFIG.assistant.name;

const DAY = 864e5;
function d(n){ return new Date(Date.now() + n * DAY).toISOString(); }

/* MODELS: see src/models.json (one entry per Timpte model, numbers from the spec sheets). */

const DATA = {
  business: CONFIG.business,

  /* Financing terms the payment calculator starts from (estimates only) */
  finance: { apr: 8.49, term: 60, downPct: 10, terms: [24, 36, 48, 60, 72] },

  /* Quote fees (demo quotes only) */
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

  /* Parts: Timpte's serviceable parts catalog (src/parts.json, made by tools/parts_from_catalog.py).
     fits = which trailer types a catalog section applies to, so an owner can filter to their trailer. */
  parts: PARTS.parts.map(p => {
    const sec = p.section.replace(" Parts", "");
    const fits = { "Split Tilt": ["tilt"], "Deck Over": ["deckover"], "Gooseneck": ["gooseneck"], "Dump": ["dump"], "Ramped": ["ezload"] }[sec] || ["tilt", "deckover", "gooseneck", "dump", "ezload"];
    return { id: p.no, name: p.name, price: p.price || 0, callForPrice: !!p.callForPrice, cat: sec, series: p.series || "Both", fitsSeries: p.fits, fits, kw: [] };
  }),

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

  team: CONFIG.team,

  
};


/* ==========================================================================
   APP: helpers, state, router and pages. You shouldn't need to edit below.
   ========================================================================== */
const A = ASSISTANT_NAME;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = n => Math.round(n).toLocaleString("en-US");
const money = n => "$" + Math.round(n).toLocaleString("en-US");
const toDate = s => new Date(/^\d{4}-\d{2}-\d{2}$/.test(s) ? s + "T12:00" : s);
const fmtDate = iso => toDate(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const fmtDateY = iso => toDate(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtWhen = iso => new Date(iso).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const img = k => k ? "/img/" + k + ".webp" : "";
const videoHTML = (key, cls = "") => { const v = DATA.videos[key]; if (!v) return ""; return `<figure class="vid ${cls}"><video controls preload="none" playsinline poster="/video/${key}.webp"><source src="/video/${key}.mp4" type="video/mp4"></video><figcaption>${esc(v.title)} · ${v.len}</figcaption></figure>`; };
const clone = o => JSON.parse(JSON.stringify(o));
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const digits = s => String(s || "").replace(/\D/g, "");

const ICON = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 5 5 9-10"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  caret: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
  pinFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>'
};
const tick = ICON.check;

/* ---------------- state ---------------- */
const STORE_KEY = "timeless-v2-demo";
/* Two sites from one source. build.py fills in DEMO: false for the public site (site/), true for the demo site (site-demo/).
   Everything between a "@demo" and an "@end-demo" comment is cut out of the public site entirely, so the back end
   (sign-in, My Account, dealer console, sample people, sample prices) never ships to customers. */
const DEMO = false;
/* Prices show on the public site when config.json says so (showPrices); the demo site always shows them. */
const PRICES = DEMO || !!CONFIG.showPrices;
/* Phones get the lighter hero video (720p, about a third of the size). */
const SMALL = matchMedia("(max-width: 700px)").matches;
const ANDY_LINE = "Andy matches the trailer to your load and truck, then Matt sends your quote the same business day.";
function freshState() {
  const s = DATA.seed || { saved: {}, owned: [], holds: [], quotes: [], partsOrders: [], tickets: [], leads: [] };
  return {
    v: 1, user: null, inventory: clone(DATA.inventory), saved: clone(s.saved), owned: clone(s.owned),
    holds: clone(s.holds), quotes: clone(s.quotes), partsOrders: clone(s.partsOrders), tickets: clone(s.tickets),
    leads: clone(s.leads), compare: [], cart: [], specsSynced: null, log: [],
    seq: { H: 7001, Q: 2042, PO: 3110, SR: 1042, L: 508, TT: 171 }
  };
}
let S = null;
try { S = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { S = null; }
if (!S || S.v !== 1) S = freshState();
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* demo still works without storage */ } }
function nextId(p) { const n = S.seq[p]++; save(); return p === "TT" ? "TT-0" + n : p + "-" + n; }
function resetDemo() {
  if (!confirm("Reset the demo? This clears saved trailers, holds, quotes, tickets and admin edits.")) return;
  try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  location.href = "/";
}

/* ---------------- people ---------------- */
const persona = id => (DATA.personas || []).find(p => p.id === id);
const me = () => (S.user ? persona(S.user) : null);
const uid = () => S.user || "guest";
const isStaff = () => { const u = me(); return !!u && (u.role === "owner" || u.role === "staff"); };
const myOwned = () => S.owned.filter(o => o.userId === S.user);
const truckOf = () => null; /* tow ratings live in archive/local-matcher.js now; Andy on Stammer handles the truck */

/* ---------------- inventory helpers ---------------- */
const unit = id => S.inventory.find(t => t.id === id);
const typeLabel = k => DATA.types[k] || k;
const onLot = () => S.inventory.filter(t => t.status === "lot");
const lotCount = model => S.inventory.filter(t => t.status === "lot" && t.model === model).length;
const tname = t => t.year + " " + t.model;
function statusInfo(t) {
  return ({ lot: { cls: "in", label: "On the lot", pill: "green" }, order: { cls: "order", label: "Arriving " + (t.eta || "soon"), pill: "blue" },
    hold: { cls: "hold", label: "On hold", pill: "amber" }, sold: { cls: "sold", label: "Sold", pill: "red" } })[t.status] || { cls: "", label: t.status, pill: "" };
}
function monthly(price, o = {}) {
  const f = DATA.finance; const apr = o.apr != null ? o.apr : f.apr; const n = o.term || f.term;
  const down = o.down != null ? o.down : price * f.downPct / 100; const P = Math.max(price - down, 0); const r = apr / 1200;
  return r ? P * r / (1 - Math.pow(1 + r, -n)) : P / n;
}
const third = t => (t.angle ? { v: t.angleText ? "<4°" : t.angle + "°", l: "Load angle" } : { v: t.gvwr / 1000 + "K", l: "GVWR" });

/* ---------------- saved + compare ---------------- */
function savedList() { if (!S.saved[uid()]) S.saved[uid()] = []; return S.saved[uid()]; }
const isSaved = id => savedList().includes(id);
function toggleSave(id) {
  const l = savedList(); const i = l.indexOf(id);
  if (i > -1) l.splice(i, 1); else l.push(id);
  save(); refreshHearts();
  toast(i > -1 ? "Removed from saved trailers." : (DEMO ? `Saved. It's in <a href="/account/">My Account</a>.` : "Saved in this browser."));
}
function refreshHearts() { $$('[data-act="save"]').forEach(b => { const on = isSaved(b.dataset.id); b.setAttribute("aria-pressed", on); b.setAttribute("aria-label", (on ? "Remove " : "Save ") + b.dataset.id); }); }
function toggleCompare(id, force) {
  const i = S.compare.indexOf(id);
  if (i > -1 && force !== true) S.compare.splice(i, 1);
  else if (i === -1) {
    if (S.compare.length >= 3) { toast("Compare holds three trailers. Remove one first."); refreshCompare(); return; }
    S.compare.push(id);
  }
  save(); refreshCompare();
}
function refreshCompare() {
  $$('[data-act="cmp-toggle"]').forEach(c => { c.checked = S.compare.includes(c.dataset.id); });
  $$('[data-act="cmp-btn"]').forEach(b => { b.textContent = S.compare.includes(b.dataset.id) ? "In compare ✓" : "Add to compare"; });
  const tray = $("#cmpTray");
  const show = S.compare.length > 0 && route.name !== "compare";
  tray.hidden = !show;
  if (show) tray.innerHTML = `<span>Comparing ${S.compare.length} of 3</span><a class="btn btn-gold" href="/compare/">Compare</a>`;
}

/* ---------------- toast + modal ---------------- */
function toast(html, ms = 3600) {
  const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.innerHTML = html;
  $("#toasts").appendChild(t); setTimeout(() => t.remove(), ms);
}
let modalReturn = null;
function openModal(html, opts = {}) {
  closeModal();
  modalReturn = document.activeElement;
  const bg = document.createElement("div"); bg.className = "modal-bg"; bg.id = "modal";
  bg.innerHTML = `<div class="modal ${opts.wide ? "wide" : ""}" role="dialog" aria-modal="true"><button class="xbtn" data-act="modal-close" aria-label="Close">${ICON.x}</button>${html}</div>`;
  bg.addEventListener("mousedown", e => { if (e.target === bg) closeModal(); });
  document.body.appendChild(bg);
  const f = bg.querySelector("input:not([type=checkbox]),select,button.btn"); if (f) setTimeout(() => f.focus(), 30);
  if (opts.mount) opts.mount(bg);
}
function closeModal() { const m = $("#modal"); if (m) { m.remove(); if (modalReturn && modalReturn.focus) modalReturn.focus(); } }

/* ---------------- records ---------------- */
function addLead(o) {
  const lead = Object.assign({ id: nextId("L"), stage: "New", created: new Date().toISOString() }, o);
  S.leads.unshift(lead); save(); return lead;
}
function createHold(t, name, phone) {
  const h = { id: nextId("H"), userId: S.user && !isStaff() ? S.user : (S.user ? null : "guest"), trailerId: t.id, name, phone,
    created: new Date().toISOString(), expires: new Date(Date.now() + 2 * DAY).toISOString(), status: "Active", prev: t.status };
  if (!S.user) h.userId = "guest";
  S.holds.unshift(h); t.status = "hold";
  addLead({ name, phone, interest: tname(t) + " (hold " + t.id + ")", source: "Hold" });
  save(); return h;
}
function releaseHold(id) {
  const h = S.holds.find(x => x.id === id); if (!h) return;
  h.status = "Released"; const t = unit(h.trailerId);
  if (t && t.status === "hold") t.status = h.prev && h.prev !== "hold" ? h.prev : "lot";
  save();
}

function partsTotal(items) { return items.reduce((s, [id, q]) => { const p = DATA.parts.find(x => x.id === id); return s + (p ? p.price * q : 0); }, 0); }
function createPartsOrder(items, name, phone) {
  const o = { id: nextId("PO"), userId: S.user && !isStaff() ? S.user : "guest", name, phone, items, created: new Date().toISOString(), status: "Ordered" };
  S.partsOrders.unshift(o); save(); return o;
}
function createTicket(o) {
  const t = Object.assign({ id: nextId("SR"), userId: S.user && !isStaff() ? S.user : "guest", created: new Date().toISOString(), status: "Open" }, o);
  S.tickets.unshift(t); save(); return t;
}
function statusPill(s) {
  const map = { Active: "amber", Released: "", Converted: "green", Sent: "blue", Accepted: "green", Expired: "", Ordered: "blue", "Ready for pickup": "green", "Picked up": "",
    Open: "amber", Scheduled: "blue", "In progress": "amber", Done: "green" };
  return `<span class="pill ${map[s] || ""}">${esc(s)}</span>`;
}

/* ---------------- chrome: header, account slot, drawer ---------------- */
function navHTML() {
  return `
  <div class="menu"><a href="/about/" data-nav="about" class="nav-about">About us</a></div>
  <div class="menu" data-menu="inv"><button aria-expanded="false" data-nav="inventory,trailer,finder,compare">Inventory ${ICON.caret}</button>
    <div class="dd"><a href="/trailers/">On the lot<small>${onLot().length} units ready today</small></a><a href="/trailers/?s=lineup">Lineup by category<small>Order any Timpte model</small></a><a href="/finder/">Trailer Finder<small>Start with what you haul</small></a><a href="/compare/">Compare models<small>Side by side, up to three</small></a></div></div>
  <div class="menu" data-menu="own"><button aria-expanded="false" data-nav="parts,service">Parts and services ${ICON.caret}</button>
    <div class="dd"><a href="/parts/">Parts<small>Order for pickup in Waxhaw</small></a><a href="/service/">Service<small>Inspections, bearings, brakes</small></a></div></div>
  <div class="menu"><a href="/financing/" data-nav="financing">Financing</a></div>
  <div class="menu"><a href="/owner-resources/">Owner resources</a></div>
  <div class="menu"><a href="/contact/">Contact us</a></div>`;
}
function acctSlotHTML() { return DEMO ? acctSlotDemoHTML() : ""; }

function updateChrome() {
  $("#navLinks").innerHTML = navHTML();
  $("#acctSlot").innerHTML = acctSlotHTML();
  $$("[data-nav]").forEach(b => b.setAttribute("aria-current", b.dataset.nav.split(",").includes(route.name)));
  refreshCompare();
}
function openDrawer() {
  const html = `<div class="drawer-bg" data-act="drawer-close"></div><nav class="drawer" aria-label="Menu">
    <div class="dhead"><img src="${img("timeless-logo")}" alt="Timeless Trailers" style="height:40px;width:auto"><button class="xbtn" data-act="drawer-close" aria-label="Close menu">${ICON.x}</button></div>
    <div class="dsearch"><label for="dSearch" class="sr">Search inventory</label><input id="dSearch" placeholder="Search trailers: dump, tilt, 1020…" data-search></div>
    <h4>About us</h4><a href="/about/">About us</a>
    <h4>Inventory</h4><a href="/trailers/">On the lot</a><a href="/trailers/?s=lineup">Lineup by category</a><a href="/finder/">Trailer Finder</a><a href="/compare/">Compare models</a>
    <h4>Parts and services</h4><a href="/parts/">Parts</a><a href="/service/">Service</a>
    <h4>More</h4><a href="/financing/">Financing</a><a href="/owner-resources/">Owner resources</a><a href="/contact/">Contact us</a>
    ${DEMO ? drawerAcctHTML() : ""}
    <div style="margin-top:22px;display:grid;gap:8px"><button class="btn btn-gold" data-act="tessa-open">Ask ${A}</button><a class="btn btn-line" href="tel:${DATA.business.tel}">Call ${DATA.business.phone}</a></div></nav>`;
  const box = document.createElement("div"); box.id = "drawer"; box.innerHTML = html; document.body.appendChild(box);
  $("#dSearch").focus();
}
function closeDrawer() { const d = $("#drawer"); if (d) d.remove(); }
function closeMenus(except) { $$(".menu.open").forEach(m => { if (m !== except) { m.classList.remove("open"); const b = m.querySelector("button"); if (b) b.setAttribute("aria-expanded", "false"); } }); }

/* ---------------- shared components ---------------- */
function tcard(t) {
  const st = statusInfo(t), th = third(t);
  return `<article class="tcard ${t.status === "sold" ? "sold" : ""}">
    <a class="tc-photo" href="/stock/${t.id}/"><img src="${img(t.img)}" alt="${esc(tname(t))}" loading="lazy"><span class="stag ${st.cls}">${st.label} · Stock ${t.id}</span></a>
    <button class="heart" data-act="save" data-id="${t.id}" aria-pressed="${isSaved(t.id)}" aria-label="Save ${t.id}">${ICON.heart}</button>
    <div class="tc-body"><em>${typeLabel(t.type)}</em><h3><a href="/stock/${t.id}/">${esc(tname(t))}</a></h3>
      <ul class="specs3"><li><b>${num(t.payload)} lb</b><span>Payload</span></li><li><b>${t.deckFt} ft</b><span>Deck</span></li><li><b>${esc(th.v)}</b><span>${th.l}</span></li></ul>
      <div class="tc-foot"><div class="price">${PRICES ? money(t.price) + `<small>or about ${money(monthly(t.price))}/mo</small>` : `<span class="callp">Call for price</span><small>Quote the same business day</small>`}</div><a class="btn btn-line sm" href="/stock/${t.id}/">Details</a></div>
      <label class="cmp"><input type="checkbox" data-act="cmp-toggle" data-id="${t.id}" ${S.compare.includes(t.id) ? "checked" : ""}> Compare</label>
    </div></article>`;
}
function miniCard(t) {
  return `<a class="mcard" href="/stock/${t.id}/"><img src="${img(t.img)}" alt=""><div><b>${esc(tname(t))}</b><small>Stock ${t.id} · ${statusInfo(t).label}</small><strong>${PRICES ? money(t.price) : "Call for price"}</strong>${PRICES ? ` <small style="display:inline">· about ${money(monthly(t.price))}/mo</small>` : ""}<br><span class="go">See details →</span></div></a>`;
}

function quoteFormHTML(pre) {
  const opts = ["Not sure yet, help me choose"].concat(DATA.lineup.map(l => l.model));
  if (pre && !opts.includes(pre)) opts.push(pre);
  const u = me();
  return `<form class="q" data-form="quote" novalidate><div class="fbody"><div class="fields"><input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
    <div class="full"><label for="qTrailer">Trailer</label><select id="qTrailer" name="trailer">${opts.map(o => `<option ${o === pre ? "selected" : ""}>${esc(o)}</option>`).join("")}</select></div>
    <div><label for="qHaul">What are you hauling?</label><input id="qHaul" name="haul" placeholder="e.g. Bobcat T66"></div>
    <div><label for="qWeight">Loaded weight (approx.)</label><input id="qWeight" name="weight" placeholder="e.g. 9,000 lb"></div>
    <div><label for="qTow">Tow vehicle</label><input id="qTow" name="tow" placeholder="e.g. 2022 F-250" value="${u && u.truck ? esc(u.truck) : ""}"></div>
    <div><label for="qWhen">When do you need it?</label><select id="qWhen" name="when"><option>This week</option><option>This month</option><option>1–3 months</option><option>Just researching</option></select></div>
    <div><label for="qName">Name</label><input id="qName" name="name" autocomplete="name" required value="${u && u.role === "customer" ? esc(u.name) : ""}"></div>
    <div><label for="qPhone">Phone</label><input id="qPhone" name="phone" type="tel" autocomplete="tel" required value="${u && u.role === "customer" ? esc(u.phone) : ""}"></div>
    <div class="full"><label for="qFin">Interested in financing?</label><select id="qFin" name="fin"><option>Maybe, tell me the options</option><option>Yes</option><option>No, paying outright</option></select></div>
    <div class="full"><label for="qNotes">Anything else?</label><textarea id="qNotes" name="notes" placeholder="Trade-in, delivery, specific features"></textarea></div>
  </div><div class="form-foot"><p>We reply the same business day. Reserving holds a lot unit while we confirm details.</p><button class="btn btn-gold" type="submit">Get my quote</button></div></div></form>`;
}
function visitList() {
  const b = DATA.business;
  return `<ul class="visit"><li>${ICON.pin}<div><small>Yard</small><b>${esc(b.address)}</b></div></li>
    <li>${ICON.phone}<div><small>Call or text</small><b><a href="tel:${b.tel}" style="text-decoration:none">${b.phone}</a></b></div></li>
    <li>${ICON.clock}<div><small>Hours</small><b>Mon–Fri · 9am–5pm</b></div></li></ul>
    <div class="mapcard" role="img" aria-label="Map placeholder for the Waxhaw yard"><div class="pin"><span>Timeless Trailers</span>${ICON.pinFill}</div><a class="btn btn-dark sm" href="${b.maps}" target="_blank" rel="noopener">Get directions</a></div>`;
}
const WHY = `<div class="why"><div class="wrap why-grid">
  <div class="why-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/></svg><b>All-aluminum</b><p>No rust, less weight, more payload. Built to outlast the truck that pulls it.</p></div>
  <div class="why-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg><b>3-year warranty</b><p>Manufacturer-backed coverage, with your Customer Service Center (CSC) to handle it.</p></div>
  <div class="why-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg><b>Financing</b><p>Payment options through the manufacturer's programs. Ask when you quote.</p></div>
  <div class="why-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg><b>Timpte-exclusive</b><p>The only Customer Service Center (CSC) in the U.S. that sells Timpte equipment trailers exclusively. Real people, same-day answers.</p></div></div></div>`;

/* ---------------- views ---------------- */
let route = { name: "home", arg: null, q: {} };
const inv = { type: "all", sort: "featured", q: "" };
const VIEWS = {};

VIEWS.home = {
  title: CONFIG.site.title,
  html() {
    const lot = onLot();
    const groups = {};
    lot.forEach(t => { (groups[t.model] = groups[t.model] || []).push(t); });
    const featured = Object.values(groups).sort((a, b) => b.length - a.length || b[0].price - a[0].price).slice(0, 3);
    const tryChips = ["Bobcat T66 and a 2022 F-250", "Car hauler for a '67 Mustang", "Two UTVs, Silverado 1500", "What's on the lot?"];
    return `
<section class="hero hero-full"><video class="hero-bg" autoplay muted loop playsinline preload="${SMALL ? "metadata" : "auto"}" poster="/video/hero-full.webp" aria-hidden="true"><source src="/video/${SMALL ? "hero-mobile" : "hero-full"}.mp4" type="video/mp4"></video><div class="hero-shade"></div><div class="wrap hero-inner">
  <div class="eyebrow">${esc(CONFIG.wording.exclusiveShort)}</div>
  <h1 style="margin-top:16px">Built once. <span>Lasts forever.</span></h1>
  <p class="lede">All-aluminum Timpte trailers for contractors, haulers and weekend toys, from the only Customer Service Center (CSC) in the U.S. that sells Timpte exclusively. Tell us what you haul and we'll match the trailer.</p>
  <form class="hero-ask" data-form="hero-ask"><img class="av av-img" src="${img("andy-face")}" alt="" width="40" height="40"><label for="heroAsk" class="sr">Tell ${A} what you haul</label><input id="heroAsk" name="q" placeholder="Tell ${A} what you haul…" autocomplete="off"><button class="btn btn-gold" type="submit" aria-label="Send to ${A}">${ICON.send}<span>Ask</span></button></form>
  <div class="hero-try"><span>Try:</span>${tryChips.map(c => `<button type="button" data-act="say" data-say="${esc(c)}">${esc(c)}</button>`).join("")}</div>
  <div class="hero-ctas"><a class="btn btn-dark" href="/trailers/">See what's on the lot</a><a class="btn btn-line" href="/finder/">Find my trailer</a></div>
  <div class="trustrow"><span>${tick}3-year manufacturer warranty</span><span>${tick}Financing available</span><span>${tick}No rust. All aluminum.</span></div>
  <a class="stock-badge" href="/trailers/"><b>${lot.length}</b><span>Trailers ready today</span></a></div><div class="hero-scroll" aria-hidden="true"><span>Scroll</span><i></i></div></section>

${exclHTML()}

<div class="stats"><div class="wrap stats-grid">
  <div class="stat"><b data-count="${DATA.business.modelsCarried}">${DATA.business.modelsCarried}</b><span>Timpte models available to order</span></div>
  <a class="stat" href="/trailers/"><b data-count="${lot.length}">${lot.length}</b><span>Units on the lot today</span></a>
  <button class="stat" data-act="tessa-open"><b>24/7<i class="live-dot"></i></b><span>${A}, our trailer advisor</span><em>Ask now →</em></button>
  <a class="stat" href="/about/"><b>Only</b><span>America's only Timpte-exclusive CSC</span></a>
</div></div>

${DEMO ? tourSection() : ""}

<section id="shop"><div class="wrap">
  <div class="sec-head rv"><div><div class="eyebrow">Shop by category</div><h2 style="margin-top:10px">Start with what you haul.</h2></div><a class="btn btn-line sm" href="/finder/">Not sure? Use the Finder</a></div>
  <div class="cat-grid">${DATA.categories.map(c => { const n = S.inventory.filter(t => t.type === c.type && t.status === "lot").length;
    return `<a class="cat rv" href="${catPath(c.type)}"><div class="ph"><img src="${img(c.tile || c.img)}" alt="" loading="lazy"></div><span class="series">Timpte ${c.series}</span><div class="cb"><b>${c.title}</b><p>${c.blurb}</p><span class="cnt">${n} on the lot →</span></div></a>`; }).join("")}</div>
</div></section>

<section class="lot" id="lot" style="padding-top:0"><div class="wrap">
  <div class="sec-head rv"><div><div class="eyebrow">On the lot now</div><h2 style="margin-top:10px">Ready to hitch up today.</h2><p class="lede">These units are in our Waxhaw yard right now. Reserve one online and we'll hold it while you get your truck here.</p></div><a class="btn btn-line sm" href="/trailers/">All ${lot.length} on the lot</a></div>
  <div class="lot-grid">${featured.map(g => { const t = g[0]; const last = g.length === 1;
    return `<article class="unit rv"><div class="unit-photo"><img src="${img(t.img)}" alt="${esc(t.model)}" loading="lazy"><span class="status ${last ? "last" : "in"}">${last ? "Last one" : "On the lot now"}</span><div class="qty"><b>${g.length}</b><span>${last ? "Left" : "Available"}</span></div></div>
      <div class="unit-body"><span class="line">${typeLabel(t.type)} series</span><h3>${esc(t.model)}</h3><p>${esc(t.blurb)}</p><ul class="feat">${t.feat.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
      <span class="cta-note">${last ? "Last one on the lot. Hold it with a deposit." : (PRICES ? "Ready to haul today. From " + money(Math.min.apply(null, g.map(x => x.price))) + "." : "Ready to haul today. Call or text for a price.")}</span>
      <div class="btns"><button class="btn btn-gold" data-act="hold" data-id="${t.id}">Reserve this trailer</button><button class="btn btn-line" data-act="ask" data-id="${t.id}" aria-label="Ask ${A} about the ${esc(t.model)}">Ask</button></div></div></article>`; }).join("")}</div>
</div></section>

${meetHTML()}

<section class="why-timpte" id="why-timpte"><div class="wrap why-grid2"><div><div class="eyebrow">Why Timpte</div><h2 style="margin-top:10px">Built in Nebraska. Built without structural welds.</h2><p class="lede">Timpte builds every equipment trailer from aluminum with rubber torsion suspension and no structural welds, so there\u2019s nothing to rust and nothing to crack. Two lines: <b>Powerhouse</b> for equipment, <b>Motorsports</b> for cars, UTVs and toys.</p><div class="brandrow"><img src="${img("timpte-powerhouse-logo")}" alt="Timpte Powerhouse" loading="lazy"><img src="${img("timpte-motorsports-logo")}" alt="Timpte Motorsports" loading="lazy"></div><p class="note">Specs on this site come from Timpte\u2019s 2026 spec sheets. Every model page has the sheet to download.</p></div>${videoHTML("torsion-axle")}</div></section>

<section class="matcher" id="match"><div class="wrap match-grid"><div>
  <div class="eyebrow" style="color:var(--gold-2)">Find your trailer</div><h2 style="margin-top:10px">What are you hauling?</h2>
  <p class="lede">The right trailer starts with the load, not the length. Pick what you haul and we'll show you where to start.</p>
  <div class="picks" role="group" aria-label="What are you hauling">
    <button class="pick" data-k="machine" aria-pressed="true">Skid steer or mini excavator<small>Compact equipment</small></button>
    <button class="pick" data-k="heavy" aria-pressed="false">Bigger machines<small>Heavy equipment, long hauls</small></button>
    <button class="pick" data-k="car" aria-pressed="false">A car or truck<small>Daily, classic or race car</small></button>
    <button class="pick" data-k="toys" aria-pressed="false">UTVs, Jeeps, toys<small>Weekend and farm use</small></button>
    <button class="pick" data-k="dirt" aria-pressed="false">Dirt, mulch, debris<small>Landscaping and cleanup</small></button>
    <button class="pick" data-k="light" aria-pressed="false">Mowers and light loads<small>Lawn care and utility</small></button>
  </div></div>
  <div class="match-card" aria-live="polite"><div class="photo"><img id="mImg" src="${img("splittilt")}" alt=""></div><div class="body">
    <span class="eyebrow" id="mTag">Start here</span><h3 id="mName">Timpte 1420 Split Tilt</h3><p id="mWhy"></p>
    <div class="ask"><span id="mAsk"></span><div class="btns"><a class="btn btn-line sm" id="mLot" href="/trailers/">On the lot</a><button class="btn btn-gold sm" id="mBtn" data-act="say" data-say="Tell me about the Timpte 1420 Split Tilt">Ask ${A} about it</button></div></div></div></div>
</div></section>

${WHY}

${DEMO ? reviewsSection() : ""}

<section id="quote" class="bgsec quote-bg"><div class="wrap quote-grid"><div id="visit">
  <div class="eyebrow" style="color:var(--gold-2)">Visit · Quote or reserve</div><h2 style="margin-top:10px">Tell us what you haul.</h2>
  <p class="lede">A few details get you a real answer the same business day: the right model, what's on the lot, and your quote from Matt.</p>${visitList()}
</div>${quoteFormHTML(route.q.m)}</div></section>

<div class="ctaband"><div class="wrap"><div><h2>Need it this week?</h2><p>${lot.length} trailers are ready to hitch up in Waxhaw. Call, or ask ${A} now.</p></div>
  <div class="btns"><a class="btn btn-dark" href="tel:${DATA.business.tel}">Call ${DATA.business.phone}</a><button class="btn btn-line" data-act="tessa-open">Ask ${A}</button></div></div></div>`;
  },
  mount() { mountMatcher(); startDemoChat(); }
};

function exclHTML(cls = "") {
  return `<section class="excl ${cls}" id="exclusive"><div class="wrap excl-grid">
  <div class="excl-logo rv"><img src="${img("timpte-et-logo")}" alt="Timpte Equipment Trailers" loading="lazy"><span>Timpte-exclusive</span></div>
  <div class="rv rv-d1"><div class="eyebrow">One of a kind</div>
    <h2 style="margin-top:10px">The only Customer Service Center (CSC) in the U.S. that sells Timpte equipment trailers <em>exclusively</em>.</h2>
    <p class="lede">Timeless Trailers sells Timpte and nothing else. No other Customer Service Center in the country has made that commitment. It means every trailer on our lot is aluminum, built without structural welds, and backed by a CSC that knows the whole line inside and out.</p>
  </div></div></section>`;
}

function meetHTML() {
  return `<section class="meet bgsec" id="meet"><div class="wrap meet-grid"><div>
  <div class="eyebrow" style="color:var(--gold-2)">Trailer advisor</div>
  <h2 style="margin-top:10px">Meet <span>${A}.</span></h2>
  <p class="lede">${A} knows every Timpte model, every spec sheet and what's on our lot. ${ANDY_LINE} Day or night.</p>
  <ul class="caps">
    <li>${tick}<span><b>Your load.</b> Tell ${A} the machine, car or material and it points you at the right Timpte family.</span></li>
    <li>${tick}<span><b>Your truck.</b> Name what pulls it and ${A} tells you what to look for before you buy.</span></li>
    <li>${tick}<span><b>Specs.</b> Payload, deck size, loading angle, axles and tires, straight from the spec sheets.</span></li>
    <li>${tick}<span><b>The lot.</b> What's here now and what's arriving.</span></li>
    <li>${tick}<span><b>Owners.</b> Parts, service and warranty questions.</span></li>
  </ul>
  <div class="ctas"><button class="btn btn-gold" data-act="tessa-open">Start a conversation</button><a class="btn btn-line-light" href="/finder/">Use the Trailer Finder</a></div>
  <p class="note" style="color:#8f897f">Matt confirms every price, hold and order personally.</p>
</div>
<div class="democ" aria-hidden="true"><div class="dh"><img class="av av-img" src="${img("andy-face")}" alt="" width="40" height="40"><div><b>${A}</b><small>Timeless trailer advisor · online</small></div></div>
  <div class="dlog" id="demoLog"></div><div class="dinput"><span class="typed" id="demoTyped"></span><span class="cur"></span></div></div>
</div></section>`;
}

function mountMatcher() {
  const picks = $$(".pick");
  function show(k) {
    const m = DATA.matcher[k]; if (!m) return;
    $("#mImg").src = img(m.img); $("#mImg").alt = m.name;
    const n = S.inventory.filter(t => t.status === "lot" && t.model === m.name).length;
    $("#mTag").textContent = n ? "On the lot now · " + n + " available" : m.tag;
    $("#mName").textContent = m.name; $("#mWhy").textContent = m.why; $("#mAsk").textContent = m.ask;
    $("#mBtn").dataset.say = "Tell me about the " + m.name + ". " + m.ask; $("#mLot").href = catPath(m.type);
    picks.forEach(p => p.setAttribute("aria-pressed", p.dataset.k === k ? "true" : "false"));
  }
  picks.forEach(p => p.addEventListener("click", () => show(p.dataset.k)));
  show("machine");
}

/* animated sample conversation in the Meet-the-advisor section */
let demoTimer = null;
function startDemoChat() {
  const log = $("#demoLog"), typed = $("#demoTyped"); if (!log) return;
  clearTimeout(demoTimer);
  /* a scripted exchange for the animation only; no weights, ratings or verdicts, Andy on Stammer does the real answering */
  const q = "I've got a Bobcat T66 and a 2022 F-250. What should I be looking at?";
  const answer = `<p>A split tilt is the usual home for a compact track loader. It tilts to the ground, so you drive straight on with no ramps to lift.</p><p>Tell me the operating weight with the bucket on and I'll confirm the fit and what to check on your F-250. Then Matt sends your quote the same business day.</p>`;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bubble = (cls, html) => { const d = document.createElement("div"); d.className = "msg " + cls; d.innerHTML = html; log.appendChild(d); return d; };
  function run() {
    if (!document.body.contains(log)) return;
    log.innerHTML = ""; typed.textContent = "";
    if (reduce) { bubble("me", esc(q)); bubble("bot wide", answer); return; }
    let i = 0;
    (function type() {
      if (!document.body.contains(log)) return;
      typed.textContent = q.slice(0, ++i);
      if (i < q.length) { demoTimer = setTimeout(type, 34); return; }
      demoTimer = setTimeout(() => {
        typed.textContent = ""; bubble("me", esc(q));
        const dots = bubble("bot", '<span class="typing"><i></i><i></i><i></i></span>'); dots.style.padding = "0";
        demoTimer = setTimeout(() => { dots.remove(); bubble("bot wide", answer); demoTimer = setTimeout(run, 7000); }, 1500);
      }, 450);
    })();
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); run(); } }, { threshold: .3 });
    io.observe(log);
  } else run();
}

/* ---------- inventory ---------- */
VIEWS.inventory = {
  title: "Inventory · Timeless Trailers",
  html(r) {
    inv.type = r.q.type && DATA.types[r.q.type] ? r.q.type : "all";
    if (r.q.q != null) inv.q = r.q.q;
    const catT = inv.type !== "all" ? DATA.types[inv.type] : null, catC = catT ? DATA.categories.find(c => c.type === inv.type) : null;
    this.title = (catT ? "Timpte " + catT + " trailers" : "Inventory") + " · Timeless Trailers";
    const counts = { all: S.inventory.filter(t => t.status !== "sold").length };
    Object.keys(DATA.types).forEach(k => counts[k] = S.inventory.filter(t => t.type === k && t.status !== "sold").length);
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Inventory</div>
      <div class="eyebrow">${catT ? "Timpte " + DATA.series[inv.type] + " · " + catT : "On the lot and arriving"}</div><h1 style="margin-top:10px">${catT ? "Timpte " + catT + " trailers." : "Inventory."}</h1>
      <p class="lede">${catC ? esc(catC.blurb) + " " : ""}${onLot().length} units ready to hitch up in Waxhaw today, plus what's on the truck from Timpte.${DEMO ? " Prices are sample prices for the concept." : ""}</p></div></div>
    <section style="padding-top:34px"><div class="wrap">
      <div class="toolbar"><div class="chips" role="group" aria-label="Filter by type">
        <button class="chip" data-act="inv-type" data-type="all" aria-pressed="${inv.type === "all"}">All <small>${counts.all}</small></button>
        ${Object.keys(DATA.types).map(k => `<button class="chip" data-act="inv-type" data-type="${k}" aria-pressed="${inv.type === k}">${DATA.types[k]} <small>${counts[k]}</small></button>`).join("")}</div>
        <div class="tb-right"><label for="invQ" class="sr">Search inventory</label><input id="invQ" data-search placeholder="Search model or type" value="${esc(inv.q)}">
        <label for="invSort" class="sr">Sort</label><select id="invSort" data-act="inv-sort">
          ${[["featured", "Featured"], ...(PRICES ? [["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"]] : []), ["newest", "Newest arrivals"], ["payload", "Most payload"]].map(([v, l]) => `<option value="${v}" ${inv.sort === v ? "selected" : ""}>${l}</option>`).join("")}</select></div></div>
      <p class="rcount" id="invCount" aria-live="polite"></p>
      <div class="tgrid" id="invGrid"></div>
    </div></section>
    <section id="lineup" class="bgsec lineup-bg"><div class="wrap">
      <div class="sec-head"><div><div class="eyebrow">The Timpte lineup</div><h2 style="margin-top:10px">Available to order.</h2><p class="lede">${catT ? "Every Timpte " + catT + " model, with specs, photos and the spec sheet. " : "All " + Object.keys(MODELS).length + " Timpte models, with specs, photos and the spec sheet. "}Not on the lot? We order the configuration you need straight from Timpte. <a href="/specs/timpte-equipment-trailer-catalog-2026.pdf" target="_blank" rel="noopener">Download the full 2026 catalog (PDF)</a>.</p></div>
      <div class="chips" role="group" aria-label="Filter lineup">${[["all", "All"], ["tilt", "Split Tilt"], ["deckover", "Deck Over"], ["gooseneck", "Gooseneck"], ["dump", "Dump"], ["ezload", "EZ Load"]].map(([f, l], i) => `<button class="chip" data-act="line-f" data-f="${f}" aria-pressed="${i === 0}">${l}</button>`).join("")}</div></div>
      <div class="line-grid">${(catT ? Object.values(MODELS).filter(m => m.type === inv.type) : Object.values(MODELS)).map(m => `<a class="model" data-cat="${m.type}" href="${modelPath(m)}"><div class="ph"><img src="${img(m.img)}" alt="${esc(m.model)}" loading="lazy"></div><div class="mb"><em>${DATA.series[m.type]} · ${num(m.payload)} lb payload</em><b>${esc(m.model.replace("Timpte ", ""))}</b><span>${esc(m.feat.join(" · "))}</span></div></a>`).join("")}
        <button class="model" data-cat="tilt deckover gooseneck dump ezload" data-act="tessa-open"><div class="ph" style="display:grid;place-items:center;background:var(--ink)"><span style="font:900 1.6rem/1 var(--display);color:var(--yellow);text-transform:uppercase;text-align:center;padding:10px">Don't see it?<br><span style="color:#fff;font-size:1rem;letter-spacing:.08em">We'll build the order</span></span></div><div class="mb"><em>Custom</em><b>Ask about any model</b><span>Tell us the load, we'll spec it</span></div></button></div>
    </div></section>`;
  },
  mount() { renderInvGrid(); }
};
function invFiltered() {
  const words = inv.q.toLowerCase().split(/\s+/).filter(Boolean);
  let list = S.inventory.filter(t => t.status !== "sold" && (inv.type === "all" || t.type === inv.type));
  if (words.length) list = list.filter(t => { const hay = `${t.year} ${t.model} ${typeLabel(t.type)} ${t.id} ${t.loading} ${t.hitch} ${t.type}`.toLowerCase(); return words.every(w => hay.includes(w)); });
  const rank = { lot: 0, order: 1, hold: 2 };
  const sorts = { featured: (a, b) => rank[a.status] - rank[b.status] || new Date(b.added) - new Date(a.added), "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price, newest: (a, b) => new Date(b.added) - new Date(a.added), payload: (a, b) => b.payload - a.payload };
  return list.sort(sorts[inv.sort] || sorts.featured);
}
function renderInvGrid() {
  const g = $("#invGrid"); if (!g) return;
  const list = invFiltered();
  $("#invCount").textContent = `${list.length} trailer${list.length === 1 ? "" : "s"}${inv.q ? ` matching “${inv.q}”` : ""}${inv.type !== "all" ? " in " + typeLabel(inv.type) : ""}`;
  g.innerHTML = list.length ? list.map(tcard).join("") : `<div class="empty" style="grid-column:1/-1"><b>Nothing matches “${esc(inv.q)}”.</b>Try a model number like 1614, a type like “tilt”, or ask ${A}.<div style="margin-top:14px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="btn btn-line sm" data-act="inv-clear">Clear filters</button><button class="btn btn-gold sm" data-act="say" data-say="${esc(inv.q || "What's on the lot?")}">Ask ${A}</button></div></div>`;
  $$(".chip[data-act=inv-type]").forEach(c => c.setAttribute("aria-pressed", c.dataset.type === inv.type));
}

/* ---------- trailer detail ---------- */
VIEWS.trailer = {
  title: "Trailer · Timeless Trailers",
  html(r) {
    const t = unit(r.arg);
    if (!t) { this.title = "Unit not found · Timeless Trailers"; return `<section><div class="wrap"><div class="empty"><b>That unit isn't in inventory.</b>It may have sold. <a href="/trailers/">See what's on the lot</a>.</div></div></section>`; }
    this.title = tname(t) + " · Stock " + t.id;
    const st = statusInfo(t), f = DATA.finance, pay = monthly(t.price);
    const similar = S.inventory.filter(x => x.id !== t.id && x.type === t.type && x.status !== "sold").slice(0, 3);
    const rows = [["Stock number", t.id], ["Status", st.label], ["Year", t.year], ["Type", typeLabel(t.type)], ["Payload", num(t.payload) + " lb"], ["GVWR", num(t.gvwr) + " lb"],
      ["Empty weight", num(t.empty) + " lb"], ["Deck", t.deck || t.deckFt + " ft"], ["Deck width", t.width], ["Loading", t.loading + (t.angle ? ` · ${t.angleText || t.angle + "°"} loading angle` : "")],
      ["Overall length", t.length || ""], ["Axles", t.axles], ["Hitch", t.hitch], ["Brakes", t.brakes], ["Tires", t.tires], ["Construction", "Aluminum, no structural welds"], ["Series", DATA.series[t.type] + " (Timpte " + typeLabel(t.type) + ")"]].filter(r => r[1] !== "");
    const canHold = t.status === "lot" || t.status === "order";
    return `<section style="padding-top:28px"><div class="wrap">
      <div class="crumbs"><a href="/">Home</a> / <a href="/trailers/">Inventory</a> / <a href="${catPath(t.type)}">${typeLabel(t.type)}</a> / ${t.id}</div>
      <div class="detail-grid"><div>
        ${t.video ? videoHTML(t.video, "dbig") : `<div class="dphoto"><img src="${img(t.gallery && t.gallery[0] || t.img)}" alt="${esc(tname(t))}"><span class="stag ${st.cls}">${st.label} · Stock ${t.id}</span></div>`}${t.gallery && t.gallery.length ? `<ul class="gallery" data-gallery>${t.gallery.map((g, i) => `<li><a href="${img(g)}" data-lb="${i}"><img src="${img(g)}" alt="${esc(tname(t))}, photo ${i + 1}" loading="lazy"></a></li>`).join("")}</ul>` : ""}
        <div class="block"><h3>About this unit</h3><p style="margin:0;color:var(--text-2)">${esc(t.blurb)}</p></div>
        <div class="block"><h3>Features</h3><ul class="flist">${t.features.map(x => `<li>${tick}${esc(x)}</li>`).join("")}</ul></div>
        <div class="block"><h3>Full specs</h3><table class="spec-table"><tbody>${rows.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table>
        <p class="note">Specs from Timpte's 2026 spec sheet. Empty weights are estimates; options change them.</p>${t.spec ? `<a class="btn btn-line sm" href="/specs/${t.spec}" target="_blank" rel="noopener" style="margin-top:12px">Download the spec sheet (PDF)</a>` : ""}</div>
      </div>
      <aside class="dside">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start"><div><div class="eyebrow">${typeLabel(t.type)}</div><h1 style="margin-top:8px">${esc(tname(t))}</h1></div>
          <button class="heart inline" data-act="save" data-id="${t.id}" aria-pressed="${isSaved(t.id)}" aria-label="Save ${t.id}">${ICON.heart}</button></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="pill ${st.pill}">${st.label}</span><span class="pill">Stock ${t.id}</span></div>
        <ul class="specs3"><li><b>${num(t.payload)} lb</b><span>Payload</span></li><li><b>${t.deckFt} ft</b><span>Deck</span></li><li><b>${esc(third(t).v)}</b><span>${third(t).l}</span></li></ul>
        ${PRICES ? `<div class="dprice"><div><small class="muted">Price</small><div class="price">${money(t.price)}</div></div><div class="pay">Est. payment<b>${money(pay)}/mo</b>${f.term} mo · ${f.apr}% APR · ${f.downPct}% down<br><a href="/financing/?id=${t.id}">Adjust the numbers</a></div></div>`
          : `<div class="dprice"><div><small class="muted">Price</small><div class="price callp">Call for price</div></div><div class="pay" style="max-width:22em">${ANDY_LINE}</div></div>`}
        <div class="dbtns">
          <button class="btn btn-gold" data-act="hold" data-id="${t.id}" ${canHold ? "" : "disabled"}>${t.status === "hold" ? "On hold" : t.status === "sold" ? "Sold" : "Hold this unit"}</button>
          ${DEMO ? `<button class="btn btn-dark" data-act="quote" data-id="${t.id}">Get a quote</button>` : `<button class="btn btn-dark" data-act="quote-model" data-model="${esc(t.model)}">Get a quote</button>`}
          <button class="btn btn-line" data-act="ask" data-id="${t.id}">Ask ${A} about this trailer</button>
          <button class="btn btn-line" data-act="cmp-btn" data-id="${t.id}">${S.compare.includes(t.id) ? "In compare ✓" : "Add to compare"}</button>
        </div>
        <p class="note">Holds last 48 hours while we confirm details. No payment online.</p>
      </aside></div>
      ${similar.length ? `<div class="block" style="margin-top:56px"><div class="sec-head" style="margin-bottom:18px"><h2 style="font-size:2.2rem">Similar trailers</h2><a class="btn btn-line sm" href="${catPath(t.type)}">All ${typeLabel(t.type)}</a></div><div class="tgrid">${similar.map(tcard).join("")}</div></div>` : ""}
    </div></section>`;
  }
};

/* ---------- finder: pick what you haul, see the Timpte family for it; Andy handles the exact fit ---------- */
const finder = { cat: null };
const FAMILIES = { compact: ["tilt"], miniex: ["tilt", "deckover"], heavy: ["gooseneck", "deckover"], car: ["ezload"], utv: ["ezload"], material: ["dump"], mower: ["ezload"] };
VIEWS.finder = {
  title: "Trailer Finder · Timeless Trailers",
  html() {
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Trailer Finder</div><div class="eyebrow">Start with the load</div><h1 style="margin-top:10px">Trailer Finder.</h1>
      <p class="lede">Pick what you haul and we'll point you at the Timpte family built for it. For your exact machine and truck, ask ${A}: ${ANDY_LINE}</p></div></div>
      <section style="padding-top:34px"><div class="wrap finder" id="finderBox"></div></section>`;
  },
  mount() { renderFinder(); }
};
function renderFinder() {
  const box = $("#finderBox"); if (!box) return;
  const f = finder;
  const cat = DATA.loadCats.find(c => c.k === f.cat);
  let out = `<div class="fcard"><div class="eyebrow">What are you hauling?</div><h3>Pick the closest match.</h3>
    <div class="opts">${DATA.loadCats.map(c => `<button class="opt" data-act="f-cat" data-k="${c.k}" aria-pressed="${f.cat === c.k}">${c.label}<small>${c.sub}</small></button>`).join("")}</div></div>`;
  if (cat) {
    const fams = (FAMILIES[cat.k] || []).map(k => DATA.categories.find(c => c.type === k)).filter(Boolean);
    const ask = `I haul ${cat.label.toLowerCase()}. Which Timpte fits, and what should I know about my truck?`;
    out += `<div class="fcard" style="margin-top:18px"><div class="eyebrow">${esc(cat.label)}</div><h3>${fams.length > 1 ? "Two families to look at." : "The family built for it."}</h3>
      <div class="results">${fams.map((c, i) => {
        const models = Object.keys(MODELS).filter(k => MODELS[k].type === c.type).map(k => { const m = MODELS[k]; const u = S.inventory.find(x => x.model === m.model && x.status !== "sold"); return `<a href="${modelPath(m)}">${esc(m.model.replace("Timpte ", ""))}</a>`; });
        return `<div class="res ${i === 0 ? "top" : ""}"><a href="${catPath(c.type)}"><img src="${img(c.tile || c.img)}" alt="${esc(c.title)}" loading="lazy"></a><div>
          <div class="rk">Timpte ${c.series}</div><h4>${esc(c.title)}</h4><p>${esc(c.blurb)}</p><p class="muted" style="margin:0;font-size:.92rem">Models: ${models.join(" · ")}</p></div>
          <div class="ra"><a class="btn btn-gold sm" href="${catPath(c.type)}">See ${esc(c.title)} trailers</a></div></div>`; }).join("")}</div>
      <div class="fnav"><button class="btn btn-line" data-act="f-restart">Start over</button><button class="btn btn-dark" data-act="say" data-say="${esc(ask)}">Ask ${A} to check your fit</button></div></div>`;
  }
  box.innerHTML = out;
}

/* ---------- compare ---------- */
VIEWS.compare = {
  title: "Compare trailers · Timeless Trailers",
  html() {
    const list = S.compare.map(unit).filter(Boolean);
    const avail = S.inventory.filter(t => t.status !== "sold" && !S.compare.includes(t.id));
    const head = `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Compare</div><div class="eyebrow">Side by side</div><h1 style="margin-top:10px">Compare models.</h1>
      <p class="lede">Up to three trailers. The best number in each row is highlighted.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px;align-items:center">${list.length < 3 ? `<label for="cmpAdd" class="sr">Add a trailer</label><select id="cmpAdd" data-act="cmp-add" style="max-width:360px"><option value="">+ Add a trailer to compare…</option>${avail.map(t => `<option value="${t.id}">${esc(tname(t))} · ${t.id}${PRICES ? " · " + money(t.price) : ""}</option>`).join("")}</select>` : ""}
      ${list.length ? `<button class="btn btn-line sm" data-act="cmp-clear">Clear all</button>` : ""}</div></div></div>`;
    if (!list.length) return head + `<section style="padding-top:34px"><div class="wrap"><div class="empty"><b>Nothing to compare yet.</b>Tick “Compare” on any trailer card, or add one above.<div style="margin-top:14px"><button class="btn btn-gold sm" data-act="cmp-starter">Compare the two car haulers</button></div></div></div></section>`;
    const rows = [
      ...(PRICES ? [["Price", t => money(t.price), t => t.price, "min"], ["Est. payment", t => money(monthly(t.price)) + "/mo", t => t.price, "min"]] : []), ["Status", t => statusInfo(t).label],
      ["Payload", t => num(t.payload) + " lb", t => t.payload, "max"], ["GVWR", t => num(t.gvwr) + " lb", t => t.gvwr, "max"], ["Empty weight", t => num(t.empty) + " lb", t => t.empty, "min"],
      ["Deck", t => t.deck, t => t.deckFt, "max"], ["Width", t => t.width], ["Loading", t => t.loading], ["Load angle", t => (t.angle ? t.angle + "°" : "n/a"), t => t.angle || 99, "min"],
      ["Axles", t => t.axles], ["Hitch", t => t.hitch], ["Brakes", t => t.brakes], ["Tires", t => t.tires]];
    const body = rows.map(([label, fmt, val, dir]) => {
      let best = null;
      if (val && list.length > 1) { const vs = list.map(val); const b = dir === "max" ? Math.max(...vs) : Math.min(...vs); if (vs.filter(v => v === b).length < list.length) best = b; }
      return `<tr><th scope="row">${label}</th>${list.map(t => `<td class="${best != null && val(t) === best && !(label === "Load angle" && !t.angle) ? "best" : ""}">${esc(fmt(t))}</td>`).join("")}</tr>`;
    }).join("");
    return head + `<section style="padding-top:34px"><div class="wrap"><div class="cmp-wrap"><table class="cmp-table"><thead><tr><th></th>${list.map(t => `<td class="cmp-head"><img src="${img(t.img)}" alt=""><b>${esc(tname(t))}</b><small class="muted">Stock ${t.id}</small>
      <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap"><a class="btn btn-gold xs" href="/stock/${t.id}/">Details</a><button class="btn btn-line xs" data-act="cmp-remove" data-id="${t.id}">Remove</button></div></td>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>
      <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-dark sm" data-act="say" data-say="${esc("Compare " + list.map(t => t.id).join(" and "))}">Ask ${A} which fits my load</button></div></div></section>`;
  }
};

/* ---------- parts: Timpte's serviceable parts catalog, by part number ---------- */
const PARTPRICES = DEMO || !!CONFIG.showPartsPrices;
const partsUI = { q: "", fit: true, cat: "All", series: "All" };
const money2 = n => "$" + Number(n).toFixed(2);
VIEWS.parts = {
  title: "Timpte parts by part number · Timeless Trailers",
  html() {
    const own = myOwned()[0];
    const cats = ["All"].concat([...new Set(DATA.parts.map(p => p.cat))]);
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Parts</div><div class="eyebrow">Own · Parts counter</div><h1 style="margin-top:10px">Parts.</h1>
      <p class="lede">Every serviceable part in Timpte's catalog, by part number: axles, hoists, latches, lights, decals and more. Find it, add it to your request, and we order it for pickup in Waxhaw.</p>
      ${own ? `<div class="badges" style="margin-top:16px"><span class="badge info">Your ${own.year} ${esc(own.model)}</span><label class="badge" style="cursor:pointer;margin:0"><input type="checkbox" data-act="parts-fit" ${partsUI.fit ? "checked" : ""}> Only parts for it</label></div>` : (DEMO ? partsSigninNote() : `<p class="note">Not sure which part you need? Ask ${A} with your model and serial number, or call the counter at ${DATA.business.phone}.</p>`)}
    </div></div>
    <section style="padding-top:30px"><div class="wrap parts-grid"><div>
      <div class="toolbar"><div class="chips">${cats.map(c => `<button class="chip" data-act="parts-cat" data-c="${esc(c)}" aria-pressed="${partsUI.cat === c}">${esc(c)}</button>`).join("")}</div>
      <div class="tb-right"><label for="pQ" class="sr">Search parts</label><input id="pQ" data-act="parts-q" placeholder="Part number or name" value="${esc(partsUI.q)}"></div></div>
      <div class="chips" style="margin:-8px 0 14px">${["All", "Motorsports", "Powerhouse"].map(s => `<button class="chip" data-act="parts-series" data-s="${s}" aria-pressed="${partsUI.series === s}">${s === "All" ? "All series" : "Timpte " + s}</button>`).join("")}</div>
      <p class="rcount" id="pCount" aria-live="polite"></p>
      <div class="plist" id="pList"></div></div>
      <aside class="cart" id="cartBox"></aside></div></section>`;
  },
  mount() { renderParts(); renderCart(); }
};
function renderParts() {
  const own = myOwned()[0]; const q = partsUI.q.toLowerCase().trim();
  let list = DATA.parts.filter(p => (partsUI.cat === "All" || p.cat === partsUI.cat) && (partsUI.series === "All" || p.series === partsUI.series || p.series === "Both") && (!own || !partsUI.fit || p.fits.includes(own.type)));
  if (q) list = list.filter(p => (p.id + " " + p.name + " " + (p.fitsSeries || []).join(" ") + " " + p.cat).toLowerCase().includes(q));
  const shown = list.slice(0, 80);
  const c = $("#pCount"); if (c) c.textContent = `${list.length} part${list.length === 1 ? "" : "s"}${q ? ` matching “${partsUI.q}”` : ""}${list.length > shown.length ? `, showing the first ${shown.length}. Narrow it down with a search.` : ""}`;
  $("#pList").innerHTML = shown.length ? shown.map(p => `<div class="part"><em>${esc(p.cat)}${p.fitsSeries ? " · fits " + esc(p.fitsSeries.join(", ")) : ""}</em><b>${esc(p.name)}</b><small>Part ${esc(p.id)} · Timpte ${esc(p.series === "Both" ? "Motorsports and Powerhouse" : p.series)}</small>
    <div class="pp"><strong>${PARTPRICES && p.price ? money2(p.price) : `<span class="callp">Call for price</span>`}</strong><button class="btn btn-gold xs" data-act="cart-add" data-id="${esc(p.id)}">Request</button></div></div>`).join("")
    : `<div class="empty" style="grid-column:1/-1"><b>No part matches.</b>Try the part number from your old part or the catalog, or ask ${A}. We order what we don't stock: ${DATA.business.phone}.</div>`;
}
function renderCart() {
  const box = $("#cartBox"); if (!box) return;
  const u = me(); const total = PARTPRICES ? partsTotal(S.cart) : 0;
  box.innerHTML = `<h3>Your parts request</h3>${S.cart.length ? S.cart.map(([id, q]) => { const p = DATA.parts.find(x => x.id === id); if (!p) return "";
    return `<div class="citem"><span>${esc(p.name)}<br><small class="muted">Part ${esc(p.id)}</small></span><b>${PARTPRICES && p.price ? money2(p.price * q) : ""}</b><span class="qtyc"><button data-act="cart-qty" data-id="${esc(id)}" data-d="-1" aria-label="Fewer">−</button><span>${q}</span><button data-act="cart-qty" data-id="${esc(id)}" data-d="1" aria-label="More">+</button></span></div>`; }).join("") +
    `${PARTPRICES && total ? `<div class="ctotal"><span>Parts</span><span>${money2(total)}</span></div>` : ""}
    <form data-form="parts-checkout" novalidate style="display:grid;gap:10px">
      <div><label for="pcName">Name</label><input id="pcName" name="name" value="${u && u.role === "customer" ? esc(u.name) : ""}" required></div>
      <div><label for="pcPhone">Phone</label><input id="pcPhone" name="phone" type="tel" value="${u && u.role === "customer" ? esc(u.phone) : ""}" required></div>
      <div><label for="pcUnit">Your trailer (model and serial, if handy)</label><input id="pcUnit" name="unit" placeholder="e.g. 2024 1420 Split Tilt"></div>
      <button class="btn btn-gold" type="submit">Send the request</button><p class="note" style="margin:0">We confirm the price and the pickup day by phone. Pay at pickup.</p></form>`
    : `<p class="muted" style="margin:0">Nothing yet. Find a part and hit Request. Parts are ordered through us and picked up in Waxhaw.</p>`}`;
}

/* ---------- service ---------- */
VIEWS.service = {
  title: "Service · Timeless Trailers",
  html() {
    const u = me(); const own = myOwned();
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Service</div><div class="eyebrow">Own · Service bay</div><h1 style="margin-top:10px">Service.</h1>
      <p class="lede">Inspections, bearings, brakes, wiring and warranty work, done here in Waxhaw by the people who sold you the trailer.${DEMO ? " Sample prices below." : ""}</p></div></div>
    <section style="padding-top:34px"><div class="wrap">
      <div class="grid3">${DATA.services.map(s => `<div class="svc"><b>${s.name}</b><span>${DEMO || s.id === "warranty" ? s.price : "Call for pricing"}</span><p>${s.desc}</p></div>`).join("")}</div>
      <div class="grid2" style="margin-top:34px">
        <form class="q" data-form="service" novalidate id="book"><h3 style="margin-bottom:16px">Book service</h3><div class="fields">
          <div class="full"><label for="sUnit">Trailer</label><select id="sUnit" name="unit">${own.map(o => `<option>${o.year} ${esc(o.model)}</option>`).join("")}<option>Another Timpte trailer</option><option>A trailer from another brand</option></select></div>
          <div><label for="sType">Service</label><select id="sType" name="service">${DATA.services.map(s => `<option ${route.q.svc === s.id ? "selected" : ""}>${s.name}</option>`).join("")}</select></div>
          <div><label for="sDate">Preferred day</label><input id="sDate" name="date" type="date" value="${new Date(Date.now() + 3 * DAY).toISOString().slice(0, 10)}"></div>
          <div><label for="sName">Name</label><input id="sName" name="name" required value="${u && u.role === "customer" ? esc(u.name) : ""}"></div>
          <div><label for="sPhone">Phone</label><input id="sPhone" name="phone" type="tel" required value="${u && u.role === "customer" ? esc(u.phone) : ""}"></div>
          <div class="full"><label for="sNotes">What's going on?</label><textarea id="sNotes" name="notes" placeholder="Noise, symptoms, when it started"></textarea></div>
        </div><div class="form-foot"><p>We'll call to confirm a drop-off time. Most work is same-week.</p><button class="btn btn-gold" type="submit">Open service ticket</button></div></form>
        <div class="panel" id="resources"><div class="eyebrow">Owner resources</div><h3 style="margin-top:8px">Keep it rolling.</h3>
          <table class="ttable"><thead><tr><th>When</th><th>What to check</th></tr></thead><tbody>${DATA.maintenance.map(([a, b]) => `<tr><td><b>${a}</b></td><td>${b}</td></tr>`).join("")}</tbody></table>
          <p style="margin:18px 0 0"><a class="btn btn-line sm" href="/owner-resources/">Spec sheets, the Timpte catalog and warranty help</a></p>
          <h4 style="margin:22px 0 6px">Warranty</h4>
          <p style="margin:0;color:var(--text-2);font-size:.95rem">Timpte backs every trailer with a 3-year warranty. We handle the claim and the repair here in Waxhaw. Call ${DATA.business.phone} with your serial number.</p>
        </div></div>
    </div></section>`;
  }
};

/* ---------- financing ---------- */
const fin = { price: 18900, down: 1890, apr: DATA.finance.apr, term: DATA.finance.term, id: "" };
VIEWS.financing = {
  title: "Financing · Timeless Trailers",
  html(r) {
    if (r.q.id && unit(r.q.id)) { const t = unit(r.q.id); fin.id = t.id; fin.price = t.price; fin.down = Math.round(t.price * DATA.finance.downPct / 100); }
    const u = me();
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Financing</div><div class="eyebrow">Own · Financing</div><h1 style="margin-top:10px">Financing.</h1>
      <p class="lede">Payment options through the manufacturer's programs and local lenders. Run the numbers here, then pre-qualify in two minutes. Rates and terms are estimates until a lender quotes you.</p></div></div>
    <section style="padding-top:34px"><div class="wrap grid2">
      <div class="panel"><h3>Payment calculator</h3><div class="fields">
        ${PRICES ? `<div class="full"><label for="fTr">Trailer</label><select id="fTr" data-act="fin-tr"><option value="">Enter a price</option>${S.inventory.filter(t => t.status !== "sold").map(t => `<option value="${t.id}" ${fin.id === t.id ? "selected" : ""}>${esc(tname(t))} · ${t.id} · ${money(t.price)}</option>`).join("")}</select></div>` : `<div class="full"><p class="note" style="margin:0">Enter the price from your quote, or the figure you have in mind, to see an estimated payment.</p></div>`}
        <div><label for="fPrice">Price ($)</label><input id="fPrice" data-fin="price" type="number" min="0" step="50" value="${fin.price}"></div>
        <div><label for="fDown">Down payment ($)</label><input id="fDown" data-fin="down" type="number" min="0" step="50" value="${fin.down}"></div>
        <div class="full"><label for="fApr">APR: <span id="fAprV">${fin.apr.toFixed(2)}%</span></label><input id="fApr" data-fin="apr" type="range" min="3.99" max="17.99" step="0.25" value="${fin.apr}"></div>
        <div class="full"><label>Term</label><div class="termset">${DATA.finance.terms.map(n => `<button type="button" class="chip" data-act="fin-term" data-n="${n}" aria-pressed="${fin.term === n}">${n} mo</button>`).join("")}</div></div>
      </div></div>
      <div style="display:grid;gap:18px"><div class="calc-out" id="calcOut" aria-live="polite"></div>
        <form class="q" data-form="prequal" novalidate><h3 style="margin-bottom:6px">Pre-qualify</h3><p class="muted" style="margin:0 0 14px;font-size:.92rem">No effect on your credit. We call you with real options the same business day.</p><div class="fields">
          <div><label for="pqName">Name</label><input id="pqName" name="name" required value="${u && u.role === "customer" ? esc(u.name) : ""}"></div>
          <div><label for="pqPhone">Phone</label><input id="pqPhone" name="phone" type="tel" required value="${u && u.role === "customer" ? esc(u.phone) : ""}"></div>
          <div class="full"><label for="pqBiz">Buying as</label><select id="pqBiz" name="as"><option>An individual</option><option>A business</option></select></div></div>
          <div class="form-foot"><p>Matt or the team calls with real options the same day.</p><button class="btn btn-gold" type="submit">Start pre-qualifying</button></div></form></div>
    </div></section>`;
  },
  mount() { renderCalc(); }
};
function renderCalc() {
  const out = $("#calcOut"); if (!out) return;
  const P = Math.max(fin.price - fin.down, 0); const m = monthly(fin.price, { apr: fin.apr, term: fin.term, down: fin.down });
  out.innerHTML = `<span class="eyebrow" style="color:var(--gold-2)">Estimated payment</span><div class="big">${money(m)}<small style="font:600 1rem var(--body);color:#cfc9bf">/mo</small></div>
    <div class="row"><span>Amount financed</span><b>${money(P)}</b></div><div class="row"><span>Total interest</span><b>${money(m * fin.term - P)}</b></div>
    <div class="row"><span>${fin.term} payments at ${fin.apr.toFixed(2)}% APR</span><b>${money(m * fin.term + fin.down)} total</b></div>
    <p class="note" style="color:#8f897f;margin:0">Estimate only. Excludes tax, fees and title. Your rate depends on credit and the lender.</p>`;
  const v = $("#fAprV"); if (v) v.textContent = fin.apr.toFixed(2) + "%";
}

/* ---------- about ---------- */
VIEWS.about = {
  title: "About · Timeless Trailers",
  html(r) {
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / About</div><div class="eyebrow">Company</div><h1 style="margin-top:10px">A Customer Service Center that picks up the phone.</h1>
      <p class="lede">Timeless Trailers is the only Customer Service Center (CSC) in the U.S. that sells Timpte equipment trailers exclusively. We're based in Waxhaw, serving contractors, landscapers, farmers and weekend haulers across the Charlotte area. We sell one brand because we believe in how it's built: all aluminum, no rust, more payload for the same tow.</p></div></div>
    <section style="padding-top:34px"><div class="wrap grid2">
      <div class="panel"><h3>How we sell</h3><ul class="flist" style="grid-template-columns:1fr">
        <li>${tick}We start with the load and the truck, not the biggest trailer on the lot.</li>
        <li>${tick}If your truck can't tow it safely, we'll tell you, even if it costs us the sale.</li>
        <li>${tick}${PRICES ? "Real prices on the website." : "A straight price the same business day."} Holds without a deposit while we confirm details.</li>
        <li>${tick}Parts, service and warranty handled here, not shipped off.</li></ul></div>
      <div class="panel"><h3>Who you'll talk to</h3><div class="rows">${DATA.team.map(t => `<div style="display:flex;gap:12px;align-items:flex-start"><i class="av">${initials(t.name)}</i><div><b>${esc(t.name)}</b> · <span class="muted">${esc(t.role)}</span><p style="margin:4px 0 0;color:var(--text-2);font-size:.95rem">${esc(t.note)}</p></div></div>`).join("")}
        <div style="display:flex;gap:12px;align-items:flex-start"><i class="av dark">${A[0]}</i><div><b>${A}</b> · <span class="muted">Trailer advisor</span><p style="margin:4px 0 0;color:var(--text-2);font-size:.95rem">${ANDY_LINE} Any hour. <button class="link" data-act="tessa-open">Ask now</button></p></div></div></div></div>
    </div></section>
    ${exclHTML()}
    ${WHY}
    <section id="visit"><div class="wrap quote-grid"><div id="contact"><div class="eyebrow">Visit · Contact</div><h2 style="margin-top:10px">Come see the lot.</h2>
      <p class="lede">Walk the trailers, sit in the tilt, check the welds. Call ahead and we'll have the unit you're after pulled up front.</p>${visitList()}</div>${quoteFormHTML(r.q.m)}</div></section>`;
  }
};

/* ---------- model page: one per Timpte model, the unit of the catalog ---------- */
function modelUnits(m) { return S.inventory.filter(x => x.key === m.key && x.status !== "sold"); }
function specRows(t) {
  return [["Payload", num(t.payload) + " lb"], ["GVWR", num(t.gvwr) + " lb"], ["Empty weight", num(t.empty) + " lb"], ["Deck", t.deck || t.deckFt + " ft"], ["Deck width", t.width],
    ["Loading", t.loading + (t.angle ? ` · ${t.angleText || t.angle + "°"} loading angle` : "")], ["Overall length", t.length || ""], ["Axles", t.axles], ["Hitch", t.hitch], ["Brakes", t.brakes], ["Tires", t.tires],
    ["Construction", "Aluminum, no structural welds"], ["Series", DATA.series[t.type] + " (Timpte " + typeLabel(t.type) + ")"]].filter(r => r[1]);
}
VIEWS.model = {
  title: "Timpte models · Timeless Trailers",
  html(r) {
    const m = MODELS[r.arg];
    if (!m) return VIEWS.notfound.html(r);
    this.title = `${m.model} · specs, price and availability · Timeless Trailers`;
    const units = modelUnits(m), cat = DATA.categories.find(c => c.type === m.type);
    const price = PRICES && m.listPrice ? money(m.listPrice) : null;
    return `<section style="padding-top:28px"><div class="wrap">
      <div class="crumbs"><a href="/">Home</a> / <a href="/trailers/">Trailers</a> / <a href="${catPath(m.type)}">${typeLabel(m.type)}</a> / ${esc(m.model.replace("Timpte ", ""))}</div>
      <div class="detail-grid"><div>
        ${m.video ? videoHTML(m.video, "dbig") : `<div class="dphoto"><img src="${img(m.gallery && m.gallery[0] || m.img)}" alt="${esc(m.model)}"></div>`}${m.gallery && m.gallery.length ? `<ul class="gallery" data-gallery>${m.gallery.map((g, i) => `<li><a href="${img(g)}" data-lb="${i}"><img src="${img(g)}" alt="${esc(m.model)}, photo ${i + 1}" loading="lazy"></a></li>`).join("")}</ul>` : ""}
        <div class="block"><h3>About the ${esc(m.model.replace("Timpte ", ""))}</h3><p style="margin:0;color:var(--text-2)">${esc(m.blurb)}</p></div>
        <div class="block"><h3>Features</h3><ul class="flist">${m.features.map(x => `<li>${tick}${esc(x)}</li>`).join("")}</ul></div>
        <div class="block"><h3>Full specs</h3><table class="spec-table"><tbody>${specRows(m).map(([k, v]) => `<tr><th scope="row">${k}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table>
        <p class="note">Specs from Timpte's 2026 spec sheet. Empty weights are estimates; options change them.</p>${m.spec ? `<a class="btn btn-line sm" href="/specs/${m.spec}" target="_blank" rel="noopener" style="margin-top:12px">Download the spec sheet (PDF)</a>` : ""}</div>
      </div>
      <aside class="dside">
        <div><div class="eyebrow">Timpte ${DATA.series[m.type]} · ${typeLabel(m.type)}</div><h1 style="margin-top:8px">${esc(m.model)}</h1></div>
        <ul class="specs3"><li><b>${num(m.payload)} lb</b><span>Payload</span></li><li><b>${m.deckFt} ft</b><span>Deck</span></li><li><b>${esc(third(m).v)}</b><span>${third(m).l}</span></li></ul>
        <div class="dprice"><div><small class="muted">${price ? "List price" : "Price"}</small><div class="price ${price ? "" : "callp"}">${price || "Call for price"}</div></div><div class="pay" style="max-width:22em">${ANDY_LINE}</div></div>
        <div class="dbtns">
          <button class="btn btn-gold" data-act="quote-model" data-model="${esc(m.model)}">Get a quote</button>
          <button class="btn btn-line" data-act="say" data-say="Tell me about the ${esc(m.model)}">Ask ${A} about this model</button>
        </div>
        <div class="block" style="margin-top:8px"><h3>${units.length ? `${units.length} on the lot or on the way` : "Order one"}</h3>
          ${units.length ? `<div class="rows">${units.map(miniCard).join("")}</div>` : `<p style="margin:0;color:var(--text-2)">None on the lot right now. We order any configuration straight from Timpte. <a href="/?s=quote&m=${encodeURIComponent(m.model)}">Ask for a quote</a>.</p>`}</div>
      </aside></div>
      ${cat ? `<div class="block" style="margin-top:56px"><div class="sec-head" style="margin-bottom:18px"><h2 style="font-size:2.2rem">Other ${esc(cat.title)} models</h2><a class="btn btn-line sm" href="${catPath(m.type)}">All ${esc(cat.title)} trailers</a></div>
        <div class="line-grid">${Object.values(MODELS).filter(x => x.type === m.type && x.key !== m.key).map(x => `<a class="model" href="${modelPath(x)}"><div class="ph"><img src="${img(x.img)}" alt="${esc(x.model)}" loading="lazy"></div><div class="mb"><em>${num(x.payload)} lb payload</em><b>${esc(x.model)}</b><span>${esc(x.feat.join(" · "))}</span></div></a>`).join("")}</div></div>` : ""}
    </div></section>`;
  }
};

/* ---------- contact ---------- */
VIEWS.contact = {
  title: "Contact and visit · Timeless Trailers",
  html(r) {
    const b = DATA.business;
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Contact</div><div class="eyebrow">Visit · Call · Quote</div><h1 style="margin-top:10px">Come see the lot.</h1>
      <p class="lede">Walk the trailers, sit in the tilt, check the welds. Call ahead and we'll have the unit you're after pulled up front. ${esc(b.hours)}.</p></div></div>
    <section id="visit"><div class="wrap quote-grid"><div id="contact"><div class="eyebrow">Where and when</div><h2 style="margin-top:10px">${esc(b.name)}</h2>${visitList()}</div>${quoteFormHTML(r.q.m)}</div></section>`;
  }
};

/* ---------- owner resources ---------- */
VIEWS.resources = {
  title: "Owner resources · Timeless Trailers",
  html() {
    const b = DATA.business;
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Owner resources</div><div class="eyebrow">Own · Keep it rolling</div><h1 style="margin-top:10px">Owner resources.</h1>
      <p class="lede">The maintenance schedule, every Timpte spec sheet, the full catalog, and where to turn for parts, service and warranty.</p></div></div>
    <section style="padding-top:34px"><div class="wrap grid2">
      <div class="panel"><h3>Maintenance schedule</h3><table class="ttable"><thead><tr><th>When</th><th>What to check</th></tr></thead><tbody>${DATA.maintenance.map(([a, c]) => `<tr><td><b>${a}</b></td><td>${c}</td></tr>`).join("")}</tbody></table>
        <h4 style="margin:22px 0 6px">Warranty</h4><p style="margin:0;color:var(--text-2);font-size:.95rem">Timpte backs every trailer with a 3-year warranty. We handle the claim and the repair here in Waxhaw. Call ${b.phone} with your serial number, or <a href="/service/">book service</a>.</p>
        <h4 style="margin:22px 0 6px">Parts</h4><p style="margin:0;color:var(--text-2);font-size:.95rem">Timpte parts are ordered through us and picked up in Waxhaw. <a href="/parts/">Look up a part number</a>, or ask ${A}.</p></div>
      <div class="panel"><h3>Spec sheets</h3><ul class="docs">${Object.values(MODELS).filter(m => m.spec).map(m => `<li><a href="/specs/${m.spec}" target="_blank" rel="noopener">${esc(m.model)}<small>PDF · Timpte 2026 spec sheet</small></a></li>`).join("")}
        <li><a href="/specs/timpte-equipment-trailer-catalog-2026.pdf" target="_blank" rel="noopener">Timpte Equipment Trailer catalog<small>PDF · the whole 2026 lineup</small></a></li></ul></div>
    </div></section>`;
  }
};

/* ---------- privacy ---------- */
VIEWS.privacy = {
  title: "Privacy · Timeless Trailers",
  html() {
    const b = DATA.business;
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Privacy</div><div class="eyebrow">Plain words</div><h1 style="margin-top:10px">Privacy.</h1>
      <p class="lede">What this site collects, who sees it, and what we do with it.</p></div></div>
    <section style="padding-top:34px"><div class="wrap"><div class="panel" style="max-width:760px">
      <h3>What we collect</h3><p>When you ask for a quote, hold a unit, book service, request a part or ask about financing, we collect what you type into the form: your name, phone number, and what you told us about your trailer, load or truck. Nothing else is required.</p>
      <h3 style="margin-top:22px">Who sees it</h3><p>Your request goes to ${esc(b.name)} in Waxhaw, NC, and to nobody else. We use it to call or text you back about what you asked. We do not sell or share it.</p>
      <h3 style="margin-top:22px">${A}, our trailer advisor</h3><p>Chat and voice conversations with ${A} run on a service called Stammer. What you say to ${A} is used to answer you and may be reviewed by us so we can improve the answers. Don't put payment details or passwords into the chat; ${A} never asks for them.</p>
      <h3 style="margin-top:22px">Cookies and tracking</h3><p>This site remembers a few things in your own browser, like trailers you saved or compared, and that information stays on your device. We count visits with a privacy-respecting analytics service that does not use cookies and does not follow you to other sites.</p>
      <h3 style="margin-top:22px">Questions</h3><p>Call ${b.phone} or visit us at ${esc(b.address)}.</p>
    </div></div></section>`;
  }
};

/* ---------- 404 ---------- */
VIEWS.notfound = {
  title: "Page not found · Timeless Trailers",
  html() {
    return `<section><div class="wrap"><div class="empty" style="max-width:640px;margin:40px auto"><b>That page isn't here.</b>It may have moved, or the unit may have sold. <a href="/trailers/">See what's on the lot</a>, or <a href="/">start at the front door</a>.</div></div></section>`;
  }
};

/* ---------- account (demo site only) ---------- */





/* ---------- flair: reveal on scroll, counters, lightbox ---------- */
function enhance() {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rv = $$(".rv");
  if (reduce || !("IntersectionObserver" in window)) rv.forEach(e => e.classList.add("in"));
  else { const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .15 }); rv.forEach(e => io.observe(e)); }
  $$("[data-count]").forEach(el => {
    const end = +el.dataset.count; if (reduce || !end) return;
    const t0 = performance.now(), dur = 900;
    const step = now => { const p = Math.min(1, (now - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}
let lbIndex = 0;
function openLightbox(i) {
  const links = $$("[data-gallery] a"); if (!links.length) return;
  lbIndex = (i + links.length) % links.length;
  let dlg = $("#lightbox");
  if (!dlg) {
    dlg = document.createElement("dialog"); dlg.id = "lightbox"; dlg.className = "lightbox";
    dlg.innerHTML = `<div class="lb-wrap"><img alt=""></div><button class="lb-prev" data-act="lb-prev" aria-label="Previous photo">‹</button><button class="lb-next" data-act="lb-next" aria-label="Next photo">›</button><button class="lb-x" data-act="lb-close" aria-label="Close">×</button><div class="lb-cap"></div>`;
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
    document.body.appendChild(dlg);
  }
  const a = links[lbIndex]; $("img", dlg).src = a.getAttribute("href"); $(".lb-cap", dlg).textContent = `${lbIndex + 1} of ${links.length} · ${$("img", a).alt}`;
  if (!dlg.open) dlg.showModal();
}

/* ---------- admin (demo site only; the public site never gets this code) ---------- */


/* ==========================================================================
   ANDY (customer chat). Andy lives on Stammer; the site opens him in a panel on
   the right. The panel can't type into Stammer's window for the visitor, so a
   question typed on the site is copied to the clipboard and shown above the chat.
   ========================================================================== */
/* Two ways to reach Andy, both on Stammer: the chat window and the voice agent (a phone-style call in the browser).
   Every "Ask Andy" opens the panel on a chooser first; the visitor picks Chat or Voice, and can switch at the top of the panel. */
const STAMMER_EMBED = CONFIG.assistant.chat;
const VOICE_EMBED = CONFIG.assistant.voice;
const VOICE_ON = !!(VOICE_EMBED && CONFIG.assistant.voiceOn);
const chat = { mode: null, pendingQ: "", opener: null, booted: false, ctx: {} };
function loadChatFrame() {
  const box = $("#tzFrame"); if (!box || box.firstChild) return;
  const f = document.createElement("iframe");
  f.title = `Chat with ${A}`; f.setAttribute("allow", "clipboard-read; clipboard-write"); f.src = STAMMER_EMBED;
  box.appendChild(f);
}
function loadVoiceFrame() {
  const box = $("#tzVoiceBox"); if (!box || box.firstChild) return;
  const f = document.createElement("iframe");
  f.title = `Talk to ${A}`; f.setAttribute("allow", "microphone; autoplay"); f.width = "104"; f.height = "104"; f.src = VOICE_EMBED;
  box.appendChild(f);
}
/* Taking the voice frame out ends the call. Done when the visitor switches to chat or closes the panel, so Andy never keeps talking unseen. */
function unloadVoiceFrame() { const box = $("#tzVoiceBox"); if (box) box.innerHTML = ""; }
function showQ(q) {
  const box = $("#tzQ"); if (!box) return;
  if (!q) { box.hidden = true; box.innerHTML = ""; return; }
  box.hidden = false;
  if (chat.mode === "voice") { box.innerHTML = `<b>${esc(q)}</b><small>Tap the phone, then just say it.</small>`; return; }
  box.innerHTML = `<b>${esc(q)}</b><small>Type this in the chat below to send it.</small>`;
  try { navigator.clipboard.writeText(q).then(() => { const s = box.querySelector("small"); if (s) s.textContent = "Copied. Paste it in the chat below (Ctrl+V) to send."; }, () => {}); } catch (e) { /* fine */ }
}
function showChooser() {
  ["#tzSeg", "#tzNote", "#tzQ", "#tzFrame", "#tzVoice", "#tzFoot"].forEach(s => { const el = $(s); if (el) el.hidden = true; });
  $("#tzChoose").hidden = false;
}
function setMode(m) {
  chat.mode = m;
  $("#tzChoose").hidden = true; $("#tzSeg").hidden = false; $("#tzNote").hidden = false; $("#tzFoot").hidden = false;
  $$("#tzSeg button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.m === m)));
  $("#tzFrame").hidden = m !== "chat"; $("#tzVoice").hidden = m !== "voice";
  if (m === "chat") { unloadVoiceFrame(); loadChatFrame(); } else loadVoiceFrame();
  $("#tzFoot").innerHTML = m === "chat"
    ? `Chat not showing? <a href="${STAMMER_EMBED}" target="_blank" rel="noopener">Open the chat in a new tab</a>.`
    : `Nothing happening? Check that your browser allowed the microphone, or <a href="${VOICE_EMBED}" target="_blank" rel="noopener">open the voice line in a new tab</a>.`;
  $("#tzPanel").setAttribute("aria-label", m === "chat" ? `Chat with ${A}` : `Talk to ${A}`);
  showQ(chat.pendingQ);
}
function openChat(question, opener) {
  chat.opener = opener || document.activeElement;
  chat.pendingQ = typeof question === "string" ? question.trim() : "";
  const p = $("#tzPanel"); p.classList.add("open"); p.setAttribute("aria-hidden", "false");
  document.body.classList.add("chat-open"); $("#tzFab").setAttribute("aria-expanded", "true");
  if (VOICE_ON) { showChooser(); setTimeout(() => { const c = $("#tzChoose button"); if (c) c.focus(); }, 320); }
  else { setMode("chat"); $("#tzSeg").hidden = true; setTimeout(() => { const c = $("#tzClose"); if (c) c.focus(); }, 320); }
}
function closeChat() {
  const p = $("#tzPanel"); p.classList.remove("open"); p.setAttribute("aria-hidden", "true");
  document.body.classList.remove("chat-open"); $("#tzFab").setAttribute("aria-expanded", "false");
  unloadVoiceFrame();
  if (chat.opener && chat.opener.focus) chat.opener.focus();
}
function resetChat() { closeChat(); }
function addMsg() {}
function setChips() {}
function userSays(text) { openChat(String(text || "").trim()); }
/* ---- hold + quote modals (from buttons) ---- */
function holdModal(id) {
  const t = unit(id); if (!t) return;
  if (t.status !== "lot" && t.status !== "order") { toast(`${t.id} is ${statusInfo(t).label.toLowerCase()}.`); return; }
  const u = me(); const cu = u && u.role === "customer" ? u : null;
  openModal(`<h3>Hold ${t.id}</h3><p class="sub">${esc(tname(t))}${PRICES ? " · " + money(t.price) : ""}. We hold it ${CONFIG.holdHours || 48} hours while we confirm details. No payment online.</p>
    <form data-form="hold" data-id="${t.id}" novalidate><div class="fields">
      <div><label for="hName">Name</label><input id="hName" name="name" required value="${cu ? esc(cu.name) : ""}"></div>
      <div><label for="hPhone">Phone</label><input id="hPhone" name="phone" type="tel" required value="${cu ? esc(cu.phone) : ""}"></div></div>
      <div class="form-foot"><p>The team calls you today to confirm.</p><button class="btn btn-gold" type="submit">Hold this unit</button></div></form>`);
}


/* ---- validation ---- */
function need(f, names) {
  let ok = true, first = null;
  names.forEach(n => { const el = f.elements[n]; const v = el.value.trim(); const bad = !v || (n === "phone" && digits(v).length < 10); el.classList.toggle("bad", bad); if (bad) { ok = false; first = first || el; } });
  if (first) { first.focus(); toast(first.name === "phone" ? "Phone needs ten digits." : "Fill in the highlighted field."); }
  return ok;
}
const doneHTML = (h, p) => `<div class="done">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m7 12 3.5 3.5L17 9"/></svg>'}<h3>${h}</h3><p>${p}</p></div>`;

/* ---- sending a form to Matt ----
   The public site posts every form to /api/lead (worker.js emails it). The demo site keeps everything in the browser.
   If the send fails, the form stays put and shows the phone number; the site never claims "we'll call you" for a
   request nobody received. */
async function sendLead(f, kind, fields) {
  const e = f.elements;
  const payload = Object.assign({ kind, name: e.name.value.trim(), phone: e.phone.value.trim(), page: location.pathname + location.search, website: (e.website && e.website.value) || "" }, fields || {});
  if (DEMO) return { ok: true };
  const btn = f.querySelector("button[type=submit]"); const label = btn ? btn.textContent : "";
  if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
  try {
    const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const j = await res.json().catch(() => ({}));
    if (res.ok && j.ok) return { ok: true };
    throw new Error(j.error || ("HTTP " + res.status));
  } catch (err) {
    if (btn) { btn.disabled = false; btn.textContent = label; }
    let n = f.querySelector(".lead-fail");
    if (!n) { n = document.createElement("p"); n.className = "note lead-fail"; (f.querySelector(".form-foot") || f).appendChild(n); }
    n.innerHTML = `That didn't go through. Call or text <a href="tel:${DATA.business.tel}">${DATA.business.phone}</a> and we'll take it from there.`;
    toast("That didn't send. Please call us.");
    return { ok: false };
  }
}

const FORMS = {
  "hero-ask"(f) { const v = f.elements.q.value.trim(); if (!v) { f.elements.q.focus(); return; } f.reset(); userSays(v); },
  chat(f) { const v = f.elements.q.value; f.reset(); if (/^leave my number$/i.test(v.trim())) return userSays("Have someone call me"); userSays(v); },
  async quote(f) {
    if (!need(f, ["name", "phone"])) return;
    const e = f.elements; const first = e.name.value.trim().split(" ")[0];
    const tr = e.trailer.value.indexOf("Not sure") === 0 ? "the right trailer" : e.trailer.value;
    const r = await sendLead(f, "Quote request", { trailer: e.trailer.value, haul: e.haul.value, weight: e.weight.value, tow: e.tow.value, when: e.when.value, financing: e.fin.value, notes: e.notes.value });
    if (!r.ok) return;
    addLead({ name: e.name.value.trim(), phone: e.phone.value.trim(), interest: (tr === "the right trailer" ? "Help choosing" : tr) + (e.haul.value ? " · " + e.haul.value : ""), source: "Quote form" });
    f.querySelector(".fbody").innerHTML = doneHTML("Got it, " + esc(first) + ".", "We'll call you today about " + esc(tr) + " with availability, pricing and next steps.");
  },
  async hold(f) {
    if (!need(f, ["name", "phone"])) return;
    const t = unit(f.dataset.id);
    const r = await sendLead(f, "Hold request", { trailer: tname(t), stock: t.id, price: PRICES && t.price ? money(t.price) : "" });
    if (!r.ok) return;
    const h = createHold(t, f.elements.name.value.trim(), f.elements.phone.value.trim());
    closeModal(); rerender(); toast(`${t.id} is on hold until ${fmtWhen(h.expires)}.${DEMO ? ` <a href="/account/?s=a-holds">See it in My Account</a>` : " We'll call you today to confirm."}`, 5000);
  },
  async "parts-checkout"(f) {
    if (!need(f, ["name", "phone"])) return;
    const items = S.cart.slice();
    const r = await sendLead(f, "Parts request", { items: items.map(([id, q]) => { const p = DATA.parts.find(x => x.id === id); return (q > 1 ? q + " × " : "") + id + (p ? " " + p.name : ""); }).join("; "), unit: f.elements.unit.value });
    if (!r.ok) return;
    const o = createPartsOrder(items, f.elements.name.value.trim(), f.elements.phone.value.trim());
    addLead({ name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), interest: "Parts: " + items.map(([id, q]) => (q > 1 ? q + " × " : "") + id).join(", ") + (f.elements.unit.value.trim() ? " · " + f.elements.unit.value.trim() : ""), source: "Parts request" });
    S.cart = []; save();
    renderCart(); toast(`Request sent. We'll call ${esc(f.elements.phone.value.trim())} to confirm the price and the pickup day.${DEMO ? ` <a href="/account/?s=a-orders">My Account</a>` : ""}`, 6000);
  },
  async service(f) {
    if (!need(f, ["name", "phone"])) return;
    const e = f.elements;
    const r = await sendLead(f, "Service booking", { unit: e.unit.value, service: e.service.value, date: e.date.value, notes: e.notes.value });
    if (!r.ok) return;
    const tk = createTicket({ name: e.name.value.trim(), phone: e.phone.value.trim(), unit: e.unit.value, service: e.service.value, notes: e.notes.value.trim(), date: e.date.value ? new Date(e.date.value + "T12:00").toISOString() : null });
    f.innerHTML = doneHTML(`Ticket ${tk.id} open.`, `We'll call ${esc(e.phone.value)} to confirm drop-off${e.date.value ? " around " + fmtDate(tk.date) : ""}. ${me() ? '<a href="/account/?s=a-tickets">Track it in My Account</a>.' : ""}`);
  },
  async prequal(f) { if (!need(f, ["name", "phone"])) return; const r = await sendLead(f, "Financing pre-qualify", { price: money(fin.price), as: f.elements.as.value }); if (!r.ok) return; addLead({ name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), interest: "Financing pre-qualify · " + money(fin.price), source: "Financing" }); f.innerHTML = doneHTML("You're in line.", "The team will call today with real rates for " + money(fin.price) + "."); },
  
};

/* ==========================================================================
   ROUTER + EVENTS
   ========================================================================== */
/* Real page addresses. build.py writes one folder per address (so every page loads on its own and search engines
   can read it); this router takes over once the script runs, and keeps the old #/ links working. */
const CAT_SLUG = { tilt: "split-tilt", deckover: "deck-over", gooseneck: "gooseneck", dump: "dump", ezload: "ez-load" };
const SLUG_CAT = Object.fromEntries(Object.entries(CAT_SLUG).map(([k, v]) => [v, k]));
const PAGES = { "": "home", trailers: "inventory", stock: "trailer", finder: "finder", compare: "compare", parts: "parts", service: "service",
  "owner-resources": "resources", financing: "financing", about: "about", contact: "contact", privacy: "privacy", account: "account", admin: "admin", vision: "vision" };
function catPath(type) { return "/trailers/" + (CAT_SLUG[type] || "") + "/"; }
function modelPath(m) { return "/trailers/" + m.slug + "/"; }
function legacyPath(h) {
  const simple = { "#lot": "/trailers/", "#quote": "/?s=quote", "#match": "/?s=match", "#lineup": "/trailers/?s=lineup", "#top": "/" };
  if (simple[h]) return simple[h];
  if (!h.startsWith("#/")) return null;
  const [p, qs] = h.slice(2).split("?"); const parts = p.split("/").filter(Boolean); const q = new URLSearchParams(qs || "");
  const n = parts[0] || "home"; let path = "/";
  if (n === "inventory") { if (q.get("type")) { path = catPath(q.get("type")); q.delete("type"); } else path = "/trailers/"; }
  else if (n === "trailer" && parts[1]) path = "/stock/" + parts[1] + "/";
  else if (n === "service" && q.get("s") === "resources") { path = "/owner-resources/"; q.delete("s"); }
  else if (n === "about" && (q.get("s") === "contact" || q.get("s") === "visit")) { path = "/contact/"; q.delete("s"); }
  else if (n !== "home") path = "/" + n + "/";
  const s = q.toString(); return path + (s ? "?" + s : "");
}
function parseRoute() {
  const old = legacyPath(location.hash);
  if (old) history.replaceState(null, "", old);
  const parts = location.pathname.split("/").filter(Boolean).map(x => { try { return decodeURIComponent(x); } catch (e) { return x; } });
  const q = {}; new URLSearchParams(location.search).forEach((v, k) => { q[k] = v; });
  let name = PAGES[parts[0] || ""] || "notfound", arg = parts[1] || null;
  if (parts[0] === "trailers" && parts[1]) {
    if (SLUG_CAT[parts[1]]) { name = "inventory"; q.type = SLUG_CAT[parts[1]]; arg = null; }
    else { const m = Object.values(MODELS).find(x => x.slug === parts[1]); name = m ? "model" : "notfound"; arg = m ? m.key : parts[1]; }
  }
  if (!DEMO && (name === "account" || name === "admin" || name === "vision")) name = "home";
  if (!VIEWS[name]) name = "notfound";
  return { name, arg, q };
}
function go(path) {
  if (path !== location.pathname + location.search) history.pushState(null, "", path);
  render();
}
/* Internal links (an href that starts with / and isn't a file) change pages without reloading. */
function isInternal(a) {
  const h = a.getAttribute("href") || "";
  return h.startsWith("/") && !h.startsWith("//") && !/^\/(img|video|specs)\//.test(h) && !a.target && !a.hasAttribute("download");
}
window.addEventListener("popstate", () => render());
function render(keepScroll) {
  const prev = route.name;
  route = parseRoute();
  const v = VIEWS[route.name];
  const y = window.scrollY;
  $("#app").innerHTML = v.html(route);
  document.title = v.title;
  if (v.mount) v.mount(route);
  updateChrome(); refreshHearts(); closeMenus(); closeDrawer(); enhance();
  if (keepScroll) window.scrollTo(0, y);
  else if (route.q.s) setTimeout(() => { const el = document.getElementById(route.q.s) || (route.q.s === "watch" ? document.querySelector(".vid") : null); if (el) el.scrollIntoView({ behavior: prev === route.name ? "smooth" : "auto" }); }, 30);
  else window.scrollTo(0, 0);
}
function rerender() { render(true); }

document.addEventListener("click", e => {
  const menuBtn = e.target.closest(".menu > button");
  if (menuBtn) { const m = menuBtn.parentNode; const open = !m.classList.contains("open"); closeMenus(m); m.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open); return; }
  if (!e.target.closest(".menu")) closeMenus();
  const lb = e.target.closest("[data-lb]"); if (lb) { e.preventDefault(); openLightbox(+lb.dataset.lb); return; }
  const link = e.target.closest("a[href]");
  if (link && !link.dataset.act && isInternal(link) && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) { e.preventDefault(); closeModal(); go(link.getAttribute("href")); return; }
  const el = e.target.closest("[data-act]"); if (!el) return;
  const a = el.dataset.act, id = el.dataset.id;
  if (el.tagName === "SELECT" || (el.tagName === "INPUT" && el.type !== "checkbox")) return;
  switch (a) {
    case "save": e.preventDefault(); toggleSave(id); break;
    case "lb-prev": openLightbox(lbIndex - 1); break;
    case "lb-next": openLightbox(lbIndex + 1); break;
    case "lb-close": $("#lightbox").close(); break;
    case "cmp-toggle": toggleCompare(id); break;
    case "cmp-btn": toggleCompare(id); break;
    case "cmp-remove": toggleCompare(id); render(true); break;
    case "cmp-clear": S.compare = []; save(); render(true); break;
    case "cmp-starter": S.compare = ["TT-0155", "TT-0160"]; save(); render(true); break;
    case "hold": e.preventDefault(); holdModal(id); break;
    case "ask": { const t = unit(id); openChat(t ? `Tell me about the ${tname(t)}, stock ${t.id}` : "", el); break; }
    case "quote-model": closeModal(); go("/?s=quote&m=" + encodeURIComponent(el.dataset.model || "")); break;
    case "tessa-open": e.preventDefault(); closeDrawer(); openChat("", el); break;
    case "tessa-close": closeChat(); break;
    case "tz-mode": setMode(el.dataset.m === "voice" ? "voice" : "chat"); break;
    case "tessa-reset": resetChat(); break;
    case "say": {
      const s = el.dataset.say;
      userSays(s); break;
    }
    case "burger": openDrawer(); break;
    case "drawer-close": closeDrawer(); break;
    case "modal-close": closeModal(); break;
    case "inv-type": inv.type = el.dataset.type; renderInvGrid(); break;
    case "inv-clear": inv.type = "all"; inv.q = ""; $$("[data-search]").forEach(i => i.value = ""); renderInvGrid(); break;
    case "line-f": { const f = el.dataset.f; $$("[data-act=line-f]").forEach(x => x.setAttribute("aria-pressed", x === el)); $$(".model").forEach(m => { m.hidden = !(f === "all" || (" " + m.dataset.cat + " ").includes(" " + f + " ")); }); break; }
    case "f-cat": finder.cat = el.dataset.k; renderFinder(); break;
    case "f-restart": finder.cat = null; renderFinder(); break;
    case "cart-add": { const c = S.cart.find(x => x[0] === id); if (c) c[1]++; else S.cart.push([id, 1]); save(); renderCart(); toast("Added to your parts order."); break; }
    case "cart-qty": { const c = S.cart.find(x => x[0] === id); if (c) { c[1] += +el.dataset.d; if (c[1] < 1) S.cart = S.cart.filter(x => x[0] !== id); } save(); renderCart(); break; }
    case "parts-cat": partsUI.cat = el.dataset.c; $$("[data-act=parts-cat]").forEach(x => x.setAttribute("aria-pressed", x === el)); renderParts(); break;
    case "parts-series": partsUI.series = el.dataset.s; $$("[data-act=parts-series]").forEach(x => x.setAttribute("aria-pressed", x === el)); renderParts(); break;
    case "parts-fit": partsUI.fit = el.checked; renderParts(); break;
    case "fin-term": fin.term = +el.dataset.n; $$("[data-act=fin-term]").forEach(x => x.setAttribute("aria-pressed", x === el)); renderCalc(); break;
    
  }
});
document.addEventListener("change", e => {
  const el = e.target;
  if (el.dataset.act === "cmp-add" && el.value) { toggleCompare(el.value); render(true); return; }
  if (el.dataset.act === "inv-sort") { inv.sort = el.value; renderInvGrid(); return; }
  if (el.dataset.act === "fin-tr") { const t = unit(el.value); fin.id = el.value; if (t) { fin.price = t.price; fin.down = Math.round(t.price * DATA.finance.downPct / 100); $("#fPrice").value = fin.price; $("#fDown").value = fin.down; } renderCalc(); return; }
  
});
document.addEventListener("input", e => {
  const el = e.target;
  if (el.matches("[data-search]")) {
    inv.q = el.value;
    $$("[data-search]").forEach(i => { if (i !== el) i.value = el.value; });
    if (route.name !== "inventory") {
      inv.type = "all";
      history.pushState(null, "", "/trailers/"); render();
      if (el.isConnected) el.focus(); else { const q = $("#invQ"); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); } }
    }
    else renderInvGrid();
  }
  if (el.dataset.act === "parts-q") { partsUI.q = el.value; renderParts(); }
  if (el.dataset.fin) { fin[el.dataset.fin] = +el.value || 0; if (el.dataset.fin !== "apr") { fin.id = ""; const s = $("#fTr"); if (s) s.value = ""; } renderCalc(); }
});
document.addEventListener("submit", e => { const f = e.target; const k = f.dataset.form; if (!k || !FORMS[k]) return; e.preventDefault(); FORMS[k](f); });
document.addEventListener("keydown", e => {
  const lbd = $("#lightbox"); if (lbd && lbd.open) { if (e.key === "ArrowLeft") openLightbox(lbIndex - 1); if (e.key === "ArrowRight") openLightbox(lbIndex + 1); return; }
  if (e.key !== "Escape") return;
  if ($("#modal")) closeModal(); else if ($("#drawer")) closeDrawer(); else if ($(".menu.open")) closeMenus(); else if (!$("#tzPanel").hidden) closeChat();
});
function setMbar() { const m = $(".mbar"); const h = m && getComputedStyle(m).display !== "none" ? m.offsetHeight : 0; document.documentElement.style.setProperty("--mbar-h", h + "px"); }
window.addEventListener("resize", setMbar);
window.addEventListener("hashchange", () => render());
function buildChrome() {
  const b = DATA.business;
  $("#chromeTop").innerHTML = `
  <header class="site"><div class="wrap nav">
    <a class="logo" href="/" aria-label="Timeless Trailers home"><img src="${img("timeless-logo")}" alt="Timeless Trailers · Built once. Lasts forever."></a>
    <nav class="nav-links" id="navLinks" aria-label="Main"></nav>
    <div class="hsearch">${ICON.search}<label for="hSearch" class="sr">Search inventory</label><input id="hSearch" data-search placeholder="Search trailers" autocomplete="off"></div>
    <div class="nav-right"><button class="btn btn-gold btn-tessa" data-act="tessa-open">${ICON.spark}<span>Ask ${A}</span></button><div class="acct-slot" id="acctSlot"></div>
      <button class="burger" data-act="burger" aria-label="Open menu">${ICON.menu}</button></div>
  </div></header>`;
  $("#chromeBottom").innerHTML = `
  <footer><div class="wrap"><div class="fgrid">
    <div><img src="${img("timeless-logo")}" alt="Timeless Trailers"><p>${esc(CONFIG.wording.exclusive)} · ${esc(b.address)} · ${b.phone} · ${b.hours}</p><a class="tbadge" href="${b.timpte}" target="_blank" rel="noopener"><img src="${img("timpte-et-logo")}" alt="Timpte Equipment Trailers" loading="lazy"><span>Timpte-exclusive CSC</span></a></div>
    <div><h4>Shop</h4><a href="/trailers/">On the lot</a><a href="/trailers/?s=lineup">Lineup</a><a href="/finder/">Trailer Finder</a><a href="/compare/">Compare</a></div>
    <div><h4>Own</h4><a href="/parts/">Parts</a><a href="/service/">Service</a><a href="/owner-resources/">Owner resources</a><a href="/financing/">Financing</a></div>
    <div><h4>Company</h4><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/owner-resources/">Owner resources</a><a href="/privacy/">Privacy</a>${DEMO ? footerDemoHTML() : ""}</div>
  </div><div class="fbot"><span>${DEMO ? footerDemoNote() : `© ${new Date().getFullYear()} ${esc(b.name)} · Site by <a href="https://albright-innovations.com" target="_blank" rel="noopener">${esc(CONFIG.site.builtBy)}</a>`}</span>${DEMO ? footerResetHTML() : ""}</div></div></footer>
  <div class="mbar"><a class="btn btn-line-light" href="/trailers/">On the lot</a><a class="btn btn-gold" href="/?s=quote">Get a quote</a></div>
  <div class="cmp-tray" id="cmpTray" hidden></div>
  <div class="toasts" id="toasts" aria-live="polite"></div>
  <button class="tz-fab" id="tzFab" data-act="tessa-open" aria-expanded="false" aria-controls="tzPanel" aria-label="Ask ${A}, our trailer advisor"><span class="bubble"><small>Trailer advisor</small>Ask ${A}</span><span class="andy"><img class="f1" src="${img("andy-1")}" alt="" width="160" height="160"><img class="f2" src="${img("andy-2")}" alt="" width="160" height="160"><img class="f3" src="${img("andy-3")}" alt="" width="160" height="160"></span></button>
  <aside class="tz-panel" id="tzPanel" role="dialog" aria-label="Ask ${A}" aria-hidden="true">
    <div class="tz-head"><img class="av av-img" src="${img("andy-face")}" alt="" width="40" height="40"><div><b>${A}</b><small>Timeless trailer advisor · online</small></div><span class="sp"></span>
      <div class="tz-seg" id="tzSeg" hidden role="group" aria-label="Chat or voice"><button type="button" data-act="tz-mode" data-m="chat" aria-pressed="false">Chat</button><button type="button" data-act="tz-mode" data-m="voice" aria-pressed="false">Voice</button></div>
      <button id="tzClose" data-act="tessa-close" aria-label="Close">${ICON.x}</button></div>
    <div class="tz-choose" id="tzChoose">
      <p class="tz-choose-h">How do you want to ask ${A}?</p>
      <button type="button" class="tz-choice" data-act="tz-mode" data-m="chat"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12z"/></svg></i><span><b>Chat with ${A}</b><small>Type your question and read the answer.</small></span></button>
      ${VOICE_ON ? `<button type="button" class="tz-choice" data-act="tz-mode" data-m="voice"><i>${ICON.phone}</i><span><b>Talk to ${A}</b><small>Speak and hear the answer, like a phone call.</small></span></button>` : ""}
      <p class="tz-choose-note">Either way, a person at Timeless confirms every price and hold.</p>
    </div>
    <p class="tz-note" id="tzNote" hidden>Ask about any Timpte model, what fits your machine, or what your truck can tow. A person at Timeless confirms every price and hold.</p>
    <div class="tz-q" id="tzQ" hidden aria-live="polite"></div>
    <div class="tz-frame" id="tzFrame" hidden></div>
    <div class="tz-voice" id="tzVoice" hidden>
      <div class="tz-voice-box" id="tzVoiceBox"></div>
      <b>Tap the phone to start talking.</b>
      <p>Say what you haul and what you tow. ${A} answers out loud. Allow the microphone when your browser asks, and tap the phone again to hang up.</p>
    </div>
    <div class="tz-foot" id="tzFoot" hidden></div>
  </aside>`;
}
document.addEventListener("DOMContentLoaded", () => { buildChrome(); setMbar(); render(); });

