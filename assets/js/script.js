/* ============================================
   PORTFOLIO SCRIPT - Vanilla JS | Zero Dependencies
   ============================================ */

(function () {
  'use strict';

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavbarScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Timeline Accordion ---
  document.querySelectorAll('.timeline-header').forEach(function (header) {
    header.addEventListener('click', function () {
      const card = this.closest('.timeline-card');
      const isOpen = card.classList.contains('open');

      // Close all other cards
      document.querySelectorAll('.timeline-card.open').forEach(function (openCard) {
        if (openCard !== card) {
          openCard.classList.remove('open');
        }
      });

      card.classList.toggle('open', !isOpen);
    });
  });

  // --- Scroll Reveal with Intersection Observer ---
  function initScrollReveal() {
    var animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements
      animatedElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger animation for siblings
            var parent = entry.target.parentElement;
            var siblings = parent.querySelectorAll('[data-animate]');
            var index = Array.prototype.indexOf.call(siblings, entry.target);
            var delay = index * 80;

            setTimeout(function () {
              entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Active Nav Link on Scroll ---
  function updateActiveNavLink() {
    var sections = document.querySelectorAll('.section, .hero');
    var navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height && id) {
        navLinksAll.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 70; // navbar height
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll Event Listener (Throttled) ---
  var ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleNavbarScroll();
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    handleNavbarScroll();
  });
})();
