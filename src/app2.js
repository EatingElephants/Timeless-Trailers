
/* @demo */
VIEWS.vision = {
  title: "What the finished site adds · Timeless Trailers",
  html() {
    const items = [
      ["Every Timpte model", "All 19 models with full photo galleries, not the 10 shown here."],
      ["The whole video library", "Walk-arounds split into chapters, plus how-to videos: operating the tilt, dump hydraulics, coupling, lights."],
      ["Accessories store", "Timpte's accessory list with photos and online checkout, so an owner can order from the phone."],
      [`${A} answers spec questions`, `"What's the loading angle on the 1624?" ${A} reads it straight from the spec sheet.`],
      ["Matt's real inventory", "The lot list, stock numbers and prices come from Matt, not sample data. Mark a unit sold and the site updates."],
      ["Quotes and holds in Matt's inbox", "Every quote, hold and accessory order lands in email or text, with a lead board to work from."],
      ["Financing applications", "A real pre-qualify form through the lender Timeless uses."],
      ["Google and the answer tools", "Each model gets its own page with structured data, so searches for a Timpte split tilt near Charlotte find Timeless."]
    ];
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="/">Home</a> / The finished site</div><div class="eyebrow">Concept v3 · for review</div><h1 style="margin-top:10px">What the finished site adds.</h1>
      <p class="lede">This version has real Timpte models, specs, photos and video. Here's what the full build adds on top, so you can picture the whole thing before we build it.</p></div></div>
    <section style="padding-top:34px"><div class="wrap"><div class="grid2">${items.map(([h, p]) => `<div class="panel"><h3>${h}</h3><p style="margin:0;color:var(--text-2)">${p}</p></div>`).join("")}</div>
      <div class="panel" style="margin-top:22px"><h3>What's sample in this version</h3><p style="margin:0;color:var(--text-2)">Stock numbers and what's on the lot. Sample prices, the demo customers and staff, and the sample reviews only appear on this demo site; the public site shows "Call for price" and has no sign-in. Everything about the trailers themselves (model names, payloads, weights, decks, angles, axles, tires) comes from Timpte's 2026 spec sheets, and Andy answers from them.</p></div>
    </div></section>`;
  }
};
/* @end-demo */

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
/* @demo */
const adm = { tab: "inventory", log: [], pending: {}, booted: false, syncing: false };
const STAGES = ["New", "Contacted", "Quoted", "Won", "Lost"];
VIEWS.admin = {
  title: "Dealer console · Timeless Trailers",
  html() {
    if (!isStaff()) {
      return `<section><div class="wrap locked"><div class="eyebrow">Dealer console</div><h1 style="margin-top:10px">Staff only.</h1><p class="lede" style="margin-inline:auto">Sign in as Matt or a staff member to see leads, quotes, holds and inventory. No password in the demo.</p>
        <div class="tour-cards" style="margin-top:24px;text-align:left">${DATA.personas.filter(p => p.role !== "customer").map(personaCard).join("")}</div></div></section>`;
    }
    const u = me();
    return `<section style="padding-top:34px"><div class="wrap">
      <div class="admin-top"><div><div class="eyebrow">Dealer console</div><h1 style="margin-top:8px">Good ${new Date().getHours() < 12 ? "morning" : "afternoon"}, ${esc(u.name.split(" ")[0])}.</h1>
        <p class="muted" style="margin:6px 0 0">Signed in as ${esc(u.name)} · ${esc(u.title)}. Everything customers do on the site lands here.</p></div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="muted" id="syncNote" style="font-size:.88rem">${S.specsSynced ? `${tick.replace("<svg", '<svg style="width:14px;height:14px;vertical-align:-2px;color:var(--green)"')} Specs up to date · ${fmtWhen(S.specsSynced)}` : "Specs last pulled 12 days ago"}</span>
        <button class="btn btn-dark sm" data-act="sync" id="syncBtn">Pull latest specs from Timpte</button></div></div>
      <div class="kpis" id="kpis"></div>
      <div class="admin-grid"><div id="adminMain"></div><aside class="atessa" id="adminTessa" aria-label="${A} for the dealership"></aside></div>
    </div></section>`;
  },
  mount() { if (!isStaff()) return; renderKpis(); renderAdminMain(); renderAdminTessa(); }
};
function renderKpis() {
  const k = $("#kpis"); if (!k) return;
  const lot = onLot().length, hold = S.inventory.filter(t => t.status === "hold").length, order = S.inventory.filter(t => t.status === "order").length;
  const open = S.leads.filter(l => ["New", "Contacted", "Quoted"].includes(l.stage)), nw = S.leads.filter(l => l.stage === "New").length;
  const qo = S.quotes.filter(q => q.status === "Sent"), qv = qo.reduce((s, q) => { const t = unit(q.trailerId); return s + (t ? quoteCalc(t, q.addons).total : 0); }, 0);
  const tk = S.tickets.filter(t => t.status !== "Done");
  k.innerHTML = `<div class="kpi"><b>${lot}</b><span>Units on the lot</span><small>${hold} on hold · ${order} arriving</small></div>
    <div class="kpi"><b>${open.length}</b><span>Open leads</span><small>${nw} new, not yet contacted</small></div>
    <div class="kpi"><b>${qo.length}</b><span>Quotes out</span><small>${money(qv)} waiting on a yes</small></div>
    <div class="kpi"><b>${tk.length}</b><span>Open service tickets</span><small>${S.partsOrders.filter(o => o.status === "Ordered").length} accessory orders to pull</small></div>`;
}
function renderAdminMain(flashId) {
  const m = $("#adminMain"); if (!m) return;
  const tabs = [["inventory", "Inventory", S.inventory.filter(t => t.status !== "sold").length], ["leads", "Leads", S.leads.filter(l => ["New", "Contacted", "Quoted"].includes(l.stage)).length],
    ["holds", "Holds", S.holds.filter(h => h.status === "Active").length], ["quotes", "Quotes", S.quotes.length], ["parts", "Accessories", S.partsOrders.filter(o => o.status !== "Picked up").length],
    ["service", "Service", S.tickets.filter(t => t.status !== "Done").length], ["log", "Activity", S.log.length]];
  let body = "";
  const who = r => `<b>${esc(r.name)}</b><small>${esc(r.phone || "")}${r.userId && r.userId !== "guest" ? " · site account" : ""}</small>`;
  const sel = (kind, id, cur, opts) => `<select data-adm="${kind}" data-id="${id}" aria-label="Status for ${id}">${opts.map(o => `<option ${o === cur ? "selected" : ""}>${o}</option>`).join("")}</select>`;
  if (adm.tab === "inventory") {
    body = `<div class="atools"><span class="muted" style="font-size:.9rem">Edit price or status inline. Changes show on the public site right away.</span><button class="btn btn-gold sm" data-act="adm-add">+ Add trailer</button></div>
      <div class="tscroll"><table class="atable"><thead><tr><th>Stock</th><th>Unit</th><th>Status</th><th>Price</th><th>Added</th><th></th></tr></thead><tbody>
      ${S.inventory.slice().sort((a, b) => (a.status === "sold") - (b.status === "sold") || a.id.localeCompare(b.id)).map(t => `<tr data-row="${t.id}" class="${t.status === "sold" ? "sold" : ""} ${flashId && flashId.includes(t.id) ? "flash" : ""}">
        <td><b>${t.id}</b></td><td><b>${esc(tname(t))}</b><small>${typeLabel(t.type)} · ${num(t.payload)} lb payload · ${t.deckFt} ft</small></td>
        <td><select data-edit="status" data-id="${t.id}" aria-label="Status for ${t.id}">${[["lot", "On the lot"], ["order", "On order"], ["hold", "On hold"], ["sold", "Sold"]].map(([v, l]) => `<option value="${v}" ${t.status === v ? "selected" : ""}>${l}</option>`).join("")}</select></td>
        <td><input type="number" step="50" min="0" data-edit="price" data-id="${t.id}" value="${t.price}" aria-label="Price for ${t.id}"></td>
        <td>${fmtDate(t.added)}</td>
        <td style="white-space:nowrap">${t.status !== "sold" ? `<button class="btn btn-line xs" data-act="adm-sold" data-id="${t.id}">Mark sold</button>` : ""} <a class="btn btn-line xs" href="/stock/${t.id}/">View</a></td></tr>`).join("")}</tbody></table></div>`;
  } else if (adm.tab === "leads") {
    body = `<div class="atools"><span class="muted" style="font-size:.9rem">Drag a card between columns, or use its dropdown.</span></div><div class="kanban-wrap"><div class="kanban">${STAGES.map(s => { const ls = S.leads.filter(l => l.stage === s);
      return `<div class="kcol" data-stage="${s}"><h4>${s}<span>${ls.length}</span></h4>${ls.map(l => `<div class="lead" draggable="true" data-lead="${l.id}"><b>${esc(l.name)}</b><span>${esc(l.interest)}</span><small>${esc(l.source)} · ${fmtDate(l.created)} · ${esc(l.phone)}</small>
        <select data-adm="lead" data-id="${l.id}" aria-label="Stage for ${esc(l.name)}">${STAGES.map(o => `<option ${o === l.stage ? "selected" : ""}>${o}</option>`).join("")}</select></div>`).join("")}</div>`; }).join("")}</div></div>`;
  } else if (adm.tab === "holds") {
    body = `<div class="tscroll"><table class="atable"><thead><tr><th>Hold</th><th>Customer</th><th>Unit</th><th>Expires</th><th>Status</th></tr></thead><tbody>${S.holds.map(h => { const t = unit(h.trailerId);
      return `<tr><td><b>${h.id}</b></td><td>${who(h)}</td><td>${t ? esc(tname(t)) + `<small>${t.id}</small>` : h.trailerId}</td><td>${fmtWhen(h.expires)}</td><td>${sel("hold", h.id, h.status, ["Active", "Released", "Converted"])}</td></tr>`; }).join("")}</tbody></table></div>`;
  } else if (adm.tab === "quotes") {
    body = `<div class="tscroll"><table class="atable"><thead><tr><th>Quote</th><th>Customer</th><th>Unit</th><th>Total</th><th>Sent</th><th>Status</th></tr></thead><tbody>${S.quotes.map(q => { const t = unit(q.trailerId);
      return `<tr><td><b>${q.id}</b></td><td>${who(q)}</td><td>${t ? esc(tname(t)) + `<small>${t.id}${q.addons.length ? " · " + q.addons.length + " add-ons" : ""}</small>` : ""}</td><td><b>${t ? money(quoteCalc(t, q.addons).total) : ""}</b></td><td>${fmtDate(q.created)}</td><td>${sel("quote", q.id, q.status, ["Sent", "Accepted", "Expired"])}</td></tr>`; }).join("")}</tbody></table></div>`;
  } else if (adm.tab === "parts") {
    body = `<div class="tscroll"><table class="atable"><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Placed</th><th>Status</th></tr></thead><tbody>${S.partsOrders.map(o => `<tr><td><b>${o.id}</b></td><td>${who(o)}</td>
      <td>${o.items.map(([id, q]) => { const p = DATA.accessories.find(x => x.id === id); return `${q} × ${esc(p ? p.name : id)}`; }).join("<br>")}</td><td>${money(partsTotal(o.items))}</td><td>${fmtDate(o.created)}</td><td>${sel("parts", o.id, o.status, ["Ordered", "Ready for pickup", "Picked up"])}</td></tr>`).join("")}</tbody></table></div>`;
  } else if (adm.tab === "service") {
    body = `<div class="tscroll"><table class="atable"><thead><tr><th>Ticket</th><th>Customer</th><th>Unit / service</th><th>Day</th><th>Status</th></tr></thead><tbody>${S.tickets.map(t => `<tr><td><b>${t.id}</b></td><td>${who(t)}</td>
      <td><b>${esc(t.service)}</b><small>${esc(t.unit)}${t.notes ? " · " + esc(t.notes) : ""}</small></td><td>${t.date ? fmtDate(t.date) : "TBD"}</td><td>${sel("ticket", t.id, t.status, ["Open", "Scheduled", "In progress", "Done"])}</td></tr>`).join("")}</tbody></table></div>`;
  } else {
    body = S.log.length ? `<div class="tscroll"><table class="atable"><thead><tr><th>When</th><th>Who</th><th>Change</th></tr></thead><tbody>${S.log.map(l => `<tr><td>${fmtWhen(l.at)}</td><td>${esc(l.who)}</td><td>${l.text}</td></tr>`).join("")}</tbody></table></div>`
      : `<div class="empty"><b>No changes yet.</b>Edits from the table and from ${A} are logged here with who confirmed them.</div>`;
  }
  m.innerHTML = `<div class="tabs" role="tablist">${tabs.map(([k, l, n]) => `<button role="tab" data-act="adm-tab" data-k="${k}" aria-selected="${adm.tab === k}">${l}<small>${n}</small></button>`).join("")}</div>${body}`;
  if (adm.tab === "leads") mountKanban();
}
function mountKanban() {
  let dragId = null;
  $$(".lead").forEach(c => {
    c.addEventListener("dragstart", e => { dragId = c.dataset.lead; c.classList.add("dragging"); e.dataTransfer.effectAllowed = "move"; try { e.dataTransfer.setData("text/plain", dragId); } catch (x) {} });
    c.addEventListener("dragend", () => c.classList.remove("dragging"));
  });
  $$(".kcol").forEach(col => {
    col.addEventListener("dragover", e => { e.preventDefault(); col.classList.add("over"); });
    col.addEventListener("dragleave", () => col.classList.remove("over"));
    col.addEventListener("drop", e => { e.preventDefault(); col.classList.remove("over"); if (dragId) setLeadStage(dragId, col.dataset.stage); });
  });
}
function logChange(text) { S.log.unshift({ at: new Date().toISOString(), who: me() ? me().name : "Staff", text }); save(); }
function setLeadStage(id, stage) {
  const l = S.leads.find(x => x.id === id); if (!l || l.stage === stage) return;
  logChange(`Lead ${esc(l.name)}: ${l.stage} → <b>${stage}</b>`); l.stage = stage; save();
  renderAdminMain(); renderKpis(); toast(`${esc(l.name)} moved to ${stage}.`);
}
function setPrice(ids, price, via) {
  ids.forEach(id => { const t = unit(id); if (t) { logChange(`${t.id} ${esc(t.model)} price ${money(t.price)} → <b>${money(price)}</b>${via ? " (via " + A + ")" : ""}`); t.price = price; } });
  save();
}
function setStatus(id, status, via) {
  const t = unit(id); if (!t || t.status === status) return;
  logChange(`${t.id} ${esc(t.model)} status ${statusInfo(t).label} → <b>${statusInfo(Object.assign({}, t, { status })).label}</b>${via ? " (via " + A + ")" : ""}`);
  t.status = status;
  if (status === "sold") S.holds.forEach(h => { if (h.trailerId === id && h.status === "Active") h.status = "Converted"; });
  save();
}
function newUnit(o) {
  const d = DATA.typeDefaults[o.type] || DATA.typeDefaults.util;
  const t = Object.assign({ id: nextId("TT"), year: o.year || new Date().getFullYear(), model: o.model, type: o.type, price: o.price, status: o.status || "lot", added: new Date().toISOString(),
    deck: (o.deckFt || d.deckFt) + " ft", brakes: "Electric, both axles", tires: "Per Timpte build sheet",
    blurb: "New arrival. Full description coming once it's on the lot.", feat: ["All-aluminum", d.axles, d.loading], features: ["All-aluminum frame and deck", d.loading, "LED lighting"] }, clone(d), o.deckFt ? { deckFt: o.deckFt } : {}, o.payload ? { payload: o.payload } : {});
  t.deck = t.deckFt + " ft";
  S.inventory.push(t); logChange(`Added ${t.id} ${esc(tname(t))} at <b>${money(t.price)}</b>${o.via ? " (via " + A + ")" : ""}`); save(); return t;
}
function openAddUnit() {
  openModal(`<h3>Add a trailer</h3><p class="sub">Specs fill in from the model type. Edit details later.</p>
    <form data-form="add-unit" novalidate><div class="fields">
      <div class="full"><label for="auModel">Model</label><input id="auModel" name="model" placeholder="e.g. Timpte 720 Car Hauler" required></div>
      <div><label for="auYear">Year</label><input id="auYear" name="year" type="number" value="${new Date().getFullYear()}"></div>
      <div><label for="auType">Type</label><select id="auType" name="type">${Object.keys(DATA.types).map(k => `<option value="${k}">${DATA.types[k]}</option>`).join("")}</select></div>
      <div><label for="auPrice">Price ($)</label><input id="auPrice" name="price" type="number" step="50" required></div>
      <div><label for="auStatus">Status</label><select id="auStatus" name="status"><option value="lot">On the lot</option><option value="order">On order</option></select></div>
    </div><div class="form-foot"><span></span><button class="btn btn-gold" type="submit">Add to inventory</button></div></form>`);
}

/* admin advisor */
function renderAdminTessa() {
  const box = $("#adminTessa"); if (!box) return;
  box.innerHTML = `<div class="ah"><i class="av">${A[0]}</i><div><b>${A} for the dealership</b><small>Ask in plain English. You confirm every change.</small></div></div>
    <div class="alog" id="aLog" aria-live="polite"></div>
    <div class="achips">${["Drop the 1614 dump to $15,900", "Add a new 720 car hauler at $8,400", "Mark TT-0158 sold", "How's the lot looking?"].map(c => `<button data-act="adm-say" data-say="${esc(c)}">${esc(c)}</button>`).join("")}</div>
    <form data-form="admin-chat"><label for="aIn" class="sr">Message ${A}</label><input id="aIn" name="q" placeholder="e.g. Drop the 1614 dump to $15,900" autocomplete="off"><button class="btn btn-gold sm" type="submit" aria-label="Send">${ICON.send}</button></form>`;
  if (!adm.booted) { adm.booted = true; adm.log.push({ who: "bot", html: `<p>Good ${new Date().getHours() < 12 ? "morning" : "afternoon"}. ${onLot().length} on the lot, ${S.leads.filter(l => l.stage === "New").length} new leads, ${S.quotes.filter(q => q.status === "Sent").length} quotes out.</p><p>Tell me a change, like a price drop or a new unit, and I'll show you exactly what I'll do before I touch anything.</p>` }); }
  const log = $("#aLog");
  log.innerHTML = adm.log.map(m => `<div class="msg ${m.who === "me" ? "me" : "bot wide"}">${m.html}</div>`).join("");
  log.scrollTop = log.scrollHeight;
}
function adminSay(text) {
  adm.log.push({ who: "me", html: esc(text) });
  const r = adminRespond(text);
  renderAdminTessa();
  const log = $("#aLog"); const dots = document.createElement("div"); dots.className = "msg bot"; dots.style.padding = "0"; dots.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
  log.appendChild(dots); log.scrollTop = log.scrollHeight;
  setTimeout(() => { adm.log.push({ who: "bot", html: r }); renderAdminTessa(); }, 700);
}
function parseMoney(s, k) { let v = parseFloat(String(s).replace(/[$,\s]/g, "")); if (k || (v < 100 && /k/i.test(s))) v *= 1000; return Math.round(v); }
function matchUnits(phrase) {
  const p = phrase.toLowerCase();
  const stock = p.match(/tt-?\s?0?(\d{3,4})/);
  if (stock) { const t = S.inventory.find(x => x.id.replace("TT-0", "") === stock[1].replace(/^0/, "") || x.id === "TT-" + stock[1].padStart(4, "0")); return t ? [t] : []; }
  const stop = ["the", "a", "an", "our", "unit", "units", "trailer", "trailers", "one", "new", "price", "of", "on", "that", "this", "timpte", "s", "to"];
  const words = p.replace(/[^a-z0-9' -]/g, " ").split(/\s+/).filter(w => w && !stop.includes(w)).map(w => w.replace(/s$/, ""));
  if (!words.length) return [];
  return S.inventory.filter(t => t.status !== "sold").filter(t => { const hay = `${t.model} ${typeLabel(t.type)} ${t.type} ${t.loading}`.toLowerCase().replace(/-/g, " "); return words.every(w => hay.includes(w.replace(/-/g, " "))); });
}
function confirmCard(kind, data, lines) {
  const id = "C" + Date.now(); adm.pending[id] = { kind, data };
  return `<div class="confirm" id="${id}"><div class="ch">Proposed change</div><ul>${lines.map(l => `<li>${l}</li>`).join("")}</ul><div class="yes">You confirm every change.</div>
    <div class="cb"><button class="btn btn-gold xs" data-act="adm-confirm" data-k="${id}">Confirm</button><button class="btn btn-line xs" data-act="adm-cancel" data-k="${id}">Cancel</button></div></div>`;
}
function adminRespond(text) {
  const t = text.toLowerCase().trim();
  let m = t.match(/(?:drop|lower|cut|reduce|raise|bump|change|set|make|put|mark down|price)\s+(?:the\s+)?(?:price\s+(?:of|on)\s+)?(.+?)\s+(?:to|at|for)\s+\$?\s*([\d,.]+)\s*(k\b)?/);
  if (m) {
    const units = matchUnits(m[1]), price = parseMoney(m[2], m[3]);
    if (!price || price < 500) return `<p>I didn't catch a price there. Try “Drop the 1614 dump to $15,900”.</p>`;
    if (!units.length) return `<p>I couldn't find a unit matching “${esc(m[1])}”. Try a stock number like TT-0142, or a model like “1614 dump”.</p>`;
    return `<p>${units.length > 1 ? `That matches ${units.length} units. I'll change all of them:` : "Here's the change:"}</p>` + confirmCard("price", { ids: units.map(u => u.id), price },
      units.map(u => `${u.id} ${esc(tname(u))}: ${money(u.price)} → <b>${money(price)}</b> <span class="muted">(${price < u.price ? "−" : "+"}${money(Math.abs(u.price - price))})</span>`));
  }
  m = t.match(/add\s+(?:a\s+|an\s+)?(?:new\s+)?(?:(20\d\d)\s+)?(.+?)\s+(?:at|for|priced at)\s+\$?\s*([\d,.]+)\s*(k\b)?/);
  if (m) {
    const name = m[2].replace(/\btimpte\b/, "").trim();
    const type = /dump/.test(name) ? "dump" : /gooseneck|gn/.test(name) ? "gooseneck" : /deck/.test(name) ? "deckover" : /tilt/.test(name) ? "tilt" : "ezload";
    const model = "Timpte " + name.replace(/\b\w/g, c => c.toUpperCase()).replace(/\bUtv\b/, "UTV");
    const price = parseMoney(m[3], m[4]), year = m[1] ? +m[1] : new Date().getFullYear();
    const d = DATA.typeDefaults[type];
    return `<p>I'll add it with ${typeLabel(type).toLowerCase()} defaults. You can edit specs in the table after.</p>` + confirmCard("add", { model, type, price, year },
      [`New unit: <b>${year} ${esc(model)}</b>`, `Type: ${typeLabel(type)} · Stock ${"TT-0" + S.seq.TT}`, `Price: <b>${money(price)}</b> · Status: On the lot`, `Specs: ${num(d.payload)} lb payload, ${d.deckFt} ft deck, ${d.axles}`]);
  }
  m = t.match(/(?:mark|set|flag)\s+(?:the\s+)?(.+?)\s+(?:as\s+)?(sold|on hold|hold|on the lot|available|on order)\b/) || t.match(/^(?:we\s+)?sold\s+(?:the\s+)?(.+)$/);
  if (m) {
    const units = matchUnits(m[1]); const word = m[2] || "sold";
    const status = /sold/.test(word) ? "sold" : /hold/.test(word) ? "hold" : /order/.test(word) ? "order" : "lot";
    if (!units.length) return `<p>I couldn't find “${esc(m[1])}”. Use a stock number like TT-0158.</p>`;
    if (units.length > 1 && status === "sold") return `<p>That matches ${units.length} units (${units.map(u => u.id).join(", ")}). Which stock number sold?</p>`;
    return confirmCard("status", { ids: units.map(u => u.id), status }, units.map(u => `${u.id} ${esc(tname(u))}: ${statusInfo(u).label} → <b>${statusInfo(Object.assign({}, u, { status })).label}</b>`));
  }
  if (/how|lot|status|summary|look|numbers|today/.test(t)) {
    const lot = onLot(); const val = lot.reduce((s, x) => s + x.price, 0); const old = lot.filter(x => (Date.now() - new Date(x.added)) / DAY > 60);
    return `<p><b>${lot.length} on the lot</b> worth ${money(val)} at sticker. ${S.inventory.filter(x => x.status === "hold").length} on hold, ${S.inventory.filter(x => x.status === "order").length} arriving.</p>
      <p>${S.leads.filter(l => l.stage === "New").length} new leads need a call. ${S.quotes.filter(q => q.status === "Sent").length} quotes are out.</p>
      ${old.length ? `<p>Aging: ${old.map(x => `${x.id} ${esc(x.model)} (${Math.round((Date.now() - new Date(x.added)) / DAY)} days)`).join(", ")}. A price drop might move it.</p>` : ""}`;
  }
  if (/lead|call|follow/.test(t)) {
    const n = S.leads.filter(l => l.stage === "New");
    return n.length ? `<p>New leads to call:</p><ul>${n.map(l => `<li><b>${esc(l.name)}</b>, ${esc(l.interest)} · ${esc(l.phone)}</li>`).join("")}</ul>` : "<p>No new leads. Everyone's been contacted.</p>";
  }
  return `<p>I can change prices, add units, and update status. For example:</p><ul><li>Drop the 1614 dump to $15,900</li><li>Add a new 720 car hauler at $8,400</li><li>Mark TT-0158 sold</li><li>How's the lot looking?</li></ul>`;
}
function adminConfirm(id, yes) {
  const p = adm.pending[id]; if (!p) return;
  delete adm.pending[id];
  const entry = adm.log.find(m => m.html.includes(`id="${id}"`));
  let msg = "", flash = [];
  if (yes) {
    if (p.kind === "price") { setPrice(p.data.ids, p.data.price, true); flash = p.data.ids; msg = `Done. ${p.data.ids.join(", ")} now ${money(p.data.price)} on the site.`; }
    if (p.kind === "add") { const t = newUnit(Object.assign({ via: true }, p.data)); flash = [t.id]; msg = `Added ${t.id}. It's live in inventory.`; }
    if (p.kind === "status") { p.data.ids.forEach(i => setStatus(i, p.data.status, true)); flash = p.data.ids; msg = `Updated ${p.data.ids.join(", ")}.`; }
  } else msg = "Cancelled. Nothing changed.";
  if (entry) entry.html = entry.html.replace(`class="confirm"`, `class="confirm ${yes ? "done" : "cancel"}"`).replace(/<div class="cb">[\s\S]*?<\/div><\/div>$/, `<div class="yes"><b>${yes ? "✓ Confirmed by " + esc(me().name) : "Cancelled"}</b></div></div>`);
  adm.log.push({ who: "bot", html: `<p>${msg}</p>` });
  if (yes) { adm.tab = "inventory"; renderAdminMain(flash); renderKpis(); toast(msg); }
  renderAdminTessa();
}
function syncSpecs() {
  if (adm.syncing) return; adm.syncing = true;
  const b = $("#syncBtn"); b.disabled = true; b.innerHTML = `<span class="spin"></span> Checking Timpte…`;
  $("#syncNote").textContent = "Comparing " + S.inventory.length + " units against Timpte build sheets…";
  setTimeout(() => {
    adm.syncing = false; S.specsSynced = new Date().toISOString(); save(); logChange("Pulled latest specs from Timpte · no changes needed");
    b.disabled = false; b.textContent = "Pull latest specs from Timpte";
    $("#syncNote").innerHTML = `<span style="color:var(--green);font-weight:700">✓ Specs up to date</span> · ${fmtWhen(S.specsSynced)}`;
    toast("Specs up to date. All units match Timpte's latest build sheets.");
  }, 2200);
}
/* @end-demo */

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
/* @demo */
function quoteModal(id) {
  const t = unit(id); if (!t) return;
  const u = me(); const cu = u && u.role === "customer" ? u : null;
  const addons = DATA.addons.filter(a => a.types.includes(t.type));
  openModal(`<h3>Quote ${t.id}</h3><p class="sub">${esc(tname(t))}. Pick add-ons and see the out-the-door number.</p>
    <form data-form="quoteb" data-id="${t.id}" novalidate>
      ${addons.map(a => `<label class="addon"><input type="checkbox" name="addon" value="${a.id}" ${a.rec ? "checked" : ""}><span>${esc(a.label)}</span><b>${money(a.price)}</b></label>`).join("")}
      <div id="qbTable" style="margin-top:12px"></div>
      <div class="fields" style="margin-top:16px"><div><label for="qbName">Name</label><input id="qbName" name="name" required value="${cu ? esc(cu.name) : ""}"></div><div><label for="qbPhone">Phone</label><input id="qbPhone" name="phone" type="tel" required value="${cu ? esc(cu.phone) : ""}"></div></div>
      <div class="form-foot"><p>Sample tax and fees. Valid 14 days.</p><button class="btn btn-gold" type="submit">Save quote</button></div></form>`, {
    mount(bg) { const f = bg.querySelector("form"); const upd = () => { const ids = $$("input[name=addon]:checked", f).map(i => i.value); $("#qbTable").innerHTML = quoteTable({ trailerId: t.id, addons: ids }); }; f.addEventListener("change", upd); upd(); }
  });
}
function signinModal() {
  openModal(`<h3>Sign in to the demo</h3><p class="sub">One click, no password. Two sides of the counter.</p>${tourHTML()}`, { wide: true });
}
function signIn(id, keep) {
  S.user = id; save(); closeModal(); closeDrawer();
  chat.booted = false; chat.ctx = {};
  const p = persona(id); toast(`Signed in as ${esc(p.name)} · ${esc(p.title)}`);
  if (keep) { openChat(); return render(true); }
  go(p.role === "customer" ? "/account/" : "/admin/");
}
function footerDemoHTML() {
  return `<a href="/account/">My Account</a><a href="/admin/">Dealer console</a><a href="/vision/">What the finished site adds</a>`;
}
function footerResetHTML() { return `<button data-act="reset">Reset demo</button>`; }
function footerDemoNote() { return "Demo site by Albright Agency · Sample stock, no real orders"; }
/* @end-demo */

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
  async "acc-request"(f) {
    if (!need(f, ["name", "phone"])) return;
    const items = S.cart.slice();
    const r = await sendLead(f, "Accessories request", { items: items.map(([id, q]) => { const a = DATA.accessories.find(x => x.id === id); return (q > 1 ? q + " × " : "") + id + (a ? " " + a.name : ""); }).join("; "), unit: f.elements.unit.value });
    if (!r.ok) return;
    const o = createPartsOrder(items, f.elements.name.value.trim(), f.elements.phone.value.trim());
    addLead({ name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), interest: "Accessories: " + items.map(([id, q]) => (q > 1 ? q + " × " : "") + id).join(", ") + (f.elements.unit.value.trim() ? " · " + f.elements.unit.value.trim() : ""), source: "Accessories request" });
    S.cart = []; save();
    renderRequest(); toast(`Request sent. We'll confirm availability and the pickup day within 24 hours.${DEMO ? ` <a href="/account/?s=a-orders">My Account</a>` : ""}`, 6000);
  },
  async prequal(f) { if (!need(f, ["name", "phone"])) return; const r = await sendLead(f, "Financing pre-qualify", { price: money(fin.price), as: f.elements.as.value }); if (!r.ok) return; addLead({ name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), interest: "Financing pre-qualify · " + money(fin.price), source: "Financing" }); f.innerHTML = doneHTML("Got it.", "You'll hear from us within 24 hours with real options for " + money(fin.price) + "."); },
  /* @demo */
  "admin-chat"(f) { const v = f.elements.q.value.trim(); if (!v) return; adminSay(v); },
  quoteb(f) {
    if (!need(f, ["name", "phone"])) return;
    const t = unit(f.dataset.id); const ids = $$("input[name=addon]:checked", f).map(i => i.value);
    const q = createQuote(t, ids, f.elements.name.value.trim(), f.elements.phone.value.trim());
    f.parentNode.innerHTML = `<button class="xbtn" data-act="modal-close" aria-label="Close" style="position:absolute;top:14px;right:14px">${ICON.x}</button>` + doneHTML(`Quote ${q.id} saved.`, `Out the door: <b>${money(quoteCalc(t, ids).total)}</b>. The team will call to walk through it.`) +
      `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><a class="btn btn-gold sm" href="/account/?s=a-quotes">View in My Account</a><button class="btn btn-line sm" data-act="hold" data-id="${t.id}">Hold this unit</button></div>`;
    rerender();
  },
  "add-unit"(f) {
    const e = f.elements; if (!e.model.value.trim() || !(+e.price.value > 0)) { [e.model, e.price].forEach(i => i.classList.toggle("bad", !i.value.trim())); return; }
    const t = newUnit({ model: e.model.value.trim(), type: e.type.value, price: +e.price.value, year: +e.year.value, status: e.status.value });
    closeModal(); adm.tab = "inventory"; renderAdminMain([t.id]); renderKpis(); toast(`Added ${t.id}. It's live in inventory.`);
  },
  /* @end-demo */
};

/* ==========================================================================
   ROUTER + EVENTS
   ========================================================================== */
/* Real page addresses. build.py writes one folder per address (so every page loads on its own and search engines
   can read it); this router takes over once the script runs, and keeps the old #/ links working. */
const CAT_SLUG = { tilt: "split-tilt", deckover: "deck-over", gooseneck: "gooseneck", dump: "dump", ezload: "ez-load" };
const SLUG_CAT = Object.fromEntries(Object.entries(CAT_SLUG).map(([k, v]) => [v, k]));
const PAGES = { "": "home", trailers: "inventory", stock: "trailer", finder: "finder", compare: "compare", accessories: "accessories",
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
  const moved = { parts: "/accessories/", service: "/owner-resources/" };
  if (moved[parts[0]]) { history.replaceState(null, "", moved[parts[0]]); return parseRoute(); }
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
    case "cart-add": { const c = S.cart.find(x => x[0] === id); if (c) c[1]++; else S.cart.push([id, 1]); save(); renderRequest(); toast("Added to your request."); break; }
    case "cart-qty": { const c = S.cart.find(x => x[0] === id); if (c) { c[1] += +el.dataset.d; if (c[1] < 1) S.cart = S.cart.filter(x => x[0] !== id); } save(); renderRequest(); break; }
    case "acc-group": accUI.cat = el.dataset.c; $$("[data-act=acc-group]").forEach(x => x.setAttribute("aria-pressed", x === el)); renderAccessories(); break;
    case "acc-fit": accUI.fit = el.checked; renderAccessories(); break;
    case "fin-term": fin.term = +el.dataset.n; $$("[data-act=fin-term]").forEach(x => x.setAttribute("aria-pressed", x === el)); renderCalc(); break;
    /* @demo */
    case "quote": quoteModal(id); break;
    case "signin-open": e.preventDefault(); closeMenus(); closeDrawer(); signinModal(); break;
    case "as": signIn(el.dataset.user); break;
    case "signout": e.preventDefault(); { const n = me() ? me().name : ""; S.user = null; save(); chat.booted = false; chat.ctx = {}; render(true); toast(`Signed out${n ? " of " + esc(n) : ""}.`); } break;
    case "reset": resetDemo(); break;
    case "release": releaseHold(id); render(true); toast("Hold released. The unit is back on the lot."); break;
    case "adm-tab": adm.tab = el.dataset.k; renderAdminMain(); break;
    case "adm-add": openAddUnit(); break;
    case "adm-sold": setStatus(id, "sold"); renderAdminMain([id]); renderKpis(); toast(`${id} marked sold.`); break;
    case "adm-say": adminSay(el.dataset.say); break;
    case "adm-confirm": adminConfirm(el.dataset.k, true); break;
    case "adm-cancel": adminConfirm(el.dataset.k, false); break;
    case "sync": syncSpecs(); break;
    /* @end-demo */
  }
});
document.addEventListener("change", e => {
  const el = e.target;
  if (el.dataset.act === "cmp-add" && el.value) { toggleCompare(el.value); render(true); return; }
  if (el.dataset.act === "inv-sort") { inv.sort = el.value; renderInvGrid(); return; }
  if (el.dataset.act === "fin-tr") { const t = unit(el.value); fin.id = el.value; if (t) { fin.price = t.price; fin.down = Math.round(t.price * DATA.finance.downPct / 100); $("#fPrice").value = fin.price; $("#fDown").value = fin.down; } renderCalc(); return; }
  /* @demo */
  if (el.dataset.edit) {
    const t = unit(el.dataset.id);
    if (el.dataset.edit === "price") { const v = Math.round(+el.value); if (v > 0 && v !== t.price) { setPrice([t.id], v); toast(`${t.id} now ${money(v)}.`); } }
    else { setStatus(t.id, el.value); toast(`${t.id}: ${statusInfo(t).label}.`); }
    renderAdminMain([t.id]); renderKpis(); return;
  }
  if (el.dataset.adm) {
    const v = el.value, id = el.dataset.id;
    if (el.dataset.adm === "lead") return setLeadStage(id, v);
    const coll = { quote: S.quotes, parts: S.partsOrders, ticket: S.tickets, hold: S.holds }[el.dataset.adm];
    const r = coll.find(x => x.id === id); if (!r) return;
    if (el.dataset.adm === "hold" && v === "Released") releaseHold(id); else r.status = v;
    if (el.dataset.adm === "hold" && v === "Converted") { const t = unit(r.trailerId); if (t) t.status = "sold"; }
    logChange(`${id} → <b>${esc(v)}</b>`); save(); renderAdminMain(); renderKpis(); toast(`${id} set to ${esc(v)}.`);
  }
  /* @end-demo */
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
  if (el.dataset.act === "acc-q") { accUI.q = el.value; renderAccessories(); }
  if (el.dataset.fin) { fin[el.dataset.fin] = +el.value || 0; if (el.dataset.fin !== "apr") { fin.id = ""; const s = $("#fTr"); if (s) s.value = ""; } renderCalc(); }
});
/* big picture on hover for lists that carry data-preview (the spec-sheet list on Owner resources) */
let previewBox = null;
function showPreview(li, x, y) {
  if (!previewBox) { previewBox = document.createElement("div"); previewBox.className = "spec-preview"; previewBox.setAttribute("aria-hidden", "true"); document.body.appendChild(previewBox); }
  previewBox.innerHTML = `<img src="${li.dataset.preview}" alt=""><b>${esc(li.dataset.previewTitle || "")}</b>`;
  const w = Math.min(520, innerWidth * 0.45), h = w * 0.62 + 44;
  let left = x + 24, top = y - h / 2;
  if (left + w > innerWidth - 12) left = x - w - 24;
  if (left < 12) left = 12;
  top = Math.max(12, Math.min(top, innerHeight - h - 12));
  previewBox.style.left = left + "px"; previewBox.style.top = top + "px"; previewBox.style.width = w + "px";
  previewBox.classList.add("on");
}
function hidePreview() { if (previewBox) previewBox.classList.remove("on"); }
document.addEventListener("mouseover", e => { const li = e.target.closest("[data-preview]"); if (li && matchMedia("(hover: hover)").matches) showPreview(li, e.clientX, e.clientY); else if (!e.target.closest(".spec-preview")) hidePreview(); });
document.addEventListener("mousemove", e => { const li = e.target.closest("[data-preview]"); if (li && previewBox && previewBox.classList.contains("on")) showPreview(li, e.clientX, e.clientY); });
document.addEventListener("mouseleave", hidePreview, true);
document.addEventListener("focusin", e => { const li = e.target.closest("[data-preview]"); if (li) { const r = li.getBoundingClientRect(); showPreview(li, r.right, r.top + r.height / 2); } else hidePreview(); });
document.addEventListener("scroll", hidePreview, true);
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
    <div><img src="${img("timeless-logo")}" alt="Timeless Trailers"><p>${esc(CONFIG.wording.exclusive)} · ${esc(b.address)} · ${b.phone}${b.email ? ` · <a href="mailto:${esc(b.email)}">${esc(b.email)}</a>` : ""} · ${esc(b.hours)}</p><a class="tbadge" href="${b.timpte}" target="_blank" rel="noopener"><img src="${img("timpte-et-logo")}" alt="Timpte Equipment Trailers" loading="lazy"><span>Timpte-exclusive CSC</span></a></div>
    <div><h4>Shop</h4><a href="/trailers/">On the lot</a><a href="/trailers/?s=lineup">Lineup</a><a href="/finder/">Trailer Finder</a><a href="/compare/">Compare</a></div>
    <div><h4>Own</h4><a href="/accessories/">Accessories</a><a href="/owner-resources/">Owner resources</a><a href="/financing/">Financing</a></div>
    <div><h4>Company</h4><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/owner-resources/">Owner resources</a><a href="/privacy/">Privacy</a>${DEMO ? footerDemoHTML() : ""}</div>
  </div><div class="fbot"><span>${DEMO ? footerDemoNote() : `© ${new Date().getFullYear()} ${esc(b.name)} · Site by <a href="https://albright-innovations.com" target="_blank" rel="noopener">${esc(CONFIG.site.builtBy)}</a>`}</span>${DEMO ? footerResetHTML() : ""}</div></div></footer>
  <div class="mbar"><a class="btn btn-line-light" href="/trailers/">On the lot</a><a class="btn btn-gold" href="/?s=quote">Get a quote</a></div>
  <a class="usa" href="/?s=why-timpte" aria-label="Made in the USA. Timpte trailers are built in Lincoln, Nebraska">
    <svg class="flag" viewBox="0 0 60 40" aria-hidden="true"><defs><filter id="usaWave" x="-10%" y="-20%" width="120%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.03 0.09" numOctaves="2" seed="3" result="t"><animate attributeName="baseFrequency" dur="6s" values="0.03 0.09;0.045 0.11;0.03 0.09" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" in2="t" scale="4" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
      <g filter="url(#usaWave)">${Array.from({ length: 13 }, (_, i) => `<rect x="0" y="${(i * 40 / 13).toFixed(2)}" width="60" height="${(40 / 13 + 0.2).toFixed(2)}" fill="${i % 2 ? "#ffffff" : "#b22234"}"/>`).join("")}<rect x="0" y="0" width="24" height="21.6" fill="#3c3b6e"/>${[...Array(4)].map((_, r) => [...Array(5)].map((_, c) => `<circle cx="${(3 + c * 4.5).toFixed(1)}" cy="${(3 + r * 5).toFixed(1)}" r="1" fill="#fff"/>`).join("")).join("")}</g></svg>
    <span><b>Made in the USA</b><small>Built in Lincoln, Nebraska</small></span></a>
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
document.addEventListener("DOMContentLoaded", () => { buildChrome(); setMbar(); render(); if (matchMedia("(prefers-reduced-motion: reduce)").matches) $$(".usa animate").forEach(a => a.remove()); });
