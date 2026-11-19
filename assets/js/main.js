/* Alisperi Aprebi — общая логика: язык, шапка/подвал, карточки объектов, фильтр, страница объекта, формы. */
(() => {
  "use strict";
  const D = window.AA, I = window.I18N;
  const LANGS = ["ru", "en", "ka"];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const qs = new URLSearchParams(location.search);
  let lang = (() => {
    const q = qs.get("lang"); if (LANGS.includes(q)) return q;
    const s = store.get("aa-lang"); if (LANGS.includes(s)) return s;
    const n = (navigator.language || "").slice(0, 2);
    return n === "ka" ? "ka" : n === "en" ? "en" : "ru";
  })();

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const t = (k) => (I[lang] && I[lang][k]) ?? I.ru[k] ?? k;
  const L = (o) => (o && typeof o === "object" ? (o[lang] ?? o.ru) : o);
  const num = (n) => new Intl.NumberFormat(lang === "ka" ? "ka-GE" : lang === "en" ? "en-US" : "ru-RU", { maximumFractionDigits: 1 }).format(n);
  const page = document.body.dataset.page;
  const byId = (id) => D.projects.find((p) => p.id === id);

  /* ---------- Шапка и подвал ---------- */
  const NAV = [
    ["projects", "projects.html", "nav.projects"],
    ["about", "about.html", "nav.about"],
    ["buyers", "buyers.html", "nav.buyers"],
    ["contacts", "contacts.html", "nav.contacts"]
  ];
  function header() {
    const links = NAV.map(([k, href, key]) => `<li class="nav-item"><a class="nav-link${page === k || (page === "project" && k === "projects") ? " active" : ""}" href="${href}" data-i18n="${key}">${esc(t(key))}</a></li>`).join("");
    return `
<header class="aa-header" id="top">
  <nav class="navbar navbar-expand-xl">
    <div class="container">
      <a class="aa-logo me-3" href="index.html" aria-label="Alisperi Aprebi">
        <span class="aa-logo__badge"><img src="assets/img/logo.png" alt="" width="95" height="79"></span>
        <span class="aa-logo__text d-none d-sm-block"><b data-i18n="brand.name">${esc(t("brand.name"))}</b><small data-i18n="brand.tag">${esc(t("brand.tag"))}</small></span>
      </a>
      <a class="aa-phone d-xl-none ms-auto me-3 d-none d-md-block" href="${D.company.phoneHref}">${D.company.phone}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#aaNav" aria-controls="aaNav" aria-expanded="false" aria-label="${esc(t("ui.menu"))}" data-i18n-aria="ui.menu"><i class="bi bi-list fs-4"></i></button>
      <div class="collapse navbar-collapse" id="aaNav">
        <ul class="navbar-nav aa-nav mx-xl-auto mb-3 mb-xl-0">
          ${links}
          <li class="nav-item"><a class="nav-link" href="${D.company.tour}" target="_blank" rel="noopener"><i class="bi bi-badge-3d me-1"></i><span data-i18n="nav.tour">${esc(t("nav.tour"))}</span></a></li>
        </ul>
        <div class="d-flex flex-wrap align-items-center gap-3">
          <div class="aa-lang" role="group" aria-label="Language">
            ${LANGS.map((l) => `<button type="button" data-lang="${l}" class="${l === lang ? "active" : ""}" aria-pressed="${l === lang}">${l === "ka" ? "GE" : l.toUpperCase()}</button>`).join("")}
          </div>
          <a class="aa-phone" href="${D.company.phoneHref}">${D.company.phone}<small data-i18n="ui.free">${esc(t("ui.free"))}</small></a>
          <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#aaCall" data-i18n="ui.callme">${esc(t("ui.callme"))}</button>
        </div>
      </div>
    </div>
  </nav>
</header>`;
  }

  function footer() {
    const proj = D.projects.filter((p) => p.status === "building" || p.sale).map((p) => `<li><a href="project.html?id=${p.id}" data-l="name" data-pid="${p.id}">${esc(L(p.name))}</a></li>`).join("");
    return `
<footer class="aa-footer">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-4">
        <a href="index.html" class="aa-footer__logo"><img src="assets/img/logo-light.png" alt="Alisperi Aprebi" width="95" height="79"></a>
        <p class="mt-3 mb-3" style="max-width:22rem" data-i18n="ft.about">${esc(t("ft.about"))}</p>
        <a class="aa-social" href="${D.company.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
      </div>
      <div class="col-6 col-lg-2">
        <h4 data-i18n="ft.menu">${esc(t("ft.menu"))}</h4>
        <ul>${NAV.map(([, href, key]) => `<li><a href="${href}" data-i18n="${key}">${esc(t(key))}</a></li>`).join("")}<li><a href="${D.company.tour}" target="_blank" rel="noopener" data-i18n="nav.tour">${esc(t("nav.tour"))}</a></li></ul>
      </div>
      <div class="col-6 col-lg-3">
        <h4 data-i18n="ft.sale">${esc(t("ft.sale"))}</h4>
        <ul>${proj}</ul>
      </div>
      <div class="col-lg-3">
        <h4 data-i18n="ft.contacts">${esc(t("ft.contacts"))}</h4>
        <ul>
          <li><a href="${D.company.phoneHref}" class="fw-bold">${D.company.phone}</a></li>
          <li><a href="mailto:${D.company.email}">${D.company.email}</a></li>
          <li data-l="addr">${esc(L(D.company.address))}</li>
          <li data-i18n="ui.hours">${esc(t("ui.hours"))}</li>
        </ul>
      </div>
    </div>
    <div class="aa-footer__bottom d-flex flex-wrap justify-content-between gap-2">
      <span>© ${new Date().getFullYear()} Alisperi Aprebi LLC</span>
      <span data-i18n="ft.proto">${esc(t("ft.proto"))}</span>
    </div>
  </div>
</footer>
<a class="aa-fab d-lg-none" href="${D.company.phoneHref}" aria-label="${esc(t("ui.call"))}"><i class="bi bi-telephone-fill"></i></a>
<div class="modal fade" id="aaCall" tabindex="-1" aria-labelledby="aaCallTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content p-2">
      <div class="modal-header border-0 pb-0">
        <h2 class="modal-title h4" id="aaCallTitle" data-i18n="form.modalTitle">${esc(t("form.modalTitle"))}</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${esc(t("ui.close"))}"></button>
      </div>
      <div class="modal-body">
        <p class="text-secondary" data-i18n="form.modalText">${esc(t("form.modalText"))}</p>
        ${leadForm("m", true)}
      </div>
    </div>
  </div>
</div>`;
  }

  /* Короткая форма заявки (используется в модалке и на страницах через data-include="lead") */
  function leadForm(id, compact) {
    const opts = D.projects.filter((p) => p.status === "building" || p.sale).map((p) => `<option value="${p.id}" data-l="name" data-pid="${p.id}">${esc(L(p.name))}</option>`).join("");
    return `
<form class="row g-3" data-lead novalidate>
  <div class="col-12${compact ? "" : " col-md-6"}"><label class="form-label fw-semibold small" for="n-${id}" data-i18n="form.name">${esc(t("form.name"))}</label><input class="form-control" id="n-${id}" name="name" autocomplete="name" required></div>
  <div class="col-12${compact ? "" : " col-md-6"}"><label class="form-label fw-semibold small" for="p-${id}" data-i18n="form.phone">${esc(t("form.phone"))}</label><input class="form-control" id="p-${id}" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+995" required pattern="[+0-9 ()-]{9,}"><div class="invalid-feedback" data-i18n="form.phoneErr">${esc(t("form.phoneErr"))}</div></div>
  <div class="col-12"><label class="form-label fw-semibold small" for="o-${id}" data-i18n="form.object">${esc(t("form.object"))}</label><select class="form-select" id="o-${id}" name="object"><option value="" data-i18n="form.any">${esc(t("form.any"))}</option>${opts}</select></div>
  <div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="c-${id}" required checked><label class="form-check-label small text-secondary" for="c-${id}" data-i18n="form.agree">${esc(t("form.agree"))}</label></div></div>
  <div class="col-12"><button class="btn btn-primary w-100" type="submit" data-i18n="form.send">${esc(t("form.send"))}</button></div>
</form>`;
  }

  /* ---------- Карточки ---------- */
  function statusTag(p) {
    if (p.status === "building") return `<span class="aa-sail" data-i18n="st.building">${esc(t("st.building"))}</span>`;
    if (p.sale) return `<span class="aa-sail aa-sail--green" data-i18n="st.sale">${esc(t("st.sale"))}</span>`;
    return `<span class="aa-sail aa-sail--light" data-i18n="st.done">${esc(t("st.done"))}</span>`;
  }
  function progress(p) {
    return `<div class="aa-progress" style="--p:${p.progress}"><div class="aa-progress__row"><span>${esc(t("pr.progress"))}</span><b>${p.progress}%</b></div><div class="aa-progress__bar" role="progressbar" aria-valuenow="${p.progress}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(t("pr.progress"))}"><i></i></div></div>`;
  }
  function card(p) {
    return `
<div class="col-md-6 col-xl-4 aa-reveal" data-status="${p.status}" data-loc="${p.loc}">
  <a class="aa-card" href="project.html?id=${p.id}">
    <div class="aa-card__img"><img src="assets/img/projects/${p.id}/cover.jpg" alt="${esc(L(p.name))}" loading="lazy" width="940" height="568"><div class="aa-card__tag">${statusTag(p)}</div></div>
    <div class="aa-card__body">
      <h3 class="aa-card__title">${esc(L(p.name))}</h3>
      <div class="aa-card__meta"><span><i class="bi bi-geo-alt"></i>${esc(L(p.address))}</span><span><i class="bi bi-calendar3"></i>${esc(t("pr.deadline"))}: ${esc(L(p.deadline))}</span></div>
      <div class="aa-card__meta"><span><i class="bi bi-building"></i>${p.floors} ${esc(t("pr.floorsShort"))}</span><span><i class="bi bi-door-open"></i>${p.flats} ${esc(t("pr.flatsShort"))}</span><span><i class="bi bi-arrows-angle-expand"></i>${num(p.area[0])}–${num(p.area[1])} м²</span></div>
      ${p.status === "building" ? progress(p) : ""}
      <div class="aa-card__foot"><span>${esc(t("ui.more"))}</span><i class="bi bi-arrow-right"></i></div>
    </div>
  </a>
</div>`;
  }
  function feature(p, i) {
    return `
<a class="aa-feature aa-reveal mb-4" href="project.html?id=${p.id}">
  <div class="aa-feature__img${i % 2 ? " order-lg-2" : ""}"><img src="assets/img/projects/${p.id}/${p.gallery > 1 ? 1 : "cover"}.jpg" alt="${esc(L(p.name))}" loading="lazy"><div class="aa-card__tag">${statusTag(p)}</div></div>
  <div class="aa-feature__body">
    <div class="aa-card__meta"><span><i class="bi bi-geo-alt"></i>${esc(L(p.address))}</span></div>
    <h3>${esc(L(p.name))}</h3>
    <p class="text-secondary mb-0">${esc(L(p.lead))}</p>
    <dl class="aa-facts">
      <div><dt>${esc(t("pr.deadline"))}</dt><dd>${esc(L(p.deadline))}</dd></div>
      <div><dt>${esc(t("pr.area"))}</dt><dd>${num(p.area[0])}–${num(p.area[1])} м²</dd></div>
      <div><dt>${esc(t("pr.floors"))}</dt><dd>${p.floors}</dd></div>
      <div><dt>${esc(t("pr.flats"))}</dt><dd>${p.flats}</dd></div>
    </dl>
    ${progress(p)}
    <span class="btn btn-primary align-self-start mt-1">${esc(t("ui.more"))} <i class="bi bi-arrow-right ms-1"></i></span>
  </div>
</a>`;
  }

  /* ---------- Рендер блоков ---------- */
  function renderLists() {
    document.querySelectorAll("[data-list]").forEach((el) => {
      const kind = el.dataset.list;
      let items = D.projects;
      if (kind === "building") items = items.filter((p) => p.status === "building");
      if (kind === "sale") items = items.filter((p) => p.sale);
      if (kind === "done") items = items.filter((p) => p.status === "done" && !p.sale);
      if (kind === "feature") { el.innerHTML = items.filter((p) => p.status === "building").map(feature).join(""); return; }
      el.innerHTML = items.map((p) => (kind === "sale" ? card(p).replace("col-xl-4", "col-xl-6") : card(p))).join("");
    });
    applyFilter();
  }

  /* Фильтр на странице проектов + параметры из панели подбора */
  const F = { status: qs.get("status") || "all", loc: qs.get("loc") || "", area: parseFloat(qs.get("area")) || 0 };
  function applyFilter() {
    const grid = document.querySelector("[data-list='all']"); if (!grid) return;
    let shown = 0;
    grid.querySelectorAll("[data-status]").forEach((c) => {
      const p = byId(c.querySelector("a").getAttribute("href").split("id=")[1]);
      const okS = F.status === "all" || (F.status === "building" && p.status === "building") || (F.status === "sale" && (p.status === "building" || p.sale)) || (F.status === "done" && p.status === "done");
      const okL = !F.loc || p.loc === F.loc;
      const okA = !F.area || (F.area >= p.area[0] - 5 && F.area <= p.area[1] + 5);
      const ok = okS && okL && okA; c.classList.toggle("d-none", !ok); if (ok) shown++;
    });
    document.querySelectorAll("[data-filter] .btn").forEach((b) => b.classList.toggle("active", b.dataset.value === F.status));
    const loc = document.querySelector("#fLoc"); if (loc) loc.value = F.loc;
    const area = document.querySelector("#fArea"); if (area) area.value = F.area || "";
    const empty = document.querySelector("[data-empty]"); if (empty) empty.classList.toggle("d-none", shown > 0);
    const cnt = document.querySelector("[data-count]"); if (cnt) cnt.textContent = shown;
    grid.querySelectorAll(".aa-reveal").forEach((x) => x.classList.add("is-in"));
  }
  function bindFilter() {
    document.querySelectorAll("[data-filter] .btn").forEach((b) => b.addEventListener("click", () => { F.status = b.dataset.value; applyFilter(); }));
    document.querySelector("#fLoc")?.addEventListener("change", (e) => { F.loc = e.target.value; applyFilter(); });
    document.querySelector("#fArea")?.addEventListener("change", (e) => { F.area = parseFloat(e.target.value) || 0; applyFilter(); });
    document.querySelector("[data-reset]")?.addEventListener("click", () => { F.status = "all"; F.loc = ""; F.area = 0; applyFilter(); });
  }

  /* ---------- Страница объекта ---------- */
  function renderProject() {
    const root = document.querySelector("[data-project]"); if (!root) return;
    const p = byId(qs.get("id")) || D.projects[0];
    const gid = p.galleryFrom || p.id;
    const imgs = Array.from({ length: p.gallery }, (_, i) => `assets/img/projects/${gid}/${i + 1}.jpg`);
    const fr = D.frames[p.frame];
    const loc = D.locations[p.loc];
    document.title = `${L(p.name)} — ${t("brand.name")}`;
    root.innerHTML = `
<section class="aa-project-hero">
  <img src="${imgs[0] || `assets/img/projects/${p.id}/cover.jpg`}" alt="">
  <div class="container">
    <nav aria-label="breadcrumb"><ol class="breadcrumb mb-3"><li class="breadcrumb-item"><a href="index.html">${esc(t("nav.home"))}</a></li><li class="breadcrumb-item"><a href="projects.html">${esc(t("nav.projects"))}</a></li><li class="breadcrumb-item active" aria-current="page">${esc(L(p.name))}</li></ol></nav>
    <div class="mb-3">${statusTag(p)}</div>
    <h1 class="mb-2">${esc(L(p.name))}</h1>
    <p class="lead mb-0 opacity-75"><i class="bi bi-geo-alt me-1"></i>${esc(L(p.address))}, ${esc(t("ui.tbilisi"))}${p.metro ? ` · ${esc(t("pr.metro"))}` : ""}</p>
  </div>
</section>
<div class="container">
  <div class="aa-keyfacts">
    <div><small>${esc(t("pr.deadline"))}</small><b>${esc(L(p.deadline))}</b></div>
    <div><small>${esc(t("pr.area"))}</small><b>${num(p.area[0])}–${num(p.area[1])} м²</b></div>
    <div><small>${esc(t("pr.floors"))}</small><b>${p.floors}${p.livingFloors !== p.floors ? ` <span class="fw-semibold text-secondary fs-6">(${p.livingFloors} ${esc(t("pr.living"))})</span>` : ""}</b></div>
    <div><small>${esc(t("pr.flats"))}</small><b>${p.flats}</b></div>
    ${p.parking ? `<div><small>${esc(t("pr.parking"))}</small><b>${p.parking}</b></div>` : ""}
    <div><small>${esc(t("pr.progress"))}</small><b>${p.progress}%</b></div>
  </div>
</div>
<section class="aa-section pt-5">
  <div class="container">
    <div class="row g-4 g-lg-5">
      <div class="col-lg-7">
        <div id="aaGal" class="carousel slide aa-gallery" data-bs-ride="false">
          <div class="carousel-inner">${imgs.map((src, i) => `<div class="carousel-item${i ? "" : " active"}"><img src="${src}" alt="${esc(L(p.name))} — ${i + 1}" ${i ? 'loading="lazy"' : ""}></div>`).join("")}</div>
          ${imgs.length > 1 ? `<button class="carousel-control-prev" type="button" data-bs-target="#aaGal" data-bs-slide="prev" aria-label="${esc(t("ui.prev"))}"><span><i class="bi bi-chevron-left"></i></span></button><button class="carousel-control-next" type="button" data-bs-target="#aaGal" data-bs-slide="next" aria-label="${esc(t("ui.next"))}"><span><i class="bi bi-chevron-right"></i></span></button>` : ""}
        </div>
        ${imgs.length > 1 ? `<div class="aa-thumbs">${imgs.map((src, i) => `<button type="button" data-bs-target="#aaGal" data-bs-slide-to="${i}" class="${i ? "" : "active"}" aria-label="${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}

        <span class="aa-sail mt-5">${esc(t("pr.aboutTag"))}</span>
        <h2 class="aa-h2">${esc(t("pr.aboutTitle"))}</h2>
        <p class="fs-5">${esc(L(p.lead))}</p>
        <p class="text-secondary">${esc(t("pr.loc." + p.loc))}</p>
        <p class="text-secondary">${esc(t("pr.materials"))}</p>

        <div class="row g-4 mt-2">
          <div class="col-md-7">
            <h3 class="h4 mb-3">${esc(t("pr.handover"))}: ${esc(L(fr.title)).toLowerCase()}</h3>
            <ul class="aa-checklist">${L(fr.items).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
          </div>
          <div class="col-md-5">
            <h3 class="h4 mb-3">${esc(t("pr.yard"))}</h3>
            <ul class="aa-checklist">${["pr.y1", "pr.y2", "pr.y3", "pr.y4"].map((k) => `<li>${esc(t(k))}</li>`).join("")}</ul>
          </div>
        </div>

        <h2 class="aa-h2 mt-5 h3">${esc(t("pr.map"))}</h2>
        <iframe class="aa-map" src="${loc.map}&hl=${lang}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(t("pr.map"))}"></iframe>
      </div>
      <div class="col-lg-5">
        <div class="aa-side">
          <div class="aa-lead">
            ${p.status === "building" ? `<div class="mb-4">${progress(p)}</div>` : ""}
            <h2 class="h3 mb-2">${esc(t(p.status === "building" || p.sale ? "pr.ctaSale" : "pr.ctaDone"))}</h2>
            <p class="text-secondary mb-4">${esc(t(p.status === "building" || p.sale ? "pr.ctaSaleText" : "pr.ctaDoneText"))}</p>
            ${leadForm("pg", true)}
            <hr class="my-4">
            <a class="d-flex align-items-center gap-3 fw-bold text-body" href="${D.company.tour}" target="_blank" rel="noopener"><span class="aa-adv__icon"><i class="bi bi-badge-3d"></i></span><span>${esc(t("nav.tour"))}<small class="d-block fw-semibold text-secondary">${esc(t("tour.short"))}</small></span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="aa-section aa-section--sand">
  <div class="container">
    <div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4"><h2 class="aa-h2 m-0">${esc(t("pr.other"))}</h2><a class="btn btn-outline-dark" href="projects.html">${esc(t("ui.allProjects"))}</a></div>
    <div class="row g-4">${D.projects.filter((x) => x.id !== p.id && (x.loc === p.loc || x.status === "building")).slice(0, 3).map(card).join("")}</div>
  </div>
</section>`;
    const sel = root.querySelector("select[name=object]"); if (sel && [...sel.options].some((o) => o.value === p.id)) sel.value = p.id;
    const gal = root.querySelector("#aaGal");
    gal?.addEventListener("slid.bs.carousel", (e) => root.querySelectorAll(".aa-thumbs button").forEach((b, i) => b.classList.toggle("active", i === e.to)));
  }

  /* ---------- Применение языка ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (!("ru" in el.dataset)) el.dataset.ru = el.innerHTML;
      const k = el.dataset.i18n;
      const v = lang === "ru" ? (I.ru[k] ?? el.dataset.ru) : (I[lang][k] ?? I.ru[k] ?? el.dataset.ru);
      el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    const dt = document.querySelector("title[data-i18n-doc]"); if (dt) document.title = `${t(dt.dataset.i18nDoc)} — ${t("brand.name")}`;
    const md = document.querySelector("meta[data-i18n-content]"); if (md) md.content = t(md.dataset.i18nContent);
    document.querySelectorAll("[data-l=name]").forEach((el) => { el.textContent = L(byId(el.dataset.pid).name); });
    document.querySelectorAll("[data-l=addr]").forEach((el) => { el.textContent = L(D.company.address); });
    document.querySelectorAll(".aa-lang button").forEach((b) => { b.classList.toggle("active", b.dataset.lang === lang); b.setAttribute("aria-pressed", b.dataset.lang === lang); });
    document.querySelectorAll("[data-frame]").forEach((ul) => { ul.innerHTML = L(D.frames[ul.dataset.frame].items).map((x) => `<li>${esc(x)}</li>`).join(""); });
    renderLists(); renderProject(); bindLead(); stats(); reveal();
  }

  /* ---------- Формы ---------- */
  function bindLead() {
    document.querySelectorAll("form[data-lead]:not([data-bound])").forEach((form) => {
      form.dataset.bound = "1";
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
        // TODO: отправка заявки в CRM / на почту: fetch("/api/lead", { method: "POST", body: new FormData(form) })
        form.outerHTML = `<div class="text-center py-4"><i class="bi bi-check2-circle display-5" style="color:var(--aa-green)"></i><h3 class="h4 mt-3">${esc(t("form.thanks"))}</h3><p class="mb-0 text-secondary">${esc(t("form.callback"))}</p></div>`;
      });
    });
  }

  /* Панель подбора на главной */
  function bindSearch() {
    const f = document.querySelector("[data-search]"); if (!f) return;
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = new URLSearchParams();
      const d = new FormData(f);
      for (const [k, v] of d) if (v) q.set(k, v);
      if (lang !== "ru") q.set("lang", lang);
      location.href = "projects.html" + (q.toString() ? "?" + q : "");
    });
  }

  /* ---------- Видео в шапке ---------- */
  function heroVideo() {
    const v = document.querySelector(".aa-hero video"), b = document.querySelector(".aa-hero__ctrl");
    if (!v) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { v.removeAttribute("autoplay"); v.pause(); }
    const sync = () => { b.innerHTML = v.paused ? '<i class="bi bi-play-fill"></i>' : '<i class="bi bi-pause-fill"></i>'; b.setAttribute("aria-label", t(v.paused ? "ui.play" : "ui.pause")); };
    b?.addEventListener("click", () => { v.paused ? v.play() : v.pause(); });
    v.addEventListener("play", sync); v.addEventListener("pause", sync); sync();
  }

  /* Шапка: прозрачная на видео, белая после прокрутки */
  function solidHeader() {
    const h = document.querySelector(".aa-header"); if (!h || page !== "home") return;
    const on = () => h.classList.toggle("is-solid", scrollY > 40 || document.querySelector("#aaNav.show"));
    addEventListener("scroll", on, { passive: true }); on();
    document.querySelector("#aaNav")?.addEventListener("show.bs.collapse", () => h.classList.add("is-solid"));
    document.querySelector("#aaNav")?.addEventListener("hidden.bs.collapse", on);
  }

  let io;
  function reveal() {
    const els = document.querySelectorAll(".aa-reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    io = io || new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* Счётчики на главной */
  function stats() {
    const flats = D.projects.reduce((s, p) => s + p.flats, 0);
    const set = (k, v) => document.querySelectorAll(`[data-stat=${k}]`).forEach((e) => (e.textContent = v));
    set("houses", D.projects.length);
    set("flats", num(flats).replace(/\s/g, " "));
    set("done", D.projects.filter((p) => p.status === "done").length);
    set("building", D.projects.filter((p) => p.status === "building").length);
  }

  /* ---------- Старт ---------- */
  document.querySelector("[data-include=header]")?.replaceWith(document.createRange().createContextualFragment(header()));
  document.querySelector("[data-include=footer]")?.replaceWith(document.createRange().createContextualFragment(footer()));
  document.querySelectorAll("[data-include=lead]").forEach((el, i) => el.replaceWith(document.createRange().createContextualFragment(leadForm("l" + i, false))));
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang]"); if (!b) return;
    lang = b.dataset.lang; store.set("aa-lang", lang);
    const u = new URL(location.href); u.searchParams.delete("lang"); history.replaceState(null, "", u);
    applyLang();
  });
  bindFilter(); bindSearch(); heroVideo(); solidHeader();
  applyLang();
})();
