/**
 * AETHER STUDIO — LUXURY SHOWCASE CONTROLLER (PHASE 2.5)
 * Full-Bleed Viewport, Hardware-Accelerated Parallax, Swatch Selectors & Size Guide
 */

/* ==========================================================================
   1. PRODUCTS DATA (AUTHENTIC HUMAN EDITORIAL COPY — ZERO AI SLOP)
   ========================================================================== */
const PRODUCTS = [
  {
    id: "frost-slate",
    name: "Frost Metallic Puffer",
    editionTitle: "01 / 03 — FROST EDITION",
    navTag: "PUFFER JACKET",
    headline: [
      "Stand out",
      "Without trying"
    ],
    tagline: [
      "Confidence,",
      "wrapped in warmth"
    ],
    description: "It's not just about staying warm. It's about stepping outside and instantly feeling confident, comfortable, and completely yourself. Designed to elevate even the simplest outfit, this piece wraps you in lightweight warmth.",
    price: 149,
    oldPrice: 199,
    sizes: ["36", "38", "40"],
    theme: {
      id: "frost",
      name: "Frost / Slate Grey",
      accent: "#ffffff"
    },
    imageUrl: "assets/jacket_silver.png",
    altText: "Frost metallic silver down puffer jacket"
  },
  {
    id: "crimson-gloss",
    name: "Crimson Gloss Puffer",
    editionTitle: "02 / 03 — CRIMSON EDITION",
    navTag: "PUFFER JACKET",
    headline: [
      "Stand out",
      "Without trying"
    ],
    tagline: [
      "Confidence,",
      "wrapped in warmth"
    ],
    description: "A bold winter statement in glossy crimson. Filled with premium down for exceptional warmth and a featherweight feel that moves with you anywhere.",
    price: 149,
    oldPrice: 199,
    sizes: ["36", "38", "40"],
    theme: {
      id: "crimson",
      name: "Crimson Red",
      accent: "#ff3b45"
    },
    imageUrl: "assets/jacket_crimson.png",
    altText: "High-gloss crimson red down puffer jacket"
  },
  {
    id: "obsidian-gold",
    name: "Obsidian Gold Puffer",
    editionTitle: "03 / 03 — OBSIDIAN EDITION",
    navTag: "PUFFER JACKET",
    headline: [
      "Quiet power",
      "Pure presence"
    ],
    tagline: [
      "Architectural luxury,",
      "sculpted for cold"
    ],
    description: "Subtle, architectural, and completely effortless. Finished in deep matte obsidian with quiet gold hardware that catches winter light just right.",
    price: 189,
    oldPrice: 249,
    sizes: ["36", "38", "40"],
    theme: {
      id: "obsidian",
      name: "Obsidian / Midnight Gold",
      accent: "#d4af37"
    },
    imageUrl: "assets/jacket_obsidian.png",
    altText: "Obsidian matte black puffer jacket with gold zipper accents"
  }
];

/* ==========================================================================
   2. APPLICATION STATE
   ========================================================================== */
const AppState = {
  currentIndex: 0,
  selectedSize: "36",
  isTransitioning: false,
  activeView: "puffer", // 'puffer' | 'all' | 'about' | 'contact'
  frameMode: "bleed", // Default: Full-Bleed ('bleed' | 'frame')
  cart: [],
  wishlist: new Set(),
  sizeGuideOpen: false,

  // Hardware-accelerated Parallax Lerp State
  mouse: {
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0
  },

  touchStartX: 0,
  touchStartY: 0
};

/* ==========================================================================
   3. DOM ELEMENT CACHE
   ========================================================================== */
const DOM = {
  shell: document.getElementById("presentation-shell"),
  showcaseCard: document.getElementById("showcase-card"),

  // Ambient Lighting
  ambientLayers: {
    frost: document.getElementById("ambient-frost"),
    crimson: document.getElementById("ambient-crimson"),
    obsidian: document.getElementById("ambient-obsidian")
  },
  spotlight: document.getElementById("ambient-spotlight"),

  // Top Nav
  navLinks: document.querySelectorAll(".nav-link-btn"),
  cartToggleBtn: document.getElementById("cart-toggle-btn"),
  cartCounter: document.getElementById("cart-counter"),
  wishlistToggleBtn: document.getElementById("wishlist-toggle-btn"),
  wishlistCounter: document.getElementById("wishlist-counter"),

  // Views
  views: {
    puffer: document.getElementById("hero-showcase-view"),
    all: document.getElementById("catalog-view"),
    about: document.getElementById("about-view"),
    contact: document.getElementById("contact-view")
  },

  // Hero Left Column
  prevBtn: document.getElementById("slider-prev-btn"),
  nextBtn: document.getElementById("slider-next-btn"),
  editionLabel: document.getElementById("edition-label"),
  swatchDots: document.querySelectorAll(".swatch-dot"),
  headline: document.getElementById("hero-headline"),
  description: document.getElementById("hero-description"),
  ctaBtn: document.getElementById("cta-get-look"),

  // Hero Center Stage
  productWrapper: document.getElementById("product-visual-wrapper"),
  mainProductImg: document.getElementById("main-product-img"),
  groundShadow: document.getElementById("ground-shadow"),
  stageCaption: document.getElementById("stage-caption"),

  // Hero Right Column
  currentPrice: document.getElementById("display-current-price"),
  oldPrice: document.getElementById("display-old-price"),
  sizeGuideToggleBtn: document.getElementById("size-guide-toggle-btn"),
  sizeGuidePopover: document.getElementById("size-guide-popover"),
  sizeGuideClose: document.getElementById("size-guide-close"),
  sizeBtns: document.querySelectorAll(".size-circle-btn"),
  teaserTrigger: document.getElementById("next-product-trigger"),
  teaserThumbImg: document.getElementById("next-product-thumb-img"),
  teaserPillText: document.getElementById("teaser-pill-text"),

  // Catalog Cards
  catalogCards: document.querySelectorAll(".catalog-card"),
  aboutReturnBtn: document.getElementById("about-return-btn"),
  contactReturnBtn: document.getElementById("contact-return-btn"),

  // Cart Drawer
  cartDrawer: document.getElementById("cart-drawer"),
  cartBackdrop: document.getElementById("cart-backdrop"),
  cartCloseBtn: document.getElementById("cart-close-btn"),
  cartItemsContainer: document.getElementById("cart-items-container"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  checkoutStandard: document.getElementById("checkout-standard"),

  // Wishlist Drawer
  wishlistDrawer: document.getElementById("wishlist-drawer"),
  wishlistBackdrop: document.getElementById("wishlist-backdrop"),
  wishlistCloseBtn: document.getElementById("wishlist-close-btn"),
  wishlistItemsContainer: document.getElementById("wishlist-items-container"),

  // Toast
  toastShelf: document.getElementById("toast-shelf")
};

/* ==========================================================================
   4. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, duration = 2400) {
  const toast = document.createElement("div");
  toast.className = "toast-bubble";
  toast.textContent = message;
  DOM.toastShelf.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 320);
  }, duration);
}

/* ==========================================================================
   5. VIEW SWITCHING LOGIC (NO PAGE RELOADS)
   ========================================================================== */
function setActiveView(viewName) {
  if (AppState.activeView === viewName) return;
  AppState.activeView = viewName;

  // Update Nav Links highlight
  DOM.navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === viewName);
  });

  // Crossfade between view stages
  Object.keys(DOM.views).forEach((key) => {
    const el = DOM.views[key];
    if (key === viewName) {
      el.classList.add("active-view");
    } else {
      el.classList.remove("active-view");
    }
  });

  // Close popovers
  closeSizeGuide();
}

/* ==========================================================================
   6. PRODUCT SWITCHING CHOREOGRAPHY
   ========================================================================== */
function switchProduct(targetIndex) {
  if (AppState.isTransitioning) return;
  if (targetIndex === AppState.currentIndex) return;

  AppState.isTransitioning = true;

  const count = PRODUCTS.length;
  const newIndex = ((targetIndex % count) + count) % count;
  const nextQueueIndex = (newIndex + 1) % count;

  const newProduct = PRODUCTS[newIndex];
  const nextProduct = PRODUCTS[nextQueueIndex];

  // 1. Outgoing Center Product Animation
  DOM.productWrapper.classList.remove("switching-in");
  DOM.productWrapper.classList.add("switching-out");

  // 2. Floor Shadow Contract
  DOM.groundShadow.classList.remove("shadow-morph");
  void DOM.groundShadow.offsetWidth;
  DOM.groundShadow.classList.add("shadow-morph");

  // 3. Dynamic Studio Background Crossfade
  Object.keys(DOM.ambientLayers).forEach((key) => {
    DOM.ambientLayers[key].classList.toggle("active", key === newProduct.theme.id);
  });
  document.body.className = `theme-${newProduct.theme.id}`;

  // 4. Update Edition Indicator & Swatch Dots
  if (DOM.editionLabel) {
    DOM.editionLabel.textContent = newProduct.editionTitle;
  }
  DOM.swatchDots.forEach((dot) => {
    const dotIdx = parseInt(dot.dataset.edition, 10);
    dot.classList.toggle("active", dotIdx === newIndex);
  });

  // 5. Staggered Text & Price Reveal
  setTimeout(() => {
    DOM.headline.innerHTML = `
      <span class="line line-1">${newProduct.headline[0]}</span>
      <span class="line line-2">${newProduct.headline[1]}</span>
    `;
    DOM.headline.classList.remove("animate-text-reveal");
    void DOM.headline.offsetWidth;
    DOM.headline.classList.add("animate-text-reveal");

    DOM.description.textContent = newProduct.description;
    DOM.description.classList.remove("animate-text-reveal");
    void DOM.description.offsetWidth;
    DOM.description.classList.add("animate-text-reveal");

    DOM.currentPrice.textContent = `$${newProduct.price}`;
    DOM.oldPrice.innerHTML = `<span>$${newProduct.oldPrice}</span>`;
    DOM.currentPrice.classList.remove("animate-text-reveal");
    void DOM.currentPrice.offsetWidth;
    DOM.currentPrice.classList.add("animate-text-reveal");

    DOM.stageCaption.innerHTML = `
      <span class="caption-line">${newProduct.tagline[0]}</span>
      <span class="caption-line">${newProduct.tagline[1]}</span>
    `;
    DOM.stageCaption.classList.remove("animate-text-reveal");
    void DOM.stageCaption.offsetWidth;
    DOM.stageCaption.classList.add("animate-text-reveal");

    // Sync Wishlist Button state
    const isWishlisted = AppState.wishlist.has(newProduct.id);
    DOM.wishlistToggleBtn.classList.toggle("wishlist-active", isWishlisted);
  }, 180);

  // 6. Incoming Center Product Spring Entrance
  setTimeout(() => {
    DOM.mainProductImg.src = newProduct.imageUrl;
    DOM.mainProductImg.alt = newProduct.altText;

    DOM.productWrapper.classList.remove("switching-out");
    DOM.productWrapper.classList.add("switching-in");

    // 7. Refresh Teaser Thumbnail & Pill
    DOM.teaserThumbImg.src = nextProduct.imageUrl;
    DOM.teaserThumbImg.alt = nextProduct.name;
    if (DOM.teaserPillText) {
      DOM.teaserPillText.textContent = `Next: ${nextProduct.name}`;
    }
    DOM.teaserThumbImg.classList.remove("refresh-pop");
    void DOM.teaserThumbImg.offsetWidth;
    DOM.teaserThumbImg.classList.add("refresh-pop");

    AppState.currentIndex = newIndex;

    setTimeout(() => {
      DOM.productWrapper.classList.remove("switching-in");
      AppState.isTransitioning = false;
    }, 650);
  }, 220);
}

/* ==========================================================================
   7. CART & WISHLIST MANAGEMENT (BADGE 0-STATE FIX)
   ========================================================================== */
function addToCart(product, size) {
  const existingItem = AppState.cart.find(
    item => item.product.id === product.id && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    AppState.cart.push({
      id: `${product.id}-${size}`,
      product: product,
      size: size,
      quantity: 1
    });
  }

  updateCartUI();
  bumpCartBadge();
  openCartDrawer();
  showToast(`Added ${product.name} (Size ${size}) to Bag`);
}

function updateCartItemQuantity(index, delta) {
  const item = AppState.cart[index];
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    AppState.cart.splice(index, 1);
  }
  updateCartUI();
}

function removeCartItem(index) {
  AppState.cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const container = DOM.cartItemsContainer;
  const totalQty = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = AppState.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Cart Badge UX: Hide when 0, spring animate into view when >= 1
  if (totalQty > 0) {
    DOM.cartCounter.textContent = totalQty;
    DOM.cartCounter.classList.add("visible");
  } else {
    DOM.cartCounter.textContent = "0";
    DOM.cartCounter.classList.remove("visible");
    DOM.cartCounter.classList.remove("bump");
  }

  // Render items
  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.8" style="opacity: 0.5; margin: 0 auto;">
          <circle cx="9" cy="20" r="1.2"></circle>
          <circle cx="19" cy="20" r="1.2"></circle>
          <path d="M2 3h3.6l2.4 12h11.2l2-8H6.5"></path>
        </svg>
        <p>Your bag is currently empty.</p>
      </div>
    `;
    DOM.cartSubtotal.textContent = "$0.00";
    return;
  }

  container.innerHTML = AppState.cart.map((item, idx) => `
    <div class="cart-item-row">
      <div class="cart-item-thumb">
        <img src="${item.product.imageUrl}" alt="${item.product.name}">
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.product.name}</h3>
        <div class="cart-item-meta">
          <span class="size-tag">Size ${item.size}</span>
          <span>${item.product.theme.name}</span>
        </div>
        <div class="cart-item-price">$${item.product.price * item.quantity}.00</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="updateCartItemQuantity(${idx}, -1)" aria-label="Decrease quantity">−</button>
        <span class="qty-val">${item.quantity}</span>
        <button class="qty-btn" onclick="updateCartItemQuantity(${idx}, 1)" aria-label="Increase quantity">+</button>
      </div>
      <button class="item-delete-btn" onclick="removeCartItem(${idx})" aria-label="Remove item" title="Remove">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `).join("");

  DOM.cartSubtotal.textContent = `$${totalPrice}.00`;
}

window.updateCartItemQuantity = updateCartItemQuantity;
window.removeCartItem = removeCartItem;

function bumpCartBadge() {
  DOM.cartCounter.classList.remove("bump");
  void DOM.cartCounter.offsetWidth;
  DOM.cartCounter.classList.add("bump");
}

function openCartDrawer() {
  DOM.cartDrawer.classList.add("open");
  DOM.cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCartDrawer() {
  DOM.cartDrawer.classList.remove("open");
  DOM.cartDrawer.setAttribute("aria-hidden", "true");
}

/* Wishlist Drawer & Toggle */
function toggleWishlistCurrentProduct() {
  const currentProduct = PRODUCTS[AppState.currentIndex];
  if (AppState.wishlist.has(currentProduct.id)) {
    AppState.wishlist.delete(currentProduct.id);
    DOM.wishlistToggleBtn.classList.remove("wishlist-active");
    showToast("Removed from Wishlist");
  } else {
    AppState.wishlist.add(currentProduct.id);
    DOM.wishlistToggleBtn.classList.add("wishlist-active");
    showToast(`Saved ${currentProduct.name} to Wishlist ❤️`);
  }
  updateWishlistUI();
}

function updateWishlistUI() {
  const count = AppState.wishlist.size;
  if (count > 0) {
    DOM.wishlistCounter.textContent = count;
    DOM.wishlistCounter.classList.add("visible");
  } else {
    DOM.wishlistCounter.textContent = "0";
    DOM.wishlistCounter.classList.remove("visible");
  }

  const container = DOM.wishlistItemsContainer;
  if (count === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.8" style="opacity: 0.5; margin: 0 auto;">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <p>No saved items yet.</p>
      </div>
    `;
    return;
  }

  const savedProducts = PRODUCTS.filter(p => AppState.wishlist.has(p.id));
  container.innerHTML = savedProducts.map(p => `
    <div class="wishlist-row">
      <div class="cart-item-thumb">
        <img src="${p.imageUrl}" alt="${p.name}">
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${p.name}</h3>
        <div class="cart-item-price">$${p.price}.00</div>
      </div>
      <div class="wishlist-actions">
        <button class="wishlist-add-bag-btn" onclick="addSavedToBag('${p.id}')">Add to Bag</button>
        <button class="item-delete-btn" onclick="removeWishlistItem('${p.id}')">✕</button>
      </div>
    </div>
  `).join("");
}

function addSavedToBag(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    addToCart(product, AppState.selectedSize);
    AppState.wishlist.delete(productId);
    updateWishlistUI();
  }
}

function removeWishlistItem(productId) {
  AppState.wishlist.delete(productId);
  updateWishlistUI();
  if (PRODUCTS[AppState.currentIndex].id === productId) {
    DOM.wishlistToggleBtn.classList.remove("wishlist-active");
  }
}

window.addSavedToBag = addSavedToBag;
window.removeWishlistItem = removeWishlistItem;

function openWishlistDrawer() {
  updateWishlistUI();
  DOM.wishlistDrawer.classList.add("open");
  DOM.wishlistDrawer.setAttribute("aria-hidden", "false");
}

function closeWishlistDrawer() {
  DOM.wishlistDrawer.classList.remove("open");
  DOM.wishlistDrawer.setAttribute("aria-hidden", "true");
}

/* ==========================================================================
   8. INTERACTIVE SIZE GUIDE POPOVER
   ========================================================================= */
function toggleSizeGuide() {
  if (AppState.sizeGuideOpen) {
    closeSizeGuide();
  } else {
    openSizeGuide();
  }
}

function openSizeGuide() {
  AppState.sizeGuideOpen = true;
  DOM.sizeGuidePopover.classList.add("open");
  DOM.sizeGuidePopover.setAttribute("aria-hidden", "false");
  DOM.sizeGuideToggleBtn.setAttribute("aria-expanded", "true");
}

function closeSizeGuide() {
  AppState.sizeGuideOpen = false;
  if (DOM.sizeGuidePopover) {
    DOM.sizeGuidePopover.classList.remove("open");
    DOM.sizeGuidePopover.setAttribute("aria-hidden", "true");
  }
  if (DOM.sizeGuideToggleBtn) {
    DOM.sizeGuideToggleBtn.setAttribute("aria-expanded", "false");
  }
}

/* ==========================================================================
   9. HARDWARE-ACCELERATED PARALLAX ENGINE (requestAnimationFrame + Lerp)
   ========================================================================== */
function initParallaxEngine() {
  const card = DOM.showcaseCard;

  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized coordinates [-1, 1]
    AppState.mouse.targetX = (x / rect.width) * 2 - 1;
    AppState.mouse.targetY = (y / rect.height) * 2 - 1;
  });

  card.addEventListener("pointerleave", () => {
    AppState.mouse.targetX = 0;
    AppState.mouse.targetY = 0;
  });

  // Smooth 60fps / 120fps physics render loop
  function renderFrame() {
    // Lerp smoothing factor
    const lerpFactor = 0.08;
    AppState.mouse.currentX += (AppState.mouse.targetX - AppState.mouse.currentX) * lerpFactor;
    AppState.mouse.currentY += (AppState.mouse.targetY - AppState.mouse.currentY) * lerpFactor;

    const normX = AppState.mouse.currentX;
    const normY = AppState.mouse.currentY;

    // Apply gentle physical 3D tilt & translation (max 10px translate3d)
    const tiltX = -normY * 4.5;
    const tiltY = normX * 6.5;
    const transX = normX * 9;
    const transY = normY * 7;

    if (DOM.productWrapper && 
        !DOM.productWrapper.classList.contains("switching-out") && 
        !DOM.productWrapper.classList.contains("switching-in")) {
      DOM.productWrapper.style.transform = `translate3d(${transX}px, ${transY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    // Dynamic spotlight follow
    if (DOM.spotlight) {
      const spotX = normX * 55;
      const spotY = normY * 55;
      DOM.spotlight.style.transform = `translate(calc(-50% + ${spotX}px), calc(-50% + ${spotY}px))`;
    }

    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);
}

/* ==========================================================================
   10. EVENT BINDINGS
   ========================================================================== */
function bindEventListeners() {
  // Navigation Links View Switching
  DOM.navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.nav;
      setActiveView(target);
    });
  });

  // Slider Arrows
  DOM.prevBtn.addEventListener("click", () => {
    switchProduct(AppState.currentIndex - 1);
  });

  DOM.nextBtn.addEventListener("click", () => {
    switchProduct(AppState.currentIndex + 1);
  });

  // Quick Color Swatch Dots Click
  DOM.swatchDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const editionIdx = parseInt(dot.dataset.edition, 10);
      switchProduct(editionIdx);
    });
  });

  // Bottom-Right Teaser Card
  DOM.teaserTrigger.addEventListener("click", () => {
    switchProduct(AppState.currentIndex + 1);
  });

  // Size Selector Buttons
  DOM.sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      DOM.sizeBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-checked", "true");
      AppState.selectedSize = btn.dataset.size;
      showToast(`Selected size: ${AppState.selectedSize}`);
    });
  });

  // Size Guide Toggle
  if (DOM.sizeGuideToggleBtn) {
    DOM.sizeGuideToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSizeGuide();
    });
  }
  if (DOM.sizeGuideClose) {
    DOM.sizeGuideClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeSizeGuide();
    });
  }
  document.addEventListener("click", (e) => {
    if (AppState.sizeGuideOpen && DOM.sizeGuidePopover && !DOM.sizeGuidePopover.contains(e.target) && e.target !== DOM.sizeGuideToggleBtn) {
      closeSizeGuide();
    }
  });

  // Primary CTA: "Get the look >"
  DOM.ctaBtn.addEventListener("click", () => {
    const currProduct = PRODUCTS[AppState.currentIndex];
    addToCart(currProduct, AppState.selectedSize);
  });

  // Cart Drawer Toggles
  DOM.cartToggleBtn.addEventListener("click", openCartDrawer);
  DOM.cartCloseBtn.addEventListener("click", closeCartDrawer);
  DOM.cartBackdrop.addEventListener("click", closeCartDrawer);

  // Wishlist Button & Drawer
  DOM.wishlistToggleBtn.addEventListener("click", () => {
    toggleWishlistCurrentProduct();
  });
  DOM.wishlistCloseBtn.addEventListener("click", closeWishlistDrawer);
  DOM.wishlistBackdrop.addEventListener("click", closeWishlistDrawer);

  // Catalog Cards Click: Transitions back to Hero Showcase
  DOM.catalogCards.forEach((card) => {
    card.addEventListener("click", () => {
      const index = parseInt(card.dataset.productIndex, 10);
      switchProduct(index);
      setActiveView("puffer");
    });
  });

  // Return to showcase buttons
  if (DOM.aboutReturnBtn) {
    DOM.aboutReturnBtn.addEventListener("click", () => setActiveView("puffer"));
  }
  if (DOM.contactReturnBtn) {
    DOM.contactReturnBtn.addEventListener("click", () => setActiveView("puffer"));
  }

  // Checkout Button
  DOM.checkoutStandard.addEventListener("click", () => {
    if (AppState.cart.length === 0) {
      showToast("Please add an item to your bag first.");
      return;
    }
    showToast("Proceeding to secure checkout...");
    setTimeout(() => {
      showToast("Order Confirmed! Receipt sent to your email.");
      AppState.cart = [];
      updateCartUI();
      closeCartDrawer();
    }, 1500);
  });

  // Keyboard Arrow Navigation & Hotkeys
  window.addEventListener("keydown", (e) => {
    const isDrawerOpen = DOM.cartDrawer.classList.contains("open") || DOM.wishlistDrawer.classList.contains("open");
    
    if (e.key === "Escape") {
      closeCartDrawer();
      closeWishlistDrawer();
      closeSizeGuide();
      return;
    }

    // Arrow keys navigate products when drawers are closed
    if (!isDrawerOpen && !AppState.sizeGuideOpen) {
      if (e.key === "ArrowLeft") {
        switchProduct(AppState.currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        switchProduct(AppState.currentIndex + 1);
      }
    }

    // Shift + F: Optional Developer Presentation Frame Toggle
    if (e.shiftKey && e.key.toLowerCase() === "f") {
      if (AppState.frameMode === "bleed") {
        AppState.frameMode = "frame";
        DOM.shell.classList.remove("mode-bleed");
        DOM.shell.classList.add("mode-frame");
        showToast("Presentation Frame Enabled");
      } else {
        AppState.frameMode = "bleed";
        DOM.shell.classList.remove("mode-frame");
        DOM.shell.classList.add("mode-bleed");
        showToast("Full-Bleed Viewport Enabled");
      }
    }
  });

  // Touch Swipe on Showcase
  DOM.showcaseCard.addEventListener("touchstart", (e) => {
    AppState.touchStartX = e.changedTouches[0].screenX;
    AppState.touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  DOM.showcaseCard.addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].screenX - AppState.touchStartX;
    const deltaY = e.changedTouches[0].screenY - AppState.touchStartY;
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        switchProduct(AppState.currentIndex + 1);
      } else {
        switchProduct(AppState.currentIndex - 1);
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   11. INITIALIZATION
   ========================================================================== */
function initShowcase() {
  // Preload images
  PRODUCTS.forEach(p => {
    const preload = new Image();
    preload.src = p.imageUrl;
  });

  // Initial State: Frost product
  const initialProduct = PRODUCTS[0];
  const nextProduct = PRODUCTS[1];

  DOM.mainProductImg.src = initialProduct.imageUrl;
  DOM.teaserThumbImg.src = nextProduct.imageUrl;
  if (DOM.teaserPillText) {
    DOM.teaserPillText.textContent = `Next: ${nextProduct.name}`;
  }

  updateCartUI();
  updateWishlistUI();
  initParallaxEngine();
  bindEventListeners();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initShowcase);
} else {
  initShowcase();
}
