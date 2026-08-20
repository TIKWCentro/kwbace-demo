document.documentElement.classList.add("js-ready");

const nav = document.querySelector(".cb-nav");
const menuButton = document.querySelector("#cbMenu");
const navigation = document.querySelector("#cbLinks");
const progress = document.querySelector(".cb-progress");

function closeMenu() {
  navigation?.classList.remove("open");
  document.body.classList.remove("cb-menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = "Menú";
}

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  document.body.classList.toggle("cb-menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Cerrar" : "Menú";
});

navigation?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

function updateScrollUI() {
  const top = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  nav?.classList.toggle("is-scrolled", top > 20);
  if (progress) progress.style.transform = `scaleX(${total > 0 ? top / total : 0})`;
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -50px" });

document.querySelectorAll(".cb-reveal").forEach(element => observer.observe(element));

const rail = document.querySelector(".cb-timeline__rail");
let dragging = false;
let startX = 0;
let startScroll = 0;

rail?.addEventListener("pointerdown", event => {
  dragging = true;
  startX = event.clientX;
  startScroll = rail.scrollLeft;
  rail.setPointerCapture(event.pointerId);
});

rail?.addEventListener("pointermove", event => {
  if (!dragging) return;
  rail.scrollLeft = startScroll - (event.clientX - startX);
});

rail?.addEventListener("pointerup", () => { dragging = false; });
rail?.addEventListener("pointercancel", () => { dragging = false; });

document.querySelector("#cbYear")?.append(new Date().getFullYear());