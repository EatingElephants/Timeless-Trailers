# Timeless Trailers website concept

A clickable mock-up for Matt Lyons's Timpte dealership in Waxhaw, NC, built by Albright Agency. Version 3: real Timpte models, specs, photos and video, with Andy, the trailer advisor.

## Where we left off (October 10, 2026)

- **v3 is built** (real Timpte models plus the flair pass: full-screen video hero, exclusive-dealer band, photo tiles and backdrops, lightbox galleries). Matt reviews it next.
- **Confirm with Matt:** the exact wording of "The only exclusive Timpte Equipment Trailer dealer in the United States" (hero, band under the hero, About) before it goes beyond the mock-up.
- **Hero video:** `site/video/hero-full.mp4` is a 59-second silent montage; `tools/hero_montage.ps1` rebuilds it if the clips should change.
- **Search engines:** the mock-up is one page with `#/` addresses and is marked noindex. The finished site needs one real address per model and category plus a sitemap; the structured data in `src/shell.html` (built by `build.py`) carries over.
- **To look at it:** double-click `preview.bat`. Your browser opens it at http://localhost:8766. Or open the hosted link once Cloudflare is connected (see below).
- **Still sample:** prices, stock numbers, who's on the lot, the demo people, machine weights and truck tow ratings. Everything about the trailers themselves comes from Timpte's 2026 spec sheets.
- **Not built yet** (listed on the site's "What the finished site adds" page): the other 9 Timpte models, video chapters and a Videos page, owner how-to videos, part-number lookup, Andy answering spec questions, Matt's real inventory, quotes and holds going to a real inbox.
- **After Matt's feedback:** edit `src/data.js` (models, stock, copy), rebuild, commit, push. One push updates the hosted link.

## The one rule

Edit files in `src/`, never `site/index.html`. The build overwrites it.

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
| The demo people, parts, services, sample leads | `src/data.js`, further down |
| Page layout and copy | `src/app1.js` (pages) and `src/app2.js` (Andy, admin, chat) |
| Colors, fonts, spacing | `src/styles.css` |
| Which Timpte photos are used | `tools/make_images.py`, then run it |
| Which spec sheets are published | `build.py`, the `SPECS` list |
| Videos | made once by `tools/encode.ps1` with ffmpeg; the finished copies are in `site/video/` |

## Timpte material

Source library: `OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content`. Only spec sheets, the catalog, photos, videos and logos are published. The sales bulletins, order form, branding guide, marketing recommendations and the priced parts catalog are dealer-only and must never go in `site/`. The build stops if it finds one.

Bulletin #070: use the **Timpte Equipment Trailer** logo (not the corporate Timpte logo) on dealer marketing. The site does.

## Hosting

The `site` folder is what gets published. Connect this repo in Cloudflare (Workers & Pages, create, connect to Git, pick this repo) and set the deploy/output directory to `site`. No build command. Every file is under Cloudflare's 25 MB limit; the build checks.
