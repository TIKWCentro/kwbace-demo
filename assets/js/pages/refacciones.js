const partsCategories = {
  motor: {
    number: "01",
    title: "Motor y filtración",
    description: "Filtros, lubricación, enfriamiento y componentes para proteger el corazón de tu unidad.",
    tags: ["PACCAR", "Cummins", "Fleetguard"]
  },
  frenos: {
    number: "02",
    title: "Frenos y seguridad",
    description: "Componentes para mantener capacidad de frenado, control y seguridad en cada recorrido.",
    tags: ["Bendix", "Meritor", "Brake Center"]
  },
  tren: {
    number: "03",
    title: "Tren motriz",
    description: "Embrague, transmisión, cardanes, ejes y diferenciales para entregar la potencia correctamente.",
    tags: ["Eaton", "Spicer", "Meritor"]
  },
  electrico: {
    number: "04",
    title: "Eléctrico e iluminación",
    description: "Alternadores, marchas, sensores, arneses e iluminación para máxima disponibilidad.",
    tags: ["Delco Remy", "Phillips", "Truck-Lite"]
  },
  suspension: {
    number: "05",
    title: "Suspensión y dirección",
    description: "Soluciones para estabilidad, maniobrabilidad y confort del operador.",
    tags: ["Hendrickson", "TRP", "Gabriel"]
  },
  cabina: {
    number: "06",
    title: "Cabina y accesorios",
    description: "Colisión, espejos, herrajes y accesorios que recuperan imagen y funcionalidad.",
    tags: ["Kenworth", "DAF", "TRP"]
  }
};

const categoryContent = document.querySelector("#partsCategoryContent");
const categoryButtons = document.querySelectorAll("[data-category]");
const requestType = document.querySelector("#partsRequestType");

function renderPartsCategory(categoryId) {
  const category = partsCategories[categoryId];
  if (!category || !categoryContent) return;

  categoryContent.innerHTML = `
    <span class="category-number">${category.number}</span>
    <small>FAMILIA DE REFACCIONES</small>
    <h3>${category.title}</h3>
    <p>${category.description}</p>
    <div class="tags">${category.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
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
  button.addEventListener("click", () => renderPartsCategory(button.dataset.category));
});

renderPartsCategory("motor");

const menuButton = document.querySelector("#partsMenuButton");
const navigation = document.querySelector("#partsNavLinks");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.textContent = isOpen ? "Cerrar" : "Menú";
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    if (menuButton) {
      menuButton.textContent = "Menú";
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.13 })
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
  if (submitButton) submitButton.innerHTML = "Solicitud preparada <span>✓</span>";
});

const partsPromoCarousel = document.querySelector("#partsPromoCarousel");

if (partsPromoCarousel) {
  const promoSlides = [
    ...partsPromoCarousel.querySelectorAll(".promo-slide")
  ];

  const promoDots = [
    ...partsPromoCarousel.querySelectorAll("[data-promo-slide]")
  ];

  const promoPreviousButton =
    partsPromoCarousel.querySelector("#promoPrevious");

  const promoNextButton =
    partsPromoCarousel.querySelector("#promoNext");

  const promoCurrentSlide =
    partsPromoCarousel.querySelector("#promoCurrentSlide");

  const promoTotalSlides =
    partsPromoCarousel.querySelector("#promoTotalSlides");

  const promoProgressBar =
    partsPromoCarousel.querySelector("#promoProgressBar");

  const autoplayTime = 6000;
  let currentPromotion = 0;
  let promotionTimer = null;

  const formatSlideNumber = (number) =>
    String(number).padStart(2, "0");

  function restartPromotionProgress() {
    if (!promoProgressBar) return;

    promoProgressBar.classList.remove("running");

    void promoProgressBar.offsetWidth;

    promoProgressBar.classList.add("running");
  }

  function showPromotion(index, restartAutoplay = true) {
    if (!promoSlides.length) return;

    currentPromotion =
      (index + promoSlides.length) % promoSlides.length;

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
      promoCurrentSlide.textContent =
        formatSlideNumber(currentPromotion + 1);
    }

    restartPromotionProgress();

    if (restartAutoplay) {
      startPromotionAutoplay();
    }
  }

  function nextPromotion() {
    showPromotion(currentPromotion + 1);
  }

  function previousPromotion() {
    showPromotion(currentPromotion - 1);
  }

  function stopPromotionAutoplay() {
    if (!promotionTimer) return;

    window.clearInterval(promotionTimer);
    promotionTimer = null;
  }

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

  partsPromoCarousel.addEventListener(
    "mouseenter",
    stopPromotionAutoplay
  );

  partsPromoCarousel.addEventListener(
    "mouseleave",
    startPromotionAutoplay
  );

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
    promoTotalSlides.textContent =
      formatSlideNumber(promoSlides.length);
  }

  showPromotion(0);
}