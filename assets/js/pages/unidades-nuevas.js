/* DOCUMENTACIÓN DEL MÓDULO
   Modelos, fichas técnicas, aplicaciones, cotizador y visor 3D bajo demanda.
   Se ejecuta con el DOM disponible. Los catálogos son datos locales editables.
   Los formularios sólo preparan información; no existe API de recepción.
   No renombrar recursos: GitHub Pages distingue mayúsculas y minúsculas.
*/
/* =========================================================
   UNIDADES NUEVAS
   Modelos · Fichas técnicas · Cotizador · Experiencia 3D
========================================================= */

(() => {
  /** Inicializa marcas, catálogos, cotizador y visor sin duplicar controladores. */
  function initializeUnitsPage() {
    if (window.__baceUnitsInitialized) return;
    window.__baceUnitsInitialized = true;

    /* =====================================================
       FICHAS TÉCNICAS
       Coloca la URL correspondiente entre las comillas.
    ===================================================== */

    const technicalSheets = {
      kenworth: {
        T680: "https://kenworth.com.mx/modelos/t680/",
        T480: "https://kenworth.com.mx/modelos/t380-t480/",
        T880: "https://kenworth.com.mx/modelos/t880/",
        W990: "https://kenworth.com.mx/modelos/w990/",
      },

      daf: {
        XB: "https://www.dafmexico.com.mx/es-es/modelos-daf/daf-xb",
        XF: "https://www.dafmexico.com.mx/es-es/modelos-daf/daf-xf",
        XG: "https://www.dafmexico.com.mx/es-es/modelos-daf/daf-xb",
      },
    };

    /* =====================================================
       INFORMACIÓN DEL HERO
    ===================================================== */

    const brandData = {
      kenworth: {
        heroCopy:
          "Potencia, eficiencia y respaldo para convertir cada kilómetro en una ventaja para tu negocio.",
        model: "T680",
        tagline: "La nueva generación del líder.",
        use: "Larga distancia",
        strength: "Eficiencia aerodinámica",
        link: "#kenworth",
      },

      daf: {
        heroCopy:
          "Ingeniería europea enfocada en eficiencia, seguridad y una experiencia superior para el conductor.",
        model: "XG",
        tagline: "Una nueva dimensión en confort.",
        use: "Larga distancia",
        strength: "Aerodinámica y confort",
        link: "#daf",
      },
    };

    /* =====================================================
       MODELOS
       Kenworth: T680=0, T480=1, T880=2, W990=3
       DAF: XB=0, XF=1, XG=2
    ===================================================== */

    const models = {
      kenworth: [
        {
          name: "T680",
          label: "La nueva generación del líder",
          desc: "Aerodinámica, tecnología y rendimiento para hacer más rentable cada recorrido de larga distancia.",
          image: "assets/images/U Kenworth/kw-680.jpg",
          benefits: [
            "Larga distancia",
            "Pantalla digital de 15 pulgadas",
            "Motor PACCAR MX-13",
            "Iluminación LED",
          ],
        },
        {
          name: "T480",
          label: "Un nuevo modelo de negocio",
          desc: "Versatilidad y eficiencia para distribución, construcción y aplicaciones regionales.",
          image: "assets/images/U Kenworth/kw-480.jpg",
          benefits: [
            "Distribución y construcción",
            "Cabina ergonómica",
            "Visibilidad mejorada",
            "Tecnología TruckTech+",
          ],
        },
        {
          name: "T880",
          label: "Poder y durabilidad",
          desc: "Un vehículo versátil, confiable y resistente para los trabajos más pesados y exigentes.",
          image: "assets/images/U Kenworth/kw-880.jpg",
          benefits: [
            "Aplicación vocacional",
            "Construcción y trabajo pesado",
            "Smart Wheel",
            "Diagnóstico remoto",
          ],
        },
        {
          name: "W990",
          label: "Presencia, poder y estilo",
          desc: "Potencia, lujo, artesanía y carácter para quienes hacen de la carretera una declaración personal.",
          image: "assets/images/U Kenworth/kw-990.jpg",
          benefits: [
            "Experiencia premium",
            "Estilo tradicional",
            "Acabados superiores",
            "Confort para carretera",
          ],
        },
      ],

      daf: [
        {
          name: "XB",
          label: "Agilidad para distribución",
          desc: "Una solución eficiente y maniobrable para distribución urbana y regional.",
          image: "assets/images/U DAF/daf-xb.jpg",
          benefits: [
            "Distribución urbana",
            "Maniobrabilidad",
            "Visibilidad",
            "Eficiencia operativa",
          ],
        },
        {
          name: "XF",
          label: "Eficiencia para carretera",
          desc: "Rendimiento, seguridad y confort para operaciones regionales y de larga distancia.",
          image: "assets/images/U DAF/DAF-XF_2.jpg",
          benefits: [
            "Carretera",
            "Confort del operador",
            "Seguridad",
            "Rendimiento",
          ],
        },
        {
          name: "XG",
          label: "Una nueva dimensión",
          desc: "Máximo espacio, aerodinámica y confort para transformar la experiencia de larga distancia.",
          image: "assets/images/U DAF/daf-xg_2.png",
          benefits: [
            "Larga distancia",
            "Cabina de gran amplitud",
            "Aerodinámica",
            "Experiencia premium",
          ],
        },
      ],
    };

    /* =====================================================
       RECOMENDACIONES POR OPERACIÓN
    ===================================================== */

    const operations = {
      carretera: {
        models: "Kenworth T680 · DAF XG",
        text: "Dos referentes para recorrer largas distancias con eficiencia, seguridad y confort.",
        link: "#kenworth",
      },

      distribucion: {
        models: "Kenworth T480 · DAF XB",
        text: "Agilidad, visibilidad y productividad para ciudad, reparto y recorridos regionales.",
        link: "#kenworth",
      },

      vocacional: {
        models: "Kenworth T880",
        text: "Fuerza, durabilidad y versatilidad para construcción y los trabajos más exigentes.",
        link: "#kenworth",
      },

      premium: {
        models: "Kenworth W990 · DAF XG",
        text: "Dos formas de vivir la carretera con presencia, confort y una identidad inconfundible.",
        link: "#kenworth",
      },
    };

    /* =====================================================
       APLICACIONES ESPECIALIZADAS
    ===================================================== */

    const specializedUses = [
      {
        name: "Caja seca",
        short: "Carga protegida",
        model: "Kenworth T680 · DAF XF",
        need: "Traslado de mercancía general con protección y eficiencia en carretera.",
        route: "Carretera y distribución regional",
        focus: "Rendimiento · autonomía · maniobrabilidad",
        image: "assets/images/U Kenworth/kw-680.jpg",
      },
      {
        name: "Revolvedora",
        short: "Concreto",
        model: "Kenworth T880",
        need: "Configuración vocacional para operación continua, accesos de obra y cargas exigentes.",
        route: "Construcción y obra",
        focus: "Resistencia · tracción · durabilidad",
        image: "assets/images/U Aplicaciones/revolvedora.jpg",
        imageClass: "application-image-revolvedora",
      },
      {
        name: "Volteo",
        short: "Materiales",
        model: "Kenworth T880",
        need: "Fuerza y estabilidad para movimiento de agregados, tierra y materiales a granel.",
        route: "Obra, banco de materiales y minería",
        focus: "Capacidad · resistencia · seguridad",
        image: "assets/images/U Aplicaciones/volteo daf.jpg",
        imageClass: "application-image-volteo",
      },
      {
        name: "Tolva",
        short: "Carga a granel",
        model: "Kenworth T680 · T880",
        need: "Una base configurable para transportar granos, minerales y materiales descargados por gravedad.",
        route: "Carretera, campo e industria",
        focus: "Torque · rendimiento · configuración",
        image: "assets/images/U Aplicaciones/tolva.webp",
      },
      {
        name: "Tanque",
        short: "Líquidos",
        model: "Kenworth T680 · DAF XF",
        need: "Estabilidad y desempeño para traslado especializado de líquidos en recorridos regionales o de larga distancia.",
        route: "Energía, alimentos y químicos",
        focus: "Seguridad · estabilidad · eficiencia",
        image: "assets/images/U Aplicaciones/tanque daf.jpg",
      },
    ];

    /* =====================================================
       CAMBIO DE MARCA EN HERO
    ===================================================== */

    /** Actualiza textos, imagen y estado de controles para la marca seleccionada. */
    function setBrand(brand) {
      brand = String(brand || "")
        .trim()
        .toLowerCase();

      const data = brandData[brand];
      if (!data) return;

      document.querySelectorAll("[data-brand]").forEach((button) => {
        const active = String(button.dataset.brand).toLowerCase() === brand;

        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      document.querySelectorAll("[data-bg]").forEach((background) => {
        background.classList.toggle(
          "is-active",
          background.dataset.bg === brand,
        );
      });

      const content = {
        heroCopy: data.heroCopy,
        featuredBrand: brand.toUpperCase(),
        featuredModel: data.model,
        featuredTagline: data.tagline,
        featuredUse: data.use,
        featuredStrength: data.strength,
      };

      Object.entries(content).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
      });

      const featuredLink = document.getElementById("featuredLink");

      if (featuredLink) {
        featuredLink.href = data.link;
        featuredLink.innerHTML = `Conocer el ${data.model} <span>↗</span>`;
      }

      const heroLink = document.getElementById("heroModelsLink");
      if (heroLink) heroLink.href = data.link;
    }

    document.querySelectorAll("[data-brand]").forEach((button) => {
      button.addEventListener("click", () => {
        setBrand(button.dataset.brand);
      });
    });

    document.querySelectorAll("[data-operation]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-operation]").forEach((item) => {
          item.classList.remove("is-active");
        });

        button.classList.add("is-active");

        const data = operations[button.dataset.operation];
        if (!data) return;

        const title = document.getElementById("recommendedModels");
        const text = document.getElementById("recommendationText");
        const link = document.getElementById("recommendationLink");

        if (title) title.textContent = data.models;
        if (text) text.textContent = data.text;
        if (link) link.href = data.link;
      });
    });

    /* =====================================================
       PANEL DE MODELOS Y FICHAS TÉCNICAS
    ===================================================== */

    /** Muestra la ficha local de un modelo y conserva sus enlaces de ficha técnica. */
    function renderModelStage(brand, index = 0) {
      brand = String(brand || "")
        .trim()
        .toLowerCase();

      const data = models[brand]?.[index];
      const tabs = document.getElementById(brand + "Tabs");
      const stage = document.getElementById(brand + "Stage");

      if (!data || !tabs || !stage) return;

      tabs.innerHTML = models[brand]
        .map(
          (model, modelIndex) => `
          <button
            type="button"
            role="tab"
            aria-selected="${modelIndex === index}"
            class="${modelIndex === index ? "is-active" : ""}"
            data-model-index="${modelIndex}"
          >
            ${model.name}
          </button>
        `,
        )
        .join("");

      stage.innerHTML = `
        <div class="model-stage-media">
          <span class="model-index">
            ${String(index + 1).padStart(2, "0")} /
            ${brand.toUpperCase()}
          </span>

          <img
            src="${data.image}"
            alt="${brand.toUpperCase()} ${data.name}"
          >
        </div>

        <div class="model-stage-copy">
          <small>${brand.toUpperCase()} · MODELO</small>

          <h3>${data.name}</h3>
          <h4>${data.label}</h4>
          <p>${data.desc}</p>

          <div class="model-benefits">
            ${data.benefits.map((text) => `<span>✓ ${text}</span>`).join("")}
          </div>

          <div class="model-stage-actions">
            <a href="index.html#cotizar">
              Cotizar este modelo
            </a>

            <a class="model-tech-sheet">
              Ficha técnica ↗
            </a>

            <button
              class="model-3d-trigger"
              type="button"
              data-open-model-3d="${brand}-${data.name.toLowerCase()}"
              data-3d-brand="${brand}"
              data-3d-index="${index}"
              aria-haspopup="dialog"
              aria-controls="model3dModal"
              aria-label="Abrir experiencia 3D de ${brand.toUpperCase()} ${data.name}"
            >
              <span aria-hidden="true">3D</span>
              Experiencia 3D
            </button>
          </div>
        </div>
      `;

      const sheetLink = stage.querySelector(".model-tech-sheet");

      const sheetUrl = (technicalSheets[brand]?.[data.name] || "").trim();

      if (sheetLink && sheetUrl) {
        sheetLink.href = sheetUrl;
        sheetLink.target = "_blank";
        sheetLink.rel = "noopener noreferrer";
      } else if (sheetLink) {
        sheetLink.setAttribute("aria-disabled", "true");
        sheetLink.title = "Ficha técnica pendiente de configurar";
      }

      tabs.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          renderModelStage(brand, Number(button.dataset.modelIndex));
        });
      });
    }

    renderModelStage("kenworth");
    renderModelStage("daf");

    /* =====================================================
       PANEL DE APLICACIONES ESPECIALIZADAS
    ===================================================== */

    /** Presenta la información de la aplicación especializada seleccionada. */
    function renderSpecialized(index = 0) {
      const data = specializedUses[index];
      const list = document.getElementById("specializedList");
      const stage = document.getElementById("specializedStage");

      if (!data || !list || !stage) return;

      list.innerHTML = specializedUses
        .map(
          (item, itemIndex) => `
          <button
            type="button"
            role="tab"
            aria-selected="${itemIndex === index}"
            class="${itemIndex === index ? "is-active" : ""}"
            data-use-index="${itemIndex}"
          >
            <span>0${itemIndex + 1}</span>
            <div>
              <strong>${item.name}</strong>
              <small>${item.short}</small>
            </div>
            <b>↗</b>
          </button>
        `,
        )
        .join("");

      stage.innerHTML = `
        <div class="use-stage-media">
          <span>APLICACIÓN 0${index + 1}</span>
          <img
            src="${data.image}"
            alt="Solución para ${data.name}"
          >
        </div>

        <div class="use-stage-copy">
          <small>USO ESPECIALIZADO</small>

          <h3 class="use-title use-title-${data.name.toLowerCase()}">
            ${data.name}
          </h3>

          <p>${data.need}</p>

          <div class="use-fit">
            <div>
              <span>PUNTO DE PARTIDA</span>
              <b>${data.model}</b>
            </div>
            <div>
              <span>OPERACIÓN</span>
              <b>${data.route}</b>
            </div>
            <div>
              <span>PRIORIDADES</span>
              <b>${data.focus}</b>
            </div>
          </div>

          <a href="index.html#cotizar">
            Configurar esta aplicación →
          </a>
        </div>
      `;

      list.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          renderSpecialized(Number(button.dataset.useIndex));
        });
      });
    }

    renderSpecialized();

    /* =====================================================
       HISTORIA TRUCKMAN
    ===================================================== */

    /* Historia Truckman: apertura y cierre de contenido complementario. */
    const truckmanStory = document.getElementById("truckmanStory");
    const truckmanOpen = document.getElementById("truckmanStoryButton");
    const truckmanClose = document.getElementById("closeTruckmanStory");

    /** Alterna la visibilidad de la historia complementaria de Truckman. */
    function toggleTruckmanStory(show) {
      if (!truckmanStory) return;

      truckmanStory.hidden = !show;
      document.body.style.overflow = show ? "hidden" : "";
    }

    truckmanOpen?.addEventListener("click", () => {
      toggleTruckmanStory(true);
    });

    truckmanClose?.addEventListener("click", () => {
      toggleTruckmanStory(false);
    });

    truckmanStory?.addEventListener("click", (event) => {
      if (event.target === truckmanStory) {
        toggleTruckmanStory(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        toggleTruckmanStory(false);
      }
    });

    /* =====================================================
       APARICIÓN DE SECCIONES
    ===================================================== */

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("is-visible", entry.isIntersecting);
          });
        },
        {
          threshold: 0.15,
        },
      );

      document.querySelectorAll(".reveal").forEach((element) => {
        observer.observe(element);
      });
    } else {
      document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.add("is-visible");
      });
    }

    /* =====================================================
       COTIZADOR DE UNIDADES
    ===================================================== */

    const quoteForm = document.getElementById("unitsQuoteForm");

    const quoteRequiredIds = [
      "quoteBack",
      "quoteNext",
      "quoteStepNumber",
      "quoteStepName",
      "quoteProgressBar",
      "quoteNavigation",
      "quoteSuccess",
      "restartQuote",
      "quoteBrand",
      "quoteModel",
    ];

    if (
      quoteForm &&
      quoteRequiredIds.every((id) => document.getElementById(id))
    ) {
      const quoteSteps = Array.from(
        quoteForm.querySelectorAll("[data-quote-step]"),
      );

      const quoteBack = document.getElementById("quoteBack");
      const quoteNext = document.getElementById("quoteNext");
      const quoteStepNumber = document.getElementById("quoteStepNumber");
      const quoteStepName = document.getElementById("quoteStepName");
      const quoteProgressBar = document.getElementById("quoteProgressBar");
      const quoteNavigation = document.getElementById("quoteNavigation");
      const quoteSuccess = document.getElementById("quoteSuccess");
      const restartQuote = document.getElementById("restartQuote");
      const quoteBrand = document.getElementById("quoteBrand");
      const quoteModel = document.getElementById("quoteModel");

      const quoteStepNames = [
        "DATOS DEL CLIENTE",
        "UNIDAD REQUERIDA",
        "OPERACIÓN",
        "FINANCIAMIENTO",
      ];

      const quoteModels = {
        Kenworth: ["T680", "T480", "T880", "W990"],
        DAF: ["XB", "XF", "XG"],
        Recomendación: ["Deseo una recomendación"],
      };

      let currentQuoteStep = 1;

      /** Sincroniza pasos, progreso y navegación del cotizador de unidades. */
      function updateQuoteStep() {
        quoteSteps.forEach((step) => {
          const stepNumber = Number(step.dataset.quoteStep);
          const isCurrent = stepNumber === currentQuoteStep;

          step.hidden = !isCurrent;
          step.classList.toggle("is-active", isCurrent);
        });

        quoteStepNumber.textContent = `PASO ${currentQuoteStep} DE ${quoteSteps.length}`;

        quoteStepName.textContent = quoteStepNames[currentQuoteStep - 1];

        quoteProgressBar.style.width = `${(currentQuoteStep / quoteSteps.length) * 100}%`;

        quoteBack.disabled = currentQuoteStep === 1;

        quoteNext.textContent =
          currentQuoteStep === quoteSteps.length
            ? "Enviar solicitud →"
            : "Continuar →";
      }

      /** Valida sólo los campos del paso visible antes de avanzar. */
      function validateCurrentQuoteStep() {
        const currentStep = quoteForm.querySelector(
          `[data-quote-step="${currentQuoteStep}"]`,
        );

        if (!currentStep) return false;

        const requiredFields = Array.from(
          currentStep.querySelectorAll("[required]"),
        );

        let firstInvalidField = null;

        requiredFields.forEach((field) => {
          field.classList.remove("is-invalid");

          let isValid = field.checkValidity();

          if (field.type === "radio") {
            const selectedRadio = currentStep.querySelector(
              `input[name="${field.name}"]:checked`,
            );

            isValid = Boolean(selectedRadio);
          }

          if (!isValid) {
            field.classList.add("is-invalid");

            if (!firstInvalidField) {
              firstInvalidField = field;
            }
          }
        });

        if (firstInvalidField) {
          firstInvalidField.focus();
          return false;
        }

        return true;
      }

      /** Carga los modelos disponibles según la marca indicada en la solicitud. */
      function updateModelOptions() {
        const selectedBrand = quoteBrand.value;
        const availableModels = quoteModels[selectedBrand] || [];

        quoteModel.innerHTML = "";

        if (!availableModels.length) {
          quoteModel.innerHTML = `
            <option value="">Primero selecciona una marca</option>
          `;
          return;
        }

        quoteModel.innerHTML = `
          <option value="">Selecciona un modelo</option>
          ${availableModels
            .map(
              (model) => `
            <option value="${model}">${model}</option>
          `,
            )
            .join("")}
        `;
      }

      /** Prepara la confirmación local del demo sin transmitir datos personales. */
      function prepareQuoteResult() {
        const formData = new FormData(quoteForm);
        const quoteData = Object.fromEntries(formData.entries());

        // Integración futura: enviar quoteData únicamente cuando exista un endpoint real.
        // El demo no transmite ni almacena información personal.

        quoteSteps.forEach((step) => {
          step.hidden = true;
        });

        quoteNavigation.hidden = true;
        quoteSuccess.hidden = false;

        /*
          Punto de integración existente:
          WhatsApp, Power Automate, n8n, API o Salesforce.
          Este bloque prepara los datos; no realiza un envío.
        */
      }

      quoteBrand.addEventListener("change", updateModelOptions);

      quoteNext.addEventListener("click", () => {
        if (!validateCurrentQuoteStep()) return;

        if (currentQuoteStep < quoteSteps.length) {
          currentQuoteStep += 1;
          updateQuoteStep();

          quoteForm.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          return;
        }

        prepareQuoteResult();
      });

      quoteBack.addEventListener("click", () => {
        if (currentQuoteStep > 1) {
          currentQuoteStep -= 1;
          updateQuoteStep();
        }
      });

      restartQuote.addEventListener("click", () => {
        quoteForm.reset();
        currentQuoteStep = 1;

        quoteSuccess.hidden = true;
        quoteNavigation.hidden = false;

        updateModelOptions();
        updateQuoteStep();
      });

      quoteForm.addEventListener("submit", (event) => {
        event.preventDefault();
      });

      updateModelOptions();
      updateQuoteStep();
    }

    /* =====================================================
       BOTONES DE FINANCIAMIENTO
    ===================================================== */

    document.querySelectorAll("[data-finance-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        const financeValues = {
          paccar: "PACCAR Financial",
          paclease: "PacLease",
          comparar: "Comparar",
        };

        const selectedValue = financeValues[button.dataset.financeChoice];

        const financingRadio = document.querySelector(
          `input[name="financiamiento"][value="${selectedValue}"]`,
        );

        if (financingRadio) {
          financingRadio.checked = true;
        }

        document.getElementById("cotizador")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });

    /* =====================================================
       SELECTOR VISUAL DE OPERACIONES
    ===================================================== */

    const operationExperiences = {
      carretera: {
        number: "01",
        kicker: "LARGA DISTANCIA",
        title: "Carretera",
        description:
          "Autonomía, rendimiento y confort para recorrer largas distancias con mayor eficiencia.",
        image: "assets/images/U Kenworth/kw-680.jpg",
        alt: "Unidad para operación en carretera",
        models: [
          {
            brand: "Kenworth",
            brandKey: "kenworth",
            modelIndex: 0,
            name: "T680",
            description: "Eficiencia aerodinámica para larga distancia.",
            image: "assets/images/U Kenworth/kw-680.jpg",
          },
          {
            brand: "DAF",
            brandKey: "daf",
            modelIndex: 2,
            name: "XG",
            description: "Espacio y confort para trayectos extensos.",
            image: "assets/images/U DAF/daf-xg.png",
          },
          {
            brand: "DAF",
            brandKey: "daf",
            modelIndex: 1,
            name: "XF",
            description: "Rendimiento y seguridad para carretera.",
            image: "assets/images/U DAF/daf-xf.jpg",
          },
        ],
      },

      distribucion: {
        number: "02",
        kicker: "CIUDAD Y REGIÓN",
        title: "Distribución",
        description:
          "Agilidad, visibilidad y productividad para reparto urbano y recorridos regionales.",
        image: "assets/images/U DAF/daf-xb.jpg",
        alt: "Unidad para distribución urbana y regional",
        models: [
          {
            brand: "Kenworth",
            brandKey: "kenworth",
            modelIndex: 1,
            name: "T480",
            description: "Versatilidad para distribución y operación regional.",
            image: "assets/images/U Kenworth/kw-480.jpg",
          },
          {
            brand: "DAF",
            brandKey: "daf",
            modelIndex: 0,
            name: "XB",
            description: "Maniobrabilidad para distribución urbana.",
            image: "assets/images/U DAF/daf-xb.jpg",
          },
          {
            brand: "DAF",
            brandKey: "daf",
            modelIndex: 1,
            name: "XF",
            description: "Eficiencia para recorridos regionales.",
            image: "assets/images/U DAF/daf-xf.jpg",
          },
        ],
      },

      vocacional: {
        number: "03",
        kicker: "TRABAJO PESADO",
        title: "Vocacional",
        description:
          "Fuerza, durabilidad y configuraciones especializadas para las aplicaciones más exigentes.",
        image: "assets/images/U Kenworth/kw-880.jpg",
        alt: "Unidad para trabajo pesado",
        models: [
          {
            brand: "Kenworth",
            brandKey: "kenworth",
            modelIndex: 2,
            name: "T880",
            description: "Resistencia para construcción y trabajo pesado.",
            image: "assets/images/U Kenworth/kw-880.jpg",
          },
          {
            brand: "Kenworth",
            brandKey: "kenworth",
            modelIndex: 1,
            name: "T480",
            description:
              "Una plataforma versátil para aplicaciones especiales.",
            image: "assets/images/U Kenworth/kw-480.jpg",
          },
        ],
      },

      premium: {
        number: "04",
        kicker: "PRESENCIA Y CONFORT",
        title: "Premium",
        description:
          "Potencia, carácter y máximo confort para transformar cada recorrido en una experiencia.",
        image: "assets/images/U Kenworth/kw-990.jpg",
        alt: "Unidad premium para carretera",
        models: [
          {
            brand: "Kenworth",
            brandKey: "kenworth",
            modelIndex: 3,
            name: "W990",
            description: "Diseño icónico, acabados y presencia en carretera.",
            image: "assets/images/U Kenworth/kw-990.jpg",
          },
          {
            brand: "DAF",
            brandKey: "daf",
            modelIndex: 2,
            name: "XG",
            description: "Amplitud, aerodinámica y máximo confort.",
            image: "assets/images/U DAF/daf-xg.png",
          },
        ],
      },
    };

    const segmentButtons = document.querySelectorAll("[data-segment]");
    const operationImage = document.getElementById("operationImage");
    const operationNumber = document.getElementById("operationNumber");
    const operationKicker = document.getElementById("operationKicker");
    const operationTitle = document.getElementById("operationTitle");
    const operationDescription = document.getElementById(
      "operationDescription",
    );
    const operationModelTrack = document.getElementById("operationModelTrack");
    const operationPrevious = document.getElementById("operationPrevious");
    const operationNext = document.getElementById("operationNext");

    /** Genera las opciones de modelos recomendadas para una operación. */
    function renderOperationModels(items) {
      if (!operationModelTrack) return;

      operationModelTrack.innerHTML = items
        .map(
          (model) => `
        <button
          class="operation-model-card operation-model-card--${model.brandKey}"
          type="button"
          data-operation-brand="${model.brandKey}"
          data-operation-model="${model.modelIndex}"
          aria-label="Consultar ${model.brand} ${model.name}"
        >
          <img
            src="${model.image}"
            alt="${model.brand} ${model.name}"
          >

          <span class="operation-model-card__content">
            <small>${model.brand.toUpperCase()}</small>
            <strong>${model.name}</strong>
            <span>${model.description}</span>
          </span>

          <b class="operation-model-card__arrow">↗</b>
        </button>
      `,
        )
        .join("");

      operationModelTrack.scrollTo({
        left: 0,
        behavior: "smooth",
      });

      operationModelTrack
        .querySelectorAll("[data-operation-brand]")
        .forEach((card) => {
          card.addEventListener("click", () => {
            const brand = card.dataset.operationBrand;
            const modelIndex = Number(card.dataset.operationModel);

            renderModelStage(brand, modelIndex);

            document.getElementById(brand)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
        });
    }

    /** Actualiza la aplicación elegida y los modelos que le corresponden. */
    function selectOperation(segment) {
      const data = operationExperiences[segment];

      if (
        !data ||
        !operationImage ||
        !operationNumber ||
        !operationKicker ||
        !operationTitle ||
        !operationDescription ||
        !operationModelTrack
      ) {
        return;
      }

      segmentButtons.forEach((button) => {
        const active = button.dataset.segment === segment;

        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
      });

      operationNumber.textContent = data.number;
      operationKicker.textContent = data.kicker;
      operationTitle.textContent = data.title;
      operationDescription.textContent = data.description;

      operationImage.src = data.image;
      operationImage.alt = data.alt;

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        operationImage.animate(
          [
            { opacity: 0.35, transform: "scale(1.035)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          {
            duration: 550,
            easing: "ease-out",
          },
        );
      }

      renderOperationModels(data.models);
    }

    segmentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        selectOperation(button.dataset.segment);
      });
    });

    operationPrevious?.addEventListener("click", () => {
      operationModelTrack?.scrollBy({
        left: -230,
        behavior: "smooth",
      });
    });

    operationNext?.addEventListener("click", () => {
      operationModelTrack?.scrollBy({
        left: 230,
        behavior: "smooth",
      });
    });

    selectOperation("carretera");

    /* =====================================================
       CARRUSEL DE MODELOS DEFINIDO EN EL HTML
    ===================================================== */

    const modelRailViewport = document.getElementById("modelRailViewport");
    const modelRailPrevious = document.getElementById("modelRailPrevious");
    const modelRailNext = document.getElementById("modelRailNext");

    const modelRailFilters = document.querySelectorAll("[data-rail-filter]");

    const modelRailItems = document.querySelectorAll(
      "#modelRailTrack .model-rail__item[data-model-brand]",
    );

    /** Habilita las flechas según la posición actual del carrusel horizontal. */
    function updateModelRailArrows() {
      if (!modelRailViewport) return;

      const maximumScroll =
        modelRailViewport.scrollWidth - modelRailViewport.clientWidth;

      if (modelRailPrevious) {
        modelRailPrevious.disabled = modelRailViewport.scrollLeft <= 3;
      }

      if (modelRailNext) {
        modelRailNext.disabled =
          modelRailViewport.scrollLeft >= maximumScroll - 3;
      }
    }

    /** Filtra las tarjetas de modelos por marca y actualiza el carrusel. */
    function filterModelRail(brand) {
      brand = String(brand || "all")
        .trim()
        .toLowerCase();

      modelRailItems.forEach((item) => {
        const show =
          brand === "all" ||
          String(item.dataset.modelBrand || "")
            .trim()
            .toLowerCase() === brand;

        item.hidden = !show;
      });

      if (modelRailViewport) {
        modelRailViewport.scrollLeft = 0;
      }

      requestAnimationFrame(updateModelRailArrows);
    }

    modelRailFilters.forEach((button) => {
      button.addEventListener("click", () => {
        modelRailFilters.forEach((filter) => {
          const active = filter === button;

          filter.classList.toggle("is-active", active);
          filter.setAttribute("aria-pressed", String(active));
        });

        filterModelRail(button.dataset.railFilter);
      });
    });

    modelRailItems.forEach((item) => {
      item.addEventListener("click", () => {
        const brand = String(item.dataset.modelBrand || "")
          .trim()
          .toLowerCase();

        // Preferir el nombre para evitar índices antiguos.
        const modelName = String(
          item.dataset.modelName ||
            item.querySelector("strong")?.textContent ||
            "",
        )
          .trim()
          .toUpperCase();

        const namedIndex =
          models[brand]?.findIndex(
            (model) => model.name.toUpperCase() === modelName,
          ) ?? -1;

        const modelIndex =
          namedIndex >= 0 ? namedIndex : Number(item.dataset.modelIndex);

        renderModelStage(brand, modelIndex);

        document.getElementById(brand)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });

    modelRailPrevious?.addEventListener("click", () => {
      if (!modelRailViewport) return;

      modelRailViewport.scrollBy({
        left: -modelRailViewport.clientWidth * 0.75,
        behavior: "smooth",
      });
    });

    modelRailNext?.addEventListener("click", () => {
      if (!modelRailViewport) return;

      modelRailViewport.scrollBy({
        left: modelRailViewport.clientWidth * 0.75,
        behavior: "smooth",
      });
    });

    modelRailViewport?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();

        modelRailViewport.scrollBy({
          left: -280,
          behavior: "smooth",
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        modelRailViewport.scrollBy({
          left: 280,
          behavior: "smooth",
        });
      }
    });

    modelRailViewport?.addEventListener("scroll", updateModelRailArrows);

    window.addEventListener("resize", updateModelRailArrows);

    if (!document.getElementById("unitsRailHiddenRule")) {
      const hiddenRule = document.createElement("style");

      hiddenRule.id = "unitsRailHiddenRule";
      hiddenRule.textContent = `
        #modelRailTrack .model-rail__item[hidden],
        #model3dModal [hidden] {
          display: none !important;
        }
      `;

      document.head.append(hiddenRule);
    }

    filterModelRail(
      document.querySelector("[data-rail-filter].is-active")?.dataset
        .railFilter || "all",
    );

    /* =====================================================
       EXPERIENCIA 3D

       Los archivos GLB y especificaciones se mantienen
       en units3dConfig, dentro del HTML.
    ===================================================== */

    (() => {
      const modal = document.getElementById("model3dModal");

      if (!modal) {
        console.warn(
          "Experiencia 3D: falta el dialog #model3dModal en el HTML.",
        );
        return;
      }

      const host = document.getElementById("model3dHost");
      const status = document.getElementById("model3dStatus");
      const statusTitle = document.getElementById("model3dStatusTitle");
      const statusText = document.getElementById("model3dStatusText");
      const retry = document.getElementById("retryModel3d");
      const help = document.getElementById("model3dHelp");
      const close = document.getElementById("closeModel3d");

      const required = [
        "model3dBrand",
        "model3dTitle",
        "model3dDescription",
        "model3dSpecifications",
        "resetModel3d",
        "model3dQuote",
      ];

      if (
        !host ||
        !status ||
        !statusTitle ||
        !statusText ||
        !retry ||
        !help ||
        !close ||
        !modal.querySelector(".model-3d-modal__note") ||
        required.some((id) => !document.getElementById(id))
      ) {
        console.error(
          "Experiencia 3D: el HTML de la ventana está incompleto. Revisa sus identificadores.",
        );
        return;
      }

      let config = {};

      try {
        config = JSON.parse(
          document.getElementById("units3dConfig").textContent,
        );
      } catch (error) {
        console.error("Revisa el JSON de units3dConfig.", error);
      }

      let viewer;
      let active;
      let opener;
      let timer;
      let generation = 0;
      let previousOverflow = "";
      let libraryPromise;

      /** Carga la librería externa del visor sólo cuando se solicita la experiencia 3D. */
      function loadViewerLibrary() {
        if (customElements.get("model-viewer")) {
          return Promise.resolve();
        }

        if (!libraryPromise) {
          libraryPromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");

            script.type = "module";
            script.src =
              "https://unpkg.com/@google/model-viewer@4.1.0/dist/model-viewer.min.js";

            const timeout = setTimeout(() => {
              finish(new Error("Tiempo de espera del visor agotado"));
            }, 20000);

            /** Resuelve o rechaza la carga del visor y retira sus escuchas temporales. */
            function finish(error) {
              clearTimeout(timeout);
              script.onload = null;
              script.onerror = null;

              if (error) {
                script.remove();
                reject(error);
              } else {
                resolve();
              }
            }

            script.onload = () => {
              finish(
                customElements.get("model-viewer")
                  ? null
                  : new Error("Visor no registrado"),
              );
            };

            script.onerror = () => {
              finish(new Error("No se pudo descargar el visor"));
            };

            document.head.append(script);
          }).catch((error) => {
            libraryPromise = null;
            throw error;
          });
        }

        return libraryPromise;
      }

      /** Presenta estados de carga, ausencia de recurso y reintento del visor. */
      function showStatus(title, text, canRetry = false) {
        status.hidden = false;
        statusTitle.textContent = title;
        statusText.textContent = text;
        retry.hidden = !canRetry;
        help.hidden = true;
      }

      /** Libera el visor anterior y sus recursos antes de abrir otro modelo. */
      function disposeViewer() {
        clearTimeout(timer);
        generation++;

        if (viewer) {
          viewer.removeAttribute("src");
          viewer.remove();
          viewer = null;
        }

        host.replaceChildren();
        host.setAttribute("aria-busy", "false");
      }

      /** Carga el GLB configurado y controla fallos de red o archivos no incluidos. */
      async function loadActiveModel() {
        disposeViewer();

        const request = generation;

        if (!active?.settings.src) {
          showStatus(
            "Modelo 3D próximamente",
            "La visualización de esta unidad todavía no está disponible.",
          );
          return;
        }

        if (location.protocol === "file:") {
          showStatus(
            "Abre la página desde un servidor web",
            "El visor requiere HTTP o HTTPS. Utiliza tu sitio o un servidor local, no doble clic en el HTML.",
          );
          return;
        }

        showStatus(
          "Preparando experiencia 3D",
          "Cargando el visor interactivo…",
        );

        host.setAttribute("aria-busy", "true");

        try {
          await loadViewerLibrary();
        } catch (error) {
          if (request !== generation || !modal.open) return;

          host.setAttribute("aria-busy", "false");

          showStatus(
            "No se pudo iniciar el visor",
            "Revisa tu conexión o el acceso al proveedor del visor y vuelve a intentarlo.",
            true,
          );

          return;
        }

        if (request !== generation || !modal.open) return;

        const element = document.createElement("model-viewer");

        viewer = element;

        element.id = "model3dViewer";
        element.setAttribute(
          "alt",
          `Modelo 3D de ${active.brand.toUpperCase()} ${active.data.name}`,
        );
        element.setAttribute("camera-controls", "");
        element.setAttribute("touch-action", "pan-y");
        element.setAttribute("shadow-intensity", "1");
        element.setAttribute("environment-image", "neutral");
        element.setAttribute("interaction-prompt", "none");
        element.setAttribute("loading", "eager");
        element.setAttribute("camera-orbit", "35deg 75deg 105%");
        element.setAttribute("camera-target", "auto auto auto");
        element.setAttribute("field-of-view", "30deg");

        /** Muestra un fallo recuperable al cargar el modelo 3D. */
        function fail() {
          if (request !== generation || !modal.open) return;

          disposeViewer();

          showStatus(
            "Modelo 3D no disponible",
            "El archivo de esta unidad aún no está publicado o no pudo cargarse. Puedes consultar la ficha y solicitar asesoría.",
            true,
          );
        }

        element.addEventListener("error", fail);

        element.addEventListener(
          "load",
          () => {
            if (request !== generation || !modal.open) return;

            clearTimeout(timer);
            host.setAttribute("aria-busy", "false");

            status.hidden = true;
            help.hidden = false;
          },
          {
            once: true,
          },
        );

        showStatus(
          "Cargando modelo 3D",
          "La primera carga puede tardar unos segundos.",
        );

        timer = setTimeout(fail, 60000);

        host.append(element);
        element.setAttribute("src", active.settings.src);
      }

      document.addEventListener("click", (event) => {
        const button = event.target.closest("[data-open-model-3d]");

        if (!button || modal.open) return;

        const key = button.getAttribute("data-open-model-3d") || "";

        const brand = String(
          button.getAttribute("data-3d-brand") || key.split("-")[0],
        )
          .trim()
          .toLowerCase();

        const indexAttribute = button.getAttribute("data-3d-index");

        // La clave marca-modelo tiene prioridad sobre el índice.
        const index = key
          ? models[brand]?.findIndex(
              (item) => `${brand}-${item.name.toLowerCase()}` === key,
            )
          : Number(indexAttribute);

        const data = models[brand]?.[index];

        if (!data) return;

        opener = button;

        active = {
          brand,
          data,
          settings: config[key] || {},
        };

        modal.style.setProperty(
          "--model-3d-accent",
          brand === "daf" ? "#0076b9" : "#c4122f",
        );

        document.getElementById("model3dBrand").textContent =
          `${brand.toUpperCase()} · EXPERIENCIA 3D`;

        document.getElementById("model3dTitle").textContent = data.name;

        document.getElementById("model3dDescription").textContent = data.desc;

        const specs = document.getElementById("model3dSpecifications");

        specs.replaceChildren();

        const entries = Object.entries(active.settings.specs || {});

        for (const [label, value] of entries) {
          const row = document.createElement("div");
          const term = document.createElement("dt");
          const definition = document.createElement("dd");

          term.textContent = label;

          definition.textContent =
            typeof value === "string" && value.trim()
              ? value
              : "Pendiente de confirmar";

          row.append(term, definition);
          specs.append(row);
        }

        const hasCompleteSpecs =
          entries.length &&
          entries.every(
            ([, value]) => typeof value === "string" && value.trim(),
          );

        modal.querySelector(".model-3d-modal__note").textContent =
          (hasCompleteSpecs ? "" : "Ficha pendiente de completar y validar. ") +
          "La configuración final depende de la versión y la aplicación. La representación 3D es ilustrativa.";

        previousOverflow = document.documentElement.style.overflow;

        modal.showModal();
        document.documentElement.style.overflow = "hidden";

        close.focus();
        loadActiveModel();
      });

      close.addEventListener("click", () => {
        modal.close();
      });

      retry.addEventListener("click", loadActiveModel);

      document.getElementById("resetModel3d").addEventListener("click", () => {
        if (!viewer) return;

        viewer.cameraOrbit = "35deg 75deg 105%";
        viewer.cameraTarget = "auto auto auto";
        viewer.fieldOfView = "30deg";

        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
          viewer.jumpCameraToGoal();
        }
      });

      let outsidePress = false;

      /** Detecta clics fuera del área del visor para cerrar el diálogo. */
      function outside(event) {
        const box = modal.getBoundingClientRect();

        return (
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom
        );
      }

      modal.addEventListener("pointerdown", (event) => {
        outsidePress = outside(event);
      });

      modal.addEventListener("click", (event) => {
        if (event.target === modal && outsidePress && outside(event)) {
          modal.close();
        }

        outsidePress = false;
      });

      modal.addEventListener("close", () => {
        disposeViewer();

        document.documentElement.style.overflow = previousOverflow;

        if (opener?.isConnected) {
          opener.focus({ preventScroll: true });
        }
      });

      document
        .getElementById("model3dQuote")
        .addEventListener("click", (event) => {
          const form = document.getElementById("unitsQuoteForm");

          const target = document.getElementById("cotizador");

          if (!target) return;

          event.preventDefault();

          const brandSelect = document.getElementById("quoteBrand");

          const modelSelect = document.getElementById("quoteModel");

          if (brandSelect && modelSelect && active) {
            brandSelect.value = active.brand === "daf" ? "DAF" : "Kenworth";

            brandSelect.dispatchEvent(new Event("change", { bubbles: true }));

            modelSelect.value = active.data.name;
          }

          modal.close();

          requestAnimationFrame(() => {
            target.scrollIntoView({
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            });

            form
              ?.querySelector('input:not([type="hidden"]), select')
              ?.focus({ preventScroll: true });
          });
        });
    })();
  }

  /* =======================================================
     INICIALIZACIÓN
  ======================================================= */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeUnitsPage, {
      once: true,
    });
  } else {
    initializeUnitsPage();
  }
})();
