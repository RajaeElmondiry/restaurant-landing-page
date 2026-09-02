/* ============================================================
   MENU — Rendu des cartes & filtres
   ============================================================ */

// Sélecteurs DOM
const menuGrid = document.getElementById('menu-grid');
const menuTabs = document.querySelectorAll('.menu-tab');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modalBadges = document.getElementById('modal-badges');
const modalName = document.getElementById('modal-name');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalIngredients = document.getElementById('modal-ingredients');
const modalAllergenWrap = document.getElementById('modal-allergen-wrap');
const modalAllergenList = document.getElementById('modal-allergen-list');
const modalExtra = document.getElementById('modal-extra');
const modalNutrition = document.getElementById('modal-nutrition');

let currentCategory = 'all';

// ─── Helpers badges ─────────────────────────────────────────
const BADGE_CONFIG = {
  'Populaire':    { class: 'badge-populaire', icon: '<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"></path></svg>' },
  'Nouveau':      { class: 'badge-nouveau',   icon: '<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"></path></svg>' },
  "Chef's Choice":{ class: 'badge-chef',      icon: '<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 19h12M8 19V9m8 10V9M5 9h14M7 5h10l2 4H5l2-4Z"></path></svg>' },
  'Végétarien':   { class: 'badge-vegetarien',icon: '<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 4C10 4 5 8 5 14c0 3 2 5 5 5 6 0 10-5 10-15Z"></path><path d="M4 21c3-5 7-8 12-11"></path></svg>' },
  'Épicé':        { class: 'badge-epice',     icon: '<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21c4 0 7-2.5 7-6 0-2.4-1.4-4.5-3.6-6.2C14 7.5 13.5 5.5 14 3c-4 1.5-7 4.8-7 8.5C7 13 8 14 9 15c-1.8-.2-3 .8-3 2.2C6 19.5 8.7 21 12 21Z"></path></svg>' },
};

const CATEGORY_LABELS = {
  entrees: 'Entrée',
  plats: 'Signature',
  burgers: 'Le comptoir',
  pizzas: 'Four à bois',
  salades: 'Fraîcheur',
  desserts: 'Douceur',
  boissons: 'À boire',
};

function createBadgeHTML(badgeName) {
  const cfg = BADGE_CONFIG[badgeName] || { class: '', icon: '' };
  return `<span class="badge ${cfg.class}">${cfg.icon} ${badgeName}</span>`;
}

// ─── Créer une carte de plat ─────────────────────────────────
function createDishCard(dish) {
  const badges = dish.badges.map(createBadgeHTML).join('');
  const ingredients = dish.ingredients.slice(0, 4).map(
    i => `<span class="ingredient-tag">${i}</span>`
  ).join('');

  const card = document.createElement('article');
  card.className = 'dish-card reveal';
  card.dataset.id = dish.id;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Voir les détails de ${dish.name}`);

  card.innerHTML = `
    <div class="dish-card-img-wrap">
      <img
        class="dish-card-img"
        src="${dish.image}"
        alt="${dish.name}"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'"
      />
      <div class="dish-card-overlay">
        <div class="dish-card-view-btn">
          <svg class="view-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="2.5"></circle></svg>
          Voir le plat
        </div>
      </div>
      <div class="dish-card-badges">${badges}</div>
    </div>
    <div class="dish-card-body">
      <span class="dish-card-category">${CATEGORY_LABELS[dish.category] || 'La carte'}</span>
      <div class="dish-card-header">
        <h3 class="dish-card-name">${dish.name}</h3>
        <span class="dish-card-price">${dish.price} DH</span>
      </div>
      <p class="dish-card-desc">${dish.description}</p>
      <div class="dish-card-ingredients">${ingredients}${dish.ingredients.length > 4 ? `<span class="ingredient-tag" style="color:var(--gold)">+${dish.ingredients.length - 4}</span>` : ''}</div>
    </div>
  `;

  // Événements
  card.addEventListener('click', () => openModal(dish));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(dish);
    }
  });

  return card;
}

// ─── Filtrer & afficher les plats ────────────────────────────
function renderMenu(category = 'all') {
  currentCategory = category;

  const filtered = category === 'all'
    ? MENU
    : MENU.filter(d => d.category === category);

  // Animation de sortie
  menuGrid.style.opacity = '0';
  menuGrid.style.transform = 'translateY(16px)';

  setTimeout(() => {
    menuGrid.innerHTML = '';

    if (filtered.length === 0) {
      menuGrid.innerHTML = `
        <div class="menu-empty">
          <svg class="empty-menu-icon" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 3v7a2 2 0 0 0 4 0V3M6 3v18M4 7h4M14 3v18M14 3c3 2 4 5 4 8v10"></path></svg>
          <p>Aucun plat dans cette catégorie pour le moment.</p>
        </div>
      `;
    } else {
      filtered.forEach((dish, index) => {
        const card = createDishCard(dish);
        card.style.transitionDelay = `${index * 60}ms`;
        menuGrid.appendChild(card);
      });

      // Déclencher les animations des cartes
      requestAnimationFrame(() => {
        menuGrid.querySelectorAll('.reveal').forEach(el => {
          setTimeout(() => el.classList.add('visible'), 50);
        });
      });
    }

    // Animation d'entrée
    menuGrid.style.opacity = '';
    menuGrid.style.transform = '';
    menuGrid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    requestAnimationFrame(() => {
      menuGrid.style.opacity = '1';
      menuGrid.style.transform = 'translateY(0)';
    });
  }, 250);
}

// ─── Gestion des onglets ─────────────────────────────────────
menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    renderMenu(tab.dataset.category);
  });
});

// ─── MODAL ──────────────────────────────────────────────────
function openModal(dish) {
  // Remplir le contenu
  modalImg.src = dish.image;
  modalImg.alt = dish.name;
  modalImg.onerror = () => {
    modalImg.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80';
  };

  modalBadges.innerHTML = dish.badges.map(createBadgeHTML).join('');
  modalName.textContent = dish.name;
  modalPrice.textContent = `${dish.price} DH`;
  modalDesc.textContent = dish.description;

  modalIngredients.innerHTML = dish.ingredients
    .map(i => `<span class="modal-ingredient">${i}</span>`)
    .join('');

  if (dish.allergens && dish.allergens.length > 0) {
    modalAllergenWrap.style.display = 'block';
    modalAllergenList.textContent = dish.allergens.join(' • ');
  } else {
    modalAllergenWrap.style.display = 'none';
  }

  modalExtra.textContent = dish.extra || '';
  modalExtra.style.display = dish.extra ? 'block' : 'none';

  if (dish.nutrition) {
    modalNutrition.innerHTML = `<svg class="nutrition-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c2 3 6 5 6 10a6 6 0 1 1-12 0c0-2 1-4 3-5-.1 2 1 3 2 3 1-2 1-5 1-8Z"></path></svg> ${dish.nutrition}`;
    modalNutrition.parentElement.style.display = 'flex';
  } else {
    modalNutrition.parentElement.style.display = 'none';
  }

  // Ouvrir
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close').focus();
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
});

// ─── Init ────────────────────────────────────────────────────
renderMenu('all');
