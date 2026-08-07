/* ARTI 10; shared interactions (vanilla, defensive) */
(function(){
  "use strict";
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* Header scroll state + scroll-to-top */
  var header=$("#header"), toTop=$("#toTop"), lastY=0;
  function onScroll(){
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(header) header.classList.toggle("scrolled",y>10);
    if(toTop) toTop.classList.toggle("show",y>560);
    if(Math.abs(y-lastY)>40){
      $$("[data-dd].open").forEach(function(o){o.classList.remove("open");var b=$("button",o);if(b)b.setAttribute("aria-expanded","false")});
      lastY=y;
    }
  }
  window.addEventListener("scroll",onScroll,{passive:true}); onScroll();
  if(toTop) toTop.addEventListener("click",function(){window.scrollTo({top:0,behavior:reduce?"auto":"smooth"})});

  /* Desktop dropdowns */
  $$("[data-dd]").forEach(function(li){
    var btn=$("button",li); if(!btn) return;
    btn.addEventListener("click",function(e){
      e.stopPropagation();
      var open=li.classList.contains("open");
      $$("[data-dd]").forEach(function(o){o.classList.remove("open");var b=$("button",o);if(b)b.setAttribute("aria-expanded","false")});
      if(!open){li.classList.add("open");btn.setAttribute("aria-expanded","true")}
    });
  });
  document.addEventListener("click",function(){
    $$("[data-dd]").forEach(function(o){o.classList.remove("open");var b=$("button",o);if(b)b.setAttribute("aria-expanded","false")});
  });

  /* Mobile drawer */
  var burger=$("#burger"), drawer=$("#drawer");
  function setMenu(open){
    document.body.classList.toggle("menu-open",open);
    if(burger){burger.setAttribute("aria-expanded",open?"true":"false");burger.setAttribute("aria-label",open?"Menüyü kapat":"Menüyü aç")}
    document.body.style.overflow=open?"hidden":"";
  }
  if(burger) burger.addEventListener("click",function(){setMenu(!document.body.classList.contains("menu-open"))});
  if(drawer){
    $$("[data-close],.scrim",drawer).forEach(function(el){el.addEventListener("click",function(){setMenu(false)})});
    $$(".panel a",drawer).forEach(function(a){a.addEventListener("click",function(){setMenu(false)})});
    $$(".macc > button",drawer).forEach(function(b){
      b.addEventListener("click",function(){
        var item=b.parentNode, open=item.classList.contains("open");
        $$(".macc",drawer).forEach(function(m){if(m!==item){m.classList.remove("open");var mb=$("button",m);if(mb)mb.setAttribute("aria-expanded","false")}});
        item.classList.toggle("open",!open);
        b.setAttribute("aria-expanded",!open?"true":"false");
      });
    });
  }
  document.addEventListener("keydown",function(e){if(e.key==="Escape") setMenu(false)});

  /* Scroll reveal */
  var revs=$$(".reveal");
  if("IntersectionObserver" in window && !reduce){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}});
    },{threshold:0.12,rootMargin:"0px 0px -7% 0px"});
    revs.forEach(function(el){io.observe(el)});
  }else{revs.forEach(function(el){el.classList.add("in")})}

  /* FAQ / accordion (generic) */
  $$(".faq-item").forEach(function(it){
    var q=$(".faq-q",it);
    if(q) q.addEventListener("click",function(){
      var open=it.classList.contains("open");
      $$(".faq-item").forEach(function(o){o.classList.remove("open")});
      it.classList.toggle("open",!open);
    });
  });

  /* Cookie banner */
  var cookie=$("#cookie"), KEY="arti10_cookie";
  try{
    if(cookie && !localStorage.getItem(KEY)) setTimeout(function(){cookie.classList.add("show")},1200);
    function close(v){if(cookie)cookie.classList.remove("show");try{localStorage.setItem(KEY,v)}catch(e){}}
    var a=$("#ckAccept"), r=$("#ckReject");
    if(a) a.addEventListener("click",function(){close("accept")});
    if(r) r.addEventListener("click",function(){close("reject")});
  }catch(e){}

  /* Theme (gece modu) toggle */
  var themeBtn=document.getElementById("themeBtn");
  if(themeBtn){
    themeBtn.addEventListener("click",function(){
      var d=!document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark",d);
      try{localStorage.setItem("arti10_theme",d?"dark":"light")}catch(e){}
    });
  }

  /* Smooth in-page anchors with sticky offset */
  $$('a[href^="#"]').forEach(function(a){
    a.addEventListener("click",function(e){
      var id=a.getAttribute("href");
      if(id.length<2) return;
      var t=document.querySelector(id);
      if(t){e.preventDefault();
        var top=t.getBoundingClientRect().top+window.pageYOffset-78;
        window.scrollTo({top:top,behavior:reduce?"auto":"smooth"});
      }
    });
  });

})();
