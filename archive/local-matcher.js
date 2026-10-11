/* Archived Oct 2026. Not loaded by the site. Old demo matcher; Stammer handles all customer answers. */

/* ---- sample machine weights and truck tow ratings (were DATA.machines / DATA.trucks) ---- */
  /* Sample machine weights for fit checks (verify against the spec plate) */
  machines: [
    { name: "Bobcat T66", desc: "compact track loader", w: 8000, len: 12, cat: "compact", alias: ["bobcat t66", "t66"] },
    { name: "Kubota SVL75", desc: "compact track loader", w: 8600, len: 12, cat: "compact", alias: ["kubota svl75", "svl75", "svl 75", "svl-75"] },
    { name: "CAT 259D3", desc: "compact track loader", w: 9000, len: 12, cat: "compact", alias: ["cat 259", "259d3", "259d", "259"] },
    { name: "John Deere 333G", desc: "compact track loader", w: 12000, len: 13, cat: "compact", alias: ["deere 333", "333g", "john deere"] },
    { name: "Bobcat E35", desc: "mini excavator", w: 7900, len: 15, cat: "miniex", alias: ["bobcat e35", "e35"] },
    { name: "Kubota KX040", desc: "mini excavator", w: 9300, len: 16, cat: "miniex", alias: ["kubota kx040", "kx040", "kx 040", "kx40"] },
    { name: "CAT 305 CR", desc: "mini excavator", w: 11600, len: 17, cat: "heavy", alias: ["cat 305", "305 cr", "305"] },
    { name: "Polaris Ranger XP 1000", desc: "UTV", w: 1900, len: 10, cat: "utv", alias: ["polaris", "ranger"] },
    { name: "Can-Am Defender", desc: "UTV", w: 2000, len: 11, cat: "utv", alias: ["can-am", "can am", "defender"] },
    { name: "Jeep Wrangler", desc: "4-door", w: 4600, len: 16, cat: "car", alias: ["jeep", "wrangler"] },
    { name: "1967 Ford Mustang", desc: "classic car", w: 3200, len: 15, cat: "car", alias: ["mustang", "classic car", "camaro", "muscle car", "project car", "classic"] },
    { name: "61 in zero-turn mower", desc: "commercial mower", w: 1400, len: 7, cat: "mower", alias: ["zero-turn", "zero turn", "ztr", "mower"] },
    { name: "load of topsoil (4 yd)", desc: "material", w: 9600, len: 0, cat: "material", alias: ["topsoil", "dirt", "gravel", "mulch", "debris", "stone", "soil"] }
  ],

  /* Sample tow ratings in lb (conventional / gooseneck). Real numbers vary by configuration. */
  trucks: [
    { name: "Toyota Tacoma", tow: 6500, alias: ["tacoma"] },
    { name: "Chevy Colorado", tow: 7700, alias: ["colorado"] },
    { name: "Jeep Gladiator", tow: 7700, alias: ["gladiator"] },
    { name: "Ford F-150", tow: 11300, alias: ["f-150", "f150", "f 150"] },
    { name: "Ram 1500", tow: 11000, alias: ["ram 1500"] },
    { name: "Chevy Silverado 1500", tow: 12500, alias: ["silverado 1500", "silverado"] },
    { name: "Toyota Tundra", tow: 12000, alias: ["tundra"] },
    { name: "Ford F-250", tow: 15000, gn: 20000, alias: ["f-250", "f250", "f 250", "super duty"] },
    { name: "Ram 2500", tow: 17500, gn: 19500, alias: ["ram 2500"] },
    { name: "Chevy Silverado 2500HD", tow: 18500, gn: 21500, alias: ["silverado 2500", "2500hd", "2500 hd"] },
    { name: "Ford F-350", tow: 20000, gn: 24000, alias: ["f-350", "f350", "f 350"] }
  ],


/* ---- fit and tow scoring (was in app1.js) ---- */
/* fit + tow math shared by the Finder and the AI advisor */
function rankFor(o) {
  const w = o.weight || 0;
  return S.inventory.filter(t => t.status !== "sold" && (!o.cat || t.suits.includes(o.cat)) && (!o.len || t.deckFt >= o.len))
    .map(t => {
      const margin = (t.payload - w) / Math.max(w, 1);
      const fit = margin >= 0.1 ? "ok" : margin >= 0 ? "tight" : "no";
      const tw = o.truck || o.rating ? towOf(t, w, o.truck, o.rating) : null;
      const budget = o.budget ? (t.price <= o.budget ? "ok" : "over") : null;
      let score = (fit === "ok" ? 50 : 15) + ({ lot: 15, order: 6, hold: 0 }[t.status] || 0);
      if (tw) score += { ok: 30, close: 4, over: -70, gn: -45 }[tw.state] - (tw.pct || 0) * 12;
      if (budget) score += budget === "ok" ? 10 : -18;
      if (margin > 0.9) score -= Math.min(20, (margin - 0.9) * 20);
      if (o.freq === "daily" && margin < 0.2) score -= 8;
      /* the natural fit for the load style wins ties: tilt for compact machines, EZ Load for cars and toys */
      if ((o.cat === "compact" || o.cat === "miniex") && t.type === "tilt") score += 8;
      if ((o.cat === "car" || o.cat === "utv" || o.cat === "mower") && t.type === "ezload") score += 8;
      if (o.cat === "heavy" && (t.type === "gooseneck" || t.type === "deckover")) score += 8;
      score -= t.price / 4000;
      return { t, margin, fit, tow: tw, budget, score };
    })
    .filter(r => r.fit !== "no")
    .sort((a, b) => b.score - a.score);
}
function towOf(t, cargo, truck, rating) {
  const loaded = t.empty + (cargo || t.payload);
  const isGn = t.hitch === "Gooseneck";
  const r = truck ? (isGn ? truck.gn || 0 : truck.tow) : rating;
  if (!r) return { state: "gn", loaded, rating: 0, pct: 0 };
  const pct = loaded / r;
  return { state: pct > 1 ? "over" : pct > 0.85 ? "close" : "ok", loaded, rating: r, pct };
}
function fitBadge(r) {
  const pct = Math.round(r.margin * 100);
  return r.fit === "ok" ? `<span class="badge ok">${tick} Fit · ${pct}% margin</span>` : `<span class="badge warn">Tight fit · ${pct}% margin</span>`;
}
function towBadge(tw) {
  if (!tw) return "";
  if (tw.state === "gn") return `<span class="badge bad">Needs gooseneck hitch</span>`;
  const p = Math.round(tw.pct * 100);
  return tw.state === "ok" ? `<span class="badge ok">${tick} Tow · ${p}% of rating</span>` : tw.state === "close" ? `<span class="badge warn">Tow close · ${p}%</span>` : `<span class="badge bad">Over tow rating · ${p}%</span>`;
}


/* ---- scripted chat: matching helpers and every flow (was in app2.js) ---- */
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

