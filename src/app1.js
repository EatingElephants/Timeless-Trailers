
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
const DEMO = %%DEMO%%;
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
/* @demo */
function quoteCalc(t, addonIds) {
  const items = [{ label: tname(t) + " · Stock " + t.id, amt: t.price }];
  addonIds.forEach(id => { const a = DATA.addons.find(x => x.id === id); if (a) items.push({ label: a.label, amt: a.price }); });
  const sub = items.reduce((s, i) => s + i.amt, 0); const f = DATA.fees;
  const tax = Math.round((sub + f.doc) * f.taxRate);
  return { items, sub, doc: f.doc, tax, tag: f.titleTag, total: sub + f.doc + tax + f.titleTag };
}
function quoteTable(q) {
  const t = unit(q.trailerId); if (!t) return "";
  const c = quoteCalc(t, q.addons);
  return `<table class="qitems">${c.items.map(i => `<tr><td>${esc(i.label)}</td><td>${money(i.amt)}</td></tr>`).join("")}
    <tr class="sub"><td>Doc fee (sample)</td><td>${money(c.doc)}</td></tr>
    <tr class="sub"><td>${esc(DATA.fees.taxLabel)}</td><td>${money(c.tax)}</td></tr>
    <tr class="sub"><td>Title and tag (sample)</td><td>${money(c.tag)}</td></tr>
    <tr class="tot"><td>Out the door</td><td>${money(c.total)}</td></tr></table>`;
}
function createQuote(t, addons, name, phone) {
  const q = { id: nextId("Q"), userId: S.user && !isStaff() ? S.user : (S.user ? null : "guest"), name, phone, trailerId: t.id, addons, created: new Date().toISOString(), status: "Sent" };
  S.quotes.unshift(q);
  const lead = S.leads.find(l => l.name === name && l.stage !== "Won" && l.stage !== "Lost");
  if (lead) { lead.stage = "Quoted"; lead.interest = tname(t); } else addLead({ name, phone, interest: tname(t), source: "Quote", stage: "Quoted" });
  save(); return q;
}
/* @end-demo */
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
/* @demo */
function acctSlotDemoHTML() {
  const u = me();
  if (!u) return `<button class="btn btn-line-light" data-act="signin-open">Sign in</button>`;
  return `<div class="menu" data-menu="acct"><button class="uchip" aria-expanded="false"><i class="av ${u.role !== "customer" ? "dark" : ""}">${initials(u.name)}</i><span><small>Signed in as</small>${esc(u.short)}</span></button>
    <div class="dd right">${u.role === "customer" ? `<a href="/account/">My Account<small>Saved, holds, quotes, orders</small></a>` : `<a href="/admin/">Dealer console<small>${esc(u.title)}</small></a><a href="/account/">My Account</a>`}
    <a href="#" data-act="signin-open">Switch demo user<small>Customer or dealership</small></a><a href="#" data-act="signout">Sign out</a></div></div>`;
}
function drawerAcctHTML() {
  const u = me();
  return `<h4>Account</h4>${u ? `<a href="/account/">My Account · ${esc(u.short)}</a>${isStaff() ? `<a href="/admin/">Dealer console</a>` : ""}<a href="#" data-act="signout">Sign out</a>` : `<a href="#" data-act="signin-open">Sign in to the demo</a>`}`;
}
/* @end-demo */
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
/* @demo */
function personaCard(p) {
  const on = S.user === p.id;
  return `<div class="pcard ${on ? "on" : ""}"><div class="ph"><i class="av ${p.role !== "customer" ? "dark" : ""}">${initials(p.name)}</i><div><b>${esc(p.name)}</b><small>${esc(p.title)}${p.company ? " · " + esc(p.company) : ""}</small></div></div>
    <p>${esc(p.story)}</p><ul>${p.tryList.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <button class="btn ${p.role === "customer" ? "btn-gold" : "btn-dark"} sm" data-act="as" data-user="${p.id}">${on ? "Signed in ✓" : "Sign in as " + esc(p.name.split(" ")[0])}</button></div>`;
}
function tourHTML() {
  const c = DATA.personas.filter(p => p.role === "customer"), s = DATA.personas.filter(p => p.role !== "customer");
  return `<div class="tour-grid">
    <div class="tour-col"><div class="eyebrow">Shop as a customer</div><h3>Buy a trailer, own a trailer.</h3><p>One click, no password. Save trailers, put a unit on hold, build a quote, and order parts as an owner.</p><div class="tour-cards">${c.map(personaCard).join("")}</div></div>
    <div class="tour-col dark"><div class="eyebrow" style="color:var(--gold-2)">Run the dealership</div><h3>Behind the counter.</h3><p>Every lead, quote, hold and ticket from the site lands here. Change prices by asking ${A}, and confirm every change.</p><div class="tour-cards">${s.map(personaCard).join("")}</div></div></div>`;
}
function tourSection() {
  return `<section class="tour" id="tour"><div class="wrap">
  <div class="sec-head"><div><div class="eyebrow">Demo tour · Two sides of the counter</div><h2 style="margin-top:10px">Try it as a customer or as Matt.</h2><p class="lede">Sign in with one click. Everything you do is saved in this browser so you can show it, then reset from the footer.</p></div></div>
  ${tourHTML()}
</div></section>`;
}
function reviewsSection() {
  return `<section id="reviews"><div class="wrap">
  <div class="sec-head"><div><div class="eyebrow">What customers say</div><h2 style="margin-top:10px">Straight answers. Right trailer.</h2></div><span class="muted" style="font-size:.85rem">Sample reviews for the concept</span></div>
  <div class="tq-grid">${DATA.testimonials.map(t => `<figure class="tq"><span class="stars" aria-label="5 stars">★★★★★</span><blockquote>“${esc(t.q)}”</blockquote><figcaption><b>${esc(t.who)}</b>${esc(t.what)}</figcaption></figure>`).join("")}</div>
</div></section>`;
}
/* @end-demo */
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
    <li>${ICON.clock}<div><small>Hours</small><b>${esc(b.hours)}</b></div></li>${b.email ? `<li>${ICON.send}<div><small>Email</small><b><a href="mailto:${esc(b.email)}" style="text-decoration:none">${esc(b.email)}</a></b></div></li>` : ""}</ul>
    <div class="mapcard" role="img" aria-label="Map placeholder for the Waxhaw yard"><div class="pin"><span>Timeless Trailers</span>${ICON.pinFill}</div><a class="btn btn-dark sm" href="${b.maps}" target="_blank" rel="noopener">Get directions</a></div>`;
}
const WHY = `<div class="why"><div class="wrap why-grid">
  <div class="why-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/></svg><b>All-aluminum</b><p>No rust, less weight, more payload. Built to outlast the truck that pulls it.</p></div>
  <div class="why-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg><b>3-year warranty</b><p>Manufacturer-backed coverage, with your Customer Service Center (CSC) to handle it.</p></div>
  <div class="why-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg><b>Financing</b><p>Payment options offered through preferred vendors. Ask when you quote.</p></div>
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

<section class="why-timpte" id="why-timpte"><div class="wrap why-grid2"><div><div class="eyebrow">Why Timpte</div><h2 style="margin-top:10px">Built in Lincoln, Nebraska. Made in the USA.</h2><p class="lede">Every Timpte equipment trailer is built in Lincoln, Nebraska, from American-made parts: an aluminum frame and deck, rubber torsion suspension, and no structural welds, so there's nothing to rust and nothing to crack. Made in the USA is one of the main reasons the owner chose to sell Timpte and nothing else. Two lines: <b>Powerhouse</b> for equipment, <b>Motorsports</b> for cars, UTVs and toys.</p><div class="brandrow"><img src="${img("timpte-powerhouse-logo")}" alt="Timpte Powerhouse" loading="lazy"><img src="${img("timpte-motorsports-logo")}" alt="Timpte Motorsports" loading="lazy"></div></div>${videoHTML("torsion-axle")}</div></section>

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
  <p class="lede">A few details get you a real answer within 24 hours: the right model, what's on the lot, and your quote.</p>${visitList()}
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
      <div class="sec-head"><div><div class="eyebrow">The Timpte lineup</div><h2 style="margin-top:10px">Available to order.</h2><p class="lede">${catT ? "Every Timpte " + catT + " model, with specs, photos and the spec sheet. " : "All " + Object.keys(MODELS).length + " Timpte models, with specs, photos and the spec sheet. "}Not on the lot? We order the configuration you need straight from Timpte.</p></div>
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
      <p class="lede">Payment options offered through preferred vendors. Run the numbers here, then pre-qualify in two minutes. Rates and terms are estimates until a lender quotes you.</p></div></div>
    <section style="padding-top:34px"><div class="wrap grid2">
      <div class="panel"><h3>Payment calculator</h3><div class="fields">
        ${PRICES ? `<div class="full"><label for="fTr">Trailer</label><select id="fTr" data-act="fin-tr"><option value="">Enter a price</option>${S.inventory.filter(t => t.status !== "sold").map(t => `<option value="${t.id}" ${fin.id === t.id ? "selected" : ""}>${esc(tname(t))} · ${t.id} · ${money(t.price)}</option>`).join("")}</select></div>` : `<div class="full"><p class="note" style="margin:0">Enter the price from your quote, or the figure you have in mind, to see an estimated payment.</p></div>`}
        <div><label for="fPrice">Price ($)</label><input id="fPrice" data-fin="price" type="number" min="0" step="50" value="${fin.price}"></div>
        <div><label for="fDown">Down payment ($)</label><input id="fDown" data-fin="down" type="number" min="0" step="50" value="${fin.down}"></div>
        <div class="full"><label for="fApr">APR: <span id="fAprV">${fin.apr.toFixed(2)}%</span></label><input id="fApr" data-fin="apr" type="range" min="3.99" max="17.99" step="0.25" value="${fin.apr}"></div>
        <div class="full"><label>Term</label><div class="termset">${DATA.finance.terms.map(n => `<button type="button" class="chip" data-act="fin-term" data-n="${n}" aria-pressed="${fin.term === n}">${n} mo</button>`).join("")}</div></div>
      </div></div>
      <div style="display:grid;gap:18px"><div class="calc-out" id="calcOut" aria-live="polite"></div>
        <form class="q" data-form="prequal" novalidate><h3 style="margin-bottom:6px">Pre-qualify</h3><p class="muted" style="margin:0 0 14px;font-size:.92rem">No effect on your credit.</p><div class="fields">
          <div><label for="pqName">Name</label><input id="pqName" name="name" required value="${u && u.role === "customer" ? esc(u.name) : ""}"></div>
          <div><label for="pqPhone">Phone</label><input id="pqPhone" name="phone" type="tel" required value="${u && u.role === "customer" ? esc(u.phone) : ""}"></div>
          <div class="full"><label for="pqBiz">Buying as</label><select id="pqBiz" name="as"><option>An individual</option><option>A business</option></select></div></div>
          <div class="form-foot"><p></p><button class="btn btn-gold" type="submit">Start pre-qualifying</button></div></form></div>
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
      <p class="lede">Call ahead and we'll have the unit in our staging area for a walk-around: check the welds, review the quality, and see what made in the USA looks like up close.</p>${visitList()}</div>${quoteFormHTML(r.q.m)}</div></section>`;
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
      <p class="lede">Call ahead and we'll have the unit in our staging area for a walk-around: check the welds, review the quality, and see what made in the USA looks like up close.</p></div></div>
    <section id="visit"><div class="wrap quote-grid"><div id="contact"><img src="${img("timeless-logo")}" alt="Timeless Trailers" style="width:min(300px,85%);height:auto;margin-bottom:6px">${visitList()}</div>${quoteFormHTML(r.q.m)}</div></section>`;
  }
};

/* ---------- owner resources ---------- */
VIEWS.resources = {
  title: "Owner resources · Timeless Trailers",
  html() {
    const b = DATA.business;
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / Owner resources</div><div class="eyebrow">Own · Keep it rolling</div><h1 style="margin-top:10px">Owner resources.</h1>
      <p class="lede">The maintenance schedule, every Timpte spec sheet, and where to turn for parts, service and warranty.</p></div></div>
    <section style="padding-top:34px"><div class="wrap grid2">
      <div class="panel"><h3>Maintenance schedule</h3><table class="ttable"><thead><tr><th>When</th><th>What to check</th></tr></thead><tbody>${DATA.maintenance.map(([a, c]) => `<tr><td><b>${a}</b></td><td>${c}</td></tr>`).join("")}</tbody></table>
        <h4 style="margin:22px 0 6px">Warranty</h4><p style="margin:0;color:var(--text-2);font-size:.95rem">Timpte backs every trailer with a 3-year warranty. We handle the claim and the repair here in Waxhaw. Call ${b.phone} with your serial number, or <a href="/service/">book service</a>.</p>
        <h4 style="margin:22px 0 6px">Parts</h4><p style="margin:0;color:var(--text-2);font-size:.95rem">Timpte parts are ordered through us and picked up in Waxhaw. <a href="/parts/">Look up a part number</a>, or ask ${A}.</p></div>
      <div class="panel"><h3>Spec sheets</h3><p class="muted" style="margin:-6px 0 12px;font-size:.9rem">Not sure which is which? Hover over a name to see the trailer.</p><ul class="docs specs-list">${Object.values(MODELS).filter(m => m.spec).map(m => `<li><a data-preview="${img(m.gallery && m.gallery[0] || m.img)}" data-preview-title="${esc(m.model)}" href="/specs/${m.spec}" target="_blank" rel="noopener"><img class="spec-thumb" src="${img(m.img)}" alt="" loading="lazy"><span>${esc(m.model)}<small>PDF · Timpte 2026 spec sheet</small></span></a></li>`).join("")}</ul></div>
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
/* @demo */
function partsSigninNote() { return `<p class="note">Own a Timpte? <button class="link" data-act="as" data-user="marcus">Sign in as Marcus</button> to see parts filtered to his trailer.</p>`; }
VIEWS.account = {
  title: "My Account · Timeless Trailers",
  html() {
    const u = me(); const id = uid();
    const holds = S.holds.filter(h => h.userId === id), quotes = S.quotes.filter(q => q.userId === id), orders = S.partsOrders.filter(o => o.userId === id),
      tickets = S.tickets.filter(t => t.userId === id), saved = savedList().map(unit).filter(Boolean), owned = myOwned();
    const head = u ? `<div class="acct-head"><i class="av ${u.role !== "customer" ? "dark" : ""}">${initials(u.name)}</i><div><div class="eyebrow">My Account</div><h1 style="margin-top:6px">${esc(u.name)}</h1><p class="muted" style="margin:6px 0 0">${esc(u.title)}${u.company ? " · " + esc(u.company) : ""}${u.town ? " · " + esc(u.town) : ""}${u.truck ? " · Tows with a " + esc(u.truck) : ""}</p></div></div>`
      : `<div class="eyebrow">My Account</div><h1 style="margin-top:10px">Your activity.</h1><p class="lede">You're browsing as a guest. Anything you save, hold or quote shows up here in this browser. Sign in as a demo customer to see a full account.</p>`;
    const sec = (key, title, n, body, empty) => `<div class="asec" id="a-${key}"><h3>${title} <small>${n}</small></h3>${n ? `<div class="rows">${body}</div>` : `<div class="empty" style="padding:22px">${empty}</div>`}</div>`;
    const tRow = (t, right, extra = "") => `<div class="ritem"><a href="/stock/${t.id}/"><img src="${img(t.img)}" alt=""></a><div><b>${esc(tname(t))}</b><small>Stock ${t.id} · ${money(t.price)} · ${statusInfo(t).label}</small></div><div class="ra">${right}</div>${extra}</div>`;
    return `<div class="page-head"><div class="wrap">${head}
      <nav class="acct-nav" aria-label="Account sections">${[["saved", "Saved", saved.length], ["holds", "Holds", holds.length], ["quotes", "Quotes", quotes.length], ["owned", "My trailers", owned.length], ["orders", "Parts orders", orders.length], ["tickets", "Service", tickets.length]].map(([k, l, n]) => `<a class="chip" href="/account/?s=a-${k}" style="text-decoration:none">${l} <small>${n}</small></a>`).join("")}</nav></div></div>
    <section style="padding-top:10px"><div class="wrap">
      ${!u ? `<div class="asec">${tourHTML()}</div>` : ""}
      ${sec("saved", "Saved trailers", saved.length, saved.map(t => tRow(t, `<button class="heart inline" data-act="save" data-id="${t.id}" aria-pressed="true" aria-label="Remove ${t.id}">${ICON.heart}</button><button class="btn btn-line xs" data-act="cmp-btn" data-id="${t.id}">${S.compare.includes(t.id) ? "In compare ✓" : "Add to compare"}</button>`)).join(""), `Tap the heart on any trailer to save it here. <a href="/trailers/">Browse inventory</a>`)}
      ${sec("holds", "Holds", holds.length, holds.map(h => { const t = unit(h.trailerId); return t ? tRow(t, `${statusPill(h.status)}<small class="muted">${h.status === "Active" ? "Held until " + fmtWhen(h.expires) : "Placed " + fmtDate(h.created)}</small>${h.status === "Active" ? `<button class="btn btn-line xs" data-act="release" data-id="${h.id}">Release hold</button>` : ""}`) : ""; }).join(""), `No holds. Hit “Hold this unit” on any trailer on the lot, or ask ${A}.`)}
      ${sec("quotes", "Quotes", quotes.length, quotes.map(q => { const t = unit(q.trailerId); if (!t) return ""; const c = quoteCalc(t, q.addons);
        return tRow(t, `${statusPill(q.status)}<b>${money(c.total)}</b><small class="muted">${q.id} · ${fmtDate(q.created)}</small>`, `<details><summary>Itemized quote</summary>${quoteTable(q)}<p class="note">Sample tax and fees for the mock-up. Valid 14 days.</p></details>`); }).join(""), `No quotes yet. Open any trailer and hit “Get a quote”.`)}
      ${sec("owned", "My trailers", owned.length, owned.map(o => `<div class="ritem"><img src="${img(o.img)}" alt=""><div><b>${o.year} ${esc(o.model)}</b><small>VIN ${esc(o.vin)} · Bought ${fmtDateY(o.purchased)}</small><small>Warranty through ${fmtDateY(o.warrantyEnds)}</small></div>
        <div class="ra"><span class="pill green">Under warranty</span><a class="btn btn-gold xs" href="/parts/">Order parts</a><a class="btn btn-line xs" href="/service/?s=book">Book service</a></div></div>`).join(""), `Trailers you buy from Timeless show up here with warranty dates and service history.`)}
      ${sec("orders", "Parts orders", orders.length, orders.map(o => `<div class="ritem"><div style="font:900 1.4rem/1 var(--display)">${o.id.replace("PO-", "#")}</div><div><b>${o.items.map(([id, q]) => { const p = DATA.parts.find(x => x.id === id); return (q > 1 ? q + " × " : "") + (p ? p.name : id); }).join(", ")}</b><small>${o.id} · ${fmtDate(o.created)} · ${money(partsTotal(o.items))}</small></div><div class="ra">${statusPill(o.status)}</div></div>`).join(""), `No parts orders. <a href="/parts/">Visit the parts counter</a>`)}
      ${sec("tickets", "Service tickets", tickets.length, tickets.map(t => `<div class="ritem"><div style="font:900 1.4rem/1 var(--display)">${t.id.replace("SR-", "#")}</div><div><b>${esc(t.service)}</b><small>${esc(t.unit)} · ${t.date ? "For " + fmtDate(t.date) : "Opened " + fmtDate(t.created)}</small>${t.notes ? `<small>${esc(t.notes)}</small>` : ""}</div><div class="ra">${statusPill(t.status)}</div></div>`).join(""), `No service tickets. <a href="/service/">Book service</a>`)}
    </div></section>`;
  }
};
/* @end-demo */
