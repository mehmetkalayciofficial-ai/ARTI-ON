/* ARTI 10; shared app shell (member top bar + admin sidebar), JS-rendered. */
(function (w) {
  "use strict";
  var ICON = {
    home: '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
    play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z"/><path d="M8 3v18"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20a6 6 0 0 1 12 0M14 20a5 5 0 0 1 7-4.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/>',
    chart: '<path d="M3 17l5-5 4 4 8-9"/><path d="M21 7v5h-5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a7 7 0 0 0 .1-1z"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
    back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    building: '<path d="M9 21V5l7-2 0 18M4 21h16M12 8h.01M12 12h.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5h4a2 2 0 0 1 0 4h-4zM9.5 13.5h4.5a2 2 0 0 1 0 4h-4.5z"/>',
    brain: '<path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7a5 5 0 1 0 5 5"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>',
    flow: '<path d="M4 4h16v4H4zM4 12h10v8H4zM18 12h2v8h-2z"/>',
    crown: '<path d="M3 7l4.5 3.5L12 4l4.5 6.5L21 7l-1.8 11H4.8z"/>',
    lock: '<rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>'
  };
  function svg(name, sw) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.8) + '" stroke-linecap="round" stroke-linejoin="round">' + (ICON[name] || "") + "</svg>";
  }
  function initials(u) {
    if (!u) return "?";
    return (u.name || u.email).split(" ").map(function (p) { return p[0]; }).slice(0, 2).join("").toUpperCase();
  }
  var BRAND = '<a href="index.html" class="ashell-brand"><img src="logo.png" alt="Artı 10" width="36" height="36"><b>Artı<i> 10</i></b></a>';
  var THEME_BTN = '<button class="theme-btn" id="themeBtn" aria-label="Koyu tema aç/kapat"><svg class="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg><svg class="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg></button>';

  function userMenu(u) {
    var adminLink = u && u.role === "admin" ? '<a href="admin.html">' + svg("grid") + " Admin Paneli</a>" : "";
    return '<div class="umenu" id="umenu"><button class="uavatar" id="uavatarBtn" aria-haspopup="true" aria-expanded="false"><span>' + initials(u) + '</span></button>' +
      '<div class="udrop"><div class="uhead"><b>' + (u ? u.name : "") + '</b><small>' + (u ? u.email : "") + '</small></div>' +
      '<a href="panel.html">' + svg("home") + " Panelim</a>" +
      '<a href="hesabim.html">' + svg("user") + " Hesabım</a>" + adminLink +
      '<button class="ulogout" id="logoutBtn">' + svg("logout") + " Çıkış Yap</button></div></div>";
  }

  var MEMBER_NAV = [["panel", "Panelim", "home", "panel.html"], ["kurslar", "Eğitimler", "book", "panel.html#kurslar"], ["hesabim", "Hesabım", "user", "hesabim.html"]];

  var Shell = {
    svg: svg, icon: svg, initials: initials,
    memberTop: function (active) {
      var u = w.Auth.current();
      var nav = MEMBER_NAV.map(function (n) {
        return '<a href="' + n[3] + '" class="' + (n[0] === active ? "on" : "") + '">' + svg(n[2]) + "<span>" + n[1] + "</span></a>";
      }).join("");
      return '<header class="ashell-top"><div class="ashell-top-in">' + BRAND +
        '<nav class="ashell-nav">' + nav + "</nav>" + THEME_BTN + userMenu(u) + "</div></header>";
    },
    adminShell: function (active) {
      var u = w.Auth.current();
      var items = [["dash", "Genel Bakış", "chart", "admin.html"], ["kurslar", "Kurslar", "book", "admin-kurslar.html"], ["paketler", "Paketler", "crown", "admin-paketler.html"], ["uyeler", "Üyeler", "users", "admin-uyeler.html"]];
      var nav = items.map(function (n) { return '<a href="' + n[3] + '" class="' + (n[0] === active ? "on" : "") + '">' + svg(n[2]) + "<span>" + n[1] + "</span></a>"; }).join("");
      return '<aside class="admin-side" id="adminSide"><div class="admin-side-in">' +
        '<button class="admin-close" id="adminClose" aria-label="Menüyü kapat">✕</button>' + BRAND.replace("ashell-brand", "ashell-brand admin") +
        '<div class="admin-tag">Yönetim Paneli</div><nav class="admin-nav">' + nav +
        '<a href="index.html" class="muted">' + svg("back") + "<span>Siteye Dön</span></a>" +
        '<button class="muted" id="logoutBtn2">' + svg("logout") + "<span>Çıkış Yap</span></button></nav></div></aside>" +
        '<div class="admin-scrim" id="adminScrim"></div>';
    },
    adminTop: function (title) {
      var u = w.Auth.current();
      return '<header class="admin-top"><button class="admin-burger" id="adminBurger" aria-label="Menü"><span></span></button>' +
        '<h1>' + title + "</h1>" + THEME_BTN + userMenu(u) + "</header>";
    },
    wire: function () {
      var btn = document.getElementById("uavatarBtn");
      if (btn) {
        btn.addEventListener("click", function (e) { e.stopPropagation(); var m = document.getElementById("umenu"); m.classList.toggle("open"); btn.setAttribute("aria-expanded", m.classList.contains("open")); });
        document.addEventListener("click", function () { var m = document.getElementById("umenu"); if (m) m.classList.remove("open"); });
      }
      ["logoutBtn", "logoutBtn2"].forEach(function (id) { var b = document.getElementById(id); if (b) b.addEventListener("click", function () { w.Auth.logout(); }); });
      var burger = document.getElementById("adminBurger"), side = document.getElementById("adminSide"), scrim = document.getElementById("adminScrim"), closeBtn = document.getElementById("adminClose");
      if (burger && side) {
        var toggle = function (o) { side.classList.toggle("open", o); if (scrim) scrim.classList.toggle("show", o); };
        burger.addEventListener("click", function () { toggle(!side.classList.contains("open")); });
        if (scrim) scrim.addEventListener("click", function () { toggle(false); });
        if (closeBtn) closeBtn.addEventListener("click", function () { toggle(false); });
      }
      var tb = document.getElementById("themeBtn");
      if (tb) tb.addEventListener("click", function () {
        var d = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", d);
        try { localStorage.setItem("arti10_theme", d ? "dark" : "light"); } catch (e) {}
      });
      document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        if (side && side.classList.contains("open")) { side.classList.remove("open"); if (scrim) scrim.classList.remove("show"); }
        var um = document.getElementById("umenu"); if (um) um.classList.remove("open");
        document.querySelectorAll(".modal.open").forEach(function (m) { m.classList.remove("open"); });
      });
    },
    fmtDate: function (s) {
      try { var d = new Date(s + "T00:00:00"); if (isNaN(d)) return s; return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return s; }
    }
  };
  w.Shell = Shell;
})(window);
