# Working on this site

Clickable mock-up for Timeless Trailers (Timpte dealer, Waxhaw NC), client of Albright Agency. The owner (Josh) is not a coder: plain words, one clear action, double-click files over commands. See "Where we left off" in README.md.

- Edit `src/`, then `py -3 build.py` (Python at `C:/Users/jsalb/AppData/Local/Programs/Python/Python310/python.exe`). `site/` is the published folder; never hand-edit `site/index.html`.
- Trailer specs in `src/data.js` `MODELS` are real, from Timpte's 2026 spec sheets. Don't invent numbers; the sheets are in `site/specs/`. Prices, stock and people are sample and labeled so.
- The assistant is Andy (`ASSISTANT_NAME`). The name has changed twice; keep it in that one constant.
- Dealer-only Timpte documents (bulletins, order form, branding guide, priced parts catalog) are never published. `build.py` refuses them by file name.
- Photos: `tools/make_images.py` (Pillow). Videos: `tools/encode.ps1` (ffmpeg via winget, already installed). Every published file must stay under 25 MB.
- Preview: `timeless-v3` entry in the Albright repo's `.claude/launch.json` (port 8766), or `preview.bat`.
- Hosting is Cloudflare Workers Builds from this GitHub repo with `site` as the output directory. The chat, holds and quotes are browser-only demo state (localStorage); nothing is sent anywhere.
