/* DOCUMENTACIÓN DEL MÓDULO
   Cronología e identidad del grupo, con galerías de varias imágenes por año.
   Se ejecuta con el DOM disponible. Los catálogos son datos locales editables.
   Los formularios sólo preparan información; no existe API de recepción.
   No renombrar recursos: GitHub Pages distingue mayúsculas y minúsculas.
*/
/* =====================================================
   GRUPO BACE
   Historia · Cultura GPS
===================================================== */

(() => {
  "use strict";

  /* ===================================================
     HISTORIA
     Información conservada del archivo original.
  =================================================== */

  // Recursos pendientes del ZIP original: historia/2012.png, 2015.png y 2017.png.
  // Sus rutas permanecen disponibles para reponer las fotografías correspondientes.
  const timeline = [
    [
      "1923",
      "Nace Kenworth",
      "Nace Kenworth Motor Truck Company.",
      "assets/images/historia/1923.png",
    ],
    [
      "1959",
      "Kenworth Mexicana",
      "Nace Kenworth Mexicana, se colocan 153 tractocamiones orgullosamente mexicanos y se generan aproximadamente 200 empleos.",
      "assets/images/historia/1959.png",
    ],
    [
      "1967",
      "Inicia el camino BACE",
      "El Ing. Alfredo Martos Martínez inicia operaciones en León, atendiendo Guanajuato, Aguascalientes y Zacatecas.",
      "assets/images/historia/1967.png",
    ],
    [
      "1976",
      "Matriz León",
      "Se inaugura Kenworth del Centro Matriz en León; sus instalaciones operaron hasta 2015.",
      "assets/images/historia/1976.png",
    ],
    [
      "1996",
      "Expansión y reconocimiento",
      "Abren Querétaro y San Luis Potosí, se reinaugura Celaya y Kenworth del Centro recibe su primer Dealer del Año.",
      "assets/images/historia/1996.png",
    ],
    [
      "1997–2002",
      "La red crece",
      "Abren sucursales en Zacatecas, Aguascalientes, León, Irapuato, Celaya, San Juan del Río y San Luis Potosí.",
    ],
    [
      "2005",
      "Kenworth del Bajío",
      "Inicia operaciones en Querétaro para atender San Luis Potosí y Guanajuato.",
      "assets/images/historia/2005.png",
    ],
    [
      "2010",
      "Se consolida Grupo BACE",
      "Kenworth del Bajío y Kenworth del Centro unen fuerzas y abarcan cinco estados.",
      "assets/images/historia/2010.png",
    ],
    [
      "2012",
      "Dealer del Año",
      "Kenworth del Bajío BACE recibe por primera vez el reconocimiento Dealer del Año.",
      "assets/images/historia/2012.png",
    ],
    [
      "2013",
      "Primera TRP BACE",
      "Se inaugura en Aguascalientes la segunda sucursal TRP® de México y la primera del grupo.",
      "assets/images/historia/2013.png",
    ],
    [
      "2014",
      "Comienza Comanjilla",
      "Inicia la construcción de la nueva Matriz Comanjilla con instalaciones de alto nivel tecnológico.",
      "assets/images/historia/2014.png",
    ],
    [
      "2015",
      "Excelencia reconocida",
      "Kenworth del Centro BACE es reconocido nuevamente como Dealer del Año.",
      "assets/images/historia/2015.png",
    ],
    [
      "2016",
      "Comanjilla y Celaya III",
      "Se inauguran la Matriz Comanjilla y Celaya III, con CEDIS, unidades, refacciones y servicio.",
      ["assets/images/historia/2016.png", "assets/images/historia/2016_1.png"],
    ],
    [
      "2017",
      "Dealer del Año",
      "Kenworth del Centro BACE recibe nuevamente el reconocimiento Dealer del Año.",
      "assets/images/historia/2017.png",
    ],
    [
      "2019",
      "50 años de historia",
      "Kenworth del Centro celebra 50 años; abren TRP Ezequiel Montes, León Sur y Aguascalientes Poniente.",
      "assets/images/historia/2019.png",
    ],
    [
      "2020",
      "Más cobertura",
      "Abren Celaya Poniente y Taller León Norte; Kenworth del Bajío celebra 15 años atendiendo a más de 3,000 clientes.",
      [
        "assets/images/historia/2020.png",
        "assets/images/historia/2020_2.png",
        "assets/images/historia/2020_3.png",
      ],
    ],
    [
      "2021",
      "W990 en México",
      "Grupo BACE coloca las primeras unidades W990 en el país.",
      "assets/images/U Kenworth/w990-listings.png",
    ],
    [
      "2023",
      "Nuevas tiendas TRP",
      "Grupo BACE inaugura TRP Salamanca y TRP Rioverde.",
      ["assets/images/historia/2023.png", "assets/images/historia/2023_2.png"],
    ],
    [
      "2024",
      "CEDIS y llegada de DAF",
      "Inician operaciones los centros de distribución de Querétaro y León; DAF llega a México.",
      [
        "assets/images/historia/2024.png",
        "assets/images/Sucursales/Leon-Cedis.jpg",
        "assets/images/logos/LOGO DAF.jpg",
      ],
    ],
    [
      "HOY",
      "Tecnología para servir",
      "IA, datos y tecnologías modernas fortalecen los procesos internos y mejoran la atención al cliente.",
      "assets/images/historia/hoy.png",
    ],
  ];

  /* ===================================================
     CULTURA GPS · INFORMACIÓN EDITABLE

     name: nombre del valor.
     logo: ruta de su imagen.
     guides: cada texto se presenta como un párrafo.
  =================================================== */

  const cultureValues = {
    sueno: {
      name: "Nuestro sueño",
      logo: "assets/images/logos/gps/nuestro-sueno.png",
      guides: [
        "Ser una compañía que transforme el mundo que toca y deje un legado de bienestar y prosperidad en todas las personas con las que interactúe.",
        "Contribuir a eliminar el desempleo, el hambre y la pobreza de nuestro México, mediante la comercialización de Unidades de Carga, Refacciones y Servicio Postventa. Seremos las mejores concesionarias del mundo y nos reinventaremos constantemente, ofreciendo una gama de servicios cargados de un profundo sentido social.",
      ],
    },

    causa: {
      name: "Nuestra causa",
      logo: "assets/images/logos/gps/nuestra-causa.png",
      guides: [
        // Agrega aquí sus guías oficiales.
        "Estamos en el negocio de mejorar tu vida.",
        "Somos un motor económico para las comunidades que tocamos, pues ayudamos a las empresas a transformarse en negocios muy rentables que nunca se detengan.  ",
      ],
    },

    pasion: {
      name: "Pasión por el servicio Trascendental",
      logo: "assets/images/logos/gps/pasion-servicio.png",
      guides: [
        // Agrega aquí sus guías oficiales.
        "1. Siempre saluda mirando a los ojos y con una sonrisa.",

        "2. Sé puntual, cumple todos tus compromisos y llévalos hasta sus últimas consecuencias.",

        "3. Entrégate totalmente al servicio y genera soluciones creativas que se transformen en satisfacción para todos.",

        "4.Haz sentir a cada persona que es la más importante del mundo. ",
      ],
    },

    progreso: {
      name: "Espíritu de progreso",
      logo: "assets/images/logos/gps/espiritu-progreso.png",
      guides: [
        // Agrega aquí sus guías oficiales.
        "1. Comprométete a que cada cliente se convierta en una historia de éxito perdurable.",

        "2. Logra que las ventas nunca se detengan.",

        "3. Utiliza, cuida y ahorra los recursos como si fueran tuyos, haciendo más con menos.",

        "4. Encuentra todo lo positivo y las oportunidades que existen en cada situación.",
      ],
    },

    hermandad: {
      name: "Hermandad BACE",
      logo: "assets/images/logos/gps/hermandad-bace.png",
      guides: [
        // Agrega aquí sus guías oficiales.
        "1. Ve en cada compañero de causa un aliado de nuestro servicio, reconoce y celebra su éxito.",

        "2. Sé siempre agradable con todos; disfruta tu trabajo y haz que los demás disfruten el suyo. ",

        "3. Siempre di cosas buenas de los demás y de todo lo que te sucede.",

        "4. Ayuda siempre a tus compañeros y hazlo como te gustaría que lo hicieran contigo. ",
      ],
    },

    excelencia: {
      name: "Sed por la excelencia",
      logo: "assets/images/logos/gps/sed-excelencia.png",
      guides: [
        // Agrega aquí sus guías oficiales.
        "1. Sé experto en tu trabajo. Capacítate en áreas que no tienen que ver con tu actividad. ",

        "2. Reconoce y aprende de tus errores. ",

        "3. Logra que tu entorno, imagen, apariencia y acciones sean ejemplo para otros. ",

        "4. Presenta siempre a KENWORTH DAF BACE como LA MEJOR EMPRESA DEL MUNDO. ",
      ],
    },

    planeta: {
      name: "Amor por el planeta",
      logo: "assets/images/logos/gps/amor-planeta.png",
      guides: [
        // Agrega aquí sus guías oficiales.
        "1. No desperdicies. Ahorra y recicla todo lo que puedas. ",

        "2. Contribuye de manera activa con el bienestar del planeta. ",

        "3. Comprométete apasionadamente a una determinada labor social. ",

        "4. Por encima de todo, no hagas nada que sea ilegal. ",
      ],
    },
  };

  /* ===================================================
     UTILIDAD PARA CONTADORES
  =================================================== */

  const pad = (value) => String(value).padStart(2, "0");

  /* ===================================================
     MENÚ ANTERIOR

     Se omite automáticamente si ya utilizas el nav
     institucional y estos elementos no existen.
  =================================================== */

  /** Crea el selector de años y muestra el primer hito de la cronología. */
  function initializeHistory() {
    const ids = [
      "years",
      "historyYear",
      "historyIndex",
      "historyTitle",
      "historyCopy",
      "historyCount",
    ];

    const nodes = Object.fromEntries(
      ids.map((id) => [id, document.getElementById(id)]),
    );

    const missingIds = ids.filter((id) => !nodes[id]);

    if (missingIds.length) {
      console.error(
        "Faltan elementos de la línea del tiempo:",
        missingIds.join(", "),
      );
      return;
    }

    if (nodes.years.dataset.baceReady === "true") return;

    const gallery = nodes.historyYear
      .closest(".historyCard")
      ?.querySelector(".historyCard__media");

    const formatNumber = (value) => String(value).padStart(2, "0");

    let buttons = [];

    /** Acepta una o varias imágenes por hito y actualiza la galería. */
    function updateImages(item) {
      if (!gallery) return;

      // Aceptar una ruta o un arreglo de rutas.
      const configuredPaths = Array.isArray(item[3]) ? item[3] : [item[3]];

      const paths = configuredPaths
        .filter((path) => typeof path === "string" && path.trim())
        .map((path) => path.trim())
        .slice(0, 3);

      gallery.dataset.imageCount = String(paths.length);

      const images = paths.map((path, index) => {
        const image = document.createElement("img");

        image.id = index === 0 ? "historyImage" : "historyImage" + (index + 1);
        image.alt = item[1] + " · Imagen " + (index + 1);
        image.decoding = "async";

        image.addEventListener("error", () => {
          image.hidden = true;

          console.error(
            "No se pudo cargar la imagen histórica:",
            image.currentSrc || image.src,
          );
        });

        image.src = path;

        return image;
      });

      gallery.replaceChildren(...images);
    }

    /** Actualiza año, texto, fotografías, contador y estado del botón seleccionado. */
    function selectYear(index) {
      const item = timeline[index];

      if (!item) return;

      nodes.historyYear.textContent = item[0];
      nodes.historyIndex.textContent = "HITO " + formatNumber(index + 1);

      nodes.historyTitle.textContent = item[1];
      nodes.historyCopy.textContent = item[2];

      nodes.historyCount.textContent =
        formatNumber(index + 1) + " / " + timeline.length;

      updateImages(item);

      buttons.forEach((button, buttonIndex) => {
        const active = buttonIndex === index;

        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    }

    buttons = timeline.map((item, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.dataset.year = String(index);
      button.textContent = item[0];

      button.addEventListener("click", () => {
        selectYear(index);
      });

      return button;
    });

    nodes.years.replaceChildren(...buttons);

    selectYear(0);

    nodes.years.dataset.baceReady = "true";
  }

  /* ===================================================
     CULTURA GPS · SELECTOR DE VALORES
  =================================================== */

  /** Enlaza los valores institucionales y la navegación por teclado de sus pestañas. */
  function initializeBaceCulture() {
    const section = document.querySelector("#gps.bace-culture");

    if (!section || section.dataset.gpsReady === "true") return;

    const buttons = [...section.querySelectorAll("[data-bace-value]")];

    const panel = section.querySelector("#baceGpsPanel");
    const logo = section.querySelector("#baceGpsLogo");
    const title = section.querySelector("#baceGpsName");
    const guides = section.querySelector("#baceGpsGuides");
    const counter = section.querySelector("#baceGpsCount");

    if (!buttons.length || !panel || !logo || !title || !guides || !counter) {
      return;
    }

    section.dataset.gpsReady = "true";

    // Mostrar el logo cuando cargue correctamente.
    logo.addEventListener("load", () => {
      logo.hidden = logo.naturalWidth === 0;
    });

    // Evitar el icono de imagen rota si falta el archivo.
    logo.addEventListener("error", () => {
      logo.hidden = true;
    });

    /** Presenta logo, texto y guías del valor institucional seleccionado. */
    function selectValue(button, focus = false) {
      const item = cultureValues[button.dataset.baceValue];

      if (!item) return;

      const index = buttons.indexOf(button);

      // Actualizar el listado.
      buttons.forEach((entry) => {
        const active = entry === button;

        entry.classList.toggle("is-active", active);
        entry.setAttribute("aria-selected", String(active));
        entry.tabIndex = active ? 0 : -1;
      });

      // Actualizar la información.
      panel.setAttribute("aria-labelledby", button.id);
      title.textContent = item.name;

      counter.textContent = pad(index + 1) + " / " + pad(buttons.length);

      // Actualizar el logo.
      logo.hidden = true;
      logo.alt = item.name;

      if (logo.getAttribute("src") !== item.logo) {
        logo.src = item.logo;
      }

      if (logo.complete && logo.naturalWidth > 0) {
        logo.hidden = false;
      }

      // Actualizar las guías.
      // Mostrar cada guía como un elemento de lista.
      const texts = item.guides.filter(
        (text) => typeof text === "string" && text.trim(),
      );

      guides.replaceChildren();

      if (texts.length > 0) {
        const list = document.createElement("ul");

        list.className = "bace-culture__list";

        texts.forEach((text) => {
          const listItem = document.createElement("li");

          listItem.textContent = text;
          list.appendChild(listItem);
        });

        guides.appendChild(list);
      }

      if (focus) {
        button.focus({ preventScroll: true });
      }
    }

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        selectValue(button);
      });

      button.addEventListener("keydown", (event) => {
        let target;

        switch (event.key) {
          case "ArrowDown":
            target = (index + 1) % buttons.length;
            break;

          case "ArrowUp":
            target = (index - 1 + buttons.length) % buttons.length;
            break;

          case "Home":
            target = 0;
            break;

          case "End":
            target = buttons.length - 1;
            break;

          default:
            return;
        }

        event.preventDefault();
        selectValue(buttons[target], true);
      });
    });

    selectValue(buttons[0]);
  }

  /* ===================================================
     INICIALIZACIÓN GENERAL
  =================================================== */

  /** Inicializa historia y cultura de la página institucional. */
  function initializeBace() {
    initializeHistory();
    initializeBaceCulture();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeBace, {
      once: true,
    });
  } else {
    initializeBace();
  }
})();
