/* ARTI 10; demo data layer (localStorage). DEMO ONLY; not a secure backend.
   Swap these functions for real API calls (Supabase/REST) in the backend phase. */
(function (w) {
  "use strict";
  var KEY = "arti10_db_v5";

  // Public sample videos (CC0/test sources); replace with real course videos later.
  var V = [
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4",
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4"
  ];
  function lessons(prefix, arr) {
    return arr.map(function (t, i) {
      return { id: prefix + "-l" + (i + 1), title: t[0], dur: t[1], video: V[i % V.length], free: i === 0,
        desc: "Bu derste " + t[0].toLowerCase() + " konusunu uygulamalı örneklerle ele alıyoruz." };
    });
  }

  function seed() {
    var courses = [
      { id: "teknik", title: "Teknik Analiz Eğitimi", cat: "Analiz", level: "Tüm seviyeler", accent: "#2b4f86", icon: "chart",
        desc: "Grafikleri doğru okumayı, fiyat hareketlerini analiz etmeyi ve teknik araçları etkin kullanmayı öğrenin.",
        lessons: lessons("teknik", [["Teknik analize giriş ve grafik tipleri","08:24"],["Trend, kanal ve trend çizgileri","12:10"],["Destek ve direnç bölgeleri","10:42"],["Temel formasyonlar","14:05"],["Hareketli ortalamalar & RSI","13:38"],["Alım-satım noktalarının değerlendirilmesi","11:20"]]) },
      { id: "temel", title: "Temel Analiz Eğitimi", cat: "Analiz", level: "Başlangıç", accent: "#1d7a5f", icon: "building",
        desc: "Şirketleri ve piyasaları daha bilinçli değerlendirebilmek için temel analiz bakış açısı kazanın.",
        lessons: lessons("temel", [["Temel analiz nedir?","07:50"],["Bilanço ve gelir tablosu okuma","15:22"],["Şirket inceleme yöntemleri","12:40"],["Çarpanlar ve değerleme mantığı","13:15"],["Uzun vadeli yatırım yaklaşımı","09:58"]]) },
      { id: "borsa", title: "Türk ve Amerikan Borsaları", cat: "Piyasa", level: "Orta", accent: "#b1881f", icon: "globe",
        desc: "Borsa İstanbul ve Amerikan piyasalarının işleyişini detaylı şekilde öğrenin.",
        lessons: lessons("borsa", [["Piyasa dinamikleri ve seans saatleri","10:05"],["BIST'te hisse seçim yöntemleri","13:44"],["ABD piyasaları ve endeksler","12:30"],["Sektör değerlendirmeleri","09:12"],["Yatırım stratejileri","11:48"]]) },
      { id: "kripto", title: "Kripto Piyasaları Eğitimi", cat: "Kripto", level: "Tüm seviyeler", accent: "#7a3fb0", icon: "coin",
        desc: "Kripto piyasalarının çalışma mantığını öğrenerek dijital varlıkları daha bilinçli değerlendirin.",
        lessons: lessons("kripto", [["Kripto piyasa yapısı","08:36"],["Bitcoin ve altcoin analizleri","14:20"],["Kriptoda teknik analiz","12:55"],["Volatilite yönetimi","10:18"],["Risk kontrolü ve sermaye yönetimi","11:02"]]) },
      { id: "psikoloji", title: "Para Psikolojisi & Sermaye", cat: "Disiplin", level: "Tüm seviyeler", accent: "#c0476a", icon: "brain",
        desc: "Başarılı yatırımın temel taşlarından olan psikoloji ve risk yönetimini öğrenin.",
        lessons: lessons("psikoloji", [["Yatırımcı psikolojisi","09:30"],["Duygusal kararları kontrol etme","11:14"],["Risk yönetimi prensipleri","12:02"],["Sermayeyi koruma yöntemleri","10:40"],["Disiplinli yatırım anlayışı","08:55"]]) },
      { id: "islem", title: "İşlem Yönetimi Eğitimi", cat: "Strateji", level: "Orta", accent: "#2b6f86", icon: "flow",
        desc: "Bir işleme girişten çıkışa kadar tüm süreci profesyonel şekilde yönetmeyi öğrenin.",
        lessons: lessons("islem", [["İşleme giriş planı oluşturma","10:48"],["Stop-loss kullanımı","09:22"],["Kâr alma stratejileri","11:36"],["Pozisyon büyüklüğü yönetimi","12:10"],["Risk-getiri dengesi","10:05"]]) },
      { id: "sistem", title: "Artı 10 Özel Analiz Sistemleri", cat: "Araçlar", level: "İleri", accent: "#13294a", icon: "grid",
        desc: "Yatırımcıların daha hızlı ve sistematik analiz yapabilmesi için geliştirdiğimiz özel araçlar.",
        lessons: lessons("sistem", [["Özel indikatörlerin kurulumu","11:50"],["TradingView yerleşimleri","13:25"],["Hızlı analiz sistemleri","10:30"],["Kontrol ve filtreleme indikatörleri","12:18"]]) }
    ];
    var packages = [
      { id: "baslangic", name: "Başlangıç", tagline: "Yatırıma sağlam temellerle başla", priceMonthly: 449, priceAnnualMonthly: 349, popular: false, accent: "#1E3A5F",
        includedCourses: ["teknik", "temel", "psikoloji"],
        perks: ["Teknik Analiz, Temel Analiz ve Para Psikolojisi kurslarına tam erişim", "Telegram öğrenci topluluğuna katılım", "Aylık ‘yeni başlayanlara’ canlı soru-cevap yayını", "Mobil ve masaüstünden sınırsız ders tekrarı", "Yeni eklenen temel dersler ücretsiz güncellenir"],
        audience: "Piyasaya yeni adım atan başlangıç seviyesi yatırımcılar" },
      { id: "profesyonel", name: "Yatırımcı", tagline: "En çok tercih edilen: tüm eğitimler tek pakette", priceMonthly: 849, priceAnnualMonthly: 649, popular: true, accent: "#2C5282",
        includedCourses: ["teknik", "temel", "borsa", "kripto", "psikoloji", "islem"],
        perks: ["6 ana eğitimin tamamına tam erişim (BIST + NASDAQ, Kripto, İşlem Yönetimi dahil)", "Haftalık canlı Zoom piyasa analizi toplantıları", "Özel Telegram topluluğu ve analiz sohbet kanalı", "Tüm canlı yayın kayıtlarının arşivine erişim", "Öncelikli destek"],
        audience: "Borsa ve kriptoda fiilen işlem yapan aktif orta seviye yatırımcılar" },
      { id: "vip", name: "Artı 10 Pro", tagline: "Özel analiz sistemleri + birebir mentorluk", priceMonthly: 1599, priceAnnualMonthly: 1249, popular: false, accent: "#C9A227",
        includedCourses: ["all"],
        perks: ["7 eğitimin tamamı, Özel Analiz Sistemleri kursu dahil", "Özel TradingView indikatör paketi ve kurulumu", "Ayda 1 birebir mentorluk görüşmesi (1:1)", "Premium canlı Zoom + öncelikli soru hakkı", "VIP Telegram odası", "En üst seviye öncelikli destek", "Yeni kurs ve araçlara erken erişim"],
        audience: "Profesyonelleşmek isteyen ileri seviye yatırımcılar" }
    ];
    return {
      users: [
        { id: "u-admin", name: "Artı 10 Yönetici", email: "admin@arti10.com", password: "admin123", role: "admin", subscription: { packageId: "vip", period: "annual", startedAt: "2026-01-10", renewsAt: "2027-01-10", status: "active" }, grants: [], createdAt: "2026-01-10" },
        { id: "u-demo", name: "Demo Üye", email: "uye@arti10.com", password: "uye123", role: "member", subscription: { packageId: "profesyonel", period: "monthly", startedAt: "2026-06-02", renewsAt: "2026-07-02", status: "active" }, grants: [], createdAt: "2026-05-02" }
      ],
      courses: courses,
      packages: packages,
      progress: {}, // progress[userId][lessonId] = {completed:bool, t:seconds}
      seq: 1
    };
  }

  function load() {
    try { var d = JSON.parse(localStorage.getItem(KEY)); if (d && d.courses) return d; } catch (e) {}
    try { ["arti10_db_v4", "arti10_db_v3", "arti10_db_v2"].forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
    var s = seed(); persist(s); return s;
  }
  function persist(db) { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }

  var db = load();
  function save() { persist(db); }
  function uid(p) { db.seq = (db.seq || 1) + 1; save(); return p + "-" + db.seq + "-" + Math.floor((db.seq * 9301 + 49297) % 233280); }

  var DB = {
    reset: function () { db = seed(); save(); },
    raw: function () { return db; },
    // courses
    courses: function () { return db.courses.slice(); },
    course: function (id) { return db.courses.find(function (c) { return c.id === id; }) || null; },
    lesson: function (cid, lid) { var c = this.course(cid); return c ? c.lessons.find(function (l) { return l.id === lid; }) || null : null; },
    addCourse: function (c) { c.id = c.id || uid("c"); c.lessons = c.lessons || []; db.courses.push(c); save(); return c; },
    updateCourse: function (id, patch) { var c = this.course(id); if (c) { Object.assign(c, patch); save(); } return c; },
    removeCourse: function (id) { db.courses = db.courses.filter(function (c) { return c.id !== id; }); db.packages.forEach(function (p) { if (p.includedCourses) p.includedCourses = p.includedCourses.filter(function (x) { return x !== id; }); }); db.users.forEach(function (u) { u.grants = (u.grants || []).filter(function (x) { return x !== id; }); }); save(); },
    addLesson: function (cid, l) { var c = this.course(cid); if (!c) return null; l.id = l.id || uid("l"); l.free = !!l.free; c.lessons.push(l); save(); return l; },
    updateLesson: function (cid, lid, patch) { var l = this.lesson(cid, lid); if (l) { Object.assign(l, patch); save(); } return l; },
    removeLesson: function (cid, lid) { var c = this.course(cid); if (c) { c.lessons = c.lessons.filter(function (l) { return l.id !== lid; }); save(); } },
    // users
    users: function () { return db.users.slice(); },
    user: function (id) { return db.users.find(function (u) { return u.id === id; }) || null; },
    userByEmail: function (e) { e = (e || "").trim().toLowerCase(); return db.users.find(function (u) { return u.email.toLowerCase() === e; }) || null; },
    addUser: function (u) { u.id = u.id || uid("u"); u.role = u.role || "member"; u.subscription = u.subscription || null; u.grants = u.grants || []; u.createdAt = u.createdAt || new Date().toISOString().slice(0, 10); db.users.push(u); save(); return u; },
    updateUser: function (id, patch) { var u = this.user(id); if (u) { Object.assign(u, patch); save(); } return u; },
    removeUser: function (id) { db.users = db.users.filter(function (u) { return u.id !== id; }); save(); },
    // packages & subscriptions
    packages: function () { return db.packages.slice(); },
    package: function (id) { return db.packages.find(function (p) { return p.id === id; }) || null; },
    addPackage: function (p) { p.id = p.id || uid("pkg"); p.includedCourses = p.includedCourses || []; p.perks = p.perks || []; if (p.popular) db.packages.forEach(function (q) { q.popular = false; }); db.packages.push(p); save(); return p; },
    updatePackage: function (id, patch) { var p = this.package(id); if (p) { if (patch.popular === true) db.packages.forEach(function (q) { if (q.id !== id) q.popular = false; }); Object.assign(p, patch); save(); } return p; },
    removePackage: function (id) { db.packages = db.packages.filter(function (p) { return p.id !== id; }); db.users.forEach(function (u) { if (u.subscription && u.subscription.packageId === id) u.subscription = null; }); save(); },
    subscription: function (uid_) { var u = this.user(uid_); return u && u.subscription && u.subscription.status === "active" ? u.subscription : null; },
    packageOf: function (uid_) { var s = this.subscription(uid_); return s ? this.package(s.packageId) : null; },
    subscribe: function (uid_, pkgId, period) { var u = this.user(uid_), pkg = this.package(pkgId); if (!u || !pkg) return null; var start = new Date(), renew = new Date(start.getTime() + (period === "annual" ? 365 : 30) * 86400000); u.subscription = { packageId: pkgId, period: period || "monthly", startedAt: start.toISOString().slice(0, 10), renewsAt: renew.toISOString().slice(0, 10), status: "active" }; save(); return u.subscription; },
    cancelSubscription: function (uid_) { var u = this.user(uid_); if (u && u.subscription) { u.subscription.status = "cancelled"; save(); } },
    setUserPackage: function (uid_, pkgId, period) { var u = this.user(uid_); if (!u) return; if (!pkgId) { u.subscription = null; save(); return; } var s = u.subscription; if (s && s.status === "active" && s.packageId === pkgId && s.period === (period || "monthly")) return; this.subscribe(uid_, pkgId, period || "monthly"); },
    // access control
    hasCourseAccess: function (uid_, cid) { var u = this.user(uid_); if (!u) return false; if (u.role === "admin") return true; if (u.grants && u.grants.indexOf(cid) >= 0) return true; var s = this.subscription(uid_); if (!s) return false; var pkg = this.package(s.packageId); if (!pkg) return false; return pkg.includedCourses.indexOf("all") >= 0 || pkg.includedCourses.indexOf(cid) >= 0; },
    accessibleCourseIds: function (uid_) { var self = this; return this.courses().filter(function (c) { return self.hasCourseAccess(uid_, c.id); }).map(function (c) { return c.id; }); },
    grant: function (uid_, cid) { var u = this.user(uid_); if (u) { u.grants = u.grants || []; if (u.grants.indexOf(cid) < 0) { u.grants.push(cid); save(); } } },
    enroll: function (uid_, cid) { this.grant(uid_, cid); },
    unenroll: function (uid_, cid) { var u = this.user(uid_); if (u && u.grants) { u.grants = u.grants.filter(function (x) { return x !== cid; }); save(); } },
    // progress
    progress: function (uid_) { return db.progress[uid_] || {}; },
    setProgress: function (uid_, lid, data) { db.progress[uid_] = db.progress[uid_] || {}; db.progress[uid_][lid] = Object.assign(db.progress[uid_][lid] || {}, data); save(); },
    courseProgress: function (uid_, cid) {
      var c = this.course(cid); if (!c || !c.lessons.length) return 0;
      var p = this.progress(uid_); var done = c.lessons.filter(function (l) { return p[l.id] && p[l.id].completed; }).length;
      return Math.round((done / c.lessons.length) * 100);
    },
    // stats
    stats: function () {
      var totalLessons = db.courses.reduce(function (n, c) { return n + c.lessons.length; }, 0);
      var totalMin = db.courses.reduce(function (n, c) { return n + c.lessons.reduce(function (m, l) { var p = (l.dur || "0:0").split(":"); return m + (+p[0]) + (+p[1]) / 60; }, 0); }, 0);
      var self = this;
      var subs = db.users.filter(function (u) { return u.role !== "admin" && u.subscription && u.subscription.status === "active"; });
      var mrr = subs.reduce(function (s, u) { var p = self.package(u.subscription.packageId); return s + (p ? (u.subscription.period === "annual" ? p.priceAnnualMonthly : p.priceMonthly) : 0); }, 0);
      return { members: db.users.filter(function (u) { return u.role === "member"; }).length, admins: db.users.filter(function (u) { return u.role === "admin"; }).length,
        courses: db.courses.length, lessons: totalLessons, hours: Math.round(totalMin / 60 * 10) / 10,
        packages: db.packages.length, subscribers: subs.length, mrr: mrr };
    }
  };
  w.DB = DB;
})(window);
