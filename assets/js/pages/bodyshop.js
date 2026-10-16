/* DOCUMENTACIÓN DEL MÓDULO
   Capacidades, ventanas informativas, carrusel y formulario de valoración.
   Se ejecuta con el DOM disponible. Los catálogos son datos locales editables.
   Los formularios sólo preparan información; no existe API de recepción.
   No renombrar recursos: GitHub Pages distingue mayúsculas y minúsculas.
*/
const capabilities = [
  {
    n: "01",
    title: "Pintura y acabado",
    sub: "Imagen renovada",
    copy: "Cabina especializada, igualación de color y acabados para devolver presencia a tu unidad.",
    img: "https://youngstownkenworth.com/content/uploads/2021/09/body-shop.jpg",
    tags: [
      "Cambio de color",
      "Pintura de chasis",
      "Franjeado",
      "Acabado profesional",
    ],
  },
  {
    n: "02",
    title: "Geometría y chasis",
    sub: "Precisión estructural",
    copy: "Medición y enderezado especializado para recuperar alineación, geometría y estabilidad.",
    img: "https://truckservice.info.pl/wp-content/uploads/2021/06/prostowanie-ram-truck-service-13.jpg",
    tags: [
      "Banco JOSAM",
      "Medición láser",
      "Ejes y chasis",
      "Calor controlado",
    ],
  },
  {
    n: "03",
    title: "Atención a siniestros",
    sub: "Un proceso, un responsable",
    copy: "Acompañamos la valoración, presupuesto, reparación y seguimiento con tu aseguradora.",
    img: "https://www.tlgtrucks.com/Portals/0/adam/Hero/xBE10JZuTkWp2H2daXbl2w/Image/TLG_Semi-Truck-Body-Shop-Hero.jpg?mode=crop&w=1920",
    tags: ["Avalúo", "Documentación", "Refacciones", "Seguimiento"],
  },
];
let activeCapability = 0;
const $ = (selector) => document.querySelector(selector);
/** Actualiza capacidad instalada, fotografía, beneficios y selector de Bodyshop. */
function renderCapability() {
  const c = capabilities[activeCapability];
  $("#capNav").innerHTML = capabilities
    .map(
      (x, i) =>
        `<button class="${i === activeCapability ? "active" : ""}" data-cap="${i}"><span>${x.n}</span><b>${x.title}</b><i>↗</i></button>`,
    )
    .join("");
  $("#capImage").src = c.img;
  $("#capImage").alt = c.title;
  $("#capIndex").textContent = c.n + " / 03";
  $("#capSub").textContent = c.sub;
  $("#capTitle").textContent = c.title;
  $("#capCopy").textContent = c.copy;
  $("#capTags").innerHTML = c.tags.map((x) => `<span>✓ ${x}</span>`).join("");
  document.querySelectorAll("[data-cap]").forEach(
    (b) =>
      (b.onclick = () => {
        activeCapability = Number(b.dataset.cap);
        renderCapability();
      }),
  );
}
/* El catálogo de capacidad instalada se genera al cargar esta página. */
if (document.getElementById("capNav")) renderCapability();

(() => {
  "use strict";

  /** Enlaza los diálogos de especialidades y su navegación accesible. */
  function initializeBodyshopDetails() {
    const section = document.getElementById("bodyshopEspecialidades");
    const dialog = document.getElementById("bsDetails");

    if (!section || !dialog || dialog.dataset.initialized) return;
    dialog.dataset.initialized = "true";

    // Personaliza aquí la información de las ventanas.
    const information = {
      pintura: {
        title: "Cabina de pintura",
        description:
          "Equipadas con la mejor tecnología que permite operar 365 días, los 7 días a la semana, con capacidad para pintar camiones y tracto camiones, autobuses y más sin importar las condiciones del clima. Nuestras cabinas de pintura, permite ahorrar tiempo ya que el proceso de secado es de 2 horas, logrando un acabado impecable en cada trabajo, alcanzando estándares de calidad de planta.",
        points: [
          "Baño de pintura cubrimiento general al mismo color.",
          "Mi Estilo: cambio de color a unidad.",
          "Pintura de chasis pintado al mismo color.",
          "Retiro o colocación de franjeado.",
          "Equipo para remachar chasis con servicio a domicilio.",
          "Diagnóstico general con servicio a domicilio.",
        ],
      },

      enderezado: {
        title: "Banco de enderezado",
        description:
          "El uso adecuado de equipo especializado en la reparación de carrocerías facilita y mejora la calidad cuidando la integridad del operador y la seguridad activa y pasiva de la unidad.",
        points: [
          "El diseño de nuestro banco de enderezado de marca JOSAM, permite enderezar un chasis de camión dañado sin necesidad de desmontar los ejes, ni la cabina, teniendo en cuenta que un chasis dañado requiere de un tratamiento en particular.",
          "Sistema de medición láser que es un sistema seguro y preciso para la medición de ruedas y ejes, así como del chasis en Tracto camiones, camiones, grúas móviles y autobuses.",
          "La reparación del chasis se realiza a través de inducción de calor, evitando daños estructurales, asegurando la óptima seguridad en la reparación.",
        ],
      },

      generales: {
        title: "Servicios generales",
        description:
          "Cuéntanos qué necesita tu unidad. Nuestro equipo te orientará " +
          "para identificar la atención adecuada y preparar una valoración.",
        points: [
          "Diagnósticos",
          "Presupuestos",
          "Pago de daños",
          "Trámites ante compañía de seguro",
          "Avalúo",
          "Asesorías",
          "Diagnóstico de documentos y estado legal de la unidad",
          "Venta de refacciones OEM, Nacionales y Restauradas",
        ],
      },
    };

    const title = dialog.querySelector("#bsDetailsTitle");
    const description = dialog.querySelector("#bsDetailsDescription");
    const list = dialog.querySelector("#bsDetailsList");
    const image = dialog.querySelector("#bsDetailsImage");
    const closeButton = dialog.querySelector(".bs-details__close");
    const contactLink = dialog.querySelector(".bs-details__action");

    const insurers = dialog.querySelector("#bsInsurers");

    if (insurers) {
      const track = insurers.querySelector(".bs-insurers__track");
      const group = insurers.querySelector(".bs-insurers__group");
      const pauseButton = insurers.querySelector(".bs-insurers__pause");

      // Copia visual para que el desplazamiento sea continuo.
      if (track && group) {
        const duplicate = group.cloneNode(true);
        duplicate.setAttribute("aria-hidden", "true");
        track.appendChild(duplicate);
      }

      pauseButton?.addEventListener("click", () => {
        const paused = insurers.classList.toggle("is-paused");

        pauseButton.textContent = paused ? "Reanudar" : "Pausar";
        pauseButton.setAttribute("aria-pressed", String(paused));
      });
    }

    let lastTrigger = null;

    section.addEventListener("click", (event) => {
      const button = event.target.closest("[data-bs-service]");

      if (!button || !section.contains(button)) return;

      const item = information[button.dataset.bsService];
      if (!item) return;

      const sourceImage = button
        .closest(".bs-service")
        .querySelector(".bs-service__photo img");

      title.textContent = item.title;
      description.textContent = item.description;

      // Mostrar aseguradoras únicamente en Servicios generales.
      if (insurers) {
        insurers.hidden = button.dataset.bsService !== "generales";
      }

      list.replaceChildren(
        ...item.points.map((point) => {
          const li = document.createElement("li");
          li.textContent = point;
          return li;
        }),
      );

      // Utiliza la misma fotografía de la tarjeta.
      image.src = sourceImage.currentSrc || sourceImage.src;
      image.alt = sourceImage.alt;

      lastTrigger = button;

      if (!dialog.open) {
        dialog.showModal();
        document.body.classList.add("bs-details-open");
      }

      dialog.scrollTop = 0;
    });

    closeButton.addEventListener("click", () => dialog.close());

    // Cerrar al pulsar fuera de la tarjeta.
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;

      const bounds = dialog.getBoundingClientRect();

      const outside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

      if (outside) dialog.close();
    });

    contactLink.addEventListener("click", () => dialog.close());

    // También se ejecuta al cerrar con Escape.
    dialog.addEventListener("close", () => {
      document.body.classList.remove("bs-details-open");
      lastTrigger?.focus({ preventScroll: true });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeBodyshopDetails, {
      once: true,
    });
  } else {
    initializeBodyshopDetails();
  }
})();

(() => {
  /** Controla promociones, pausa, temporización y preferencias de movimiento. */
  function initializeBodyshopPromotions() {
    const carousel = document.getElementById("bodyshopPromociones");

    if (!carousel || carousel.dataset.initialized === "true") return;

    const slides = [...carousel.querySelectorAll(".bs-promos__slide")];

    if (!slides.length) return;

    carousel.dataset.initialized = "true";

    const controls = carousel.querySelector(".bs-promos__controls");
    const previous = carousel.querySelector("[data-promo-prev]");
    const next = carousel.querySelector("[data-promo-next]");
    const pause = carousel.querySelector("[data-promo-pause]");
    const dotsContainer = carousel.querySelector("[data-promo-dots]");
    const currentLabel = carousel.querySelector("[data-promo-current]");
    const totalLabel = carousel.querySelector("[data-promo-total]");
    const status = carousel.querySelector("[data-promo-status]");

    const interval = 6000; // Tiempo entre promociones.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let current = 0;
    let timer = null;
    let paused = reducedMotion.matches;
    let hovered = false;
    let focused = false;

    const formatNumber = (number) => String(number).padStart(2, "0");

    totalLabel.textContent = formatNumber(slides.length);

    const dots = slides.map((slide, index) => {
      slide.setAttribute("aria-label", `${index + 1} de ${slides.length}`);

      const button = document.createElement("button");

      button.type = "button";
      button.setAttribute("aria-label", `Mostrar promoción ${index + 1}`);

      button.addEventListener("click", () => {
        showSlide(index, true);
      });

      dotsContainer.appendChild(button);
      return button;
    });

    /** Actualiza el indicador de tiempo sin alterar la promoción elegida. */
    function updateTimer() {
      window.clearInterval(timer);
      timer = null;

      if (
        paused ||
        hovered ||
        focused ||
        document.hidden ||
        slides.length < 2
      ) {
        return;
      }

      timer = window.setInterval(() => {
        showSlide(current + 1);
      }, interval);
    }

    /** Activa una diapositiva y sincroniza su contador y estado visual. */
    function showSlide(index, announce = false) {
      current = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== current;
      });

      dots.forEach((dot, dotIndex) => {
        dot.setAttribute("aria-pressed", String(dotIndex === current));
      });

      currentLabel.textContent = formatNumber(current + 1);

      if (announce) {
        const title = slides[current].querySelector("h3").textContent;

        status.textContent = `Promoción ${current + 1} de ${slides.length}: ${title}`;
      }

      updateTimer();
    }

    /** Sincroniza texto y estado accesible del control de pausa. */
    function updatePauseButton() {
      pause.textContent = paused ? "Reanudar" : "Pausar";
      pause.setAttribute("aria-pressed", String(paused));
    }

    previous.addEventListener("click", () => {
      showSlide(current - 1, true);
    });

    next.addEventListener("click", () => {
      showSlide(current + 1, true);
    });

    pause.addEventListener("click", () => {
      paused = !paused;
      updatePauseButton();
      updateTimer();
    });

    // Detener el movimiento mientras se consulta el contenido.
    carousel.addEventListener("mouseenter", () => {
      hovered = true;
      updateTimer();
    });

    carousel.addEventListener("mouseleave", () => {
      hovered = false;
      updateTimer();
    });

    carousel.addEventListener("focusin", () => {
      focused = true;
      updateTimer();
    });

    carousel.addEventListener("focusout", (event) => {
      focused = carousel.contains(event.relatedTarget);
      updateTimer();
    });

    document.addEventListener("visibilitychange", updateTimer);

    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        paused = true;
        updatePauseButton();
        updateTimer();
      }
    });

    controls.hidden = slides.length < 2;

    updatePauseButton();
    showSlide(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeBodyshopPromotions,
      { once: true },
    );
  } else {
    initializeBodyshopPromotions();
  }
})();

(() => {
  /** Prepara el asistente local de valoración y evita inicializaciones repetidas. */
  function iniciarFormularioBodyshop() {
    const form = document.getElementById("bsQuoteForm");

    if (!form || form.dataset.bsFormReady === "true") return;

    const pasos = Array.from(form.querySelectorAll("[data-bs-quote-step]"));

    const anterior = form.querySelector("#bsQuoteBack");
    const siguiente = form.querySelector("#bsQuoteNext");
    const numero = form.querySelector("#bsQuoteStepNumber");
    const nombre = form.querySelector("#bsQuoteStepName");
    const progreso = form.querySelector("#bsQuoteProgress");
    const barra = form.querySelector("#bsQuoteProgressBar");
    const campos = form.querySelector("#bsQuoteFields");
    const acciones = form.querySelector("#bsQuoteActions");
    const resultado = form.querySelector("#bsQuoteResult");
    const reiniciar = form.querySelector("#bsQuoteRestart");
    const mensaje = form.querySelector("#bsQuoteStatus");

    const elementos = [
      anterior,
      siguiente,
      numero,
      nombre,
      progreso,
      barra,
      campos,
      acciones,
      resultado,
      reiniciar,
      mensaje,
    ];

    if (!pasos.length || elementos.some((elemento) => !elemento)) {
      console.error(
        "BodyShop: el HTML del formulario está incompleto. " +
          "Revisa que conserve los identificadores bsQuote.",
      );
      return;
    }

    form.dataset.bsFormReady = "true";
    form.noValidate = true;

    const indicadores = Array.from(
      form.closest(".bs-quote")?.querySelectorAll(".bs-quote__steps li") || [],
    );

    const nombres = ["TUS DATOS", "TU UNIDAD", "TIPO DE ATENCIÓN"];

    let pasoActual = 0;

    /** Muestra el paso activo de valoración y actualiza el progreso. */
    function mostrarPaso(enfocar = false) {
      pasos.forEach((paso, indice) => {
        paso.hidden = indice !== pasoActual;
      });

      indicadores.forEach((indicador, indice) => {
        if (indice === pasoActual) {
          indicador.setAttribute("aria-current", "step");
        } else {
          indicador.removeAttribute("aria-current");
        }
      });

      numero.textContent = `PASO ${pasoActual + 1} DE ${pasos.length}`;

      nombre.textContent = nombres[pasoActual] || "";

      barra.style.width = `${((pasoActual + 1) / pasos.length) * 100}%`;

      progreso.setAttribute("aria-valuenow", String(pasoActual + 1));

      anterior.disabled = pasoActual === 0;

      siguiente.textContent =
        pasoActual === pasos.length - 1
          ? "Preparar valoración →"
          : "Continuar →";

      mensaje.textContent = "";
      mensaje.style.color = "";

      if (enfocar) {
        pasos[pasoActual]
          .querySelector("input, select, textarea")
          ?.focus({ preventScroll: true });
      }
    }

    /** Devuelve el primer campo que no cumple las reglas del paso visible. */
    function buscarCampoInvalido(paso) {
      const controles = Array.from(
        paso.querySelectorAll("input, select, textarea"),
      );

      // Evita aceptar espacios como respuesta obligatoria.
      controles.forEach((control) => {
        if (
          control.tagName === "TEXTAREA" ||
          (control.tagName === "INPUT" &&
            ["text", "email", "tel"].includes(control.type))
        ) {
          control.value = control.value.trim();
        }
      });

      return controles.find(
        (control) => !control.disabled && !control.checkValidity(),
      );
    }

    /** Expone el error del campo y mueve el foco para corregirlo. */
    function mostrarError(control) {
      mensaje.textContent =
        "Completa los campos obligatorios (*) y revisa el formato del correo.";

      mensaje.style.color = "#c41230";

      control.focus();
      control.reportValidity();
    }

    /** Valida antes de pasar al siguiente paso o preparar el resumen local. */
    function avanzar(evento) {
      evento?.preventDefault();

      const invalido = buscarCampoInvalido(pasos[pasoActual]);

      if (invalido) {
        mostrarError(invalido);
        return;
      }

      if (pasoActual < pasos.length - 1) {
        pasoActual++;
        mostrarPaso(true);
        return;
      }

      // Revisar todos los pasos antes de finalizar.
      for (let indice = 0; indice < pasos.length; indice++) {
        const campoInvalido = buscarCampoInvalido(pasos[indice]);

        if (campoInvalido) {
          pasoActual = indice;
          mostrarPaso();
          mostrarError(campoInvalido);
          return;
        }
      }

      /*
       * Datos disponibles para conectar posteriormente el envío:
       * const datos = new FormData(form);
       */

      campos.hidden = true;
      acciones.hidden = true;
      resultado.hidden = false;

      mensaje.style.color = "";
      mensaje.textContent =
        "Información preparada en esta página. Todavía no se ha enviado.";

      const titulo = resultado.querySelector("h3");

      if (titulo) {
        titulo.tabIndex = -1;
        titulo.focus({ preventScroll: true });
      }
    }

    siguiente.addEventListener("click", avanzar);
    form.addEventListener("submit", avanzar);

    anterior.addEventListener("click", (evento) => {
      evento.preventDefault();

      if (pasoActual > 0) {
        pasoActual--;
        mostrarPaso(true);
      }
    });

    reiniciar.addEventListener("click", (evento) => {
      evento.preventDefault();

      form.reset();
      pasoActual = 0;

      campos.hidden = false;
      acciones.hidden = false;
      resultado.hidden = true;

      mostrarPaso(true);
    });

    mostrarPaso();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarFormularioBodyshop, {
      once: true,
    });
  } else {
    iniciarFormularioBodyshop();
  }
})();
