/* ARTI 10 — Toplantı zaman katmanı (canlı sayaç için).
   Kaynak: aşağıdaki DEFAULT ayarlar (tüm ziyaretçiler için geçerli, yayınla gelir).
   Admin panelinden yapılan düzenlemeler localStorage'a ("arti10_meetings") yazılır ve
   yalnızca o tarayıcıda ÖNİZLEME amaçlıdır; herkese yansıması için site yeniden yayınlanır.

   Saatler Türkiye saatidir (UTC+3). weeklyDay: 0=Pazar,1=Pzt,2=Salı,3=Çrş,4=Prş,5=Cuma,6=Cmt
   oneOff: "2026-08-15T21:00" verilirse (gelecekteyse) o tarih kullanılır; boşsa haftalık tekrar. */
(function (w) {
  "use strict";
  var TZ_OFFSET = 3 * 3600000; // Türkiye UTC+3

  var DEFAULT = {
    free: {
      kind: "free",
      title: "Ücretsiz Tanışma & Piyasa Toplantısı",
      desc: "Yeni katılanlar için; sistemimizi tanıtır, haftanın piyasa görünümünü canlı değerlendiririz. Katılım herkese açık ve ücretsizdir.",
      weeklyDay: 0,          // Pazar
      time: "21:00",
      oneOff: "",
      zoom: "",              // Zoom linki (boşsa Telegram'a yönlendirir)
      note: "Zoom · Katılım ücretsiz"
    },
    paid: {
      kind: "paid",
      title: "Üyelere Özel Canlı Analiz Toplantısı",
      desc: "Üyelerimizle birlikte canlı hisse & kripto taraması, işlem yönetimi ve soru-cevap. Aktif üyeliğe dahildir.",
      weeklyDay: 3,          // Çarşamba
      time: "21:00",
      oneOff: "",
      zoom: "",
      note: "Zoom · Üyelere özel"
    }
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function readOverride() {
    try {
      var raw = localStorage.getItem("arti10_meetings");
      if (!raw) return null;
      var o = JSON.parse(raw);
      return (o && o.free && o.paid) ? o : null;
    } catch (e) { return null; }
  }

  function config() {
    var base = clone(DEFAULT);
    var ov = readOverride();
    if (ov) { Object.assign(base.free, ov.free); Object.assign(base.paid, ov.paid); }
    return base;
  }

  // Bir sonraki toplantı anını (gerçek UTC Date) döndürür.
  function nextDate(m) {
    // Tek seferlik tarih verildiyse ve gelecekteyse onu kullan
    if (m.oneOff) {
      var t = Date.parse(m.oneOff.length <= 16 ? (m.oneOff + ":00+03:00") : m.oneOff);
      if (!isNaN(t) && t > Date.now()) return new Date(t);
    }
    var hm = (m.time || "21:00").split(":");
    var H = +hm[0] || 0, M = +hm[1] || 0;
    var ist = new Date(Date.now() + TZ_OFFSET); // getUTC* alanları = Türkiye duvar saati
    var target = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), H, M, 0));
    var add = (((m.weeklyDay | 0) - ist.getUTCDay()) + 7) % 7;
    target.setUTCDate(target.getUTCDate() + add);
    if (target.getTime() <= ist.getTime()) target.setUTCDate(target.getUTCDate() + 7);
    return new Date(target.getTime() - TZ_OFFSET);
  }

  var TR_DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  function fmt(dateUtc) {
    // Türkiye saatiyle "12 Ağustos Salı · 21:00" biçimi
    var d = new Date(dateUtc.getTime() + TZ_OFFSET);
    var months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
    var hh = ("0" + d.getUTCHours()).slice(-2), mm = ("0" + d.getUTCMinutes()).slice(-2);
    return {
      day: d.getUTCDate(),
      month: months[d.getUTCMonth()],
      weekday: TR_DAYS[d.getUTCDay()],
      time: hh + ":" + mm,
      full: d.getUTCDate() + " " + months[d.getUTCMonth()] + " " + TR_DAYS[d.getUTCDay()] + " · " + hh + ":" + mm
    };
  }

  w.Meetings = {
    DEFAULT: DEFAULT,
    config: config,
    readOverride: readOverride,
    save: function (cfg) { try { localStorage.setItem("arti10_meetings", JSON.stringify(cfg)); } catch (e) {} },
    clear: function () { try { localStorage.removeItem("arti10_meetings"); } catch (e) {} },
    nextDate: nextDate,
    fmt: fmt,
    TR_DAYS: TR_DAYS
  };
})(window);
