# Timeless Trailers website concept

A clickable mock-up for Matt Lyons's Timpte dealership in Waxhaw, NC, built by Albright Agency. Version 3: real Timpte models, specs, photos and video, with Andy, the trailer advisor.

## Where we left off (October 13, 2026)

- **Two sites, one build.** Matt asked for a normal trailer site without the back end, and a second one with it. `build.py` now writes both from the same `src/` files:
  - `site/` is the **public site**: no sign-in, no My Account, no dealer console, no sample people, "Call for price" everywhere. The back-end code is cut out of the file, not just hidden. Link: https://timeless-trailers.jsalbrig-studio.workers.dev/
  - `site-demo/` is the **demo site**: everything above plus the back end. Sign in as a customer (Dana, Marcus) or as Matt or Kayla, My Account, the dealer console, sample prices and payments, the demo tour, sample reviews, the "What the finished site adds" page, and "Reset demo" in the footer. Link, once Josh adds the second Worker in Cloudflare (steps under Hosting): https://timeless-trailers-demo.jsalbrig-studio.workers.dev/
  - How it works: in `src/*.js`, anything between a `/* @demo */` line and a `/* @end-demo */` line is demo-only. The constant `DEMO` is `false` on the public site and `true` on the demo site. One fix to a trailer page lands on both sites.
- **v3 is built** (real Timpte models plus the flair pass: full-screen video hero, exclusive-dealer band, photo tiles and backdrops, lightbox galleries). Matt reviews it next.
- **Confirm with Matt:** the exact wording of "The only exclusive Timpte Equipment Trailer dealer in the United States" (hero, band under the hero, About) before it goes beyond the mock-up.
- **Andy runs on Stammer, and only Stammer answers customers.** The site opens him in a slide-in panel on the right (`STAMMER_EMBED` in `src/app2.js` holds the chat address). A question typed on the site is copied to the clipboard and shown above the chat for the visitor to paste; Stammer's window can't be pre-typed from outside. The old demo matcher (sample machine weights, truck tow ratings, scripted fit/tow answers) is in `archive/local-matcher.js` and is not loaded. The Trailer Finder now only points at a Timpte family; anything specific goes to Andy. The dealer-console Andy (price drops, add units) is still the site's own demo, behind the demo sign-in.
- **Approved wording:** "The only dealer in the U.S. that sells Timpte equipment trailers exclusively." Short form: "America's only Timpte-exclusive dealer." Andy line: "Andy matches the trailer to your load and truck, then Matt sends your quote the same business day."
- **Hero video:** `site/video/hero-full.mp4` is a 59-second silent montage; `tools/hero_montage.ps1` rebuilds it if the clips should change.
- **Search engines:** the mock-up is one page with `#/` addresses and is marked noindex. The finished site needs one real address per model and category plus a sitemap; the structured data in `src/shell.html` (built by `build.py`) carries over.
- **To look at it:** double-click `preview.bat` for the public site (http://localhost:8766) or `preview-demo.bat` for the demo site (http://localhost:8767). Both can run at once. Or use the hosted links above.
- **Parts page:** the 14 parts listed are placeholders I made up, not Timpte's. Josh has a real parts page to supply; it replaces them in `src/data.js` `parts`. Prices on parts and service show only on the demo site.
- **Still sample:** prices, stock numbers, who's on the lot, the demo people, machine weights and truck tow ratings. Everything about the trailers themselves comes from Timpte's 2026 spec sheets.
- **Not built yet** (listed on the site's "What the finished site adds" page): the other 9 Timpte models, video chapters and a Videos page, owner how-to videos, part-number lookup, Andy answering spec questions, Matt's real inventory, quotes and holds going to a real inbox.
- **Zoho is phase two, and it owns the relationship side.** Decided Oct 11: leads, contacts, quotes, follow-up, the pipeline board and service tickets go to Zoho CRM (shared with Axis Ice). The website keeps inventory, prices, status, photos, specs and Andy. When Zoho is in, every lead-producing form and Andy post into Zoho (webhook), and the demo Leads, Quotes, Holds, Parts and Service tabs in the dealer console come out. Don't build CRM features into the site.
- **After Matt's feedback:** edit `src/data.js` (models, stock, copy), rebuild, commit, push. One push updates both hosted links.

## The one rule

Edit files in `src/`, never `site/index.html` or `site-demo/index.html`. The build overwrites both.

## How to change something

1. Edit the file in `src/` (see the map).
2. Double-click `build.bat` (or run `py -3 build.py`).
3. Commit and push. Cloudflare publishes within a minute.

## Where things are

| You want to change | Open |
|---|---|
| A trailer's specs, blurb, photos or video | `src/data.js`, the `MODELS` list at the top |
| What's on the lot, prices, stock numbers | `src/data.js`, `inventory` |
| Andy's name | `src/data.js`, `ASSISTANT_NAME` |
| Parts, services, the About page team | `src/data.js`, further down |
| The demo people, sample reviews, sample leads, quotes and tickets (demo site only) | `src/data.js`, after the `/* @demo */` line near the bottom |
| Page layout and copy | `src/app1.js` (pages) and `src/app2.js` (Andy, admin, chat) |
| What is demo-only | anything between `/* @demo */` and `/* @end-demo */` in `src/*.js`, and anything behind `DEMO ?` |
| The banner across the top of each site | `build.py`, `BANNER_PUBLIC` and `BANNER_DEMO` |
| Colors, fonts, spacing | `src/styles.css` |
| Which Timpte photos are used | `tools/make_images.py`, then run it |
| Which spec sheets are published | `build.py`, the `SPECS` list |
| Videos | made once by `tools/encode.ps1` with ffmpeg; the finished copies are in `site/video/` |

## Timpte material

Source library: `OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content`. Only spec sheets, the catalog, photos, videos and logos are published. The sales bulletins, order form, branding guide, marketing recommendations and the priced parts catalog are dealer-only and must never go in `site/`. The build stops if it finds one.

Bulletin #070: use the **Timpte Equipment Trailer** logo (not the corporate Timpte logo) on dealer marketing. The site does.

## Hosting

Two Cloudflare Workers, both fed from this one GitHub repo. Every push updates both. Every file is under Cloudflare's 25 MB limit; the build checks.

**Public site** (already set up): Worker `timeless-trailers`, settings in `wrangler.jsonc`, publishes the `site` folder. No build command, deploy command `npx wrangler deploy`.

**Demo site** (Josh sets this up once, about five minutes):

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → pick `EatingElephants/Timeless-Trailers`.
2. Project name: `timeless-trailers-demo`.
3. Build command: `cp -r site/img site/video site/specs site-demo/` (this copies the photos, videos and spec sheets next to the demo page; they are not stored twice in the repo).
4. Deploy command: `npx wrangler deploy --config wrangler.demo.jsonc`.
5. Save and deploy. The link is https://timeless-trailers-demo.jsalbrig-studio.workers.dev/

The existing public Worker is not touched. If the demo site ever shows missing photos, the build command in step 3 is what to check.
