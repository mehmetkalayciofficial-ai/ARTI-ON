/* ARTI 10; demo auth (localStorage session). DEMO ONLY: client-side, not secure.
   In the backend phase replace with real sessions/JWT + server-side guards. */
(function (w) {
  "use strict";
  var SKEY = "arti10_session";

  function setSession(id) { try { localStorage.setItem(SKEY, id); } catch (e) {} }
  function clearSession() { try { localStorage.removeItem(SKEY); } catch (e) {} }
  function sessionId() { try { return localStorage.getItem(SKEY); } catch (e) { return null; } }

  var Auth = {
    current: function () { var id = sessionId(); return id ? w.DB.user(id) : null; },
    isAuthed: function () { return !!this.current(); },
    isAdmin: function () { var u = this.current(); return !!u && u.role === "admin"; },

    register: function (data) {
      var name = (data.name || "").trim(), email = (data.email || "").trim().toLowerCase(), pass = data.password || "";
      if (name.length < 2) return { ok: false, error: "Lütfen geçerli bir ad soyad girin." };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Geçerli bir e-posta adresi girin." };
      if (pass.length < 6) return { ok: false, error: "Şifre en az 6 karakter olmalı." };
      if (w.DB.userByEmail(email)) return { ok: false, error: "Bu e-posta ile zaten bir hesap var." };
      var u = w.DB.addUser({ name: name, email: email, password: pass, role: "member" });
      setSession(u.id);
      return { ok: true, user: u };
    },

    login: function (email, pass) {
      var u = w.DB.userByEmail(email);
      if (!u || u.password !== pass) return { ok: false, error: "E-posta veya şifre hatalı." };
      setSession(u.id);
      return { ok: true, user: u };
    },

    logout: function () { clearSession(); location.href = "giris.html"; },

    // Guards; call at top of protected pages.
    requireAuth: function () {
      if (!this.isAuthed()) { location.replace("giris.html?next=" + encodeURIComponent(location.pathname.split("/").pop() + location.search)); return false; }
      return true;
    },
    requireAdmin: function () {
      if (!this.isAuthed()) { location.replace("giris.html?next=" + encodeURIComponent(location.pathname.split("/").pop())); return false; }
      if (!this.isAdmin()) { location.replace("panel.html"); return false; }
      return true;
    },
    // redirect if already logged in (for login/register pages)
    redirectIfAuthed: function () {
      var u = this.current();
      if (u) { location.replace(u.role === "admin" ? "admin.html" : "panel.html"); return true; }
      return false;
    }
  };
  w.Auth = Auth;
})(window);
