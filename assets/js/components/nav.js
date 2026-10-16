/* DOCUMENTACIÓN DEL MÓDULO
   Menú compartido: raíz relativa, página activa y navegación móvil.
   Se ejecuta con el DOM disponible. Los catálogos son datos locales editables.
   Los formularios sólo preparan información; no existe API de recepción.
   No renombrar recursos: GitHub Pages distingue mayúsculas y minúsculas.
*/
(() => {
  /* Calcula la raíz del sitio desde la ubicación de este archivo */
  const siteRoot = new URL("../../../", document.currentScript.src);
  const siteUrl = (path) => new URL(path, siteRoot).href;

  /* Edita aquí los enlaces del menú */
  const navigation = [
    { text: "INICIO", path: "index.html" },
    { text: "UNIDADES", path: "unidades-nuevas.html" },
    { text: "REFACCIONES", path: "refacciones.html" },
    { text: "SERVICIO", path: "servicio.html" },
    { text: "BODYSHOP", path: "bodyshop.html" },
    { text: "SEMINUEVOS", path: "Seminuevos.html" },
    { text: "GRUPO BACE", path: "Bace.html" },
  ];

  /** Construye el único menú compartido y enlaza su comportamiento responsivo. */
  function initializeNavigation() {
    const container = document.getElementById("bace-nav");

    if (!container || container.dataset.initialized) return;
    container.dataset.initialized = "true";

    container.innerHTML = `
      <div class="bace-topbar">
        <span>Gente con Pasión por Servir</span>

        <div class="bace-topbar__links">
          <a href="${siteUrl("index.html#sucursales")}">
            Sucursales
          </a>

          <a href="${siteUrl("index.html#contacto")}">
            Atención especializada
          </a>
        </div>
      </div>

      <nav class="bace-nav" aria-label="Navegación principal">

        <a
          class="bace-nav__brand"
          href="${siteUrl("index.html#inicio")}"
          aria-label="Inicio Kenworth DAF BACE"
        >
          <img
            src="${siteUrl("assets/images/logos/kw-daf-bace.png")}"
            alt="Kenworth DAF BACE"
          >
        </a>

        <button
          class="bace-nav__toggle"
          type="button"
          aria-controls="bace-nav-links"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          Menú
        </button>

        <div class="bace-nav__links" id="bace-nav-links">
          ${navigation
            .map(
              (item) => `
            <a
              class="bace-nav__link"
              href="${siteUrl(item.path)}"
            >
              ${item.text}
            </a>
          `,
            )
            .join("")}

          <a
            class="bace-nav__quote"
            href="${siteUrl("index.html#cotizar")}"
          >
            Cotiza tu unidad
            <span aria-hidden="true">↗</span>
          </a>
        </div>

      </nav>
    `;

    const menuButton = container.querySelector(".bace-nav__toggle");
    const menuLinks = container.querySelector(".bace-nav__links");
    const quoteLink = container.querySelector(".bace-nav__quote");

    /** Sincroniza el estado visual y ARIA del menú móvil. */
    function setMenuOpen(open) {
      menuLinks.classList.toggle("is-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "Cerrar" : "Menú";

      menuButton.setAttribute(
        "aria-label",
        open ? "Cerrar menú de navegación" : "Abrir menú de navegación",
      );
    }

    menuButton.addEventListener("click", () => {
      setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });

    /* Marca la página actual */
    container.querySelectorAll(".bace-nav__link").forEach((link) => {
      if (
        new URL(link.href).pathname === window.location.pathname ||
        (window.location.pathname === siteRoot.pathname &&
          new URL(link.href).pathname ===
            new URL("index.html", siteRoot).pathname)
      ) {
        link.setAttribute("aria-current", "page");
      }
    });

    /* Cierra el menú al seleccionar una opción */
    container.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    /* Cierra al pulsar fuera */
    document.addEventListener("click", (event) => {
      if (!container.contains(event.target)) setMenuOpen(false);
    });

    /* Cierra con Escape */
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        menuButton.getAttribute("aria-expanded") === "true"
      ) {
        setMenuOpen(false);
        menuButton.focus();
      }
    });

    /* Restablece el menú al regresar a escritorio */
    const desktop = window.matchMedia("(min-width: 1251px)");

    desktop.addEventListener("change", (event) => {
      if (event.matches) setMenuOpen(false);
    });

    /* En el index, desplaza al formulario sin recargar */
    quoteLink.addEventListener("click", (event) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return;

      const isIndex =
        window.location.pathname === new URL("index.html", siteRoot).pathname ||
        window.location.pathname === siteRoot.pathname;

      const quoteSection = document.getElementById("cotizar");

      if (!isIndex || !quoteSection) return;

      event.preventDefault();

      quoteSection.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeNavigation, {
      once: true,
    });
  } else {
    initializeNavigation();
  }
})();
