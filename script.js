/* =========================================================
   KENWORTH DAF BACE - INTERACCIONES
   Edita aquí modelos, imágenes, WhatsApp e integraciones.
   ========================================================= */

const models = {
  kenworth: [
    { name: "T480", tag: "Versatilidad urbana y regional", img: "./assets/images/U Kenworth/kw-480.jpg" },
    { name: "T680", tag: "Eficiencia para largas distancias", img: "./assets/images/U Kenworth/kw-680.jpg" },
    { name: "T880", tag: "Fuerza para trabajo vocacional", img: "./assets/images/U Kenworth/kw-880.jpg" },
    { name: "W990", tag: "Potencia y distinción", img: "./assets/images/U Kenworth/kw-990.jpg" }
  ],
  daf: [
    { name: "XB", tag: "Agilidad para distribución", img: "https://www.dafcaminhoes.com.br/-/media/images/press-releases/paccar/2021/photo-1--daf-xg-press-release-photo.jpg?rev=7fef2fcf551546148927be45b4750b5e" },
    { name: "XF", tag: "Rendimiento para carretera", img: "./assets/images/U DAF/daf-xf.jpg" },
    { name: "XG", tag: "Una nueva dimensión en confort", img: "./assets/images/U DAF/daf-xg.jpg" },
  ]
};

const modelGrid = document.querySelector("#modelGrid");
function renderModels(brand = "kenworth") {
  modelGrid.classList.toggle("daf-grid", brand === "daf");
  modelGrid.innerHTML = models[brand].map((m, i) => `
    <article class="model-card">
      <img src="${m.img}" alt="Imagen representativa ${m.name}">
      <div class="model-overlay"><small>0${i + 1} / ${brand.toUpperCase()}</small><h3>${m.name}</h3><p>${m.tag}</p><button class="js-quote">Explorar modelo <span>↗</span></button></div>
    </article>`).join("");
  document.querySelectorAll(".model-grid .js-quote").forEach(b => b.addEventListener("click", goQuote));
}

document.querySelectorAll(".tabs button").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active", "daf"));
  button.classList.add("active");
  if (button.dataset.brand === "daf") button.classList.add("daf");
  renderModels(button.dataset.brand);
}));

const menuBtn = document.querySelector("#menuBtn");
const navLinks = document.querySelector("#navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");

    menuBtn.textContent = open ? "Cerrar" : "Menú";
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute(
      "aria-label",
      open
        ? "Cerrar menú de navegación"
        : "Abrir menú de navegación"
    );
  });
}

function goQuote() { document.querySelector("#cotizar").scrollIntoView({ behavior: "smooth" }); }
document.querySelectorAll(".js-quote").forEach(button => button.addEventListener("click", goQuote));

let currentStep = 1;
const steps = [...document.querySelectorAll(".form-step")];
const progress = [...document.querySelectorAll(".progress span")];
function showStep(step) {
  currentStep = step;
  steps.forEach(s => s.classList.toggle("active", Number(s.dataset.step) === step));
  progress.forEach((p, i) => p.classList.toggle("done", i < step));
}
document.querySelectorAll(".next").forEach(b => b.addEventListener("click", () => showStep(Math.min(3, currentStep + 1))));
document.querySelectorAll(".back").forEach(b => b.addEventListener("click", () => showStep(Math.max(1, currentStep - 1))));

const form = document.querySelector("#quoteForm");
const success = document.querySelector("#success");
form.addEventListener("submit", event => {
  event.preventDefault();
  /* PERSONALIZAR: aquí conectaremos fetch() con n8n, Power Automate o Salesforce. */
  form.style.display = "none";
  document.querySelector(".progress").style.display = "none";
  success.classList.add("active");
});
document.querySelector("#restart").addEventListener("click", () => {
  form.reset(); form.style.display = "block"; success.classList.remove("active");
  document.querySelector(".progress").style.display = "flex"; showStep(1);
});

/* PERSONALIZAR: cambia 5210000000000 por el número real con clave de México, sin + ni espacios. */
document.querySelector("#whatsapp").href = "https://wa.me/5210000000000?text=Hola%2C%20quiero%20informaci%C3%B3n%20de%20KENWORTH%20DAF%20BACE";
renderModels();

/* =========================================================
   CARRUSEL DE SUCURSALES
   ========================================================= */

const branchCarousel = document.querySelector("#branchCarousel");
const branchPrevious = document.querySelector("#branchPrevious");
const branchNext = document.querySelector("#branchNext");
const branchPagination = document.querySelector("#branchPagination");
const branchEmptyMessage = document.querySelector("#branchEmptyMessage");

if (
  branchCarousel &&
  branchPrevious &&
  branchNext &&
  branchPagination
) {
  function getBranchCards() {
    return [
      ...branchCarousel.querySelectorAll(
        ".branch-card:not(.branch-hidden)"
      )
    ];
  }

  function getScrollAmount() {
    const firstCard = getBranchCards()[0];

    if (!firstCard) {
      return branchCarousel.clientWidth;
    }

    const carouselStyles = window.getComputedStyle(branchCarousel);
    const gap = parseFloat(carouselStyles.columnGap) || 22;

    return firstCard.getBoundingClientRect().width + gap;
  }

  function createBranchPagination() {
    const cards = getBranchCards();

    branchPagination.innerHTML = "";

    cards.forEach((card, index) => {
      const indicator = document.createElement("span");

      if (index === 0) {
        indicator.classList.add("active");
      }

      indicator.addEventListener("click", () => {
        branchCarousel.scrollTo({
          left: index * getScrollAmount(),
          behavior: "smooth"
        });
      });

      branchPagination.appendChild(indicator);
    });

    updateBranchPagination();
  }

  function updateBranchPagination() {
    const indicators =
      branchPagination.querySelectorAll("span");

    const currentIndex = Math.round(
      branchCarousel.scrollLeft / getScrollAmount()
    );

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle(
        "active",
        index === currentIndex
      );
    });
  }

  branchNext.addEventListener("click", () => {
    branchCarousel.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

  branchPrevious.addEventListener("click", () => {
    branchCarousel.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });

  branchCarousel.addEventListener(
    "scroll",
    updateBranchPagination,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateBranchPagination
  );

  createBranchPagination();
}

/* =========================================================
   FILTROS DE SUCURSALES
   ========================================================= */

const branchState = document.querySelector("#branchState");
const branchService = document.querySelector("#branchService");

if (
  branchState &&
  branchService &&
  branchCarousel
) {
  function filterBranches() {
    const selectedState = branchState.value.trim().toLowerCase();
    const selectedService = branchService.value.trim().toLowerCase();

    const cards = [
      ...branchCarousel.querySelectorAll(".branch-card")
    ];

    let visibleBranches = 0;

    cards.forEach(card => {
      const cardState =
        (card.dataset.state || "").trim().toLowerCase();

      const cardServices =
        (card.dataset.services || "").trim().toLowerCase();

const matchesState =
  !selectedState ||
  selectedState === "all" ||
  cardState === selectedState;

const matchesService =
  !selectedService ||
  selectedService === "all" ||
  cardServices
    .split(/\s+/)
    .includes(selectedService);

      const visible = matchesState && matchesService;

      card.classList.toggle("branch-hidden", !visible);

      if (visible) {
        visibleBranches += 1;
      }
    });

    branchCarousel.scrollTo({
      left: 0,
      behavior: "smooth"
    });

    if (typeof createBranchPagination === "function") {
      createBranchPagination();
    }

    if (visibleBranches === 0) {
      console.info(
        "No se encontraron sucursales con los filtros seleccionados."
      );
    }
  }
  branchState.addEventListener("change", filterBranches);
  branchService.addEventListener("change", filterBranches);
}

/* =========================================================
   SELECTOR DE MARCA DEL INVENTARIO
   ========================================================= */

const stockBrandButtons = document.querySelectorAll(
  ".stock-brand[data-stock-brand]"
);

const stockMake = document.querySelector("#stockMake");

if (stockBrandButtons.length && stockMake) {
  stockBrandButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedBrand =
        button.dataset.stockBrand || "";

      stockBrandButtons.forEach(item => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      stockMake.value = selectedBrand;

      stockMake.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    });
  });
}

/* =========================================================
   MODELOS DISPONIBLES POR MARCA
   ========================================================= */

const stockModel = document.querySelector("#stockModel");

const stockModelsByBrand = {
  Kenworth: ["T480", "T680", "T880", "W990"],
  DAF: ["XB", "XF", "XG"]
};

function updateStockModels() {
  if (!stockMake || !stockModel) {
    return;
  }

  const selectedMake = stockMake.value;

  stockModel.innerHTML = `
    <option value="all">
      Todos los modelos
    </option>
  `;

  let availableModels = [];

  if (selectedMake === "all") {
    availableModels = [
      ...stockModelsByBrand.Kenworth,
      ...stockModelsByBrand.DAF
    ];
  } else {
    availableModels =
      stockModelsByBrand[selectedMake] || [];
  }

  availableModels.forEach(model => {
    const option = document.createElement("option");

    option.value = model;
    option.textContent = model;

    stockModel.appendChild(option);
  });
}

if (stockMake && stockModel) {
  stockMake.addEventListener(
    "change",
    updateStockModels
  );

  updateStockModels();
}

/* =========================================================
   RANGOS DEL BUSCADOR DE INVENTARIO
   ========================================================= */

const stockPrice = document.querySelector("#stockPrice");
const stockPriceOutput =
  document.querySelector("#stockPriceOutput");

const stockYear = document.querySelector("#stockYear");
const stockYearOutput =
  document.querySelector("#stockYearOutput");

function formatStockPrice(value) {
  const amount = Number(value);

  if (amount >= 1000000) {
    const millions = amount / 1000000;

    return `$${millions.toLocaleString("es-MX", {
      maximumFractionDigits: 1
    })} M`;
  }

  return amount.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  });
}

function updateStockRanges() {
  if (stockPrice && stockPriceOutput) {
    stockPriceOutput.textContent =
      formatStockPrice(stockPrice.value);
  }

  if (stockYear && stockYearOutput) {
    stockYearOutput.textContent =
      stockYear.value;
  }
}

if (stockPrice) {
  stockPrice.addEventListener(
    "input",
    updateStockRanges
  );
}

if (stockYear) {
  stockYear.addEventListener(
    "input",
    updateStockRanges
  );
}

updateStockRanges();

/* =========================================================
   ACCESOS RÁPIDOS DEL INVENTARIO
   ========================================================= */

const stockCondition =
  document.querySelector("#stockCondition");

const stockConditionButtons =
  document.querySelectorAll(
    ".stock-shortcut[data-stock-condition]"
  );

const stockFinanceButton =
  document.querySelector("#stockFinanceButton");

if (stockCondition && stockConditionButtons.length) {
  stockConditionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedCondition =
        button.dataset.stockCondition;

      stockCondition.value = selectedCondition;

      stockConditionButtons.forEach(item => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      stockCondition.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    });
  });
}

if (stockFinanceButton) {
  stockFinanceButton.addEventListener("click", () => {
    const quoteSection =
      document.querySelector("#cotizar");

    if (quoteSection) {
      quoteSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
}

/* =========================================================
   KENWORTH FANS · TIENDA LATERAL
   Grupo BACE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =======================================================
     1. CONFIGURACIÓN
     Cambia el número por el WhatsApp que recibirá pedidos.
     Utiliza código de país + lada + número, sin espacios.
     ======================================================= */

  const CONFIG = {
    whatsappNumber: "524777199500",
    currency: "MXN",
    locale: "es-MX",
    defaultCategory: "todos"
  };

  /* =======================================================
     2. ELEMENTOS DEL HTML
     ======================================================= */

  const openButton = document.querySelector("#kwfansOpen");
  const store = document.querySelector("#kwfansStore");
  const closeButton = document.querySelector("#kwfansClose");
  const overlay = document.querySelector("#kwfansOverlay");

  const storeBody = store?.querySelector(".kwfans-store-body");
  const productsContainer = store?.querySelector(".kwfans-products");
  const categoriesContainer = store?.querySelector(
    ".kwfans-categories"
  );

  const cartCount = document.querySelector("#kwfansCartCount");
  const cartTotal = document.querySelector("#kwfansCartTotal");
  const checkoutButton = document.querySelector(
    "#kwfansCheckout"
  );

  /*
   * Detiene la ejecución si no encuentra los elementos
   * principales del componente.
   */
  if (!openButton || !store || !closeButton || !overlay) {
    console.warn(
      "KENWORTH FANS: faltan elementos principales de la tienda."
    );

    return;
  }

  /* =======================================================
     3. ESTADO
     ======================================================= */

  const cart = new Map();

  let activeCategory = CONFIG.defaultCategory;
  let lastFocusedElement = null;

  /* =======================================================
     4. FUNCIONES AUXILIARES
     ======================================================= */

  function formatPrice(value) {
    const numericValue = Number(value) || 0;

    return new Intl.NumberFormat(CONFIG.locale, {
      style: "currency",
      currency: CONFIG.currency,
      maximumFractionDigits: 0
    }).format(numericValue);
  }

  function isStoreOpen() {
    return store.classList.contains("open");
  }

  function getFocusableElements() {
    const selector = [
      "button:not([disabled])",
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ].join(",");

    return [...store.querySelectorAll(selector)].filter(
      (element) => element.offsetParent !== null
    );
  }

  /* =======================================================
     5. ABRIR LA TIENDA
     ======================================================= */

  function openStore() {
    if (isStoreOpen()) return;

    lastFocusedElement = document.activeElement;

    store.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("kwfans-is-open");

    store.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
    openButton.setAttribute("aria-expanded", "true");

    /*
     * Evita que la página principal se desplace mientras
     * la tienda está abierta.
     */
    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      closeButton.focus();
    }, 180);
  }

  /* =======================================================
     6. CERRAR LA TIENDA
     ======================================================= */

  function closeStore() {
    if (!isStoreOpen()) return;

    store.classList.remove("open");
    overlay.classList.remove("open");
    document.body.classList.remove("kwfans-is-open");

    store.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    } else {
      openButton.focus();
    }
  }

  /* =======================================================
     7. EVENTOS DE APERTURA Y CIERRE
     ======================================================= */

  openButton.addEventListener("click", openStore);
  closeButton.addEventListener("click", closeStore);
  overlay.addEventListener("click", closeStore);

  /* =======================================================
     8. NAVEGACIÓN MEDIANTE TECLADO
     Escape cierra la tienda.
     Tab permanece dentro del panel.
     ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (!isStoreOpen()) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeStore();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = getFocusableElements();

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement =
      focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  /* =======================================================
     9. FILTRAR PRODUCTOS
     ======================================================= */

  function filterProducts(category) {
    activeCategory = category || CONFIG.defaultCategory;

    const productCards = store.querySelectorAll(
      "[data-kwfans-product]"
    );

    productCards.forEach((card) => {
      const productCategory = card.dataset.kwfansProduct;

      const shouldShow =
        activeCategory === "todos" ||
        productCategory === activeCategory;

      card.hidden = !shouldShow;
      card.classList.toggle("is-hidden", !shouldShow);
      card.setAttribute("aria-hidden", String(!shouldShow));
    });

    const categoryButtons = store.querySelectorAll(
      "[data-kwfans-category]"
    );

    categoryButtons.forEach((button) => {
      const isActive =
        button.dataset.kwfansCategory === activeCategory;

      button.classList.toggle("active", isActive);
      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });
  }

  categoriesContainer?.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-kwfans-category]"
      );

      if (!button) return;

      const category =
        button.dataset.kwfansCategory ||
        CONFIG.defaultCategory;

      filterProducts(category);
    }
  );

  /* =======================================================
     10. OBTENER INFORMACIÓN DEL PRODUCTO
     ======================================================= */

  function createProductId(name) {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getProductFromButton(button) {
    const productName = button.dataset.name?.trim();
    const productPrice = Number(button.dataset.price);

    if (
      !productName ||
      !Number.isFinite(productPrice) ||
      productPrice < 0
    ) {
      console.warn(
        "KENWORTH FANS: el producto no tiene nombre o precio válido.",
        button
      );

      return null;
    }

    return {
      id:
        button.dataset.id ||
        createProductId(productName),

      name: productName,
      price: productPrice,
      quantity: 1
    };
  }

  /* =======================================================
     11. CALCULAR CARRITO
     ======================================================= */

  function getCartSummary() {
    return [...cart.values()].reduce(
      (summary, product) => {
        summary.quantity += product.quantity;

        summary.total +=
          product.price * product.quantity;

        return summary;
      },
      {
        quantity: 0,
        total: 0
      }
    );
  }

  /* =======================================================
     12. ACTUALIZAR CARRITO EN PANTALLA
     ======================================================= */

  function updateCart() {
    const summary = getCartSummary();

    if (cartCount) {
      cartCount.textContent = String(
        summary.quantity
      );
    }

    if (cartTotal) {
      cartTotal.textContent = formatPrice(
        summary.total
      );
    }

    if (checkoutButton) {
      const cartIsEmpty = summary.quantity === 0;

      checkoutButton.disabled = cartIsEmpty;

      checkoutButton.setAttribute(
        "aria-disabled",
        String(cartIsEmpty)
      );
    }
  }

  /* =======================================================
     13. CONFIRMACIÓN VISUAL
     ======================================================= */

  function showAddedState(button) {
    if (button.dataset.feedbackActive === "true") {
      return;
    }

    const originalContent = button.innerHTML;
    const originalLabel = button.getAttribute("aria-label");

    button.dataset.feedbackActive = "true";
    button.classList.add("added");
    button.innerHTML = "✓";

    button.setAttribute(
      "aria-label",
      "Producto agregado"
    );

    window.setTimeout(() => {
      button.classList.remove("added");
      button.innerHTML = originalContent;
      button.dataset.feedbackActive = "false";

      if (originalLabel) {
        button.setAttribute(
          "aria-label",
          originalLabel
        );
      }
    }, 1000);
  }

  /* =======================================================
     14. AGREGAR PRODUCTO
     ======================================================= */

  function addProduct(button) {
    const product = getProductFromButton(button);

    if (!product) return;

    const existingProduct = cart.get(product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.set(product.id, product);
    }

    updateCart();
    showAddedState(button);
  }

  /*
   * La delegación de eventos permite que también funcionen
   * productos agregados posteriormente al HTML.
   */
  productsContainer?.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-kwfans-add]"
      );

      if (!button) return;

      addProduct(button);
    }
  );

  /* =======================================================
     15. GENERAR MENSAJE DE WHATSAPP
     ======================================================= */

  function buildWhatsAppMessage() {
    const products = [...cart.values()];
    const summary = getCartSummary();

    const productLines = products.map(
      (product) => {
        const subtotal =
          product.price * product.quantity;

        return (
          `• ${product.quantity} × ` +
          `${product.name} — ` +
          `${formatPrice(subtotal)}`
        );
      }
    );

    return [
      "Hola, quiero solicitar información sobre productos de KENWORTH FANS.",
      "",
      "*Productos seleccionados:*",
      ...productLines,
      "",
      `*Total estimado:* ${formatPrice(summary.total)}`,
      "",
      "¿Me pueden ayudar a confirmar disponibilidad, tallas, forma de pago y entrega?"
    ].join("\n");
  }

  /* =======================================================
     16. SOLICITAR PEDIDO
     ======================================================= */

  function checkout() {
    const summary = getCartSummary();

    if (summary.quantity === 0) {
      window.alert(
        "Agrega al menos un producto antes de solicitar el pedido."
      );

      return;
    }

    const message = buildWhatsAppMessage();

    const whatsappURL =
      `https://wa.me/${CONFIG.whatsappNumber}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );
  }

  checkoutButton?.addEventListener(
    "click",
    checkout
  );

  /* =======================================================
     17. IMÁGENES QUE NO CARGAN
     Evita mostrar el icono roto del navegador.
     ======================================================= */

  const productImages = store.querySelectorAll(
    ".kwfans-product-media img"
  );

  productImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;

      image.parentElement?.classList.add(
        "image-unavailable"
      );
    });
  });

  /* =======================================================
     18. ESTADO INICIAL
     ======================================================= */

  store.setAttribute("aria-hidden", "true");
  overlay.setAttribute("aria-hidden", "true");
  openButton.setAttribute(
    "aria-expanded",
    "false"
  );

  filterProducts(CONFIG.defaultCategory);
  updateCart();
});