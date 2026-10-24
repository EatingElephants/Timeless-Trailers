# Timeless Trailers: how the site is put together

Plain-words notes for the people who own and run this. Kept in the repo on purpose: when the code changes, this file changes with it. Last updated October 22, 2026.

## 1. The safety net (how to go back in time)

Every push to GitHub is a snapshot of the entire site. Nothing is ever lost or overwritten; each snapshot has a short note saying what changed. To see them: github.com/EatingElephants/Timeless-Trailers → **Commits**.

To go back: tell Claude "take the site back to how it was on October 20" (or point at a specific snapshot). The old version is restored as a new snapshot, so the history stays intact and the step back can itself be undone. Cloudflare also keeps its own list of past deployments (Workers & Pages → the site → Deployments) with a Rollback button per entry.

Three written records are kept current:

- `README.md` → "Where we left off" and "Going live": what state the site is in and what's next.
- `CLAUDE.md`: the rules of the build (what not to touch, what must stay true), read by Claude at the start of every session.
- this file: the shape of the site and the decisions behind it.

## 2. The three layers

```
┌──────────────────────────────────────────────────────────────────┐
│  WHAT A CUSTOMER SEES  (site/ → Matt's domain)                   │
│  pages, photos, video, Andy, forms                               │
├──────────────────────────────────────────────────────────────────┤
│  WHAT THE DEALER SEES  (site-demo/ → demo link; later Zoho)      │
│  inventory, leads, holds, quotes, accessory orders, tickets      │
├──────────────────────────────────────────────────────────────────┤
│  THE DATA  (src/*.json)                                          │
│  config.json · models.json · inventory.json · accessories.json   │
└──────────────────────────────────────────────────────────────────┘
```

Both sites are built from the same source by `build.py`. The public site has the dealer layer cut out of it entirely (not hidden: removed), so a customer's browser never downloads it.

## 3. The customer site, page by page

| Address | What it is | Where the content comes from |
|---|---|---|
| `/` | Home: hero video, exclusive-dealer band, shop by category, on the lot, Meet Andy, Why Timpte, what-are-you-hauling, quote form | `config.json`, `inventory.json`, `data.js` |
| `/trailers/` | Every unit on the lot or on order, plus all 19 models to order | `inventory.json`, `models.json` |
| `/trailers/split-tilt/` `/trailers/deck-over/` `/trailers/gooseneck/` `/trailers/dump/` `/trailers/ez-load/` | One page per category: its units and its models | same |
| `/trailers/1420-split-tilt/` (one per model, 19) | The model: specs from Timpte's sheet, photos, video, spec-sheet download, units on the lot, Ask Andy, Get a quote | `models.json` |
| `/stock/TT-0160/` (one per unit on the lot) | The unit: its model's specs plus stock number, status, price, hold button | `inventory.json` + `models.json` |
| `/finder/` | Pick what you haul → the Timpte family built for it → Ask Andy for the exact fit | `data.js` (loadCats) |
| `/compare/` | Up to three units side by side | browser memory |
| `/accessories/` | Timpte's accessories (spare tires and holders, rock guards, dump add-ons, winches, tie-downs, toolboxes) with part number, picture and MSRP, and a request that goes to Matt | `accessories.json` |
| `/owner-resources/` | Maintenance schedule, every spec sheet, warranty and accessories help | `models.json`, `data.js` |
| `/financing/` | Payment calculator, pre-qualify form | `data.js` (starting terms) |
| `/about/` | The exclusive-dealer story, how we sell, who you'll talk to | `config.json` (team, wording) |
| `/contact/` | Address, hours, map link, quote form | `config.json` |
| `/privacy/` | What the forms collect and who sees it | fixed text |
| `/404.html` | Page not found | fixed text |

Also on every page: the header menu (About us, Inventory, Accessories, Financing, Owner resources, Contact us), the Ask Andy button and corner mascot, the footer, and `sitemap.xml` / `robots.txt` for search engines.

**Andy** is not part of the site's code. He runs on Stammer (chat and voice). The site opens him in its own side panel and passes him a question. The site never answers trailer questions itself, by design: one source of answers, kept up to date in one place.

**Forms** (quote, hold, accessories request, pre-qualify) post to `/api/lead`, a tiny piece of server code (`worker.js`) that emails the request to Matt. If that ever fails, the form shows the phone number instead of a false "we'll call you".

## 4. The dealer side (today a demo, tomorrow Zoho)

The demo site adds: sign in (one click, no password), **My Account** for a customer (saved trailers, holds, quotes, accessory orders, service tickets), and the **Dealer console** for Matt (inventory with inline price and status edits, a leads board, holds, quotes, accessory orders, service tickets, an activity log, and "Andy for the dealership": type "drop the 1614 dump to $15,900", confirm, done).

Everything in the demo back end lives in the visitor's own browser; nothing is sent anywhere. It exists to show what the real thing does.

**The real thing is Zoho CRM (phase two).** Leads, contacts, quotes, follow-up, the pipeline board and service tickets belong in Zoho. When it's connected, `worker.js` gets a second destination next to the email (a Zoho webhook), the forms don't change at all, and the demo tabs come out of the dealer site. The website keeps what a website is good at: inventory, prices, specs, photos, video and Andy.

## 5. The data files (what makes this one dealer's site)

| File | Holds | Who edits it |
|---|---|---|
| `src/config.json` | Name, phone, address, hours, map link, Andy's name and Stammer addresses, wording, the team on the About page, and the switches: `showPrices`, `assistant.voiceOn`, `site.indexable`, `site.url`, `analytics.cloudflareToken`, `leads.to` | Josh, on Matt's word |
| `src/models.json` | The 19 Timpte models: every spec number, photos, video, spec sheet, list price, web address | Josh, from Timpte's sheets |
| `src/inventory.json` | The units on the lot: stock number, model, year, status, price, arrival date | Matt's list, keyed in by Josh; later a feed |
| `src/accessories.json` | The 28 Timpte accessories: part number, name, what it fits, MSRP, picture | made by `tools/accessories_from_orderform.py` from Timpte's order form; only the `image` field by hand |
| `src/data.js` | Everything that isn't about one dealer: categories, lineup, videos, finder labels, maintenance schedule, and the demo site's sample people and records | Josh |

Media: `site/img/` (photos, made from Timpte's library and Andy's drawings by the scripts in `tools/`), `site/video/` (compressed Timpte footage and the hero montage), `site/specs/` (Timpte's spec sheets, copied in by the build).

## 6. Where this goes (the phases)

1. **Phase one, this weekend:** the customer site on Matt's domain, leads by email, Andy live. *What's needed: domain, Matt's inventory and prices, his lead email, sign-offs.*
2. **Phase two, Zoho:** forms and Andy's conversations land in Zoho CRM; the demo console retires. *Needed: Matt's Zoho account and a webhook address.*
3. **Inventory tie-in:** `inventory.json` is produced from Matt's system (Zoho Inventory, or an export from whatever he tracks units in) instead of being typed. The pages already read it, so nothing visible changes. *Needed: where Matt keeps his lot list.*
4. **Storefront (e-commerce):** accessories first, through a hosted checkout linked from the Accessories page, then deposits on units. *Needed: Matt's tax and pickup rules, a payment account in his name.*
5. **White label:** a second dealer is a second `config.json`, `models.json` (if a different brand), `inventory.json`, `accessories.json` and media folder, published to that dealer's own Cloudflare account from the same code. The demo site becomes the sales demo for other dealers.

## 7. Who owns what

| Thing | Owner | Why |
|---|---|---|
| The domain | Matt | it's his business's address |
| Cloudflare account (live site, email routing, analytics) | Matt, with Josh as Administrator | Matt holds the keys; Josh does the clicks |
| Stammer (Andy) | Matt, or billed through Albright | a running monthly cost of the dealership |
| The code (this repository) | Albright Agency | it's the product that other dealers will run; Matt can have a copy any time |
| Matt's data: inventory, prices, photos of his units, contact details | Matt | lives in the data files and media; portable |
| The preview and demo links on workers.dev | Albright Agency | sales and review tools |

## 8. Decisions log

- **Oct 10:** v3 built on real Timpte models, specs, photos and video. Full-screen video hero.
- **Oct 11:** Andy moved to Stammer; the site's own chat answers were archived (`archive/local-matcher.js`). Stammer is the only source of answers. Zoho named as phase two for leads and the relationship side.
- **Oct 13:** two sites from one build (public without the back end, demo with it), at Matt's request.
- **Oct 19:** menu order set (About us, Inventory, Parts and services, Financing, Owner resources, Contact us); the phone/hours strip removed; the word "AI" removed everywhere (Andy is "the trailer advisor").
- **Oct 20:** hero video rebuilt so the trailer is visible in every scene; Chat-or-Voice chooser; cartoon Andy in the corner, three poses on a loop; concept banner removed; Stammer voice found to need a funded wallet (error 402).
- **Oct 22:** go-live plan agreed (public site by Sunday Oct 25, Matt's domain, leads by email, list prices on, parts from the Timpte catalog). Real page addresses, data split into JSON files, all 19 models, `worker.js` lead endpoint, phone-size hero video. Ownership split agreed (section 7).
- **Oct 24:** Matt's review round one. "Dealer" → "Customer Service Center (CSC)" in all customer copy; city dropped from the hero eyebrow; pin line dropped from the exclusive band; Timeless logo on Andy's cap (alignment to be refined); "Matt confirms every price" line and the spec-sheet disclaimer removed; Why Timpte rewritten around Lincoln, Nebraska and American-made parts; a Made in the USA sticker with a rippling flag fixed bottom-left on every page.
- **Oct 24, later rounds:** "the owner chose Timpte" wording (no name); Financing says "Payment options offered through preferred vendors"; quotes answered "within 24 hours"; hours Mon–Fri 8am–5pm, Saturday by appointment; every form goes to matt.lyons@timelesstrailers.com; the pre-qualify "we'll call" lines out; spec-sheet thumbnails with a large hover preview on the words only; the Timpte catalog removed from Owner resources; Contact page says to call ahead for a walk-around in the staging area, with the logo beside the form.
- **Oct 24, Accessories:** the Parts and Service pages are gone, replaced by one Accessories page: 28 accessories with part numbers and MSRP from Timpte's Dealer Order Form (9.23.26), pictures for 13 (Timpte stock shots of the accessory on a trailer) and a group icon for the rest until product photos arrive. The parts catalog data was deleted outright at Matt's request, never to return. `/parts/` and `/service/` redirect. Owner resources keeps the maintenance schedule and warranty contact; the demo console keeps service tickets as a dealer-side record only. Sample lot units show their model's MSRP.
- **Oct 24, evening:** every label in the header, footer and phone bar is in Title Case (On the Lot, Owner Resources, Contact Us, Get a Quote); the footer's Timpte logo is the white-lettering transparent version (`timpte-et-logo-white.webp`, `tools/timpte_white_logo.py`) with no white box; the Made in the USA badge is still and straight because the rippling one looked crooked; Josh then asked for the look of a red rubber-stamp MADE IN USA on aluminum with weld remnants, and then, seeing the plate, settled on just the red stamp: a tilted, worn MADE IN USA rubber stamp drawn in code (an SVG filter does the wear), floating at the top right under the header so the compare tray keeps the bottom left; the logo on Andy's cap is centred on the front panel and tilted with the brim (`tools/cap_logo.py`).
