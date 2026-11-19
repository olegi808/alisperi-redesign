# Генерирует внутренние страницы из общего шаблона (head + шапка + подвал).
# Запуск:  powershell -ExecutionPolicy Bypass -File _build\make-pages.ps1
# Русский текст пишется прямо в HTML; EN/KA — в assets/js/i18n.js по ключам data-i18n.
# Шапка, подвал и форма заявки подставляются на клиенте из assets/js/main.js.
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$utf8 = New-Object System.Text.UTF8Encoding($false)

$tpl = @'
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title data-i18n-doc="{PK}.title">{TITLE} — Алые Паруса</title>
  <meta name="description" content="{DESC}" data-i18n-content="{PK}.desc">
  <meta name="theme-color" content="#0f5c4f">
  <link rel="icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Georgian:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link href="assets/css/style.css" rel="stylesheet">
  <script data-goatcounter="https://olegi808.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body data-page="{KEY}">
  <a class="visually-hidden-focusable position-absolute top-0 start-0 m-2 btn btn-primary btn-sm" style="z-index:2000" href="#main" data-i18n="ui.skip">Перейти к содержимому</a>
  <div data-include="header"></div>

  <main id="main">
{HEAD}
{BODY}
  </main>

  <div data-include="footer"></div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/i18n.js"></script>
  <script src="assets/js/data.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
'@

$headTpl = @'
    <section class="aa-page-head">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-3">
            <li class="breadcrumb-item"><a href="index.html" data-i18n="nav.home">Главная</a></li>
            <li class="breadcrumb-item active" aria-current="page" data-i18n="{PK}.title">{TITLE}</li>
          </ol>
        </nav>
        <h1 class="mb-3" data-i18n="{PK}.h1">{H1}</h1>
        <p class="lead opacity-75 mb-0" style="max-width:40rem" data-i18n="{PK}.lead">{LEAD}</p>
      </div>
    </section>
'@

function Page($file, $key, $pk, $title, $desc, $h1, $lead, $body, [switch]$NoHead) {
  $head = if ($NoHead) { "" } else { $headTpl.Replace("{PK}", $pk).Replace("{TITLE}", $title).Replace("{H1}", $h1).Replace("{LEAD}", $lead) }
  $html = $tpl.Replace("{HEAD}", $head).Replace("{BODY}", $body).Replace("{PK}", $pk).Replace("{TITLE}", $title).Replace("{DESC}", $desc).Replace("{KEY}", $key)
  [IO.File]::WriteAllText((Join-Path $root $file), $html, $utf8)
  Write-Output "OK $file"
}
function Adv($icon, $k, $h, $p) { "<div class=`"col-md-6 col-lg-4`"><div class=`"aa-adv`"><div class=`"aa-adv__icon`"><i class=`"bi bi-$icon`"></i></div><div><h3 data-i18n=`"$k.t`">$h</h3><p data-i18n=`"$k.d`">$p</p></div></div></div>" }
function Step($n, $k, $h, $p) { "<div class=`"col-md-6 col-lg-3`"><div class=`"aa-adv flex-column`"><span class=`"aa-sail`">0$n</span><div><h3 data-i18n=`"$k.t`">$h</h3><p data-i18n=`"$k.d`">$p</p></div></div></div>" }
function Faq($id, $q, $a, $open) {
  $btn = if ($open) { "" } else { " collapsed" }; $show = if ($open) { " show" } else { "" }
  "<div class=`"accordion-item`"><h3 class=`"accordion-header`"><button class=`"accordion-button fw-bold$btn`" type=`"button`" data-bs-toggle=`"collapse`" data-bs-target=`"#$id`" data-i18n=`"$id.q`">$q</button></h3><div id=`"$id`" class=`"accordion-collapse collapse$show`" data-bs-parent=`"#faqAcc`"><div class=`"accordion-body text-secondary`" data-i18n=`"$id.a`">$a</div></div></div>"
}

$leadBlock = @'
    <section class="aa-section aa-section--sand">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-lg-5">
            <span class="aa-sail" data-i18n="c.tag">Отдел продаж</span>
            <h2 class="aa-h2" data-i18n="c.title">Подберём квартиру под ваш бюджет</h2>
            <p class="aa-sub" data-i18n="c.lead">Расскажем о свободных планировках, ценах и условиях покупки. Звонок бесплатный.</p>
            <a class="fs-3 fw-bold text-body" href="tel:+995568002211">+995 568 00 22 11</a>
          </div>
          <div class="col-lg-7"><div class="aa-lead"><div data-include="lead"></div></div></div>
        </div>
      </div>
    </section>
'@

# ---------- Проекты ----------
Page "projects.html" "projects" "p.projects" "Проекты" "Жилые комплексы «Алые Паруса» в Тбилиси: строящиеся корпуса на Белиашвили, готовые дома на Нинуа и в Дидубе." "Наши проекты" "11 домов в трёх районах Тбилиси — от первого дома на Кедиа до новых корпусов на Белиашвили." @'
    <section class="aa-section pt-5">
      <div class="container">
        <div class="d-flex flex-wrap gap-3 align-items-center justify-content-between mb-4">
          <div class="aa-tabs" data-filter role="group" aria-label="Фильтр" data-i18n-aria="flt.aria">
            <button class="btn active" data-value="all" type="button" data-i18n="flt.all">Все</button>
            <button class="btn" data-value="sale" type="button" data-i18n="flt.sale">В продаже</button>
            <button class="btn" data-value="building" type="button" data-i18n="flt.building">Строятся</button>
            <button class="btn" data-value="done" type="button" data-i18n="flt.done">Сданы</button>
          </div>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <select class="form-select w-auto" id="fLoc" aria-label="Локация" data-i18n-aria="s.loc">
              <option value="" data-i18n="s.allLoc">Все районы</option>
              <option value="beliashvili" data-i18n="loc.beliashvili">Белиашвили</option>
              <option value="ninua" data-i18n="loc.ninua">Нинуа</option>
              <option value="didube" data-i18n="loc.didube">Дидубе</option>
            </select>
            <select class="form-select w-auto" id="fArea" aria-label="Площадь" data-i18n-aria="s.area">
              <option value="" data-i18n="s.anyArea">Любая площадь</option>
              <option value="45">≈ 45 м²</option><option value="55">≈ 55 м²</option><option value="65">≈ 65 м²</option><option value="80">≈ 80 м²</option><option value="100">≈ 100 м²</option><option value="115">115+ м²</option>
            </select>
            <span class="text-secondary small fw-semibold"><span data-i18n="flt.found">Найдено</span>: <span data-count>11</span></span>
          </div>
        </div>
        <div class="row g-4" data-list="all"></div>
        <div class="aa-empty d-none" data-empty><i class="bi bi-search"></i><p class="mt-3" data-i18n="flt.empty">Под эти параметры объектов нет. Сбросьте фильтр или оставьте заявку — подберём вариант.</p><button class="btn btn-outline-dark" type="button" data-reset data-i18n="flt.reset">Сбросить фильтр</button></div>
      </div>
    </section>
'@ + $leadBlock

# ---------- Объект ----------
Page "project.html" "project" "p.project" "Объект" "Жилой комплекс «Алые Паруса» в Тбилиси: описание, сроки, площади квартир, фото и ход строительства." "" "" '    <div data-project></div>' -NoHead

# ---------- О компании ----------
Page "about.html" "about" "p.about" "О компании" "Строительная компания «Алые Паруса» (Alisperi Aprebi): новостройки и недвижимость в Тбилиси." "Алые Паруса" "Новостройки и недвижимость в Тбилиси. Строим на собственный капитал — с 2018 года сдали 8 домов." (@'
    <section class="aa-section">
      <div class="container">
        <div class="row g-4 g-lg-5 align-items-center">
          <div class="col-lg-6">
            <span class="aa-sail" data-i18n="ab2.tag">Кто мы</span>
            <h2 class="aa-h2" data-i18n="ab2.title">Строим так, чтобы дом был лучшим — и доступным</h2>
            <p data-i18n="ab2.p1">Новостройки компании «Алисфери Афреби» — это жильё, построенное по современным технологиям из передовых строительных материалов. Квартиры отличаются качеством конструкций и продуманными планировками.</p>
            <p data-i18n="ab2.p2">Стратегия развития компании рассчитана на долгосрочную перспективу, поэтому один из главных приоритетов — положительная репутация и доверие клиентов.</p>
            <p class="mb-0" data-i18n="ab2.p3">Для нас важно, чтобы дом после ввода в эксплуатацию отвечал современным требованиям, был комфортным и красивым — одним словом, лучшим. И всё это по доступной цене.</p>
          </div>
          <div class="col-lg-6">
            <div class="aa-about__img" style="aspect-ratio:5/4">
              <img src="assets/img/projects/ninua-2a/3.jpg" alt="" loading="lazy">
              <div class="aa-about__sail"><div><b>1 336</b><span data-i18n="ab2.badge">квартир<br>в 11 домах</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="aa-section aa-section--green">
      <div class="container">
        <span class="aa-sail aa-sail--light" data-i18n="ab3.tag">Принципы</span>
        <h2 class="aa-h2 mb-4" data-i18n="ab3.title">На чём держится наше слово</h2>
        <div class="row g-3">
'@ + (Adv "safe2" "adv1" "Собственный капитал" "Строим на свои средства и своей техникой — без зависимости от подрядчиков.") + (Adv "calendar-check" "adv2" "Сроки — в договоре" "Технические и организационные вопросы прорабатываем ещё на стадии проекта.") + (Adv "people" "adv5" "Свой штат" "Квалифицированные инженеры и строители — в штате компании.") + (Adv "patch-check" "adv3" "Проверенные материалы" "Экологичные, энергоэффективные материалы с лабораторными испытаниями.") + (Adv "shield-check" "adv6" "Безопасность" "Два лифта в подъезде и система пожарной безопасности по Постановлению №41.") + (Adv "tree" "adv4" "Двор без машин" "Озеленённые дворы с детскими и спортивными площадками, паркинг — под землёй.") + @'
        </div>
      </div>
    </section>
    <section class="aa-section aa-section--sand">
      <div class="container">
        <span class="aa-sail" data-i18n="ab4.tag">История</span>
        <h2 class="aa-h2 mb-4" data-i18n="ab4.title">От первого дома на Кедиа до Белиашвили</h2>
        <div class="row g-3">
          <div class="col-6 col-lg"><div class="aa-adv flex-column"><b class="fs-2" style="color:var(--aa-red)">2018</b><p data-i18n="hist1">«Ваш дом в Дидубе» — первый дом, 60 квартир на ул. Кедиа</p></div></div>
          <div class="col-6 col-lg"><div class="aa-adv flex-column"><b class="fs-2" style="color:var(--aa-red)">2019–2020</b><p data-i18n="hist2">Дидубе 2 и Дидубе 3 — ещё 162 квартиры в квартале</p></div></div>
          <div class="col-6 col-lg"><div class="aa-adv flex-column"><b class="fs-2" style="color:var(--aa-red)">2022</b><p data-i18n="hist3">Дидубе 4 (20 этажей) и Дидубе 5 завершают квартал на Кедиа</p></div></div>
          <div class="col-6 col-lg"><div class="aa-adv flex-column"><b class="fs-2" style="color:var(--aa-red)">2023–2025</b><p data-i18n="hist4">Три корпуса на Нинуа у метро «Гоциридзе» — 458 квартир</p></div></div>
          <div class="col-12 col-lg"><div class="aa-adv flex-column"><b class="fs-2" style="color:var(--aa-green)">2027–2029</b><p data-i18n="hist5">Белиашвили: блоки Г, Б и А — 424 квартиры</p></div></div>
        </div>
      </div>
    </section>
'@ + $leadBlock)

# ---------- Покупателям ----------
Page "buyers.html" "buyers" "p.buyers" "Покупателям" "Как купить квартиру у «Алые Паруса»: этапы покупки, состояние сдачи квартир, ответы на частые вопросы." "Покупателям" "Как проходит покупка, в каком состоянии вы получите квартиру и что важно знать заранее." (@'
    <section class="aa-section">
      <div class="container">
        <span class="aa-sail" data-i18n="b.tag">Покупка</span>
        <h2 class="aa-h2 mb-4" data-i18n="b.title">Четыре шага до ключей</h2>
        <div class="row g-3">
'@ + (Step 1 "step1" "Консультация" "Звоните или оставьте заявку: расскажем о свободных квартирах, ценах и условиях оплаты.") + (Step 2 "step2" "Просмотр" "Покажем объект, планировки и квартиру — на месте или в 3D-туре.") + (Step 3 "step3" "Договор" "Бронируем квартиру и подписываем договор с графиком платежей и сроком сдачи.") + (Step 4 "step4" "Ключи" "После ввода дома в эксплуатацию передаём квартиру и помогаем с регистрацией.") + @'
        </div>
      </div>
    </section>
    <section class="aa-section aa-section--sand">
      <div class="container">
        <span class="aa-sail aa-sail--green" data-i18n="b2.tag">Состояние сдачи</span>
        <h2 class="aa-h2 mb-4" data-i18n="b2.title">Белый и зелёный каркас — в чём разница</h2>
        <div class="row g-4">
          <div class="col-lg-6"><div class="aa-lead h-100"><h3 class="h4" data-i18n="b2.white">Белый каркас</h3><p class="text-secondary" data-i18n="b2.whiteD">Нинуа, Дидубе. Квартира готова к чистовой отделке: остаётся пол, стены и мебель.</p><ul class="aa-checklist" data-frame="white"></ul></div></div>
          <div class="col-lg-6"><div class="aa-lead h-100" style="outline:2px solid var(--aa-green)"><h3 class="h4" data-i18n="b2.green">Зелёный каркас</h3><p class="text-secondary" data-i18n="b2.greenD">Белиашвили. Больше работ сделано за вас: алюминиевые окна, трубы отопления в полу и готовый балкон.</p><ul class="aa-checklist" data-frame="green"></ul></div></div>
        </div>
      </div>
    </section>
    <section class="aa-section">
      <div class="container" style="max-width:860px">
        <span class="aa-sail" data-i18n="b3.tag">Вопросы</span>
        <h2 class="aa-h2 mb-4" data-i18n="b3.title">Частые вопросы</h2>
        <div class="accordion" id="faqAcc">
'@ + (Faq "faq1" "Можно ли купить квартиру на этапе строительства?" "Да. Сейчас в продаже три корпуса на Белиашвили со сроками сдачи с 2027 по 2029 год. Чем раньше этап, тем больше выбор планировок." $true) + (Faq "faq2" "Есть ли рассрочка?" "Условия оплаты зависят от объекта и этапа строительства. Менеджер подберёт удобный график платежей — позвоните или оставьте заявку." $false) + (Faq "faq3" "Где посмотреть ход строительства?" "Процент готовности указан на странице каждого объекта. Приезжайте на площадку — менеджер покажет дом и квартиру." $false) + (Faq "faq4" "Есть ли паркинг?" "Да. На Белиашвили — от 45 до 81 машиноместа в каждом блоке, на Нинуа — двухуровневый подземный паркинг." $false) + (Faq "faq5" "Можно ли купить коммерческое помещение?" "Кроме квартир, в продаже офисные помещения и машиноместа. Уточните наличие в отделе продаж." $false) + @'
        </div>
      </div>
    </section>
'@ + $leadBlock)

# ---------- Контакты ----------
Page "contacts.html" "contacts" "p.contacts" "Контакты" "Контакты «Алые Паруса»: офис продаж на ул. Кедиа, 10, Тбилиси. Телефон +995 568 00 22 11." "Контакты" "Офис продаж в Дидубе. Звонок бесплатный — перезвоним в рабочее время." @'
    <section class="aa-section">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            <div class="aa-lead mb-4" style="background:var(--aa-green);color:#fff">
              <div class="aa-contact-line"><i class="bi bi-telephone"></i><div><small data-i18n="c.phone">Телефон</small><a class="fs-5" href="tel:+995568002211">+995 568 00 22 11</a></div></div>
              <div class="aa-contact-line"><i class="bi bi-envelope"></i><div><small>Email</small><a href="mailto:info@alisperiaprebi.ge">info@alisperiaprebi.ge</a></div></div>
              <div class="aa-contact-line"><i class="bi bi-geo-alt"></i><div><small data-i18n="c.office">Офис</small><b data-i18n="c.addr">ул. Кедиа, 10, Тбилиси</b></div></div>
              <div class="aa-contact-line"><i class="bi bi-clock"></i><div><small data-i18n="c.hoursT">Часы работы</small><b data-i18n="ui.hours">Пн–Сб, 10:00–19:00</b></div></div>
              <div class="aa-contact-line mb-0"><i class="bi bi-facebook"></i><div><small>Facebook</small><a href="https://www.facebook.com/alisperiaprebi" target="_blank" rel="noopener">alisperiaprebi</a></div></div>
            </div>
            <div class="aa-lead">
              <h2 class="h4 mb-3" data-i18n="form.modalTitle">Перезвоните мне</h2>
              <div data-include="lead"></div>
            </div>
          </div>
          <div class="col-lg-7">
            <iframe class="aa-map h-100" style="min-height:520px" src="https://maps.google.com/maps?q=Kedia%20St%2010%2C%20Tbilisi&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Карта" data-i18n-aria="c.map"></iframe>
          </div>
        </div>
      </div>
    </section>
'@

# ---------- 404 ----------
Page "404.html" "404" "p.404" "Страница не найдена" "Страница не найдена." "Страница не найдена" "Возможно, ссылка устарела. Вернитесь на главную или посмотрите наши проекты." @'
    <section class="aa-section">
      <div class="container d-flex flex-wrap gap-2">
        <a class="btn btn-primary" href="index.html" data-i18n="nav.home">Главная</a>
        <a class="btn btn-outline-dark" href="projects.html" data-i18n="ui.allProjects">Все проекты</a>
      </div>
    </section>
'@
