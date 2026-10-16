/* DOCUMENTACIÓN DEL MÓDULO
   Utilidades compartidas: año del footer y recursos de imagen ausentes.
   Se ejecuta con el DOM disponible. Los catálogos son datos locales editables.
   Los formularios sólo preparan información; no existe API de recepción.
   No renombrar recursos: GitHub Pages distingue mayúsculas y minúsculas.
*/
/* KENWORTH DEL CENTRO · COMPORTAMIENTO COMPARTIDO
   Cargado con defer en las siete páginas. No requiere backend ni compilación.
   El demo prepara formularios localmente: no envía ni persiste datos.
   Rutas y nombres de archivos conservados; usar mayúsculas exactas en Linux.
*/
(() => {
  "use strict";
  // Mantiene el año del footer en un solo lugar, sin repetir scripts inline.
  const year = document.getElementById("baceFooterYear");
  if (year) year.textContent = String(new Date().getFullYear());

  // Los recursos ausentes siguen apuntando a su ruta original para su reposición.
  /** Sustituye el indicador de imagen rota por una etiqueta sin modificar su ruta original. */
  function showMissingImage(image) {
    if (
      !(image instanceof HTMLImageElement) ||
      !image.getAttribute("src") ||
      image.dataset.missingHandled
    )
      return;
    image.dataset.missingHandled = "true";
    if (image.alt === "" || image.getAttribute("aria-hidden") === "true") {
      image.hidden = true;
      return;
    }
    const placeholder = document.createElement("span");
    const isLogo = image.src.toLowerCase().includes("/logos/");
    placeholder.className =
      "demo-asset-placeholder" +
      (isLogo ? " demo-asset-placeholder--logo" : "");
    placeholder.textContent = image.alt + (isLogo ? "" : " · Imagen pendiente");
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute(
      "aria-label",
      image.alt + ". Recurso no incluido o no disponible en el demo.",
    );
    image.hidden = true;
    image.after(placeholder);
  }
  // Captura también errores de imágenes creadas después por los catálogos.
  document.addEventListener(
    "error",
    (event) => showMissingImage(event.target),
    true,
  );
  document.querySelectorAll("img").forEach((image) => {
    if (image.complete && !image.naturalWidth) showMissingImage(image);
  });
})();
