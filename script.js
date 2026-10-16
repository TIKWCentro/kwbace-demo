/* DOCUMENTACIÓN DEL MÓDULO
   Inicio: fotografías, modelos, cotización por pasos, sucursales y tienda local.
   Se ejecuta con el DOM disponible. Los catálogos son datos locales editables.
   Los formularios sólo preparan información; no existe API de recepción.
   No renombrar recursos: GitHub Pages distingue mayúsculas y minúsculas.
*/
/* =========================================================
   HERO PRINCIPAL · FOTOGRAFÍAS
   Edita las rutas y el tiempo aquí.
   ========================================================= */
(() => {
  /** Carga las fotografías del hero, omite las que fallen y pausa cambios en segundo plano o con movimiento reducido. */
  function initializeHeroCarousel() {
    const background = document.querySelector("#inicio .hero-bg");

    if (!background || background.dataset.carouselInitialized) return;
    background.dataset.carouselInitialized = "true";

    const photos = [
      // Fotografía actual
      "assets/images/hero/H-KW1.jpeg",
      // Cambia estas rutas por tus fotografías
      "assets/images/hero/H-DAF1.jpeg",
      "assets/images/hero/H-KW2.png",
      "assets/images/hero/H-DAF2.jpeg",
      "assets/images/hero/H-KW3.jpeg",
      "assets/images/hero/H-DAF3.jpeg",
      "assets/images/hero/H-KW4.jpeg",
    ];

    const changeEvery = 5000; // 5 segundos
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let current = -1;
    const slides = [];

    /** Activa una diapositiva y sincroniza su contador y estado visual. */
    function showSlide(index) {
      if (current >= 0) {
        slides[current].classList.remove("is-active");
      }

      slides[index].classList.add("is-active");
      background.classList.add("carousel-ready");
      current = index;

      // Actualiza el número 01 que ya tienes en el hero
      const counter = document.querySelector("#inicio .hero-index b");

      if (counter) {
        counter.textContent = String(index + 1).padStart(2, "0");
      }
    }

    photos.forEach((path) => {
      const image = new Image();
      const index = slides.length;

      image.className = "hero-slide";
      image.alt = "";
      image.setAttribute("aria-hidden", "true");

      image.addEventListener("load", () => {
        if (current === -1) showSlide(index);
      });

      slides.push(image);
      background.appendChild(image);
      image.src = path;
    });

    setInterval(() => {
      if (document.hidden || reducedMotion.matches || current < 0) return;

      // Omite fotografías que todavía no cargan o cuya ruta falla
      for (let step = 1; step < slides.length; step++) {
        const next = (current + step) % slides.length;
        const image = slides[next];

        if (image.complete && image.naturalWidth > 0) {
          showSlide(next);
          break;
        }
      }
    }, changeEvery);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeHeroCarousel, {
      once: true,
    });
  } else {
    initializeHeroCarousel();
  }
})();

/* =========================================================
   KENWORTH DAF BACE - INTERACCIONES
   Edita aquí modelos, imágenes, WhatsApp e integraciones.
   ========================================================= */

const models = {
  kenworth: [
    {
      name: "T680",
      tag: "Eficiencia para largas distancias",
      img: "./assets/images/U Kenworth/kw-680.jpg",
    },
    {
      name: "T480",
      tag: "Versatilidad urbana y regional",
      img: "./assets/images/U Kenworth/kw-480.jpg",
    },
    {
      name: "T880",
      tag: "Fuerza para trabajo vocacional",
      img: "./assets/images/U Kenworth/kw-880.jpg",
    },
    {
      name: "W990",
      tag: "Potencia y distinción",
      img: "./assets/images/U Kenworth/kw-990.jpg",
    },
  ],
  daf: [
    {
      name: "XB",
      tag: "Agilidad para distribución",
      img: "./assets/images/U DAF/daf-xb.jpg",
    },
    {
      name: "XF",
      tag: "Rendimiento para carretera",
      img: "./assets/images/U DAF/daf-xf.jpg",
    },
    {
      name: "XG",
      tag: "Una nueva dimensión en confort",
      img: "./assets/images/U DAF/daf-xg_2.png",
    },
  ],
};

const modelGrid = document.querySelector("#modelGrid");
/** Genera las tarjetas de la marca seleccionada desde el catálogo local; sus acciones usan delegación de eventos. */
function renderModels(brand = "kenworth") {
  if (!modelGrid || !models[brand]) return;
  modelGrid.classList.toggle("daf-grid", brand === "daf");
  modelGrid.innerHTML = models[brand]
    .map(
      (m, i) => `
    <article class="model-card">
      <img src="${m.img}" alt="Imagen representativa ${m.name}">
      <div class="model-overlay"><small>0${i + 1} / ${brand.toUpperCase()}</small><h3>${m.name}</h3><p>${m.tag}</p><button class="js-quote">Explorar modelo <span>↗</span></button></div>
    </article>`,
    )
    .join("");
}

document.querySelectorAll(".tabs button").forEach((button) =>
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".tabs button")
      .forEach((b) => b.classList.remove("active", "daf"));
    button.classList.add("active");
    if (button.dataset.brand === "daf") button.classList.add("daf");
    renderModels(button.dataset.brand);
  }),
);

/** Desplaza al formulario respetando la preferencia de movimiento del navegador. */
function goQuote() {
  document.querySelector("#cotizar")?.scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}
document.addEventListener("click", (event) => {
  if (event.target.closest(".js-quote")) goQuote();
});

(() => {
  "use strict";

  const form = document.querySelector("#quoteForm");
  const success = document.querySelector("#success");
  const restart = document.querySelector("#restart");
  const quoteCard = document.querySelector(".quote-card");

  if (!form || !success || !quoteCard) return;

  const steps = [...form.querySelectorAll(".form-step")];
  const progressSteps = [...document.querySelectorAll("[data-progress-step]")];
  let currentStep = 1;

  /** Obtiene únicamente los campos del paso actual; los pasos ocultos no bloquean la validación. */
  function fieldsForStep(stepNumber) {
    return [
      ...steps[stepNumber - 1].querySelectorAll("input, select, textarea"),
    ];
  }

  /** Valida el paso solicitado y enfoca el primer campo que necesita corrección. */
  function validateStep(stepNumber) {
    const fields = fieldsForStep(stepNumber);

    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }

    return true;
  }

  /** Sincroniza visibilidad, progreso y foco del asistente de cotización. */
  function showStep(stepNumber, moveFocus = true) {
    currentStep = Math.min(Math.max(stepNumber, 1), steps.length);

    steps.forEach((step, index) => {
      const active = index + 1 === currentStep;
      step.hidden = !active;
      step.classList.toggle("active", active);
    });

    progressSteps.forEach((indicator, index) => {
      const completed = index + 1 <= currentStep;
      const active = index + 1 === currentStep;

      indicator.classList.toggle("done", completed);

      if (active) {
        indicator.setAttribute("aria-current", "step");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });

    if (moveFocus) {
      steps[currentStep - 1]
        .querySelector("h3")
        ?.setAttribute("tabindex", "-1");
      steps[currentStep - 1].querySelector("h3")?.focus();
    }
  }

  form.addEventListener("click", (event) => {
    const nextButton = event.target.closest(".next");
    const backButton = event.target.closest(".back");

    if (nextButton) {
      if (validateStep(currentStep)) showStep(currentStep + 1);
      return;
    }

    if (backButton) showStep(currentStep - 1);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateStep(currentStep)) return;

    form.hidden = true;
    quoteCard.querySelector(".progress").hidden = true;
    success.hidden = false;
    success.querySelector("h3")?.setAttribute("tabindex", "-1");
    success.querySelector("h3")?.focus();
  });

  restart?.addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    quoteCard.querySelector(".progress").hidden = false;
    success.hidden = true;
    showStep(1);
  });

  showStep(1, false);
})();

/* PERSONALIZAR: cambia 5210000000000 por el número real con clave de México, sin + ni espacios. */
document.querySelector("#whatsapp").href =
  "https://wa.me/5210000000000?text=Hola%2C%20quiero%20informaci%C3%B3n%20de%20KENWORTH%20DAF%20BACE";
renderModels();

/* =========================================================
   CARRUSEL DE SUCURSALES
   ========================================================= */
const branchCarousel = document.querySelector("#branchCarousel");
const branchPrevious = document.querySelector("#branchPrevious");
const branchNext = document.querySelector("#branchNext");
const branchPagination = document.querySelector("#branchPagination");
const branchEmptyMessage = document.querySelector("#branchEmptyMessage");

if (branchCarousel && branchPrevious && branchNext && branchPagination) {
  /** Devuelve las sucursales visibles después de aplicar los filtros. */
  function getBranchCards() {
    return [
      ...branchCarousel.querySelectorAll(".branch-card:not(.branch-hidden)"),
    ];
  }

  /** Calcula el avance del carrusel a partir del ancho real de una tarjeta. */
  function getScrollAmount() {
    const firstCard = getBranchCards()[0];

    if (!firstCard) {
      return branchCarousel.clientWidth;
    }

    const carouselStyles = window.getComputedStyle(branchCarousel);
    const gap = parseFloat(carouselStyles.columnGap) || 22;

    return firstCard.getBoundingClientRect().width + gap;
  }

  /** Reconstruye los indicadores según las sucursales disponibles. */
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
          behavior: "smooth",
        });
      });

      branchPagination.appendChild(indicator);
    });

    updateBranchPagination();
  }

  /** Sincroniza los indicadores con la posición de desplazamiento del carrusel. */
  function updateBranchPagination() {
    const indicators = branchPagination.querySelectorAll("span");

    const currentIndex = Math.round(
      branchCarousel.scrollLeft / getScrollAmount(),
    );

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  branchNext.addEventListener("click", () => {
    branchCarousel.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });

  branchPrevious.addEventListener("click", () => {
    branchCarousel.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });

  branchCarousel.addEventListener("scroll", updateBranchPagination, {
    passive: true,
  });

  window.addEventListener("resize", updateBranchPagination);

  createBranchPagination();
}

/* =========================================================
   FILTROS DE SUCURSALES
   ========================================================= */

const branchState = document.querySelector("#branchState");
const branchService = document.querySelector("#branchService");

if (branchState && branchService && branchCarousel) {
  /** Combina filtros por estado y servicio y actualiza el estado sin resultados. */
  function filterBranches() {
    const selectedState = branchState.value.trim().toLowerCase();
    const selectedService = branchService.value.trim().toLowerCase();

    const cards = [...branchCarousel.querySelectorAll(".branch-card")];

    let visibleBranches = 0;

    cards.forEach((card) => {
      const cardState = (card.dataset.state || "").trim().toLowerCase();

      const cardServices = (card.dataset.services || "").trim().toLowerCase();

      const matchesState =
        !selectedState ||
        selectedState === "all" ||
        cardState === selectedState;

      const matchesService =
        !selectedService ||
        selectedService === "all" ||
        cardServices.split(/\s+/).includes(selectedService);

      const visible = matchesState && matchesService;

      card.classList.toggle("branch-hidden", !visible);

      if (visible) {
        visibleBranches += 1;
      }
    });

    branchCarousel.scrollTo({
      left: 0,
      behavior: "smooth",
    });

    if (typeof createBranchPagination === "function") {
      createBranchPagination();
    }

    if (visibleBranches === 0) {
      console.info(
        "No se encontraron sucursales con los filtros seleccionados.",
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
  ".stock-brand[data-stock-brand]",
);

const stockMake = document.querySelector("#stockMake");

if (stockBrandButtons.length && stockMake) {
  stockBrandButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedBrand = button.dataset.stockBrand || "";

      stockBrandButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      stockMake.value = selectedBrand;

      stockMake.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}

/* =========================================================
   MODELOS DISPONIBLES POR MARCA
   ========================================================= */

const stockModel = document.querySelector("#stockModel");

const stockModelsByBrand = {
  Kenworth: ["T480", "T680", "T880", "W990"],
  DAF: ["XB", "XF", "XG"],
};

/** Reconstruye la lista de modelos al cambiar la marca del buscador. */
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
      ...stockModelsByBrand.DAF,
    ];
  } else {
    availableModels = stockModelsByBrand[selectedMake] || [];
  }

  availableModels.forEach((model) => {
    const option = document.createElement("option");

    option.value = model;
    option.textContent = model;

    stockModel.appendChild(option);
  });
}

if (stockMake && stockModel) {
  stockMake.addEventListener("change", updateStockModels);

  updateStockModels();
}

/* =========================================================
   RANGOS DEL BUSCADOR DE INVENTARIO
   ========================================================= */

const stockPrice = document.querySelector("#stockPrice");
const stockPriceOutput = document.querySelector("#stockPriceOutput");

const stockYear = document.querySelector("#stockYear");
const stockYearOutput = document.querySelector("#stockYearOutput");

/** Presenta el presupuesto con formato monetario de México. */
function formatStockPrice(value) {
  const amount = Number(value);

  if (amount >= 1000000) {
    const millions = amount / 1000000;

    return `$${millions.toLocaleString("es-MX", {
      maximumFractionDigits: 1,
    })} M`;
  }

  return amount.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

/** Actualiza las etiquetas de precio y año de los controles de rango. */
function updateStockRanges() {
  if (stockPrice && stockPriceOutput) {
    stockPriceOutput.textContent = formatStockPrice(stockPrice.value);
  }

  if (stockYear && stockYearOutput) {
    stockYearOutput.textContent = stockYear.value;
  }
}

if (stockPrice) {
  stockPrice.addEventListener("input", updateStockRanges);
}

if (stockYear) {
  stockYear.addEventListener("input", updateStockRanges);
}

updateStockRanges();

/* =========================================================
   ACCESOS RÁPIDOS DEL INVENTARIO
   ========================================================= */

const stockCondition = document.querySelector("#stockCondition");

const stockConditionButtons = document.querySelectorAll(
  ".stock-shortcut[data-stock-condition]",
);

const stockFinanceButton = document.querySelector("#stockFinanceButton");

if (stockCondition && stockConditionButtons.length) {
  stockConditionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCondition = button.dataset.stockCondition;

      stockCondition.value = selectedCondition;

      stockConditionButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      stockCondition.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}

if (stockFinanceButton) {
  stockFinanceButton.addEventListener("click", () => {
    const quoteSection = document.querySelector("#cotizar");

    if (quoteSection) {
      quoteSection.scrollIntoView({
        behavior: "smooth",
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
    defaultCategory: "todos",
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
  const categoriesContainer = store?.querySelector(".kwfans-categories");

  const cartCount = document.querySelector("#kwfansCartCount");
  const cartTotal = document.querySelector("#kwfansCartTotal");
  const checkoutButton = document.querySelector("#kwfansCheckout");

  /*
   * Detiene la ejecución si no encuentra los elementos
   * principales del componente.
   */
  if (!openButton || !store || !closeButton || !overlay) {
    console.warn("KENWORTH FANS: faltan elementos principales de la tienda.");

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

  /** Da formato monetario a los precios de la tienda de demostración. */
  function formatPrice(value) {
    const numericValue = Number(value) || 0;

    return new Intl.NumberFormat(CONFIG.locale, {
      style: "currency",
      currency: CONFIG.currency,
      maximumFractionDigits: 0,
    }).format(numericValue);
  }

  /** Consulta si el panel de mercancía está abierto. */
  function isStoreOpen() {
    return store.classList.contains("open");
  }

  /** Obtiene controles visibles para mantener el foco dentro del panel. */
  function getFocusableElements() {
    const selector = [
      "button:not([disabled])",
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    return [...store.querySelectorAll(selector)].filter(
      (element) => element.offsetParent !== null,
    );
  }

  /* =======================================================
     5. ABRIR LA TIENDA
     ======================================================= */

  /** Abre la tienda, bloquea el desplazamiento de fondo y mueve el foco al panel. */
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

  /** Cierra la tienda y devuelve el foco al control que la abrió. */
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
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  /* =======================================================
     9. FILTRAR PRODUCTOS
     ======================================================= */

  /** Muestra únicamente los productos de la categoría elegida. */
  function filterProducts(category) {
    activeCategory = category || CONFIG.defaultCategory;

    const productCards = store.querySelectorAll("[data-kwfans-product]");

    productCards.forEach((card) => {
      const productCategory = card.dataset.kwfansProduct;

      const shouldShow =
        activeCategory === "todos" || productCategory === activeCategory;

      card.hidden = !shouldShow;
      card.classList.toggle("is-hidden", !shouldShow);
      card.setAttribute("aria-hidden", String(!shouldShow));
    });

    const categoryButtons = store.querySelectorAll("[data-kwfans-category]");

    categoryButtons.forEach((button) => {
      const isActive = button.dataset.kwfansCategory === activeCategory;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  categoriesContainer?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-kwfans-category]");

    if (!button) return;

    const category = button.dataset.kwfansCategory || CONFIG.defaultCategory;

    filterProducts(category);
  });

  /* =======================================================
     10. OBTENER INFORMACIÓN DEL PRODUCTO
     ======================================================= */

  /** Normaliza el nombre del producto para identificarlo en el carrito local. */
  function createProductId(name) {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /** Extrae los datos de la tarjeta asociada al botón de compra. */
  function getProductFromButton(button) {
    const productName = button.dataset.name?.trim();
    const productPrice = Number(button.dataset.price);

    if (!productName || !Number.isFinite(productPrice) || productPrice < 0) {
      console.warn(
        "KENWORTH FANS: el producto no tiene nombre o precio válido.",
        button,
      );

      return null;
    }

    return {
      id: button.dataset.id || createProductId(productName),

      name: productName,
      price: productPrice,
      quantity: 1,
    };
  }

  /* =======================================================
     11. CALCULAR CARRITO
     ======================================================= */

  /** Calcula cantidades e importe a partir del carrito en memoria. */
  function getCartSummary() {
    return [...cart.values()].reduce(
      (summary, product) => {
        summary.quantity += product.quantity;

        summary.total += product.price * product.quantity;

        return summary;
      },
      {
        quantity: 0,
        total: 0,
      },
    );
  }

  /* =======================================================
     12. ACTUALIZAR CARRITO EN PANTALLA
     ======================================================= */

  /** Sincroniza el resumen, total y controles del carrito. */
  function updateCart() {
    const summary = getCartSummary();

    if (cartCount) {
      cartCount.textContent = String(summary.quantity);
    }

    if (cartTotal) {
      cartTotal.textContent = formatPrice(summary.total);
    }

    if (checkoutButton) {
      const cartIsEmpty = summary.quantity === 0;

      checkoutButton.disabled = cartIsEmpty;

      checkoutButton.setAttribute("aria-disabled", String(cartIsEmpty));
    }
  }

  /* =======================================================
     13. CONFIRMACIÓN VISUAL
     ======================================================= */

  /** Presenta una confirmación temporal al agregar un producto. */
  function showAddedState(button) {
    if (button.dataset.feedbackActive === "true") {
      return;
    }

    const originalContent = button.innerHTML;
    const originalLabel = button.getAttribute("aria-label");

    button.dataset.feedbackActive = "true";
    button.classList.add("added");
    button.innerHTML = "✓";

    button.setAttribute("aria-label", "Producto agregado");

    window.setTimeout(() => {
      button.classList.remove("added");
      button.innerHTML = originalContent;
      button.dataset.feedbackActive = "false";

      if (originalLabel) {
        button.setAttribute("aria-label", originalLabel);
      }
    }, 1000);
  }

  /* =======================================================
     14. AGREGAR PRODUCTO
     ======================================================= */

  /** Agrega o incrementa una partida del carrito de demostración. */
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
  productsContainer?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-kwfans-add]");

    if (!button) return;

    addProduct(button);
  });

  /* =======================================================
     15. GENERAR MENSAJE DE WHATSAPP
     ======================================================= */

  /** Construye el texto del pedido antes de abrir la integración externa existente. */
  function buildWhatsAppMessage() {
    const products = [...cart.values()];
    const summary = getCartSummary();

    const productLines = products.map((product) => {
      const subtotal = product.price * product.quantity;

      return (
        `• ${product.quantity} × ` +
        `${product.name} — ` +
        `${formatPrice(subtotal)}`
      );
    });

    return [
      "Hola, quiero solicitar información sobre productos de KENWORTH FANS.",
      "",
      "*Productos seleccionados:*",
      ...productLines,
      "",
      `*Total estimado:* ${formatPrice(summary.total)}`,
      "",
      "¿Me pueden ayudar a confirmar disponibilidad, tallas, forma de pago y entrega?",
    ].join("\n");
  }

  /* =======================================================
     16. SOLICITAR PEDIDO
     ======================================================= */

  /** Abre WhatsApp con el pedido preparado; la tienda no procesa pagos. */
  function checkout() {
    const summary = getCartSummary();

    if (summary.quantity === 0) {
      window.alert("Agrega al menos un producto antes de solicitar el pedido.");

      return;
    }

    const message = buildWhatsAppMessage();

    const whatsappURL =
      `https://wa.me/${CONFIG.whatsappNumber}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  }

  checkoutButton?.addEventListener("click", checkout);

  /* =======================================================
     17. IMÁGENES QUE NO CARGAN
     Evita mostrar el icono roto del navegador.
     ======================================================= */

  const productImages = store.querySelectorAll(".kwfans-product-media img");

  productImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;

      image.parentElement?.classList.add("image-unavailable");
    });
  });

  /* =======================================================
     18. ESTADO INICIAL
     ======================================================= */

  store.setAttribute("aria-hidden", "true");
  overlay.setAttribute("aria-hidden", "true");
  openButton.setAttribute("aria-expanded", "false");

  filterProducts(CONFIG.defaultCategory);
  updateCart();
});

/* =========================================================
   INDEX · VENTANAS DE SERVICIOS ESPECIALIZADOS
   ========================================================= */

(() => {
  /** Enlaza apertura, cierre y navegación por teclado de las fichas de servicio. */
  function initializeServiceDialogs() {
    const links = document.querySelectorAll(".bace-service-card__link");

    if (!links.length || document.getElementById("baceServiceDialog")) {
      return;
    }

    /* Estilos exclusivos de esta ventana */
    const styles = document.createElement("style");

    styles.textContent = `
      #baceServiceDialog {
        width: min(620px, calc(100vw - 32px));
        max-height: calc(100dvh - 32px);
        margin: auto;
        padding: 0;
        overflow: auto;
        border: 0;
        background: #fff;
        color: #141718;
        box-shadow: 0 25px 90px #0005;
      }

      #baceServiceDialog::backdrop {
        background: rgba(5, 9, 12, .75);
        backdrop-filter: blur(5px);
      }

      #baceServiceDialog .bace-service-dialog__header {
        position: static;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin: 0;
        padding: 20px 26px;
        border-bottom: 1px solid #e0e3e4;
        background: #fff;
        box-shadow: none;
      }

      #baceServiceDialog .bace-service-dialog__header small {
        color: #c4122f;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .12em;
      }

      #baceServiceDialog .bace-service-dialog__close {
        flex: 0 0 44px;
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        padding: 0;
        border: 1px solid #d4d8da;
        border-radius: 50%;
        background: #fff;
        color: #111;
        cursor: pointer;
      }

      #baceServiceDialog .bace-service-dialog__close span {
        font-family: Arial, sans-serif;
        font-size: 30px;
        line-height: 1;
      }

      #baceServiceDialog .bace-service-dialog__body {
        padding: 34px;
      }

      #baceServiceDialog .bace-service-dialog__logo img {
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 95px;
        margin-bottom: 30px;
        object-fit: contain;
      }

      #baceServiceDialog h2 {
        margin: 0 0 20px;
        color: #141718;
        font-size: clamp(26px, 4vw, 36px);
        line-height: 1.1;
        text-transform: uppercase;
      }

      #baceServiceDialog .bace-service-dialog__description {
        margin: 0;
        color: #596267;
        font-size: 15px;
        line-height: 1.75;
      }

      #baceServiceDialog .bace-service-dialog__contact {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-top: 32px;
        padding: 17px 20px;
        background: #c4122f;
        color: #fff;
        font-size: 13px;
        font-weight: 700;
        text-decoration: none;
      }

      #baceServiceDialog .bace-service-dialog__contact:hover {
        background: #a80d28;
      }

      #baceServiceDialog a:focus-visible,
      #baceServiceDialog button:focus-visible {
        outline: 3px solid #0076b9;
        outline-offset: 3px;
      }

      @media (max-width: 600px) {
        #baceServiceDialog .bace-service-dialog__body {
          padding: 26px 22px;
        }
      }
    `;

    document.head.appendChild(styles);

    /* Ventana compartida: muestra el servicio seleccionado */
    const dialog = document.createElement("dialog");

    dialog.id = "baceServiceDialog";
    dialog.setAttribute("aria-labelledby", "baceServiceDialogTitle");
    dialog.setAttribute("aria-describedby", "baceServiceDialogDescription");

    dialog.innerHTML = `
      <header class="bace-service-dialog__header">
        <small>KENWORTH DAF BACE · SERVICIOS</small>

        <button
          class="bace-service-dialog__close"
          type="button"
          aria-label="Cerrar información del servicio"
          autofocus
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </header>

      <div class="bace-service-dialog__body">
        <div class="bace-service-dialog__logo"></div>

        <h2 id="baceServiceDialogTitle"></h2>

        <p
          class="bace-service-dialog__description"
          id="baceServiceDialogDescription"
        ></p>

        <a
          class="bace-service-dialog__contact"
          href="#contacto"
        >
          Solicitar atención
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    `;

    document.body.appendChild(dialog);

    const title = dialog.querySelector("#baceServiceDialogTitle");
    const description = dialog.querySelector("#baceServiceDialogDescription");
    const logo = dialog.querySelector(".bace-service-dialog__logo");
    const closeButton = dialog.querySelector(".bace-service-dialog__close");

    let opener;
    let previousOverflow = "";

    links.forEach((link) => {
      link.setAttribute("aria-haspopup", "dialog");
      link.setAttribute("aria-controls", dialog.id);

      link.addEventListener("click", (event) => {
        event.preventDefault();

        if (dialog.open) return;

        const card = link.closest(".bace-service-card");
        if (!card) return;

        /* Lee la información propia de esta tarjeta */
        title.textContent = card.querySelector("h3")?.textContent.trim() || "";

        description.textContent =
          card
            .querySelector(".bace-service-card__detail")
            ?.textContent.trim() ||
          card
            .querySelector(".bace-service-card__content > p")
            ?.textContent.trim() ||
          "";

        logo.replaceChildren();

        const originalLogo = card.querySelector(".bace-service-card__logo img");

        if (originalLogo) {
          const copy = originalLogo.cloneNode(true);
          copy.removeAttribute("id");
          copy.alt = "";
          logo.appendChild(copy);
        }

        opener = link;
        previousOverflow = document.documentElement.style.overflow;

        dialog.showModal();
        dialog.scrollTop = 0;
        document.documentElement.style.overflow = "hidden";
        closeButton.focus();
      });
    });

    closeButton.addEventListener("click", () => {
      dialog.close();
    });

    /* Cierra al pulsar fuera de la ventana */
    let pressedOutside = false;

    /** Determina si el clic ocurrió fuera del área del diálogo. */
    function isOutside(event) {
      const bounds = dialog.getBoundingClientRect();

      return (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      );
    }

    dialog.addEventListener("pointerdown", (event) => {
      pressedOutside = event.target === dialog && isOutside(event);
    });

    dialog.addEventListener("click", (event) => {
      if (pressedOutside && event.target === dialog && isOutside(event)) {
        dialog.close();
      }

      pressedOutside = false;
    });

    /* Escape también cierra mediante el dialog nativo */
    dialog.addEventListener("close", () => {
      document.documentElement.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    });

    /* Lleva al footer con teléfonos y ubicaciones */
    dialog
      .querySelector(".bace-service-dialog__contact")
      .addEventListener("click", (event) => {
        const contact = document.getElementById("contacto");
        if (!contact) return;

        event.preventDefault();
        dialog.close();

        requestAnimationFrame(() => {
          contact.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
            block: "start",
          });
        });
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeServiceDialogs, {
      once: true,
    });
  } else {
    initializeServiceDialogs();
  }
})();
