

VIEWS.vision = {
  title: "What the finished site adds · Timeless Trailers",
  html() {
    const items = [
      ["Every Timpte model", "All 19 models with full photo galleries, not the 10 shown here."],
      ["The whole video library", "Walk-arounds split into chapters, plus how-to videos: operating the tilt, dump hydraulics, coupling, lights."],
      ["Part-number lookup", "Timpte's serviceable-parts catalog searchable by model, so an owner can order the right part from the phone."],
      [`${A} answers spec questions`, `"What's the loading angle on the 1624?" ${A} reads it straight from the spec sheet.`],
      ["Matt's real inventory", "The lot list, stock numbers and prices come from Matt, not sample data. Mark a unit sold and the site updates."],
      ["Quotes and holds in Matt's inbox", "Every quote, hold and parts order lands in email or text, with a lead board to work from."],
      ["Financing applications", "A real pre-qualify form through the lender Timeless uses."],
      ["Google and the answer tools", "Each model gets its own page with structured data, so searches for a Timpte split tilt near Charlotte find Timeless."]
    ];
    return `<div class="page-head"><div class="wrap"><div class="crumbs"><a href="#/home">Home</a> / The finished site</div><div class="eyebrow">Concept v3 · for review</div><h1 style="margin-top:10px">What the finished site adds.</h1>
      <p class="lede">This version has real Timpte models, specs, photos and video. Here's what the full build adds on top, so you can picture the whole thing before we build it.</p></div></div>
    <section style="padding-top:34px"><div class="wrap"><div class="grid2">${items.map(([h, p]) => `<div class="panel"><h3>${h}</h3><p style="margin:0;color:var(--text-2)">${p}</p></div>`).join("")}</div>
      <div class="panel" style="margin-top:22px"><h3>What's sample in this version</h3><p style="margin:0;color:var(--text-2)">Prices, stock numbers, the demo customers and staff, machine weights and truck tow ratings. Everything about the trailers themselves (model names, payloads, weights, decks, angles, axles, tires) comes from Timpte's 2026 spec sheets.</p></div>
    </div></section>`;
  }
};


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

/* ---------- admin ---------- */
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
    <div class="kpi"><b>${tk.length}</b><span>Open service tickets</span><small>${S.partsOrders.filter(o => o.status === "Ordered").length} parts orders to pull</small></div>`;
}
function renderAdminMain(flashId) {
  const m = $("#adminMain"); if (!m) return;
  const tabs = [["inventory", "Inventory", S.inventory.filter(t => t.status !== "sold").length], ["leads", "Leads", S.leads.filter(l => ["New", "Contacted", "Quoted"].includes(l.stage)).length],
    ["holds", "Holds", S.holds.filter(h => h.status === "Active").length], ["quotes", "Quotes", S.quotes.length], ["parts", "Parts orders", S.partsOrders.filter(o => o.status !== "Picked up").length],
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
        <td style="white-space:nowrap">${t.status !== "sold" ? `<button class="btn btn-line xs" data-act="adm-sold" data-id="${t.id}">Mark sold</button>` : ""} <a class="btn btn-line xs" href="#/trailer/${t.id}">View</a></td></tr>`).join("")}</tbody></table></div>`;
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
      <td>${o.items.map(([id, q]) => { const p = DATA.parts.find(x => x.id === id); return `${q} × ${esc(p ? p.name : id)}`; }).join("<br>")}</td><td>${money(partsTotal(o.items))}</td><td>${fmtDate(o.created)}</td><td>${sel("parts", o.id, o.status, ["Ordered", "Ready for pickup", "Picked up"])}</td></tr>`).join("")}</tbody></table></div>`;
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

/* admin AI advisor */
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

/* ==========================================================================
   ANDY (customer chat). Andy lives on Stammer; the site opens him in a panel on
   the right. The panel can't type into Stammer's window for the visitor, so a
   question typed on the site is copied to the clipboard and shown above the chat.
   ========================================================================== */
const STAMMER_EMBED = "https://app.stammer.ai/en/chatbot/embed/6c5361b8-327c-4024-a1e8-6eff602a3384";
const chat = { booted: false, busy: false, ctx: {}, opener: null };
function loadChatFrame() {
  const box = $("#tzFrame"); if (!box || box.firstChild) return;
  const f = document.createElement("iframe");
  f.title = `Chat with ${A}`; f.setAttribute("allow", "microphone; clipboard-read; clipboard-write"); f.src = STAMMER_EMBED;
  box.appendChild(f);
}
function showQ(q) {
  const box = $("#tzQ"); if (!box) return;
  if (!q) { box.hidden = true; box.innerHTML = ""; return; }
  box.hidden = false; box.innerHTML = `<b>${esc(q)}</b><small>Type this in the chat below to send it.</small>`;
  try { navigator.clipboard.writeText(q).then(() => { const s = box.querySelector("small"); if (s) s.textContent = "Copied. Paste it in the chat below (Ctrl+V) to send."; }, () => {}); } catch (e) { /* fine */ }
}
function openChat(question, opener) {
  chat.opener = opener || document.activeElement;
  loadChatFrame();
  const p = $("#tzPanel"); p.classList.add("open"); p.setAttribute("aria-hidden", "false");
  document.body.classList.add("chat-open"); $("#tzFab").setAttribute("aria-expanded", "true");
  showQ(typeof question === "string" ? question : "");
  setTimeout(() => { const c = $("#tzClose"); if (c) c.focus(); }, 320);
}
function closeChat() {
  const p = $("#tzPanel"); p.classList.remove("open"); p.setAttribute("aria-hidden", "true");
  document.body.classList.remove("chat-open"); $("#tzFab").setAttribute("aria-expanded", "false");
  if (chat.opener && chat.opener.focus) chat.opener.focus();
}
function resetChat() { closeChat(); }
function addMsg() {}
function setChips() {}
function userSays(text) { openChat(String(text || "").trim()); }
function botReply(r) {
  const msgs = r.msgs || []; let i = 0; chat.busy = true; $("#tzSend").disabled = true;
  const next = () => {
    if (i >= msgs.length) { chat.busy = false; $("#tzSend").disabled = false; setChips(r.chips); if (r.after) r.after(); if (chat.queue) { const q = chat.queue; chat.queue = null; userSays(q); } return; }
    const dots = addMsg("bot", '<span class="typing"><i></i><i></i><i></i></span>'); dots.style.padding = "0";
    setTimeout(() => { dots.remove(); addMsg("bot" + (msgs[i].length > 220 ? " wide" : ""), msgs[i]); i++; next(); }, 450 + Math.min(900, msgs[i].length * 2));
  };
  next();
}
function greeting() {
  const u = me();
  if (u && u.role === "customer" && myOwned().length) {
    const o = myOwned()[0];
    return { msgs: [`<p>Hi ${esc(u.name.split(" ")[0])}, I'm ${A}. I've got your ${o.year} ${esc(o.model)} on file, warranty through ${fmtDateY(o.warrantyEnds)}.</p><p>I can order parts for pickup, open a service ticket, or help you size up a second trailer.</p>`],
      chips: ["Order a tail light kit", "Brakes feel weak, open a service ticket", "Will a Kubota KX040 fit my Split Tilt?", "What's on the lot?"] };
  }
  if (u && u.role === "customer") {
    chat.ctx.truck = truckOf(u);
    return { msgs: [`<p>Hi ${esc(u.name.split(" ")[0])}, I'm ${A}. I see you tow with a ${esc(u.truck)}. Tell me what you're hauling and I'll match a trailer that truck can handle.</p>`],
      chips: ["Car hauler for a '67 Mustang", "Will my Silverado 1500 tow the 1020 EZ-Load?", "Monthly payment on the Open Car Hauler", "Hold the Open Car Hauler"] };
  }
  if (isStaff()) return { msgs: [`<p>Hi ${esc(u.name.split(" ")[0])}. This is the customer-facing ${A}. To change prices or inventory, use the ${A} panel in the <a href="#/admin">dealer console</a>.</p>`], chips: ["Bobcat T66 and a 2022 F-250", "What's on the lot?"] };
  return { msgs: [`<p>Hi, I'm ${A}, the trailer advisor at Timeless. Tell me what you haul and what you pull it with. I'll match a trailer, check it against your truck, and tell you what's on the lot.</p>`],
    chips: ["Bobcat T66 and a 2022 F-250", "Car hauler for a '67 Mustang", "What's on the lot?", "Monthly payment on a dump trailer"] };
}

/* ---- matching helpers ---- */
const wordHit = (t, a) => new RegExp("(^|[^a-z0-9])" + a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-z0-9]|$)").test(t);
function findMachine(t) {
  let best = null, len = 0;
  DATA.machines.forEach(m => m.alias.forEach(a => { if (a.length > len && wordHit(t, a)) { best = m; len = a.length; } }));
  return best;
}
function findTruck(t) {
  let best = null, len = 0;
  DATA.trucks.forEach(m => m.alias.forEach(a => { if (a.length > len && wordHit(t, a)) { best = m; len = a.length; } }));
  if (!best && /\b(my|the) truck\b/.test(t) && me() && me().truck) best = truckOf(me());
  return best;
}
function findTrailer(t) {
  const s = t.match(/tt-?\s?(\d{4})/); if (s) return unit("TT-" + s[1]);
  const keys = [["1614", "1614"], ["1414", "1414"], ["1624", "1624"], ["1420", "1420"], ["split", "Split Tilt"], ["tilt", "Split Tilt"], ["deck over", "Deck Over"], ["deckover", "Deck Over"], ["gooseneck", "Gooseneck"], ["1620 gn", "Gooseneck"], ["1620", "1620"], ["1026", "1026"], ["1020", "1020"], ["720", "720"], ["514", "514"], ["ez load", "EZ Load"], ["ez-load", "EZ Load"], ["car hauler", "EZ Load"],
    ["open car", "Open Car"], ["toy hauler", "Toy Hauler"], ["utv hauler", "Toy Hauler"], ["514", "514"], ["612", "612"], ["dump", "Dump"]];
  for (const [k, model] of keys) if (t.includes(k)) {
    const pool = S.inventory.filter(x => x.model.includes(model) && x.status !== "sold");
    if (/16k|1624/.test(t) && model === "Split Tilt") { const x = pool.find(p => p.model.includes("1624")); if (x) return x; }
    return pool.find(x => x.status === "lot") || pool[0];
  }
  return null;
}
function parseWeight(t) {
  const m = t.match(/(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)\s*(k\b|lbs?\b|pounds?\b|#)/);
  if (!m) return null; let v = parseFloat(m[1].replace(/,/g, "")); if (m[2] === "k") v *= 1000; return v >= 200 && v <= 40000 ? Math.round(v) : null;
}
function guessCat(t) {
  if (/skid|track loader|ctl|loader/.test(t)) return "compact"; if (/excavator|mini.?ex/.test(t)) return "miniex"; if (/dozer|backhoe|tractor|big machine/.test(t)) return "heavy";
  if (/\bcar\b|truck|mustang|corvette/.test(t)) return "car"; if (/utv|atv|side.?by|golf cart|jeep/.test(t)) return "utv"; if (/dirt|mulch|gravel|debris|stone|sand/.test(t)) return "material";
  if (/mower|tools|equipment trailer for lawn/.test(t)) return "mower"; return null;
}
const CATNAME = { compact: "a typical skid steer", miniex: "a typical mini excavator", heavy: "a bigger machine", car: "a typical car", utv: "a UTV", material: "a load of material", mower: "a commercial mower" };
const withArticle = n => (/^(a |an |two |the )/i.test(n) ? n : (/^[aeiou]/i.test(n) ? "an " : "a ") + n);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const ctxTrailer = () => (chat.ctx.trailerId ? unit(chat.ctx.trailerId) : null);
const LOADNOTE = { compact: "Tracks drive straight up the tilt deck. No ramps to lift.", miniex: "The low tilt angle keeps the blade and boom from catching on the way up.",
  heavy: "The gooseneck puts the weight over the truck's rear axle and tows steadier.", car: "The low load angle keeps the front lip from scraping.",
  utv: "Drive straight on and strap down at the corners.", material: "The hydraulic bed unloads on site in seconds.", mower: "The fold-down gate doubles as the ramp." };
const truckChip = () => { const tr = chat.ctx.truck || truckOf(me()); return tr ? `Will my ${tr.name} tow it?` : "Will my F-250 tow it?"; };

/* ---- the brain ---- */
function respond(raw) {
  const t = raw.toLowerCase().replace(/[’']/g, "'");
  const c = chat.ctx;
  if (c.awaiting) { const r = handleAwaiting(raw, t); if (r) return r; }
  const tr = findTrailer(t); if (tr) { c.trailerId = tr.id; c.focus = tr.id; }
  const mach = findMachine(t), truck = findTruck(t), w = parseWeight(t);
  if (truck) c.truck = truck;

  const po = t.match(/order\s+(?:the\s+)?(p-\d{3})/); if (po) return orderPart(po[1].toUpperCase());
  if (/^(hi|hey|hello|yo|good (morning|afternoon|evening))\b/.test(t) && t.length < 20) return greeting();
  if (/thank|thanks|appreciate/.test(t)) return { msgs: ["<p>Anytime. If it helps, I can hold a unit or text the team to call you.</p>"], chips: ["Hold it", "Have someone call me", "What's on the lot?"] };
  if (/(other options|alternatives|something else like)/.test(t)) return otherOptions();
  if (/(call me|leave my number|talk to (a|someone|a person|matt)|real person|human|someone call)/.test(t)) return callbackFlow();
  if (/\b(hold|reserve|set aside|put .* aside)\b/.test(t)) return holdFlow();
  if (/\b(quote|out the door|otd|itemi[sz]ed?|total price|how much all in)\b/.test(t)) return quoteFlow();
  if (/(payment|monthly|per month|a month|financ|\bapr\b|\bloan\b|afford)/.test(t)) return paymentFlow();
  if (/\bcompare\b|\bvs\.?\b|versus|difference between/.test(t)) return compareFlow(t);
  if (myOwned().length && /(parts?\b|tail ?lights?|light kit|bearing kit|coupler|spare|strap|d-ring|breakaway|plug|tarp|magnet)/.test(t) && !mach) return partsFlow(t);
  if (/(service|repair|inspect|brakes?\b|broken|fix|leak|ticket|appointment|noise|grind|wobble|not working|went out|warranty claim)/.test(t) && !mach && !/tow/.test(t)) return serviceFlow(raw, t);
  if (/(parts?\b)/.test(t) && !mach) return partsFlow(t);

  const catLoad = guessCat(t) && !tr && (/haul|fit|carry|need|move|load|pull|tow/.test(t) || truck);
  if (mach || w || catLoad) {
    const lc = DATA.loadCats.find(x => x.k === guessCat(t)) || {};
    const load = mach ? { name: mach.name, weight: w || mach.w, cat: mach.cat, len: mach.len, sample: !w } : { name: null, weight: w || lc.w || 3000, cat: guessCat(t), len: w ? 0 : lc.len || 0, sample: !w };
    if (!w && !mach && load.cat) load.name = CATNAME[load.cat];
    const qty = /\b(two|2|pair of|couple of)\b/.test(t) && !w ? 2 : 1;
    if (qty > 1) { load.weight *= 2; load.len = load.len ? Math.min(Math.round(load.len * 1.6), 24) : 0; load.name = "two " + (mach ? mach.name + "s" : (CATNAME[load.cat] || "loads").replace(/^an? /, "") + "s"); load.plural = true; }
    c.load = load;
    const focusT = !tr && c.focus && /\b(it|this|this one|that one)\b/.test(t) ? unit(c.focus) : null;
    const specific = tr && /(fit|this|it|my|on the|on your|carry|haul|hold)/.test(t) ? tr : focusT;
    const r = specific ? fitSpecific(load, specific) : fitReply(load);
    if (!specific) c.focus = null;
    if (truck) { const tw = towReply(truck); r.msgs = r.msgs.concat(tw.msgs); r.chips = tw.chips; }
    return r;
  }
  if (truck) return towReply(truck);
  if (/tow (it|this|that)|can i tow|will .* tow|towing capacity|tow rating/.test(t)) {
    const tr2 = c.truck || truckOf(me());
    if (tr2) return towReply(tr2);
    return { msgs: ["<p>What truck are you pulling with? Year and model is plenty, like “2021 F-150” or “Ram 2500”.</p>"], chips: ["Ford F-150", "Ram 2500", "Silverado 1500", "Toyota Tacoma"] };
  }
  if (/\b(hours?|open (today|now|saturday|sunday|on)|what time|close|address|where are you|located|directions|visit|come by)\b/.test(t)) {
    const b = DATA.business;
    return { msgs: [`<p>We're at <b>${esc(b.address)}</b>, open ${b.hours}. Call or text ${b.phone}.</p><p><a href="${b.maps}" target="_blank" rel="noopener">Get directions</a>. Call ahead and we'll pull the unit you want up front.</p>`], chips: ["What's on the lot?", "Have someone call me"] };
  }
  if (/warrant/.test(t)) return { msgs: [`<p>Every new Timpte carries a <b>3-year manufacturer warranty</b>. We file the claim and do the repair here in Waxhaw, so you're not shipping anything off.</p>`], chips: ["Open a service ticket", "What's on the lot?"] };
  if (/(deliver|delivery)/.test(t)) return { msgs: ["<p>We can deliver in the Charlotte area. Distance and timing change the price, so the team confirms it on the call. Want them to reach out?</p>"], chips: ["Have someone call me", "Build a quote"] };
  if (/(trade|trade-in)/.test(t)) return { msgs: ["<p>We look at trade-ins case by case. Bring it by or send photos when the team calls, and we'll give you a straight number.</p>"], chips: ["Have someone call me"] };
  if (tr && /tell me about|about this|what about|details on/.test(t)) return trailerIntro(tr);
  if (/(in stock|on the lot|inventory|what do you have|available|what's on|whats on)/.test(t) || /car hauler|dump|tilt|gooseneck|deck over|ez load|toy hauler/.test(t)) return lotFlow(t);
  if (tr) return trailerIntro(tr);
  return fallback();
}

function handleAwaiting(raw, t) {
  const c = chat.ctx, a = c.awaiting;
  if (/^(cancel|never ?mind|stop|no thanks)/.test(t)) { c.awaiting = null; return { msgs: ["<p>No problem. Nothing saved.</p>"], chips: ["What's on the lot?"] }; }
  if (a === "holdConfirm") {
    c.awaiting = null;
    if (/^(yes|yep|yeah|sure|ok|do it|hold it|please)/.test(t)) { const u = me(); return finishHold(u.name, u.phone); }
    if (/different/.test(t)) { c.awaiting = "holdName"; return { msgs: ["<p>Sure. What name should I put it under?</p>"] }; }
    return null;
  }
  if (/\?/.test(raw) && a !== "serviceDesc") { c.awaiting = null; return null; }
  if (a === "holdName") { if (raw.trim().length < 2 || raw.length > 60) return null; c.holdName = raw.trim(); c.awaiting = "holdPhone"; return { msgs: [`<p>Thanks, ${esc(c.holdName.split(" ")[0])}. Best phone number for the team?</p>`] }; }
  if (a === "holdPhone") { if (digits(raw).length < 10) { if (/\d/.test(raw)) return { msgs: ["<p>That looks short. Ten digits, please, area code first.</p>"] }; c.awaiting = null; return null; } c.awaiting = null; return finishHold(c.holdName, raw.trim()); }
  if (a === "callName") { c.callName = raw.trim(); c.awaiting = "callPhone"; return { msgs: [`<p>And the best number to reach you, ${esc(c.callName.split(" ")[0])}?</p>`] }; }
  if (a === "callPhone") {
    if (digits(raw).length < 10) { c.awaiting = null; return null; }
    c.awaiting = null; addLead({ name: c.callName, phone: raw.trim(), interest: c.trailerId ? tname(unit(c.trailerId)) : (c.load ? (c.load.name || num(c.load.weight) + " lb load") : "General question"), source: A + " chat" });
    return { msgs: [`<p>Got it. The team will call ${esc(raw.trim())} today${new Date().getHours() >= 17 ? " first thing tomorrow" : ""}. If you'd rather, call or text ${DATA.business.phone} now.</p>`], chips: ["What's on the lot?"] };
  }
  if (a === "serviceDesc") { c.awaiting = null; return openTicket(raw, t); }
  return null;
}

function fitReply(load) {
  const ranked = rankFor({ cat: load.cat, weight: load.weight, len: load.len });
  chat.ctx.rank = ranked.map(r => r.t.id);
  const intro = load.name && load.sample ? `<p>${esc(cap(withArticle(load.name)))} ${load.plural ? "run" : "runs"} about <b>${num(load.weight)} lb</b>${load.plural ? " together" : ""} (sample weight${load.cat === "compact" || load.cat === "miniex" || load.cat === "heavy" ? "; add your bucket, attachments and fuel" : ""}).</p>`
    : `<p>Working from <b>${num(load.weight)} lb</b>${load.name ? " for the " + esc(load.name) : ""}.</p>`;
  if (!ranked.length) {
    return { msgs: [intro + `<p>Nothing on the lot carries that safely${load.len ? " with the deck length it needs" : ""}. Our biggest is the 1620 Gooseneck at ${num(15400)} lb payload. We can order a heavier Timpte for it.</p>`], chips: ["Have someone call me", { label: "Request a quote", href: "#/home?s=quote" }] };
  }
  const r = ranked[0], t = r.t; chat.ctx.trailerId = t.id;
  const n = lotCount(t.model);
  const deckLine = load.len ? ` The ${t.deckFt} ft deck covers its ~${load.len} ft length${t.deckFt - load.len >= 4 ? " with room for a bucket or a second item" : ""}.` : "";
  const msg2 = `<p>Best fit: <b>${esc(tname(t))}</b>. ${num(t.payload)} lb payload gives you <b>${Math.round(r.margin * 100)}% margin</b>.${deckLine} ${LOADNOTE[load.cat] || ""}</p>
    <div class="badges">${fitBadge(r)}<span class="badge">${t.deckFt} ft deck</span><span class="badge">${esc(t.loading)}${t.angle ? " · " + t.angle + "°" : ""}</span></div>
    ${r.fit === "tight" ? "<p><b>Heads up:</b> under 10% margin. Fine for the machine alone, tight with attachments.</p>" : ""}
    <p><b>${n ? `We have ${n} on the lot.` : t.status === "order" ? `Next one arrives ${t.eta}.` : "This one's on hold right now."}</b></p>${miniCard(t)}${t.video ? `<p><a href="#/trailer/${t.id}?s=watch">Watch it load →</a></p>` : ""}`;
  return { msgs: [intro, msg2], chips: [truckChip(), "Hold it", "Build a quote", "Estimate payments"].concat(ranked.length > 1 ? ["Show other options"] : []) };
}
function fitSpecific(load, t) {
  const margin = (t.payload - load.weight) / load.weight;
  const ok = margin >= 0 && t.suits.includes(load.cat) && (!load.len || t.deckFt >= load.len);
  chat.ctx.trailerId = t.id;
  if (ok) {
    const r = { margin, fit: margin >= 0.1 ? "ok" : "tight" };
    return { msgs: [`<p>Yes. ${load.name ? esc(cap(withArticle(load.name))) + " at" : "At"} about <b>${num(load.weight)} lb</b>${load.sample ? " (sample weight)" : ""}, the ${esc(tname(t))} carries ${num(t.payload)} lb: <b>${Math.round(margin * 100)}% margin</b>. ${LOADNOTE[load.cat] || ""}</p><div class="badges">${fitBadge(r)}<span class="badge">${t.deckFt} ft deck</span></div>${miniCard(t)}`],
      chips: [truckChip(), "Hold it", "Build a quote", "Estimate payments"] };
  }
  const why = margin < 0 ? `It's ${num(load.weight - t.payload)} lb over the ${num(t.payload)} lb payload.` : !t.suits.includes(load.cat) ? `It's not the right loading style for that.` : `The ${t.deckFt} ft deck is short for a ~${load.len} ft machine.`;
  const alt = fitReply(load);
  alt.msgs[0] = `<p>Not that one. ${why}</p>`;
  return alt;
}
function towReply(truck) {
  const c = chat.ctx; c.truck = truck; const t = ctxTrailer(); const cargo = c.load ? c.load.weight : null;
  if (!t && !cargo) return { msgs: [`<p>${esc(truck.name)}: about <b>${num(truck.tow)} lb</b> conventional${truck.gn ? `, ${num(truck.gn)} lb gooseneck` : ""} (sample rating; your door-jamb sticker is the real number). What are you hauling? I'll check the whole rig.</p>`],
    chips: ["Bobcat T66", "'67 Mustang", "Two UTVs", "Topsoil"] };
  const tt = t || unit(rankFor({ cat: c.load.cat, weight: cargo })[0]?.t.id);
  if (!tt) return fallback();
  const tw = towOf(tt, cargo, truck);
  const loadTxt = cargo ? `${num(tt.empty)} lb trailer + ${num(cargo)} lb load` : `the trailer at full ${num(tt.gvwr)} lb GVWR`;
  if (tw.state === "gn") return { msgs: [`<p>The ${esc(tt.model)} is a <b>gooseneck</b>. A ${esc(truck.name)} isn't usually set up with a bed hitch for it. Look at a bumper-pull split-tilt instead, or a 3/4-ton with a gooseneck hitch.</p><div class="badges">${towBadge(tw)}</div>`], chips: ["Show other options", "Have someone call me"] };
  const p = Math.round(tw.pct * 100);
  let verdict;
  if (tw.state === "ok") verdict = `<p>${esc(truck.name)}: sample rating <b>${num(tw.rating)} lb</b>. Loaded you're around <b>${num(tw.loaded)} lb</b> (${loadTxt}). That's <b>${p}%</b> of the rating. Comfortable.</p>`;
  else if (tw.state === "close") verdict = `<p>${esc(truck.name)}: sample rating ${num(tw.rating)} lb. Loaded you're around <b>${num(tw.loaded)} lb</b> (${loadTxt}): <b>${p}% of the rating</b>. That's too close for me to call comfortable. Hills, wind and hard braking use up that margin.</p>`;
  else verdict = `<p>${esc(truck.name)}: sample rating ${num(tw.rating)} lb. Loaded you'd be around <b>${num(tw.loaded)} lb</b> (${loadTxt}), <b>${num(tw.loaded - tw.rating)} lb over</b>. Don't tow that combination.</p>`;
  const msgs = [verdict + `<div class="badges">${towBadge(tw)}</div><p class="note">Check the sticker in your door jamb and your hitch's rating. Ratings vary a lot by cab, bed, axle ratio and engine.</p>`];
  let chips = ["Hold it", "Build a quote", "Estimate payments"];
  if (tw.state !== "ok" && c.load) {
    const alt = rankFor({ cat: c.load.cat, weight: c.load.weight, len: c.load.len, truck }).find(r => r.tow && r.tow.state === "ok");
    if (alt && alt.t.id !== tt.id) { c.trailerId = alt.t.id; msgs.push(`<p>Lighter option that keeps you in range: <b>${esc(tname(alt.t))}</b>, ${num(alt.t.empty)} lb empty. Loaded about ${num(alt.tow.loaded)} lb, ${Math.round(alt.tow.pct * 100)}% of your rating.</p><div class="badges">${fitBadge(alt)}${towBadge(alt.tow)}</div>${miniCard(alt.t)}`); }
    else msgs.push(`<p>Nothing on the lot gets that load under 85% of a ${esc(truck.name)}. You'd want a bigger truck for this one. The team can talk through options.</p>`);
    chips = ["Hold it", "Have someone call me", "Estimate payments"];
  }
  return { msgs, chips };
}
function holdFlow() {
  const c = chat.ctx, t = ctxTrailer();
  if (!t) { const lot = onLot().slice(0, 4); return { msgs: ["<p>Which unit? Give me a stock number, or pick one that's on the lot.</p>"], chips: lot.map(x => ({ label: `Hold ${x.id} · ${x.model.replace("Timpte ", "")}`, say: `Hold ${x.id}` })) }; }
  if (t.status === "sold") return { msgs: [`<p>${t.id} has sold. Want the closest match on the lot?</p>`], chips: ["What's on the lot?"] };
  if (t.status === "hold") {
    const alt = S.inventory.find(x => x.model === t.model && x.status === "lot");
    if (alt) { c.trailerId = alt.id; return { msgs: [`<p>${t.id} is already on hold, but ${alt.id} is the same model and it's on the lot.</p>${miniCard(alt)}`], chips: [`Hold ${alt.id}`] }; }
    return { msgs: [`<p>${t.id} is already on hold for another customer. Holds run 48 hours. I can have the team call you if it frees up.</p>`], chips: ["Have someone call me", "Show other options"] };
  }
  const u = me();
  const eta = t.status === "order" ? ` It's arriving ${t.eta}; the hold starts now and carries through delivery.` : "";
  if (u && u.role === "customer") { c.awaiting = "holdConfirm"; return { msgs: [`<p>Hold <b>${esc(tname(t))}</b> (Stock ${t.id}) for 48 hours under <b>${esc(u.name)}</b>, ${esc(u.phone)}?${eta}</p>`], chips: ["Yes, hold it", "Use a different name"] }; }
  c.awaiting = "holdName";
  return { msgs: [`<p>Happy to hold <b>${esc(tname(t))}</b> (Stock ${t.id}) for 48 hours, no deposit online.${eta} What name should I put it under?</p>`] };
}
function finishHold(name, phone) {
  const t = ctxTrailer();
  if (!t || (t.status !== "lot" && t.status !== "order")) return { msgs: ["<p>That unit just changed status. Pick another and I'll hold it.</p>"], chips: ["What's on the lot?"] };
  const h = createHold(t, name, phone); rerender();
  return { msgs: [`<p>Done. <b>${t.id} is on hold for ${esc(name)}</b> until ${fmtWhen(h.expires)}. The team will call ${esc(phone)} today to confirm. You'll see it in <a href="#/account?s=a-holds">My Account</a>.</p>`],
    chips: ["Build a quote", "Estimate payments", { label: "View My Account", href: "#/account?s=a-holds" }] };
}
function quoteFlow() {
  const t = ctxTrailer();
  if (!t) return { msgs: ["<p>Which trailer should I quote?</p>"], chips: onLot().slice(0, 4).map(x => ({ label: x.model.replace("Timpte ", ""), say: `Quote ${x.id}` })) };
  const u = me();
  const addons = DATA.addons.filter(a => a.rec && a.types.includes(t.type)).map(a => a.id);
  const name = u && u.role === "customer" ? u.name : chat.ctx.holdName || "Guest via " + A;
  const phone = u && u.role === "customer" ? u.phone : "";
  const q = createQuote(t, addons, name, phone); rerender();
  return { msgs: [`<p>Here's an itemized out-the-door quote for <b>${esc(tname(t))}</b>, with the add-ons most people take on this model:</p>${quoteTable(q)}<p class="note">Sample tax and fees. Quote ${q.id}, valid 14 days.${u && u.role === "customer" ? ` Saved to <a href="#/account?s=a-quotes">My Account</a>.` : ""}</p>`],
    chips: ["Hold it", "Estimate payments", { label: "Change add-ons", say: "__quote_modal" }].concat(u ? [] : ["Have someone call me"]) };
}
function paymentFlow() {
  const t = ctxTrailer();
  if (!t) return { msgs: ["<p>On which trailer?</p>"], chips: [["1614 Dump", "TT-0142"], ["1420 Split Tilt", "TT-0138"], ["720 EZ Load", "TT-0160"]].map(([l, id]) => ({ label: l, say: `Monthly payment on ${id}` })) };
  const f = DATA.finance;
  const rows = [36, 48, 60, 72].map(n => `<tr><td>${n} months</td><td>${money(monthly(t.price, { term: n }))}/mo</td></tr>`).join("");
  return { msgs: [`<p>On the <b>${esc(tname(t))}</b> at ${money(t.price)}, with ${f.downPct}% down (${money(t.price * f.downPct / 100)}) at ${f.apr}% APR (sample):</p><table class="qitems">${rows}</table><p>The common pick is ${f.term} months: about <b>${money(monthly(t.price))}/mo</b>. <a href="#/financing?id=${t.id}">Adjust the numbers</a>.</p>`],
    chips: ["Hold it", "Build a quote", { label: "Pre-qualify", href: "#/financing" }] };
}
function compareFlow(t) {
  const ids = (t.match(/tt-?\s?\d{4}/g) || []).map(s => "TT-" + s.replace(/\D/g, ""));
  if (ids.length >= 2) {
    const [a, b] = ids.map(unit); if (!a || !b) return fallback();
    const lighter = a.empty < b.empty ? a : b, more = a.payload > b.payload ? a : b;
    return { msgs: [`<p><b>${esc(more.model)}</b> carries more (${num(more.payload)} lb). <b>${esc(lighter.model)}</b> is lighter to tow (${num(lighter.empty)} lb empty). Price difference: ${money(Math.abs(a.price - b.price))}.</p><p>Tell me what you're hauling and what pulls it, and I'll pick one.</p>`], chips: [truckChip(), "Bobcat T66", "'67 Mustang"] };
  }
  return { msgs: ["<p>The compare page lines up to three trailers side by side and highlights the best number in each row.</p>"], chips: [{ label: "Open Compare", href: "#/compare" }, "What's on the lot?"] };
}
function lotFlow(t) {
  const type = /car|ez load|utility|toy|utv/.test(t) ? "ezload" : /dump/.test(t) ? "dump" : /gooseneck/.test(t) ? "gooseneck" : /deck over/.test(t) ? "deckover" : /tilt/.test(t) ? "tilt" : null;
  const list = onLot().filter(x => !type || x.type === type);
  if (!list.length) return { msgs: [`<p>Nothing in that category on the lot today. We can order it from Timpte.</p>`], chips: ["Have someone call me"] };
  chat.ctx.trailerId = list[0].id;
  return { msgs: [`<p>${type ? `${typeLabel(type)} on the lot` : "On the lot right now"}: <b>${list.length} unit${list.length > 1 ? "s" : ""}</b>.</p><ul style="margin:0;padding-left:18px">${list.slice(0, 6).map(x => `<li><a href="#/trailer/${x.id}">${esc(x.model.replace("Timpte ", ""))}</a> · ${x.id} · ${money(x.price)}</li>`).join("")}</ul><p>Tell me what you're hauling and I'll pick the right one.</p>`],
    chips: [{ label: "See inventory", href: "#/inventory" + (type ? "?type=" + type : "") }, "Bobcat T66", "'67 Mustang", "Mulch and topsoil"] };
}
function trailerIntro(t) {
  chat.ctx.trailerId = t.id; chat.ctx.focus = t.id;
  const sugg = DATA.machines.filter(m => t.suits.includes(m.cat) && m.w <= t.payload).slice(0, 2).map(m => `Will a ${m.name} fit on it?`);
  return { msgs: [`<p>Looking at <b>${esc(tname(t))}</b>, Stock ${t.id}: ${num(t.payload)} lb payload, ${t.deckFt} ft deck, ${esc(t.loading.toLowerCase())}${t.angle ? " at " + t.angle + "°" : ""}, ${esc(t.hitch.toLowerCase())}. ${statusInfo(t).label}, ${money(t.price)}.</p><p>What are you planning to haul on it?</p>`],
    chips: sugg.concat([truckChip(), "Hold it", "Build a quote", "Estimate payments"]) };
}
function partsFlow(t) {
  const own = myOwned()[0];
  const hits = DATA.parts.filter(p => p.kw.some(k => t.includes(k)) && (!own || p.fits.includes(own.type)));
  if (!own) return { msgs: [`<p>Owners can order parts right here in the chat. Browse the counter, or sign in as an owner to try it.</p>`], chips: [{ label: "Parts counter", href: "#/parts" }, { label: "Sign in as Marcus", say: "__as_marcus" }] };
  if (!hits.length) return { msgs: [`<p>For your ${esc(own.model)}, the common ones are lights, bearings, brake magnets and straps. Which do you need?</p>`], chips: ["Tail light kit", "Bearing kit", "Brake magnets", "Ratchet straps"] };
  return { msgs: [`<p>These fit your ${own.year} ${esc(own.model)}:</p><ul style="margin:0;padding-left:18px">${hits.slice(0, 3).map(p => `<li><b>${esc(p.name)}</b> · ${money(p.price)} · ${p.id}</li>`).join("")}</ul><p>Want me to order one for pickup?</p>`],
    chips: hits.slice(0, 3).map(p => ({ label: `Order ${p.name.split(" (")[0].split(",")[0]}`, say: `Order ${p.id}` })).concat([{ label: "Parts counter", href: "#/parts" }]) };
}
function orderPart(id) {
  const p = DATA.parts.find(x => x.id === id); const u = me();
  if (!p) return fallback();
  if (!u || !myOwned().length) return { msgs: ["<p>Parts orders in the chat are for owners with an account. You can order at the parts counter.</p>"], chips: [{ label: "Parts counter", href: "#/parts" }] };
  const o = createPartsOrder([[id, 1]], u.name, u.phone); rerender();
  return { msgs: [`<p>Ordered: <b>${esc(p.name)}</b>, ${money(p.price)}. Order ${o.id}. Usually ready for pickup in 1–2 business days; we'll text ${esc(u.phone)} when it's on the shelf. It's in <a href="#/account?s=a-orders">My Account</a>.</p>`], chips: ["Order more parts", "Open a service ticket"] };
}
function serviceFlow(raw, t) {
  const own = myOwned();
  if (!own.length) return { msgs: [`<p>We service Timpte trailers and most other brands. Book a time on the service page, or leave your number and we'll call.</p>`], chips: [{ label: "Book service", href: "#/service?s=book" }, "Have someone call me"] };
  if (!DATA.services.some(s => s.kw.some(k => t.includes(k)))) { chat.ctx.awaiting = "serviceDesc"; return { msgs: [`<p>What's going on with the ${esc(own[0].model)}? A sentence is plenty.</p>`] }; }
  return openTicket(raw, t);
}
function openTicket(raw, t) {
  const u = me(), o = myOwned()[0];
  const svc = DATA.services.find(s => s.kw.some(k => t.includes(k))) || { name: "Diagnosis", id: "diag" };
  const tk = createTicket({ name: u.name, phone: u.phone, unit: `${o.year} ${o.model}`, service: svc.name, notes: raw.slice(0, 140) }); rerender();
  return { msgs: [`<p>Opened <b>${tk.id}</b> for your ${o.year} ${esc(o.model)}: ${esc(svc.name)}. Status: Open. ${/warrant/.test(t) || svc.id === "warranty" ? "It's under warranty until " + fmtDateY(o.warrantyEnds) + ", so we'll file the claim. " : ""}The shop will call ${esc(u.phone)} to set a drop-off time; most work is same-week.</p><p>Track it in <a href="#/account?s=a-tickets">My Account</a>.</p>`], chips: ["Order parts", "Thanks"] };
}
function callbackFlow() {
  const u = me();
  if (u && u.role === "customer") { addLead({ name: u.name, phone: u.phone, interest: ctxTrailer() ? tname(ctxTrailer()) : "Callback request", source: A + " chat" }); return { msgs: [`<p>Done. The team will call ${esc(u.phone)} today. Or call ${DATA.business.phone} now.</p>`] }; }
  chat.ctx.awaiting = "callName"; return { msgs: ["<p>Sure. What's your name?</p>"] };
}
function otherOptions() {
  const ids = (chat.ctx.rank || []).filter(i => i !== chat.ctx.trailerId).slice(0, 2);
  if (!ids.length) return { msgs: ["<p>That was the only good fit on the lot. We can order other Timpte configurations.</p>"], chips: ["Have someone call me"] };
  chat.ctx.trailerId = ids[0];
  return { msgs: [`<p>Also worth a look:</p>${ids.map(i => miniCard(unit(i))).join("")}`], chips: ["Hold it", "Build a quote", "Estimate payments"] };
}
function fallback() {
  return { msgs: [`<p>Good question for the team. Leave your number and we'll call you today.</p><p>Or use the <a href="#/home?s=quote">quote form</a> and add the details.</p>`], chips: ["Leave my number", { label: "Quote form", href: "#/home?s=quote" }, "What's on the lot?"],
    after: () => { chat.ctx.pendingCallback = true; } };
}

/* ---- hold + quote modals (from buttons) ---- */
function holdModal(id) {
  const t = unit(id); if (!t) return;
  if (t.status !== "lot" && t.status !== "order") { toast(`${t.id} is ${statusInfo(t).label.toLowerCase()}.`); return; }
  const u = me(); const cu = u && u.role === "customer" ? u : null;
  openModal(`<h3>Hold ${t.id}</h3><p class="sub">${esc(tname(t))} · ${money(t.price)}. We hold it 48 hours while we confirm details. No payment online.</p>
    <form data-form="hold" data-id="${t.id}" novalidate><div class="fields">
      <div><label for="hName">Name</label><input id="hName" name="name" required value="${cu ? esc(cu.name) : ""}"></div>
      <div><label for="hPhone">Phone</label><input id="hPhone" name="phone" type="tel" required value="${cu ? esc(cu.phone) : ""}"></div></div>
      <div class="form-foot"><p>The team calls you today to confirm.</p><button class="btn btn-gold" type="submit">Hold this unit</button></div></form>`);
}
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

/* ---- validation ---- */
function need(f, names) {
  let ok = true, first = null;
  names.forEach(n => { const el = f.elements[n]; const v = el.value.trim(); const bad = !v || (n === "phone" && digits(v).length < 10); el.classList.toggle("bad", bad); if (bad) { ok = false; first = first || el; } });
  if (first) { first.focus(); toast(first.name === "phone" ? "Phone needs ten digits." : "Fill in the highlighted field."); }
  return ok;
}
const doneHTML = (h, p) => `<div class="done">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m7 12 3.5 3.5L17 9"/></svg>'}<h3>${h}</h3><p>${p}</p></div>`;

const FORMS = {
  "hero-ask"(f) { const v = f.elements.q.value.trim(); if (!v) { f.elements.q.focus(); return; } f.reset(); userSays(v); },
  chat(f) { const v = f.elements.q.value; f.reset(); if (/^leave my number$/i.test(v.trim())) return userSays("Have someone call me"); userSays(v); },
  "admin-chat"(f) { const v = f.elements.q.value.trim(); if (!v) return; adminSay(v); },
  quote(f) {
    if (!need(f, ["name", "phone"])) return;
    const e = f.elements; const first = e.name.value.trim().split(" ")[0];
    const tr = e.trailer.value.indexOf("Not sure") === 0 ? "the right trailer" : e.trailer.value;
    addLead({ name: e.name.value.trim(), phone: e.phone.value.trim(), interest: (tr === "the right trailer" ? "Help choosing" : tr) + (e.haul.value ? " · " + e.haul.value : ""), source: "Quote form" });
    f.querySelector(".fbody").innerHTML = doneHTML("Got it, " + esc(first) + ".", "We'll call you today about " + esc(tr) + " with availability, pricing and next steps.");
  },
  hold(f) {
    if (!need(f, ["name", "phone"])) return;
    const t = unit(f.dataset.id); const h = createHold(t, f.elements.name.value.trim(), f.elements.phone.value.trim());
    closeModal(); rerender(); toast(`${t.id} is on hold until ${fmtWhen(h.expires)}. <a href="#/account?s=a-holds">See it in My Account</a>`, 5000);
  },
  quoteb(f) {
    if (!need(f, ["name", "phone"])) return;
    const t = unit(f.dataset.id); const ids = $$("input[name=addon]:checked", f).map(i => i.value);
    const q = createQuote(t, ids, f.elements.name.value.trim(), f.elements.phone.value.trim());
    f.parentNode.innerHTML = `<button class="xbtn" data-act="modal-close" aria-label="Close" style="position:absolute;top:14px;right:14px">${ICON.x}</button>` + doneHTML(`Quote ${q.id} saved.`, `Out the door: <b>${money(quoteCalc(t, ids).total)}</b>. The team will call to walk through it.`) +
      `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><a class="btn btn-gold sm" href="#/account?s=a-quotes">View in My Account</a><button class="btn btn-line sm" data-act="hold" data-id="${t.id}">Hold this unit</button></div>`;
    rerender();
  },
  "parts-checkout"(f) {
    if (!need(f, ["name", "phone"])) return;
    const o = createPartsOrder(S.cart.slice(), f.elements.name.value.trim(), f.elements.phone.value.trim()); S.cart = []; save();
    renderCart(); toast(`Order ${o.id} placed. We'll text when it's ready for pickup. <a href="#/account?s=a-orders">My Account</a>`, 5000);
  },
  service(f) {
    if (!need(f, ["name", "phone"])) return;
    const e = f.elements; const tk = createTicket({ name: e.name.value.trim(), phone: e.phone.value.trim(), unit: e.unit.value, service: e.service.value, notes: e.notes.value.trim(), date: e.date.value ? new Date(e.date.value + "T12:00").toISOString() : null });
    f.innerHTML = doneHTML(`Ticket ${tk.id} open.`, `We'll call ${esc(e.phone.value)} to confirm drop-off${e.date.value ? " around " + fmtDate(tk.date) : ""}. ${me() ? '<a href="#/account?s=a-tickets">Track it in My Account</a>.' : ""}`);
  },
  prequal(f) { if (!need(f, ["name", "phone"])) return; addLead({ name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), interest: "Financing pre-qualify · " + money(fin.price), source: "Financing" }); f.innerHTML = doneHTML("You're in line.", "The team will call today with real rates for " + money(fin.price) + "."); },
  warranty(f) { const v = f.elements.vin.value.trim(); if (v.length < 6) { f.elements.vin.classList.add("bad"); toast("Enter the VIN or serial from the frame tag."); return; } f.innerHTML = `<p style="margin:0"><b style="color:var(--green)">✓ Registered.</b> Warranty on ${esc(v)} is on file with Timpte (sample).</p>`; },
  "add-unit"(f) {
    const e = f.elements; if (!e.model.value.trim() || !(+e.price.value > 0)) { [e.model, e.price].forEach(i => i.classList.toggle("bad", !i.value.trim())); return; }
    const t = newUnit({ model: e.model.value.trim(), type: e.type.value, price: +e.price.value, year: +e.year.value, status: e.status.value });
    closeModal(); adm.tab = "inventory"; renderAdminMain([t.id]); renderKpis(); toast(`Added ${t.id}. It's live in inventory.`);
  }
};

/* ==========================================================================
   ROUTER + EVENTS
   ========================================================================== */
function parseHash() {
  let h = location.hash || "#/home";
  const legacy = { "#lot": "#/inventory", "#quote": "#/home?s=quote", "#match": "#/home?s=match", "#lineup": "#/inventory?s=lineup", "#top": "#/home" };
  if (legacy[h]) { history.replaceState(null, "", legacy[h]); h = legacy[h]; }
  if (!h.startsWith("#/")) h = "#/home";
  const [path, qs] = h.slice(2).split("?");
  const parts = path.split("/").filter(Boolean);
  const q = {}; new URLSearchParams(qs || "").forEach((v, k) => { q[k] = v; });
  return { name: VIEWS[parts[0]] ? parts[0] : "home", arg: parts[1] ? decodeURIComponent(parts[1]) : null, q };
}
function render(keepScroll) {
  const prev = route.name;
  route = parseHash();
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
    case "quote": quoteModal(id); break;
    case "ask": { const t = unit(id); openChat(t ? `Tell me about the ${tname(t)}, stock ${t.id}` : "", el); break; }
    case "quote-model": closeModal(); location.hash = "#/home?s=quote&m=" + encodeURIComponent(el.dataset.model || ""); break;
    case "tessa-open": e.preventDefault(); closeDrawer(); openChat("", el); break;
    case "tessa-close": closeChat(); break;
    case "tessa-reset": resetChat(); break;
    case "say": {
      const s = el.dataset.say;
      if (s === "__quote_modal") { const t = ctxTrailer(); if (t) quoteModal(t.id); break; }
      if (s === "__as_marcus") { signIn("marcus", true); break; }
      userSays(s); break;
    }
    case "signin-open": e.preventDefault(); closeMenus(); closeDrawer(); signinModal(); break;
    case "as": signIn(el.dataset.user); break;
    case "signout": e.preventDefault(); { const n = me() ? me().name : ""; S.user = null; save(); chat.booted = false; chat.ctx = {}; render(true); toast(`Signed out${n ? " of " + esc(n) : ""}.`); } break;
    case "burger": openDrawer(); break;
    case "drawer-close": closeDrawer(); break;
    case "modal-close": closeModal(); break;
    case "reset": resetDemo(); break;
    case "inv-type": inv.type = el.dataset.type; renderInvGrid(); break;
    case "inv-clear": inv.type = "all"; inv.q = ""; $$("[data-search]").forEach(i => i.value = ""); renderInvGrid(); break;
    case "line-f": { const f = el.dataset.f; $$("[data-act=line-f]").forEach(x => x.setAttribute("aria-pressed", x === el)); $$(".model").forEach(m => { m.hidden = !(f === "all" || (" " + m.dataset.cat + " ").includes(" " + f + " ")); }); break; }
    case "f-cat": finder.cat = el.dataset.k; finder.machine = null; finder.len = DATA.loadCats.find(c => c.k === finder.cat).len; finder.weight = DATA.loadCats.find(c => c.k === finder.cat).w; renderFinder(); break;
    case "f-next": finder.step++; renderFinder(); $("#finderBox").scrollIntoView({ behavior: "smooth", block: "start" }); break;
    case "f-back": finder.step--; renderFinder(); break;
    case "f-restart": Object.assign(finder, { step: 1, cat: null, machine: null, weight: null, len: 0, truck: null, rating: null, freq: null, budget: null }); renderFinder(); break;
    case "f-truck": finder.truck = el.dataset.n; renderFinder(); if (finder.truck === "") $("#fRate").focus(); break;
    case "f-freq": finder.freq = el.dataset.k; renderFinder(); break;
    case "f-bud": finder.budget = +el.dataset.v; renderFinder(); break;
    case "cart-add": { const c = S.cart.find(x => x[0] === id); if (c) c[1]++; else S.cart.push([id, 1]); save(); renderCart(); toast("Added to your parts order."); break; }
    case "cart-qty": { const c = S.cart.find(x => x[0] === id); if (c) { c[1] += +el.dataset.d; if (c[1] < 1) S.cart = S.cart.filter(x => x[0] !== id); } save(); renderCart(); break; }
    case "parts-cat": partsUI.cat = el.dataset.c; $$("[data-act=parts-cat]").forEach(x => x.setAttribute("aria-pressed", x === el)); renderParts(); break;
    case "parts-fit": partsUI.fit = el.checked; renderParts(); break;
    case "fin-term": fin.term = +el.dataset.n; $$("[data-act=fin-term]").forEach(x => x.setAttribute("aria-pressed", x === el)); renderCalc(); break;
    case "release": releaseHold(id); render(true); toast("Hold released. The unit is back on the lot."); break;
    case "doc": toast(`Sample: “${esc(el.dataset.n)}” would open as a PDF here.`); break;
    case "adm-tab": adm.tab = el.dataset.k; renderAdminMain(); break;
    case "adm-add": openAddUnit(); break;
    case "adm-sold": setStatus(id, "sold"); renderAdminMain([id]); renderKpis(); toast(`${id} marked sold.`); break;
    case "adm-say": adminSay(el.dataset.say); break;
    case "adm-confirm": adminConfirm(el.dataset.k, true); break;
    case "adm-cancel": adminConfirm(el.dataset.k, false); break;
    case "sync": syncSpecs(); break;
  }
});
function signIn(id, keep) {
  S.user = id; save(); closeModal(); closeDrawer();
  chat.booted = false; chat.ctx = {}; $("#tzLog").innerHTML = ""; setChips([]);
  const p = persona(id); toast(`Signed in as ${esc(p.name)} · ${esc(p.title)}`);
  if (keep) { openChat(); return render(true); }
  const target = p.role === "customer" ? "#/account" : "#/admin";
  if (location.hash === target) render(); else location.hash = target;
}
document.addEventListener("change", e => {
  const el = e.target;
  if (el.dataset.act === "cmp-add" && el.value) { toggleCompare(el.value); render(true); return; }
  if (el.dataset.act === "inv-sort") { inv.sort = el.value; renderInvGrid(); return; }
  if (el.dataset.act === "f-mach" && el.value !== "") { const m = DATA.machines[+el.value]; Object.assign(finder, { cat: m.cat, machine: m.name, weight: m.w, len: m.len, step: 2 }); renderFinder(); return; }
  if (el.dataset.act === "fin-tr") { const t = unit(el.value); fin.id = el.value; if (t) { fin.price = t.price; fin.down = Math.round(t.price * DATA.finance.downPct / 100); $("#fPrice").value = fin.price; $("#fDown").value = fin.down; } renderCalc(); return; }
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
});
document.addEventListener("input", e => {
  const el = e.target;
  if (el.matches("[data-search]")) {
    inv.q = el.value;
    $$("[data-search]").forEach(i => { if (i !== el) i.value = el.value; });
    if (route.name !== "inventory") {
      inv.type = "all";
      history.pushState(null, "", "#/inventory"); render();
      if (el.isConnected) el.focus(); else { const q = $("#invQ"); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); } }
    }
    else renderInvGrid();
  }
  if (el.dataset.act === "parts-q") { partsUI.q = el.value; renderParts(); }
  if (el.dataset.act === "f-w") { finder.weight = +el.value; $("#wRead").innerHTML = num(finder.weight) + " <small>lb</small>"; }
  if (el.dataset.act === "f-rate") { finder.rating = +el.value || null; }
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
  <div class="ubar"><div class="wrap"><span>${ICON.phone}<a href="tel:${b.tel}">${b.phone}</a></span><span class="u-hours">${ICON.clock}${b.hours}</span><span class="u-addr">${ICON.pin}${esc(b.address)}</span></div></div>
  <header class="site"><div class="wrap nav">
    <a class="logo" href="#/home" aria-label="Timeless Trailers home"><img src="${img("timeless-logo")}" alt="Timeless Trailers · Built once. Lasts forever."></a>
    <nav class="nav-links" id="navLinks" aria-label="Main"></nav>
    <div class="hsearch">${ICON.search}<label for="hSearch" class="sr">Search inventory</label><input id="hSearch" data-search placeholder="Search trailers" autocomplete="off"></div>
    <div class="nav-right"><button class="btn btn-gold btn-tessa" data-act="tessa-open">${ICON.spark}<span>Ask ${A}</span></button><div class="acct-slot" id="acctSlot"></div>
      <button class="burger" data-act="burger" aria-label="Open menu">${ICON.menu}</button></div>
  </div></header>`;
  $("#chromeBottom").innerHTML = `
  <footer><div class="wrap"><div class="fgrid">
    <div><img src="${img("timeless-logo")}" alt="Timeless Trailers"><p>The only exclusive Timpte Equipment Trailer dealer in the United States · ${esc(b.address)} · ${b.phone} · ${b.hours}</p><a class="tbadge" href="${b.timpte}" target="_blank" rel="noopener"><img src="${img("timpte-et-logo")}" alt="Timpte Equipment Trailers" loading="lazy"><span>Exclusive dealer</span></a></div>
    <div><h4>Shop</h4><a href="#/inventory">On the lot</a><a href="#/inventory?s=lineup">Lineup</a><a href="#/finder">Trailer Finder</a><a href="#/compare">Compare</a></div>
    <div><h4>Own</h4><a href="#/parts">Parts</a><a href="#/service">Service</a><a href="#/service?s=resources">Owner resources</a><a href="#/financing">Financing</a></div>
    <div><h4>Company</h4><a href="#/about">About</a><a href="#/about?s=visit">Visit</a><a href="#/about?s=contact">Contact</a><a href="#/account">My Account</a><a href="#/admin">Dealer console</a></div>
  </div><div class="fbot"><span>Site concept by Albright Agency · Sample data, no real orders</span><button data-act="reset">Reset demo</button></div></div></footer>
  <div class="mbar"><a class="btn btn-line-light" href="#/inventory">On the lot</a><a class="btn btn-gold" href="#/home?s=quote">Get a quote</a></div>
  <div class="cmp-tray" id="cmpTray" hidden></div>
  <div class="toasts" id="toasts" aria-live="polite"></div>
  <button class="tz-fab" id="tzFab" data-act="tessa-open" aria-expanded="false" aria-controls="tzPanel"><i class="av">${A[0]}</i><span><small>AI trailer advisor</small>Ask ${A}</span></button>
  <aside class="tz-panel" id="tzPanel" role="dialog" aria-label="Chat with ${A}" aria-hidden="true">
    <div class="tz-head"><i class="av">${A[0]}</i><div><b>${A}</b><small>Timeless trailer advisor · online</small></div><span class="sp"></span>
      <button id="tzClose" data-act="tessa-close" aria-label="Close chat">${ICON.x}</button></div>
    <p class="tz-note">Ask about any Timpte model, what fits your machine, or what your truck can tow. A person at Timeless confirms every price and hold.</p>
    <div class="tz-q" id="tzQ" hidden aria-live="polite"></div>
    <div class="tz-frame" id="tzFrame"></div>
    <div class="tz-foot">Chat not showing? <a href="${STAMMER_EMBED}" target="_blank" rel="noopener">Open the chat in a new tab</a>.</div>
  </aside>`;
}
document.addEventListener("DOMContentLoaded", () => { buildChrome(); setMbar(); render(); });
