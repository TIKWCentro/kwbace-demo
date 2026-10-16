/* DOCUMENTACIÓN DEL MÓDULO
   Catálogos y marcas de refacciones, promociones y solicitud de demostración.
   Se ejecuta con el DOM disponible. Los catálogos son datos locales editables.
   Los formularios sólo preparan información; no existe API de recepción.
   No renombrar recursos: GitHub Pages distingue mayúsculas y minúsculas.
*/
const partsCategories = {
  motor: {
    number: "01",
    title: "Motor y filtración",
    description:
      "Filtros, lubricación, enfriamiento y componentes para proteger el corazón de tu unidad.",
    tags: [
      { name: "PACCAR", image: "assets/images/logos/paccar.png" },
      { name: "Cummins", image: "assets/images/logos/cummins.png" },
      { name: "Fleetguard", image: "assets/images/logos/fleetguard.png" },
    ],
  },

  frenos: {
    number: "02",
    title: "Frenos y seguridad",
    description:
      "Componentes para mantener capacidad de frenado, control y seguridad en cada recorrido.",
    tags: [
      { name: "Bendix", image: "assets/images/logos/bendix.png" },
      { name: "Meritor", image: "assets/images/logos/meritor.png" },
      { name: "Brake Center", image: "assets/images/logos/brake-center.png" },
      { name: "TMD", image: "assets/images/logos/tmd.png" },
      { name: "PAGID", image: "assets/images/logos/pagid.png" },
    ],
  },

  tren: {
    number: "03",
    title: "Tren motriz",
    description:
      "Embrague, transmisión, cardanes, ejes y diferenciales para entregar la potencia correctamente.",
    tags: [
      { name: "Eaton", image: "assets/images/logos/eaton.png" },
      { name: "Spicer", image: "assets/images/logos/spicer.png" },
      { name: "Meritor", image: "assets/images/logos/meritor.png" },
      { name: "Alisson", image: "assets/images/logos/allison.png" },
      { name: "TRP", image: "assets/images/logos/trp.png" },
      { name: "Horton", image: "assets/images/logos/horton.png" },
      { name: "Jost", image: "assets/images/logos/jost.png" },
    ],
  },

  electrico: {
    number: "04",
    title: "Eléctrico e iluminación",
    description:
      "Alternadores, marchas, sensores, arneses e iluminación para máxima disponibilidad.",
    tags: [
      { name: "Delco Remy", image: "assets/images/logos/delco-remy.png" },
      { name: "Phillips", image: "assets/images/logos/phillips.png" },
      { name: "Truck-Lite", image: "assets/images/logos/truck-lite.png" },
      { name: "TRP", image: "assets/images/logos/trp.png" },
      { name: "LTH", image: "assets/images/logos/lth.png" },
      { name: "Odyssey", image: "assets/images/logos/odyssey.png" },
      { name: "Grote", image: "assets/images/logos/grote.png" },
    ],
  },

  suspension: {
    number: "05",
    title: "Suspensión y dirección",
    description:
      "Soluciones para estabilidad, maniobrabilidad y confort del operador.",
    tags: [
      { name: "Hendrickson", image: "assets/images/logos/hendrickson.png" },
      { name: "TRP", image: "assets/images/logos/trp.png" },
      { name: "Gabriel", image: "assets/images/logos/gabriel.png" },
      { name: "Trw", image: "assets/images/logos/trw.jpg" },
      { name: "Monroe", image: "assets/images/logos/monroe.png" },
      { name: "Sheppard", image: "assets/images/logos/sheppard.png" },
      { name: "Pirelli", image: "assets/images/logos/pirelli.png" },
      { name: "Cooper", image: "assets/images/logos/cooper.png" },
    ],
  },

  cabina: {
    number: "06",
    title: "Cabina y accesorios",
    description:
      "Colisión, espejos, herrajes y accesorios que recuperan imagen y funcionalidad.",
    tags: [
      { name: "Kenworth", image: "assets/images/logos/kenworth.png" },
      { name: "DAF", image: "assets/images/logos/daf.png" },
      { name: "TRP", image: "assets/images/logos/trp.png" },
      { name: "invernalia", image: "assets/images/logos/invernalia.png" },
      { name: "Cool", image: "assets/images/logos/cool.png" },
    ],
  },
};

/** Genera los logotipos declarados en cada familia de refacciones. */
function renderPartsBrandLogos(tags) {
  return tags
    .map(
      (brand) => `
    <span class="refaccion-marca-logo">
      <img
        src="${brand.image}"
        alt="${brand.name}"
        width="104"
        height="58"
      >
    </span>
  `,
    )
    .join("");
}

const categoryContent = document.querySelector("#partsCategoryContent");
const categoryButtons = document.querySelectorAll("[data-category]");
const requestType = document.querySelector("#partsRequestType");

/** Actualiza categoría, marcas y enlace de cotización seleccionado. */
function renderPartsCategory(categoryId) {
  const category = partsCategories[categoryId];
  if (!category || !categoryContent) return;

  categoryContent.innerHTML = `
    <span class="category-number">${category.number}</span>
    <small>FAMILIA DE REFACCIONES</small>
    <h3>${category.title}</h3>
    <p>${category.description}</p>
    <div class="tags">${renderPartsBrandLogos(category.tags)}</div>
    <a href="#cotizar" data-request-category="${category.title}">Cotizar esta categoría <span>→</span></a>
  `;

  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === categoryId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  const quoteLink = categoryContent.querySelector("[data-request-category]");
  quoteLink?.addEventListener("click", () => {
    if (requestType) requestType.value = category.title;
  });
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () =>
    renderPartsCategory(button.dataset.category),
  );
});

renderPartsCategory("motor");

const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
          });
        },
        { threshold: 0.13 },
      )
    : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("visible");
});

const requestForm = document.querySelector("#partsRequestForm");

requestForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  requestForm.classList.add("form-ready");
  const submitButton = requestForm.querySelector("button[type='submit']");
  if (submitButton)
    submitButton.innerHTML = "Solicitud preparada <span>✓</span>";
});

const partsPromoCarousel = document.querySelector("#partsPromoCarousel");

if (partsPromoCarousel) {
  const promoSlides = [...partsPromoCarousel.querySelectorAll(".promo-slide")];

  const promoDots = [
    ...partsPromoCarousel.querySelectorAll("[data-promo-slide]"),
  ];

  const promoPreviousButton =
    partsPromoCarousel.querySelector("#promoPrevious");

  const promoNextButton = partsPromoCarousel.querySelector("#promoNext");

  const promoCurrentSlide =
    partsPromoCarousel.querySelector("#promoCurrentSlide");

  const promoTotalSlides =
    partsPromoCarousel.querySelector("#promoTotalSlides");

  const promoProgressBar =
    partsPromoCarousel.querySelector("#promoProgressBar");

  const autoplayTime = 6000;
  let currentPromotion = 0;
  let promotionTimer = null;

  const formatSlideNumber = (number) => String(number).padStart(2, "0");

  /** Reinicia el indicador de tiempo de la promoción actual. */
  function restartPromotionProgress() {
    if (!promoProgressBar) return;

    promoProgressBar.classList.remove("running");

    void promoProgressBar.offsetWidth;

    promoProgressBar.classList.add("running");
  }

  /** Muestra una promoción y sincroniza indicadores y reproducción. */
  function showPromotion(index, restartAutoplay = true) {
    if (!promoSlides.length) return;

    currentPromotion = (index + promoSlides.length) % promoSlides.length;

    promoSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentPromotion;

      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    promoDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentPromotion;

      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });

    if (promoCurrentSlide) {
      promoCurrentSlide.textContent = formatSlideNumber(currentPromotion + 1);
    }

    restartPromotionProgress();

    if (restartAutoplay) {
      startPromotionAutoplay();
    }
  }

  /** Avanza de forma circular a la siguiente promoción. */
  function nextPromotion() {
    showPromotion(currentPromotion + 1);
  }

  /** Retrocede de forma circular a la promoción anterior. */
  function previousPromotion() {
    showPromotion(currentPromotion - 1);
  }

  /** Cancela el temporizador para evitar reproducciones duplicadas. */
  function stopPromotionAutoplay() {
    if (!promotionTimer) return;

    window.clearInterval(promotionTimer);
    promotionTimer = null;
  }

  /** Inicia el avance automático si las condiciones de accesibilidad lo permiten. */
  function startPromotionAutoplay() {
    stopPromotionAutoplay();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    promotionTimer = window.setInterval(() => {
      showPromotion(currentPromotion + 1, false);
    }, autoplayTime);
  }

  promoNextButton?.addEventListener("click", nextPromotion);
  promoPreviousButton?.addEventListener("click", previousPromotion);

  promoDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showPromotion(Number(dot.dataset.promoSlide));
    });
  });

  partsPromoCarousel.addEventListener("mouseenter", stopPromotionAutoplay);

  partsPromoCarousel.addEventListener("mouseleave", startPromotionAutoplay);

  partsPromoCarousel.addEventListener("focusin", stopPromotionAutoplay);

  partsPromoCarousel.addEventListener("focusout", (event) => {
    if (!partsPromoCarousel.contains(event.relatedTarget)) {
      startPromotionAutoplay();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopPromotionAutoplay();
    } else {
      startPromotionAutoplay();
    }
  });

  if (promoTotalSlides) {
    promoTotalSlides.textContent = formatSlideNumber(promoSlides.length);
  }

  showPromotion(0);
}
