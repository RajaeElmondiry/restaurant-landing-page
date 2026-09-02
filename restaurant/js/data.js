// ============================================================
//  LE SAFRAN — Données du restaurant (facilement personnalisables)
// ============================================================

const RESTAURANT = {
  name: "Le Safran",
  tagline: "Une cuisine authentique, préparée avec passion.",
  description:
    "Né de la rencontre entre les saveurs de la Méditerranée et les traditions culinaires du Maroc, Le Safran est un voyage sensoriel au cœur de la cuisine fusion la plus raffinée. Chaque plat est une invitation à découvrir des arômes uniques, soigneusement élaborés par notre chef.",
  concept:
    "Nous croyons que la cuisine est un art. C'est pourquoi nous sélectionnons chaque ingrédient avec soin, en privilégiant les produits frais et locaux, pour vous offrir une expérience culinaire inoubliable.",
  address: "12, Rue des Acacias, Quartier Gueliz, Marrakech 40000",
  phone: "+212 5 24 43 78 90",
  email: "contact@lesafran.ma",
  mapLink: "https://maps.google.com/?q=Marrakech,+Gueliz",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108659.97494948!2d-8.078456!3d31.628674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh!5e0!3m2!1sfr!2sma!4v1693000000000!5m2!1sfr!2sma",
  hours: [
    { days: "Lundi – Jeudi", time: "12h00 – 23h00" },
    { days: "Vendredi – Samedi", time: "12h00 – 00h00" },
    { days: "Dimanche", time: "12h00 – 22h00" },
  ],
  services: ["Sur place", "À emporter", "Privatisation", "Traiteur"],
  social: {
    instagram: "https://instagram.com/lesafran_restaurant",
    facebook: "https://facebook.com/lesafran",
    tiktok: "https://tiktok.com/@lesafran",
  },
  cuisine: "Méditerranéenne & Marocaine Fusion",
};

// ============================================================
//  CATÉGORIES DU MENU
// ============================================================
const CATEGORIES = [
  { id: "all", label: "Tout" },
  { id: "entrees", label: "Entrées" },
  { id: "plats", label: "Plats Principaux" },
  { id: "burgers", label: "Burgers" },
  { id: "pizzas", label: "Pizzas" },
  { id: "salades", label: "Salades" },
  { id: "desserts", label: "Desserts" },
  { id: "boissons", label: "Boissons" },
];

// ============================================================
//  BADGES DISPONIBLES
// ============================================================
// "Populaire" | "Nouveau" | "Chef's Choice" | "Végétarien" | "Épicé"

// ============================================================
//  MENU — Tableau de plats (ajouter / modifier / supprimer facilement)
// ============================================================
const MENU = [
  // ─── ENTRÉES ───────────────────────────────────────────────
  {
    id: 1,
    name: "Briouats au Fromage & Miel",
    category: "entrees",
    description:
      "Feuilletés dorés et croustillants garnis de fromage de chèvre fondu, arrosés d'un filet de miel d'acacia et de graines de sésame grillées.",
    ingredients: ["Pâte filo", "Fromage de chèvre", "Miel", "Sésame", "Herbes fraîches"],
    allergens: ["Gluten", "Lait", "Sésame"],
    price: 55,
    image: "assets/entree-briouats.png",
    badges: ["Chef's Choice"],
    nutrition: "Environ 320 kcal",
    extra: "Servi avec une sauce grenade maison.",
  },
  {
    id: 2,
    name: "Zaalouk & Pain Maison",
    category: "entrees",
    description:
      "Caviar d'aubergines confites aux épices marocaines, servi avec notre pain maison chaud sorti du four en terre cuite.",
    ingredients: ["Aubergines", "Tomates", "Ail", "Cumin", "Paprika", "Persil"],
    allergens: ["Gluten"],
    price: 40,
    image: "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=600&q=80",
    badges: ["Végétarien"],
    nutrition: "Environ 210 kcal",
    extra: "100% végétarien et sans lactose.",
  },
  {
    id: 3,
    name: "Gambas à l'Ail & Chermoula",
    category: "entrees",
    description:
      "Gambas royales sautées à la plancha, marinées dans une chermoula maison aux herbes fraîches, citron confit et épices douces.",
    ingredients: ["Gambas", "Ail", "Coriandre", "Citron confit", "Huile d'olive", "Paprika"],
    allergens: ["Crustacés"],
    price: 80,
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600&q=80",
    badges: ["Populaire"],
    nutrition: "Environ 280 kcal",
    extra: "Peut être adapté au niveau d'épices.",
  },

  // ─── PLATS PRINCIPAUX ──────────────────────────────────────
  {
    id: 4,
    name: "Tajine d'Agneau aux Pruneaux",
    category: "plats",
    description:
      "Épaule d'agneau mijotée lentement au safran et gingembre, accompagnée de pruneaux fondants, d'amandes grillées et de semoule fine.",
    ingredients: ["Agneau", "Pruneaux", "Amandes", "Safran", "Gingembre", "Cannelle", "Oignon"],
    allergens: ["Fruits à coque"],
    price: 135,
    image: "assets/tagine-agneau.png",
    badges: ["Chef's Choice", "Populaire"],
    nutrition: "Environ 650 kcal",
    extra: "Cuisson lente de 3 heures. Servi en tajine traditionnel.",
  },
  {
    id: 5,
    name: "Filet de Daurade Royale",
    category: "plats",
    description:
      "Daurade royale rôtie au four sur lit de légumes grillés méditerranéens, sauce vierge aux herbes et huile d'argan première pression.",
    ingredients: ["Daurade", "Tomates cerises", "Courgettes", "Citron", "Huile d'argan", "Basilic"],
    allergens: ["Poissons"],
    price: 120,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    badges: ["Nouveau"],
    nutrition: "Environ 420 kcal",
    extra: "Pêche locale du matin. Disponible selon arrivage.",
  },
  {
    id: 6,
    name: "Couscous Royal Maison",
    category: "plats",
    description:
      "Notre couscous traditionnel préparé selon la recette familiale : semoule fine, bouillon maison aux sept légumes, merguez maison, brochette d'agneau et poulet fermier.",
    ingredients: ["Semoule", "Agneau", "Poulet", "Merguez", "Courgettes", "Carottes", "Pois chiches"],
    allergens: ["Gluten"],
    price: 150,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&q=80",
    badges: ["Populaire"],
    nutrition: "Environ 780 kcal",
    extra: "Le vendredi et samedi uniquement. Pour 2 personnes minimum.",
  },

  // ─── BURGERS ───────────────────────────────────────────────
  {
    id: 7,
    name: "Poulet Crispy",
    category: "burgers",
    description:
      "Filet de poulet mariné, pané à la chapelure panko dorée, laitue croquante, tomate, oignon rouge mariné et sauce maison épicée.",
    ingredients: ["Poulet", "Chapelure panko", "Laitue", "Tomate", "Oignon rouge", "Sauce épicée", "Pain brioché"],
    allergens: ["Gluten", "Œufs", "Lait"],
    price: 65,
    image: "assets/poulet-crispy.png",
    badges: ["Populaire"],
    nutrition: "Environ 580 kcal",
    extra: "Servi avec frites maison et sauce au choix.",
  },
  {
    id: 8,
    name: "Le Safran Burger",
    category: "burgers",
    description:
      "Double steak haché de bœuf Angus 180g, cheddar affiné fondu, bacon fumé, salade, tomate, cornichon et notre sauce signature Le Safran.",
    ingredients: ["Bœuf Angus", "Cheddar", "Bacon fumé", "Laitue", "Tomate", "Sauce signature", "Pain brioche"],
    allergens: ["Gluten", "Lait", "Œufs"],
    price: 85,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    badges: ["Chef's Choice"],
    nutrition: "Environ 820 kcal",
    extra: "Steak haché frais préparé le jour même. Cuisson à votre convenance.",
  },
  {
    id: 9,
    name: "Burger Végétarien",
    category: "burgers",
    description:
      "Galette de légumes grillés et pois chiches, avocat frais, houmous maison, roquette, tomate et sauce yaourt citron.",
    ingredients: ["Galette végétale", "Avocat", "Houmous", "Roquette", "Tomate", "Sauce yaourt"],
    allergens: ["Gluten", "Lait", "Sésame"],
    price: 60,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80",
    badges: ["Végétarien", "Nouveau"],
    nutrition: "Environ 490 kcal",
    extra: "Pain complet sans gluten disponible sur demande.",
  },

  // ─── PIZZAS ────────────────────────────────────────────────
  {
    id: 10,
    name: "Prosciutto & Roquette",
    category: "pizzas",
    description:
      "Pâte fine croustillante, sauce tomate San Marzano, mozzarella di bufala, jambon cru italien, roquette fraîche et copeaux de parmesan.",
    ingredients: ["Pâte fine", "Sauce tomate", "Mozzarella bufala", "Prosciutto", "Roquette", "Parmesan"],
    allergens: ["Gluten", "Lait"],
    price: 90,
    image: "assets/pizza-prosciutto.png",
    badges: ["Populaire"],
    nutrition: "Environ 720 kcal",
    extra: "Cuite au feu de bois à 400°C.",
  },
  {
    id: 11,
    name: "Pizza Orientale",
    category: "pizzas",
    description:
      "Notre pizza fusion aux saveurs marocaines : sauce harissa douce, mozzarella, merguez maison, poivrons grillés et oignons caramélisés.",
    ingredients: ["Pâte fine", "Harissa", "Mozzarella", "Merguez", "Poivrons", "Oignons caramélisés"],
    allergens: ["Gluten", "Lait"],
    price: 85,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    badges: ["Chef's Choice", "Épicé"],
    nutrition: "Environ 680 kcal",
    extra: "Niveau d'épices ajustable.",
  },

  // ─── SALADES ───────────────────────────────────────────────
  {
    id: 12,
    name: "Salade Halloumi Grillé",
    category: "salades",
    description:
      "Halloumi grillé croustillant, mesclun de jeunes pousses, tomates cerises, concombre persan, olives noires, grenade et vinaigrette au citron.",
    ingredients: ["Halloumi", "Mesclun", "Tomates cerises", "Concombre", "Olives", "Grenade", "Citron"],
    allergens: ["Lait"],
    price: 70,
    image: "assets/salade-halloumi.png",
    badges: ["Végétarien"],
    nutrition: "Environ 380 kcal",
    extra: "Sans gluten. Huile d'olive vierge extra.",
  },
  {
    id: 13,
    name: "Salade Niçoise Revisitée",
    category: "salades",
    description:
      "Thon germon mi-cuit, haricots verts croquants, œufs mollets, tomates anciennes, olives de Kalamata, anchois et vinaigrette moutarde.",
    ingredients: ["Thon", "Haricots verts", "Œufs", "Tomates", "Olives Kalamata", "Anchois", "Moutarde"],
    allergens: ["Poissons", "Œufs", "Moutarde"],
    price: 75,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    badges: [],
    nutrition: "Environ 420 kcal",
    extra: "Le thon est pêché de façon durable.",
  },

  // ─── DESSERTS ──────────────────────────────────────────────
  {
    id: 14,
    name: "Fondant Chocolat & Caramel",
    category: "desserts",
    description:
      "Cœur coulant au chocolat noir Valrhona 70%, coulis de caramel beurre salé, glace vanille de Madagascar et éclats de pralin.",
    ingredients: ["Chocolat Valrhona", "Caramel", "Beurre salé", "Glace vanille", "Pralin"],
    allergens: ["Gluten", "Lait", "Œufs", "Fruits à coque"],
    price: 55,
    image: "assets/fondant-chocolat.png",
    badges: ["Populaire", "Chef's Choice"],
    nutrition: "Environ 520 kcal",
    extra: "Servi chaud, à déguster immédiatement.",
  },
  {
    id: 15,
    name: "Pastilla au Lait & Oranges",
    category: "desserts",
    description:
      "Tradition marocaine revisitée : feuilles de pastilla croustillantes, crème pâtissière à la fleur d'oranger, zestes de mandarine et poudre de cannelle.",
    ingredients: ["Pâte filo", "Crème pâtissière", "Fleur d'oranger", "Mandarine", "Cannelle", "Sucre glace"],
    allergens: ["Gluten", "Lait", "Œufs"],
    price: 45,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
    badges: ["Végétarien", "Nouveau"],
    nutrition: "Environ 390 kcal",
    extra: "Recette de notre grand-mère, inchangée depuis 1975.",
  },

  // ─── BOISSONS ──────────────────────────────────────────────
  {
    id: 16,
    name: "Thé à la Menthe Maison",
    category: "boissons",
    description:
      "Thé vert Gunpowder infusé avec de la menthe fraîche cueillie du matin et sucré au miel d'acacia. Servi à la marocaine en théière.",
    ingredients: ["Thé vert Gunpowder", "Menthe fraîche", "Miel d'acacia", "Eau de source"],
    allergens: [],
    price: 25,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    badges: ["Végétarien"],
    nutrition: "5 kcal",
    extra: "Servi pour 2 personnes. Théière traditionnelle.",
  },
  {
    id: 17,
    name: "Jus d'Orange Frais Pressé",
    category: "boissons",
    description:
      "Jus d'oranges Navel pressées à la commande, sans sucre ajouté, sans conservateurs. Le goût authentique du Maroc.",
    ingredients: ["Oranges fraîches"],
    allergens: [],
    price: 20,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80",
    badges: ["Végétarien", "Populaire"],
    nutrition: "Environ 90 kcal",
    extra: "4 à 5 oranges par verre. 100% naturel.",
  },
  {
    id: 18,
    name: "Limonade Marocaine",
    category: "boissons",
    description:
      "Citrons frais pressés, eau pétillante, menthe fraîche, fleur d'oranger et sucre de canne non raffiné. Rafraîchissante et parfumée.",
    ingredients: ["Citrons", "Eau pétillante", "Menthe", "Fleur d'oranger", "Sucre de canne"],
    allergens: [],
    price: 25,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
    badges: ["Végétarien"],
    nutrition: "Environ 110 kcal",
    extra: "Disponible sans sucre sur demande.",
  },
];

// ============================================================
//  GALERIE PHOTOS
// ============================================================
const GALLERY = [
  {
    src: "assets/hero.png",
    alt: "Ambiance Le Safran",
    category: "ambiance",
    caption: "Une ambiance chaleureuse et raffinée",
  },
  {
    src: "assets/about.png",
    alt: "Intérieur du restaurant",
    category: "interieur",
    caption: "Notre salle principale",
  },
  {
    src: "assets/tagine-agneau.png",
    alt: "Tajine d'Agneau",
    category: "plats",
    caption: "Tajine d'Agneau aux Pruneaux",
  },
  {
    src: "assets/poulet-crispy.png",
    alt: "Poulet Crispy",
    category: "plats",
    caption: "Burger Poulet Crispy",
  },
  {
    src: "assets/salade-halloumi.png",
    alt: "Salade Halloumi",
    category: "plats",
    caption: "Salade Halloumi Grillé",
  },
  {
    src: "assets/fondant-chocolat.png",
    alt: "Fondant Chocolat",
    category: "plats",
    caption: "Fondant Chocolat & Caramel",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Cuisine ouverte",
    category: "cuisine",
    caption: "Notre chef à l'œuvre",
  },
  {
    src: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80",
    alt: "Terrasse du restaurant",
    category: "exterieur",
    caption: "Terrasse sous les étoiles",
  },
];
