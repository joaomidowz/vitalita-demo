const WHATSAPP_NUMBER = "554588317680";
const WHATSAPP_MESSAGE =
  "Olá! Vi a página da Vitalità Pilates e gostaria de saber mais sobre as aulas.";
const INSTAGRAM_LINK = "#";
const FACEBOOK_LINK = "#";
const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Rua%20Pio%20XII%2C%20944%2C%20Neva%2C%20Cascavel%20PR";

const header = document.querySelector("#siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobileMenu");
const whatsappButtons = document.querySelectorAll("[data-whatsapp]");
const mapLinks = document.querySelectorAll("[data-map-link]");
const socialLinks = document.querySelectorAll("[data-link]");
const revealElements = document.querySelectorAll(".reveal");

function buildWhatsAppUrl() {
  const message = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

function openWhatsApp() {
  window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
}

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

function closeMobileMenu() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  header.classList.remove("menu-active");
  document.body.classList.remove("menu-open");
}

function toggleMobileMenu() {
  if (!mobileMenu || !menuToggle) return;

  const willOpen = mobileMenu.hidden;
  mobileMenu.hidden = !willOpen;
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
  header.classList.toggle("menu-active", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
}

function setupEditableLinks() {
  mapLinks.forEach((link) => {
    link.href = GOOGLE_MAPS_LINK;
  });

  socialLinks.forEach((link) => {
    const linkType = link.dataset.link;
    const url = linkType === "instagram" ? INSTAGRAM_LINK : FACEBOOK_LINK;

    if (url && url !== "#") {
      link.href = url;
      link.target = "_blank";
      return;
    }

    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => event.preventDefault());
  });
}

function setupRevealAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -42px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

whatsappButtons.forEach((button) => {
  button.addEventListener("click", openWhatsApp);
});

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileMenu);
}

if (mobileMenu) {
  mobileMenu.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("click", closeMobileMenu);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth >= 920) {
    closeMobileMenu();
  }
});

setupEditableLinks();
setupRevealAnimations();
updateHeaderState();
