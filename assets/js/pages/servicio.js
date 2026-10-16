/* DOCUMENTACIÓN DEL MÓDULO
   Catálogo de servicios, programas Kenworth/DAF y preparación de citas.
   Se ejecuta con el DOM disponible. Los catálogos son datos locales editables.
   Los formularios sólo preparan información; no existe API de recepción.
   No renombrar recursos: GitHub Pages distingue mayúsculas y minúsculas.
*/
(() => {
  "use strict";

  /* =====================================================
     01. CONTENIDO DEL ORIENTADOR
     La sección puede eliminarse del HTML.
     ===================================================== */

  const serviceNeeds = {
    preventive: {
      title: "Truck Care · IPK",
      text: "Programa la atención antes de que una falla detenga tu operación.",
      target: "#programas",
      form: "Mantenimiento preventivo",
    },

    corrective: {
      title: "Taller especializado",
      text: "Atención especializada para recuperar desempeño, seguridad y disponibilidad.",
      target: "#servicios",
      form: "Diagnóstico o reparación",
    },

    fleet: {
      title: "Taller Móvil · In House",
      text: "Llevamos capacidad técnica a tus instalaciones y reducimos traslados improductivos.",
      target: "#servicios",
      form: "Taller Móvil",
    },

    emergency: {
      title: "Rescate Carretero 365",
      text: "Activa asistencia y seguimiento para volver al camino lo antes posible.",
      target: "#rescate",
      form: "Rescate Carretero",
    },
  };

  /* =====================================================
     02. CATÁLOGO DE SERVICIOS
     ===================================================== */

  const serviceCatalog = {
    movil: {
      number: "01",
      title: "Taller Móvil",
      kicker: "SERVICIO DONDE ESTÁ TU FLOTA",
      text: "Mantenimiento preventivo y correctivo en tus instalaciones, de día o de noche, con técnicos certificados y herramienta especializada.",
      facts: [
        "Motor y tren motriz",
        "Frenos y suspensión",
        "Sistema de urea y EGR",
        "Atención multimarca",
      ],
      action: "AGENDA TU CITA",
    },

    inhouse: {
      number: "02",
      title: "Taller InHouse",
      kicker: "TALLER KENWORTH DAF EN TUS INSTALACIONES",
      text: "Un esquema para flotas mayores a 50 unidades que integra atención multimarca, seguimiento técnico y mantenimiento dentro de tus instalaciones.",
      facts: [
        "Flotas de gran tamaño",
        "Atención multimarca",
        "Técnicos certificados",
        "Menos traslados",
      ],
      action: "Evaluar mi flota",
    },

    truckcare: {
      number: "03",
      title: "TRUCK CARE",
      kicker: "MANTENIMIENTO PREPAGADO",
      text: "Congela el precio de tus mantenimientos hasta por dos años y reserva previamente bahía, técnico y refacciones.",
      facts: [
        "Precio fijo",
        "Cobertura nacional",
        "Servicio Express",
        "IPK incluida",
      ],
      action: "Conocer paquetes",
    },

    campo: {
      number: "04",
      title: "Ingeniero de Campo",
      kicker: "RENDIMIENTO Y PRODUCTIVIDAD",
      text: "Asesoría especializada para aprovechar mejor cada unidad KENWORTH y DAF, identificar oportunidades de eficiencia y elevar la productividad de la operación.",
      facts: [
        "Análisis de rendimiento",
        "Acompañamiento técnico",
        "Mejores prácticas",
        "Decisiones con datos",
      ],
      action: "Solicitar asesoría",
    },

    ipk: {
      number: "05",
      title: "IPK",
      kicker: "INSPECCIÓN PROFESIONAL KENWORTH",
      text: "Diagnóstico general mediante una revisión estructurada que identifica prioridades de seguridad, mantenimiento y reparación.",
      facts: [
        "Más de 140 puntos",
        "Resultado por semáforo",
        "Prevención de fallas",
        "Mayor vida útil",
      ],
      action: "Agendar inspección",
    },
  };

  /* =====================================================
     03. PROGRAMAS POR MARCA
     ===================================================== */

  const brandPrograms = {
    kenworth: {
      className: "kw",
      small: "TARIFAS CONGELADAS",
      title: "TRUCK CARE",
      text: "No importa donde te encuentres, las unidades con Kenworth Truck Care tendrán el respaldo de nuestra amplia red de concesionarios participantes ofreciéndoles en cada taller el mismo nivel de servicio, refacciones originales y mano de obra calificada.",
      benefits: [
        "Precio fijo",
        "Servicio Express",
        "Cobertura nacional",
        "IPK incluida",
        "Concierge",
        "Garantía extendida",
      ],
      mark: "TRUCK<br>CARE",
    },

    daf: {
      className: "daf",
      small: "DAF MULTISUPPORT",
      title: "Tu DAF respaldado en cada ruta.",
      text: "Programa de mantenimiento preventivo con soporte de la Red de Concesionarios Kenworth DAF y atención continua mediante el Centro de Contacto DAF. ",
      benefits: [
        "Atención 24/7",
        "Precio nacional",
        "Citas programadas",
        "Refacciones originales",
      ],
      mark: "MULTI<br>SUPPORT",
    },
  };

  /* =====================================================
     04. INICIALIZACIÓN
     Cada sección se comprueba antes de utilizarla.
     ===================================================== */

  /** Enlaza catálogo de servicios, programas por marca y solicitud de cita. */
  function initializeServicePage() {
    const appointmentType = document.getElementById("serviceAppointmentType");

    /*
      Selecciona una opción del formulario por su valor
      o por el texto visible. Si no existe, conserva la selección.
    */
    /** Preselecciona en el formulario el servicio consultado por el visitante. */
    function selectAppointmentType(requested) {
      if (!appointmentType) return;

      const option = [...appointmentType.options].find((entry) => {
        return entry.value === requested || entry.text.trim() === requested;
      });

      if (option) {
        appointmentType.value = option.value;
      }
    }

    /* ---------------------------------------------------
       ORIENTADOR OPCIONAL
       --------------------------------------------------- */

    const orientador = document.getElementById("orientador");

    if (orientador) {
      const recommendationTitle = orientador.querySelector(
        "#serviceRecommendationTitle",
      );

      const recommendationText = orientador.querySelector(
        "#serviceRecommendationText",
      );

      const recommendationLink = orientador.querySelector(
        "#serviceRecommendationLink",
      );

      const needButtons = orientador.querySelectorAll("[data-need]");

      /** Presenta una recomendación para la necesidad de mantenimiento elegida. */
      function selectNeed(id) {
        const item = serviceNeeds[id];

        if (
          !item ||
          !recommendationTitle ||
          !recommendationText ||
          !recommendationLink
        ) {
          return;
        }

        recommendationTitle.textContent = item.title;
        recommendationText.textContent = item.text;
        recommendationLink.href = item.target;

        needButtons.forEach((button) => {
          button.classList.toggle("active", button.dataset.need === id);
        });

        selectAppointmentType(item.form);
      }

      needButtons.forEach((button) => {
        button.addEventListener("click", () => {
          selectNeed(button.dataset.need);
        });
      });

      selectNeed("preventive");
    }

    /* ---------------------------------------------------
       CATÁLOGO DE SERVICIOS
       --------------------------------------------------- */

    const serviceStage = document.getElementById("serviceStage");

    if (serviceStage) {
      const serviceButtons = document.querySelectorAll("[data-service]");

      /** Renderiza la ficha del servicio y preselecciona su solicitud de atención. */
      function selectService(id) {
        const item = serviceCatalog[id];

        if (!item) return;

        // Logos únicamente para Taller Móvil e IPK
        const serviceLogos = {
          movil: "assets/images/logos/tm.png",
          ipk: "assets/images/logos/IPK.png",
        };

        const logoHtml = `
          <div
            class="service-stage__logo"
            ${serviceLogos[id] ? "" : 'aria-hidden="true"'}
          >
            ${
              serviceLogos[id]
                ? `
              <img
                src="${serviceLogos[id]}"
                alt="${item.title}"
              >
            `
                : ""
            }
          </div>
        `;

        serviceStage.innerHTML = `
          <span class="giant-number">${item.number}</span>

          <small>${item.kicker}</small>

          <h3>${item.title}</h3>

          <p>${item.text}</p>

          ${logoHtml}

          <div class="facts">
            ${item.facts
              .map(
                (fact) => `
              <span>✓ ${fact}</span>
            `,
              )
              .join("")}
          </div>

          <a href="#cita" data-service-request="${item.title}">
            ${item.action}
            <span aria-hidden="true">↗</span>
          </a>
        `;

        serviceButtons.forEach((button) => {
          const active = button.dataset.service === id;

          button.classList.toggle("active", active);
          button.setAttribute("aria-selected", String(active));
        });

        const requestLink = serviceStage.querySelector(
          "[data-service-request]",
        );

        requestLink?.addEventListener("click", () => {
          const requested =
            item.title === "IPK" ? "Inspección IPK" : item.title;

          selectAppointmentType(requested);
        });
      }

      serviceButtons.forEach((button) => {
        button.addEventListener("click", () => {
          selectService(button.dataset.service);
        });
      });

      selectService("movil");

      // Mantener la misma altura al cambiar de servicio
      /** Mide las fichas y evita saltos de altura; se ejecuta en el ámbito del catálogo. */
      function stabilizeServiceHeight() {
        const stage = document.getElementById("serviceStage");
        if (!stage || !stage.getBoundingClientRect().width) return;

        const activeButton = document.querySelector("[data-service].active");
        const currentService = activeButton?.dataset.service;

        const serviceIds = Object.keys(serviceCatalog);
        const selectedService = serviceIds.includes(currentService)
          ? currentService
          : serviceIds[0];

        // Medir sin una altura mínima impuesta previamente
        stage.style.height = "auto";
        stage.style.minHeight = "0px";

        let tallestHeight = 0;

        // Se ejecuta completo antes de que el navegador pinte el cambio
        serviceIds.forEach((id) => {
          selectService(id);

          tallestHeight = Math.max(
            tallestHeight,
            stage.getBoundingClientRect().height,
          );
        });

        // Restaurar la opción seleccionada y fijar la altura base
        selectService(selectedService);
        stage.style.minHeight = `${Math.ceil(tallestHeight)}px`;
      }

      // Primera medición
      requestAnimationFrame(stabilizeServiceHeight);

      // Recalcular cuando terminen de cargar las fuentes
      if (document.fonts) {
        document.fonts.ready.then(stabilizeServiceHeight);
      }

      // Recalcular al cambiar el tamaño de pantalla
      let serviceHeightFrame;

      window.addEventListener("resize", () => {
        cancelAnimationFrame(serviceHeightFrame);
        serviceHeightFrame = requestAnimationFrame(stabilizeServiceHeight);
      });

      /* ---------------------------------------------------
       PROGRAMAS KENWORTH Y DAF
       --------------------------------------------------- */
    } // Fin del catálogo y su medición responsiva.

    const brandStage = document.getElementById("serviceBrandProgram");

    if (brandStage) {
      const brandButtons = document.querySelectorAll("[data-service-brand]");

      /** Actualiza los programas de servicio disponibles para la marca seleccionada. */
      function selectBrand(brand) {
        const item = brandPrograms[brand];
        const stage = document.getElementById("serviceBrandProgram");

        if (!item || !stage) return;

        const isDaf = brand === "daf";

        const contactInformation = isDaf
          ? `
          <p class="brand-program__contact">
            Como cliente DAF Multisupport podrás utilizar nuestro
            Centro de Contacto DAF
            <a href="tel:8003238782">(800 323-8782)</a>,
            donde te apoyaremos en identificar el punto de servicio
            que más se adecue a tu ruta y logística.
          </p>
        `
          : "";

        const packageButton = `
        <a class="brand-program__packages" href="#cita">
          <span>Conocer paquetes</span>
          <span aria-hidden="true">↗</span>
        </a>
      `;

        stage.innerHTML = `
        <article class="brand-program ${item.className}">

          <div class="brand-program__content">

            <small>${item.small}</small>

            <h3>${item.title}</h3>

            <p>${item.text}</p>

            ${contactInformation}

            <ul class="brand-program__benefits">
              ${item.benefits
                .map(
                  (benefit) => `
                <li>
                  <span aria-hidden="true">✓</span>
                  <span>${benefit}</span>
                </li>
              `,
                )
                .join("")}
            </ul>

            ${packageButton}

          </div>

          <strong aria-hidden="true">${item.mark}</strong>

        </article>
      `;

        document.querySelectorAll("[data-service-brand]").forEach((button) => {
          const active = button.dataset.serviceBrand === brand;

          button.classList.toggle("active", active);
          button.setAttribute("aria-pressed", String(active));
        });
      }

      brandButtons.forEach((button) => {
        button.addEventListener("click", () => {
          selectBrand(button.dataset.serviceBrand);
        });
      });

      selectBrand("kenworth");
    }

    /* ---------------------------------------------------
       MENÚ ANTERIOR DE SERVICIO
       Se omite si utilizas el nuevo nav global.
       --------------------------------------------------- */

    /* Aparición progresiva de secciones; el menú es compartido. */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
        },
      );

      revealElements.forEach((element) => {
        observer.observe(element);
      });
    } else {
      revealElements.forEach((element) => {
        element.classList.add("visible");
      });
    }

    /* ---------------------------------------------------
       FORMULARIO DE CITA
       Conserva el comportamiento de demostración original.
       No realiza un envío al servidor.
       --------------------------------------------------- */

    const appointmentForm = document.getElementById("serviceAppointmentForm");

    appointmentForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const button = event.currentTarget.querySelector("button[type='submit']");

      if (button) {
        button.innerHTML = `
          Solicitud preparada
          <span aria-hidden="true">✓</span>
        `;
      }
    });
  }

  /* Espera a que el HTML esté disponible */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeServicePage, {
      once: true,
    });
  } else {
    initializeServicePage();
  }
})();
