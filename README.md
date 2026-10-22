# Timeless Trailers website concept

A clickable mock-up for Matt Lyons's Timpte dealership in Waxhaw, NC, built by Albright Agency. Version 3: real Timpte models, specs, photos and video, with Andy, the trailer advisor.

## Going live (plan agreed October 22, 2026: public site live by Sunday, October 25)

Timpte's leadership liked the site, Andy and the dealer back end. Phase one is the customer site on Matt's own domain. The agreed plan is in the repo's history as `Timeless Trailers: public site live by Sunday`; the short version:

- **Done Thursday:** real page addresses (one folder per page, sitemap, 404, structured data), dealer data in plain files (`src/config.json`, `models.json`, `inventory.json`, `parts.json`), prices switched on, the Parts page on Timpte's full catalog (324 parts), Owner resources, Contact and Privacy pages, sample manuals and warranty form removed, `worker.js` lead endpoint and the forms wired to it (answers "call us" until the domain is in), a phone-size hero video, all 19 Timpte models with numbers from the 2026 sheets (the nine new ones reuse their family's photos until Timpte or Matt supplies model-specific shots).
- **Friday:** domain into Cloudflare, Email Routing on, lead email switched on in `wrangler.jsonc`; analytics token; Matt's answers folded in.
- **Saturday:** Matt's real inventory and list prices into `inventory.json`, device testing, domain attached to the Worker.
- **Sunday:** `config.json` → `"indexable": true`, final push, submit the sitemap in Google Search Console, one real test lead.

**Needed from Matt (the long poles):** the domain name and a login or someone to change its nameservers; the lot list with stock numbers, status and list prices (plus list prices per model if he wants those shown); his lead email address and one click on Cloudflare's verification email; sign-offs on the hold wording, the About page names, hours, financing wording, and whether the parts catalog prices are customer prices.

**Switches in `src/config.json`:** `site.url` (the live domain, once known), `site.indexable` (false until launch), `showPrices`, `showPartsPrices`, `assistant.voiceOn`, `analytics.cloudflareToken`, `leads.to`.

## Where we left off (October 20, 2026)

- **Oct 20, for the Timpte visit (done, live on both sites):**
  - **Hero video rule:** the trailer has to be clearly in every scene. The montage now opens with the Corvette on the EZ Load deck, then a '55 Chevy and a Porsche on EZ Loads from Timpte's product reel (caption strip cropped off), then the UTV, skid steer, telehandler and gooseneck ramps. The bottom shade is lighter and the hero paragraph shorter so the deck isn't buried under the text. Recipe: `tools/hero_montage.ps1`.
  - **Ask Andy opens a chooser:** Chat with Andy (Stammer chat) or Talk to Andy (Stammer voice agent, embed id `d44a66c8-...` in `src/app2.js` as `VOICE_EMBED`). A Chat/Voice switch sits in the panel head. Leaving voice or closing the panel ends the call. The voice button is Stammer's blue phone; a color filter in `src/styles.css` shifts it to our gold. Josh can test a real call on his laptop (the preview pane blocks the microphone). If Stammer offers button settings, that's where to change its shape.
  - **Andy the mascot:** a cartoon Andy (gold cap, beard, clipboard) sits bottom right with an "Ask Andy" bubble and is the button. Three drawings crossfade in a 12-second loop: waving, looking at you, reading his clipboard. His face is the avatar in the hero ask box, Meet Andy and the panel head. Drawn in Canva (design "Blank square holding page" in Josh's Canva; page 1 is a sample poster Canva added, pages 2 to 5 are the Andys). Originals: `03 Media\Andy\` next to the Timpte library. `tools/make_andy.py` makes the web files in `site/img/` (`andy-1/2/3.webp`, `andy-face.webp`, `andy-thumbs.webp`, the last one unused so far). A properly rigged, page-turning animation would need an animator and layered artwork.

- **Oct 19 small edits (done, live on both sites):** menu order is About us, Inventory, Parts and services, Financing, Owner resources, Contact us; the phone/hours/address strip above the header is gone; the word "AI" is gone everywhere (Andy is "trailer advisor"). Josh fixes the Timpte spelling and any AI wording inside Stammer himself. The demo Worker is live at https://timeless-trailers-demo.jsalbrig-studio.workers.dev/.
- **Big edits still to come** (agreed order): real page addresses for Google, the other nine Timpte models, then form delivery once the Zoho timing is known. Matt's inputs still needed: real lot list and photos, domain name, wording sign-offs, Josh's parts file.

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

Edit files in `src/`, never anything in `site/` or `site-demo/`. The build overwrites both folders (every page, `app.js`, `site.css`, the sitemap).

## Page addresses

Every page has its own address: `/`, `/trailers/` (the lot and the lineup), `/trailers/split-tilt/` and the other four categories, `/trailers/1420-split-tilt/` and one page per model, `/stock/TT-0160/` and one per unit on the lot, `/finder/`, `/compare/`, `/parts/`, `/service/`, `/owner-resources/`, `/financing/`, `/about/`, `/contact/`, `/privacy/`. The demo site adds `/account/`, `/admin/` and `/vision/`. Old `#/` links still work. `build.py` writes each page with its own title, description and structured data so search engines can read it, and the script takes over from there.

## How to change something

1. Edit the file in `src/` (see the map).
2. Double-click `build.bat` (or run `py -3 build.py`).
3. Commit and push. Cloudflare publishes within a minute.

## Where things are

| You want to change | Open |
|---|---|
| The dealer: name, phone, address, hours, Andy's name and addresses, the switches | `src/config.json` |
| A trailer model's specs, blurb, photos, video, list price | `src/models.json` (one entry per Timpte model; `slug` is its web address) |
| What's on the lot: stock numbers, status, prices | `src/inventory.json` |
| Parts | `src/parts.json`, made by `tools/parts_from_catalog.py` from Timpte's catalog PDF; don't edit by hand |
| Services, maintenance schedule, categories, lineup, videos | `src/data.js` |
| The demo people, sample reviews, sample leads, quotes and tickets (demo site only) | `src/data.js`, after the `/* @demo */` line near the bottom |
| Page layout and copy | `src/app1.js` (pages) and `src/app2.js` (Andy, admin, chat) |
| What is demo-only | anything between `/* @demo */` and `/* @end-demo */` in `src/*.js`, and anything behind `DEMO ?` |
| Andy's chat or voice addresses | `src/app2.js`, `STAMMER_EMBED` and `VOICE_EMBED` |
| Andy's cartoon (corner button, avatars) | originals in `03 Media\Andy\`, then run `tools/make_andy.py` |
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

### Go-live clicks (Josh, Friday to Sunday)

1. **Domain into Cloudflare.** Cloudflare dashboard → Add a domain → type Matt's domain → Free plan → it shows two nameservers. At the registrar (where Matt bought the domain), replace the nameservers with those two. Wait; Cloudflare emails when it's active (minutes to a day).
2. **Lead email.** On that domain in Cloudflare → Email → Email Routing → Get started. Under Destination addresses add Matt's email; Matt clicks the verification email. Then in this repo open `wrangler.jsonc`: remove the `//` in front of the `"send_email"` line, set `LEAD_TO` to Matt's email and `LEAD_FROM` to `website@` + the domain. Double-click `build.bat`, commit, push. Test: send the quote form on the live site; it should land in Matt's inbox within a minute. Until this is done the forms say "call us".
3. **Point the domain at the site.** Workers & Pages → `timeless-trailers` → Settings → Domains & Routes → Add → Custom domain → the domain (and again for `www.` + the domain). Cloudflare makes the DNS records itself.
4. **Tell the site its address.** `src/config.json` → `"url": "https://<the domain>"`. Build, commit, push.
5. **Visitor counts.** Cloudflare → Web Analytics → Add a site → the domain → copy the token into `src/config.json` → `"cloudflareToken"`. Build, commit, push.
6. **Launch day.** `src/config.json` → `"indexable": true`. Build, commit, push. Then Google Search Console (search.google.com/search-console) → add the domain → Sitemaps → submit `https://<the domain>/sitemap.xml`.
