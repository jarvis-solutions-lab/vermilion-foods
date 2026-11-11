/* Vermilion Foods — main.js
   Progressive enhancement only: the site is fully readable and navigable without it. */
(function () {
  "use strict";
  var doc = document.documentElement;
  /* Loaded from <head> so the class is set before first paint (no layout shift) */
  doc.classList.add("js");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {

  /* Footer year (the HTML already contains the build year) */
  var year = String(new Date().getFullYear());
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = year;
  });

  /* Header: fine bottom rule once the page scrolls */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile menu: disclosure button with aria-expanded, closes on Escape */
  var toggle = document.querySelector(".menu-toggle");
  var menu = toggle && document.getElementById(toggle.getAttribute("aria-controls"));
  if (toggle && menu) {
    var setOpen = function (open, returnFocus) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      menu.classList.toggle("is-open", open);
      if (!open && returnFocus) toggle.focus();
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true", false);
    });
    document.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.key === "Esc") && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false, true);
      }
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) setOpen(false, false);
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !header.contains(e.target)) setOpen(false, false);
    });
    var mq = window.matchMedia("(min-width: 1120px)");
    var onMq = function () { if (mq.matches) setOpen(false, false); };
    if (mq.addEventListener) mq.addEventListener("change", onMq); else if (mq.addListener) mq.addListener(onMq);
  }

  /* Reveal on scroll: once, opacity + 12px. Only elements below the fold start hidden. */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var items = document.querySelectorAll("[data-reveal]");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    var vh = window.innerHeight || doc.clientHeight;
    Array.prototype.forEach.call(items, function (el) {
      if (el.getBoundingClientRect().top > vh) {
        el.classList.add("reveal-pending");
        io.observe(el);
      }
    });
  }
  }
})();
