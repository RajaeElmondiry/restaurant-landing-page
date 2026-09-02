/* ============================================================
   MAIN — Initialisation, Header, Scroll animations, Navigation
   ============================================================ */

// ─── Hero background parallax load ──────────────────────────
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  const img = new Image();
  img.onload = () => heroBg.classList.add('loaded');
  img.src = heroBg.style.backgroundImage.replace(/url\(['"]?|['"]?\)/g, '');
}

// ─── Sticky Header ───────────────────────────────────────────
const header = document.getElementById('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScrollY = scrollY;
}, { passive: true });

// ─── Mobile menu hamburger ───────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── Navigation active link highlight ───────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ─── Scroll Animations (Intersection Observer) ───────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// Ré-observer les cartes du menu après chaque rendu
const menuGridEl = document.getElementById('menu-grid');
const menuObserver = new MutationObserver(() => {
  menuGridEl.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
});
if (menuGridEl) {
  menuObserver.observe(menuGridEl, { childList: true });
}

// ─── Nombre animé (stats) ────────────────────────────────────
function animateCount(el, target, suffix = '', duration = 1800) {
  let start = 0;
  const startTime = performance.now();

  function update(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsEl = document.querySelector('.stats-bar');
if (statsEl) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelector('[data-count="15"]') && animateCount(document.querySelector('[data-count="15"]'), 15, '+');
        document.querySelector('[data-count="98"]') && animateCount(document.querySelector('[data-count="98"]'), 98, '%');
        document.querySelector('[data-count="5000"]') && animateCount(document.querySelector('[data-count="5000"]'), 5000, '+');
        document.querySelector('[data-count="4"]') && animateCount(document.querySelector('[data-count="4"]'), 4.9, '★');
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsEl);
}

// ─── Remplir dynamiquement les infos restaurant ─────────────
function populateRestaurantInfo() {
  // Horaires
  const hoursContainer = document.getElementById('hours-list');
  if (hoursContainer && RESTAURANT.hours) {
    hoursContainer.innerHTML = RESTAURANT.hours.map(h => `
      <div class="hour-row">
        <span class="days">${h.days}</span>
        <span class="time">${h.time}</span>
      </div>
    `).join('');
  }

  // Services
  const servicesContainer = document.getElementById('services-tags');
  if (servicesContainer && RESTAURANT.services) {
    servicesContainer.innerHTML = RESTAURANT.services.map(s =>
      `<span class="service-tag">${s}</span>`
    ).join('');
  }

  // Footer horaires
  const footerHours = document.getElementById('footer-hours');
  if (footerHours && RESTAURANT.hours) {
    footerHours.innerHTML = RESTAURANT.hours.map(h =>
      `<div style="font-size:0.82rem;color:rgba(255,255,255,0.4);margin-bottom:4px"><span style="color:var(--gold-light)">${h.days}:</span> ${h.time}</div>`
    ).join('');
  }
}

populateRestaurantInfo();

// ─── Smooth scroll pour les ancres ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const offset = 80;
      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Bouton "Retour en haut" ─────────────────────────────────
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
    backToTop.style.pointerEvents = window.scrollY > 500 ? 'all' : 'none';
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Observer galerie après rendu ───────────────────────────
const galleryGridEl = document.getElementById('gallery-grid');
if (galleryGridEl) {
  const galleryObs = new MutationObserver(() => {
    galleryGridEl.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });
  });
  galleryObs.observe(galleryGridEl, { childList: true });
}
