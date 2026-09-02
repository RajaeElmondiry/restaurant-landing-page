/* ============================================================
   GALERIE — Rendu & Lightbox
   ============================================================ */

const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentLightboxIndex = 0;

// ─── Rendu de la galerie ─────────────────────────────────────
function renderGallery() {
  GALLERY.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'gallery-item reveal';
    el.style.transitionDelay = `${index * 80}ms`;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `Voir en grand : ${item.caption}`);

    el.innerHTML = `
      <img
        class="gallery-img"
        src="${item.src}"
        alt="${item.alt}"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80'"
      />
      <div class="gallery-item-overlay">
        <span class="gallery-item-caption">${item.caption}</span>
      </div>
      <div class="gallery-zoom-icon">🔍</div>
    `;

    el.addEventListener('click', () => openLightbox(index));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    galleryGrid.appendChild(el);
  });
}

// ─── Lightbox ────────────────────────────────────────────────
function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const item = GALLERY[currentLightboxIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightboxCaption.textContent = item.caption;
  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${GALLERY.length}`;
}

function nextSlide() {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY.length;
  updateLightboxContent();
}

function prevSlide() {
  currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY.length) % GALLERY.length;
  updateLightboxContent();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextSlide);
lightboxPrev.addEventListener('click', prevSlide);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

// Touch swipe support pour mobile
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextSlide();
    else prevSlide();
  }
});

// ─── Init ────────────────────────────────────────────────────
renderGallery();
