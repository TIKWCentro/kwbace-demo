const units = [
  { id: 1, model: "T680", year: 2025, km: 11800, place: "Querétaro", use: "Carretera", motor: "PACCAR MX-13", transmission: "Automatizada", image: "https://kwbace.com.mx/wp-content/uploads/2025/11/T680-4-1024x984.png", label: "Casi nuevo", accent: "#e11d35" },
  { id: 2, model: "T880", year: 2024, km: 196000, place: "Bajío", use: "Vocacional", motor: "Cummins X15", transmission: "Fuller 18 vel.", image: "https://kwbace.com.mx/wp-content/uploads/2025/11/T880-2-903x1024.jpg", label: "Trabajo pesado", accent: "#173c5b" },
  { id: 3, model: "T680", year: 2017, km: 1460483, place: "Querétaro", use: "Carretera", motor: "Cummins ISX 450 hp", transmission: "Fuller 18 vel.", image: "https://kwbace.com.mx/wp-content/uploads/2024/04/406955-T680-2017-1024x976.jpg", label: "Precio especial", accent: "#20262b" }
];

const state = { query: "", category: "Todos", sort: "year", favorites: new Set(), compare: new Set() };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const formatKm = value => new Intl.NumberFormat("es-MX").format(value);

function filteredUnits() {
  return units.filter(unit => {
    const searchable = `${unit.model} ${unit.year} ${unit.place} ${unit.use}`.toLowerCase();
    return searchable.includes(state.query.toLowerCase()) && (state.category === "Todos" || unit.use === state.category);
  }).sort((a, b) => state.sort === "km" ? a.km - b.km : b.year - a.year);
}

function unitCard(unit) {
  return `<article class="product">
    <div class="product-photo" style="--accent:${unit.accent}">
      <img src="${unit.image}" alt="Kenworth ${unit.model} ${unit.year}" loading="lazy">
      <span>${unit.label}</span>
      <button class="${state.favorites.has(unit.id) ? "saved" : ""}" type="button" data-favorite="${unit.id}" aria-label="Guardar Kenworth ${unit.model}">♥</button>
    </div>
    <div class="product-info">
      <div class="make"><span>KENWORTH</span><small>KB-${unit.year}-00${unit.id}</small></div>
      <h3>${unit.model}<i>${unit.year}</i></h3>
      <div class="mileage"><b>${formatKm(unit.km)}</b><span>kilómetros</span></div>
      <dl><div><dt>Motor</dt><dd>${unit.motor}</dd></div><div><dt>Transmisión</dt><dd>${unit.transmission}</dd></div><div><dt>Ubicación</dt><dd>${unit.place}</dd></div><div><dt>Aplicación</dt><dd>${unit.use}</dd></div></dl>
      <div class="product-actions"><button type="button" data-open-unit="${unit.id}">Ver detalles <span>→</span></button><label><input type="checkbox" data-compare="${unit.id}" ${state.compare.has(unit.id) ? "checked" : ""}> Comparar</label></div>
    </div>
  </article>`;
}

function conciergeCard() {
  return `<article class="concierge"><span>NO ENCONTRASTE EL TUYO</span><h3>Lo buscamos<br>por ti.</h3><p>Dinos modelo, año, aplicación y presupuesto. Nosotros hacemos el resto.</p><a href="#asesor">Activar búsqueda BACE <b>→</b></a><small>Respuesta personalizada de un asesor.</small></article>`;
}

function renderInventory() {
  const list = filteredUnits();
  $("#productGrid").innerHTML = list.map(unitCard).join("") + conciergeCard();
  $("#resultCount").textContent = list.length;
  $("#favoriteCount").textContent = state.favorites.size;
  updateFilters();
  bindInventoryEvents();
}

function updateFilters() {
  $$('[data-filter]').forEach(button => button.classList.toggle("active", button.dataset.filter === state.category));
  $$('[data-category]').forEach(button => button.classList.toggle("active", button.dataset.category === state.category));
}

function bindInventoryEvents() {
  $$('[data-favorite]').forEach(button => button.addEventListener("click", () => {
    const id = Number(button.dataset.favorite);
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    renderInventory();
  }));
  $$('[data-compare]').forEach(input => input.addEventListener("change", () => toggleCompare(Number(input.dataset.compare))));
  $$('[data-open-unit]').forEach(button => button.addEventListener("click", () => openUnit(Number(button.dataset.openUnit))));
}

function toggleCompare(id) {
  if (state.compare.has(id)) state.compare.delete(id);
  else { if (state.compare.size === 2) state.compare.delete([...state.compare][0]); state.compare.add(id); }
  updateCompareBar();
  renderInventory();
}

function updateCompareBar() {
  const bar = $("#compareBar");
  bar.hidden = state.compare.size === 0;
  $("#compareCount").textContent = state.compare.size;
  $("#compareItems").innerHTML = [...state.compare].map(id => { const unit = units.find(item => item.id === id); return `<i>${unit.model} ${unit.year}</i>`; }).join("");
}

function openUnit(id) {
  const unit = units.find(item => item.id === id);
  if (!unit) return;
  $("#modalImage").src = unit.image;
  $("#modalImage").alt = `Kenworth ${unit.model} ${unit.year}`;
  $("#modalLabel").textContent = unit.label;
  $("#modalTitle").innerHTML = `${unit.model} <em>${unit.year}</em>`;
  $("#modalKm").innerHTML = `<b>${formatKm(unit.km)}</b> km · ${unit.place}`;
  $("#modalSpecs").innerHTML = `<div><dt>Motor</dt><dd>${unit.motor}</dd></div><div><dt>Transmisión</dt><dd>${unit.transmission}</dd></div><div><dt>Aplicación</dt><dd>${unit.use}</dd></div>`;
  $("#unitModal").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() { $("#unitModal").hidden = true; document.body.style.overflow = ""; }

$("#searchInput").addEventListener("input", event => { state.query = event.target.value.trim(); renderInventory(); });
$("#sortSelect").addEventListener("change", event => { state.sort = event.target.value; renderInventory(); });
$$('[data-filter], [data-category]').forEach(button => button.addEventListener("click", () => { state.category = button.dataset.filter || button.dataset.category; renderInventory(); }));
$$('[data-open-unit]').forEach(button => button.addEventListener("click", () => openUnit(Number(button.dataset.openUnit))));
$("#clearCompare").addEventListener("click", () => { state.compare.clear(); updateCompareBar(); renderInventory(); });
$("#compareButton").addEventListener("click", () => { const first = [...state.compare][0]; if (first) openUnit(first); });
$("#closeModal").addEventListener("click", closeModal);
$("#unitModal").addEventListener("click", event => { if (event.target === event.currentTarget) closeModal(); });
$("#quoteLink").addEventListener("click", closeModal);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
$("#menuButton").addEventListener("click", () => { const open = $("#mainNav").classList.toggle("show"); $("#menuButton").setAttribute("aria-expanded", String(open)); });
$$('#mainNav a').forEach(link => link.addEventListener("click", () => { $("#mainNav").classList.remove("show"); $("#menuButton").setAttribute("aria-expanded", "false"); }));
$("#contactForm").addEventListener("submit", event => { event.preventDefault(); $("#formMessage").textContent = "¡Gracias! Tu solicitud quedó preparada para enviarse al asesor BACE."; event.currentTarget.reset(); });

renderInventory();