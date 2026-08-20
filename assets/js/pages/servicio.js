const serviceNeeds = {
  preventive: { title: "Truck Care · IPK", text: "Programa la atención antes de que una falla detenga tu operación.", target: "#programas", form: "Mantenimiento preventivo" },
  corrective: { title: "Taller especializado", text: "Atención especializada para recuperar desempeño, seguridad y disponibilidad.", target: "#servicios", form: "Diagnóstico o reparación" },
  fleet: { title: "Taller Móvil · In House", text: "Llevamos capacidad técnica a tus instalaciones y reducimos traslados improductivos.", target: "#servicios", form: "Taller Móvil" },
  emergency: { title: "Rescate Carretero 365", text: "Activa asistencia y seguimiento para volver al camino lo antes posible.", target: "#rescate", form: "Rescate Carretero" }
};

const serviceCatalog = {
  movil: { number: "01", title: "Taller Móvil", kicker: "SERVICIO DONDE ESTÁ TU FLOTA", text: "Mantenimiento preventivo y correctivo en tus instalaciones, de día o de noche, con técnicos certificados y herramienta especializada.", facts: ["Motor y tren motriz", "Frenos y suspensión", "Sistema de urea y EGR", "Atención multimarca"], action: "Programar visita" },
  inhouse: { number: "02", title: "Taller In House", kicker: "CAPACIDAD DENTRO DE TU OPERACIÓN", text: "Un esquema para flotas mayores a 50 unidades que integra atención multimarca, seguimiento técnico y mantenimiento dentro de tus instalaciones.", facts: ["Flotas de gran tamaño", "Atención multimarca", "Técnicos certificados", "Menos traslados"], action: "Evaluar mi flota" },
  truckcare: { number: "03", title: "Truck Care", kicker: "MANTENIMIENTO PREPAGADO", text: "Congela el precio de tus mantenimientos hasta por dos años y reserva previamente bahía, técnico y refacciones.", facts: ["Precio fijo", "Cobertura nacional", "Servicio Express", "IPK incluida"], action: "Conocer paquetes" },
  campo: { number: "04", title: "Ingeniero de Campo", kicker: "RENDIMIENTO Y PRODUCTIVIDAD", text: "Asesoría especializada para aprovechar mejor cada unidad, identificar oportunidades de eficiencia y elevar la productividad de la operación.", facts: ["Análisis de rendimiento", "Acompañamiento técnico", "Mejores prácticas", "Decisiones con datos"], action: "Solicitar asesoría" },
  ipk: { number: "05", title: "IPK", kicker: "INSPECCIÓN PROFESIONAL KENWORTH", text: "Diagnóstico general mediante una revisión estructurada que identifica prioridades de seguridad, mantenimiento y reparación.", facts: ["Más de 140 puntos", "Resultado por semáforo", "Prevención de fallas", "Mayor vida útil"], action: "Agendar inspección" }
};

const brandPrograms = {
  kenworth: { className: "kw", small: "KENWORTH TRUCK CARE", title: "Controla el mantenimiento antes de que controle tu operación.", text: "Mantenimientos preventivos prepagados, precio protegido, cobertura nacional y disponibilidad programada de bahía, técnico y refacciones.", benefits: ["Precio fijo hasta 2 años", "Servicio Express", "Inspección IPK", "Concierge nacional"], mark: "TRUCK<br>CARE" },
  daf: { className: "daf", small: "DAF MULTISUPPORT", title: "Tu DAF respaldado en cada ruta.", text: "Programa de mantenimiento preventivo con soporte de la Red de Concesionarios Kenworth DAF y atención continua mediante el Centro de Contacto DAF.", benefits: ["Atención 24/7", "Precio nacional", "Citas programadas", "Refacciones originales"], mark: "MULTI<br>SUPPORT" }
};

const recommendationTitle = document.querySelector("#serviceRecommendationTitle");
const recommendationText = document.querySelector("#serviceRecommendationText");
const recommendationLink = document.querySelector("#serviceRecommendationLink");
const appointmentType = document.querySelector("#serviceAppointmentType");

function selectNeed(id) {
  const item = serviceNeeds[id];
  if (!item) return;
  recommendationTitle.textContent = item.title;
  recommendationText.textContent = item.text;
  recommendationLink.href = item.target;
  document.querySelectorAll("[data-need]").forEach((button) => button.classList.toggle("active", button.dataset.need === id));
  if (appointmentType) appointmentType.value = item.form;
}

document.querySelectorAll("[data-need]").forEach((button) => button.addEventListener("click", () => selectNeed(button.dataset.need)));
selectNeed("preventive");

const serviceStage = document.querySelector("#serviceStage");

function selectService(id) {
  const item = serviceCatalog[id];
  if (!item || !serviceStage) return;
  serviceStage.innerHTML = `<span class="giant-number">${item.number}</span><small>${item.kicker}</small><h3>${item.title}</h3><p>${item.text}</p><div class="facts">${item.facts.map((fact) => `<span>✓ ${fact}</span>`).join("")}</div><a href="#cita" data-service-request="${item.title}">${item.action} <span>↗</span></a>`;
  document.querySelectorAll("[data-service]").forEach((button) => {
    const active = button.dataset.service === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  serviceStage.querySelector("[data-service-request]")?.addEventListener("click", () => {
    const requested = item.title === "IPK" ? "Inspección IPK" : item.title;
    const option = [...appointmentType.options].find((entry) => entry.text === requested);
    if (option) appointmentType.value = option.value;
  });
}

document.querySelectorAll("[data-service]").forEach((button) => button.addEventListener("click", () => selectService(button.dataset.service)));
selectService("movil");

const brandStage = document.querySelector("#serviceBrandProgram");

function selectBrand(brand) {
  const item = brandPrograms[brand];
  if (!item || !brandStage) return;
  brandStage.innerHTML = `<article class="brand-program ${item.className}"><div><small>${item.small}</small><h3>${item.title}</h3><p>${item.text}</p><div class="program-benefits">${item.benefits.map((benefit) => `<span>${benefit}</span>`).join("")}</div></div><strong>${item.mark}</strong></article>`;
  document.querySelectorAll("[data-service-brand]").forEach((button) => button.classList.toggle("active", button.dataset.serviceBrand === brand));
}

document.querySelectorAll("[data-service-brand]").forEach((button) => button.addEventListener("click", () => selectBrand(button.dataset.serviceBrand)));
selectBrand("kenworth");

const menuButton = document.querySelector("#serviceMenuButton");
const navigation = document.querySelector("#serviceNavLinks");
menuButton?.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.textContent = open ? "Cerrar" : "Menú";
  menuButton.setAttribute("aria-expanded", String(open));
});
navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.textContent = "Menú";
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 }) : null;
document.querySelectorAll(".reveal").forEach((element) => observer ? observer.observe(element) : element.classList.add("visible"));

document.querySelector("#serviceAppointmentForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button[type='submit']");
  if (button) button.innerHTML = "Solicitud preparada <span>✓</span>";
});