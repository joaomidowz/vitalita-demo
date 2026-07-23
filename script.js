/**
 * Vitalità Saúde e Bem-Estar — GSAP Motion Engine & Controller (Subtle Fades)
 */

document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_PHONE = "5545988317680";
  const DEFAULT_MESSAGE = "Olá! Vim pelo site da Vitalità Saúde e Bem-Estar e gostaria de agendar uma aula de Pilates.";

  // 1. WhatsApp Button Handlers
  const whatsappButtons = document.querySelectorAll("[data-whatsapp]");
  whatsappButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const customMsg = button.getAttribute("data-msg") || DEFAULT_MESSAGE;
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(customMsg)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  });

  // 2. Header Scroll Effect
  const siteHeader = document.getElementById("siteHeader");
  const handleScroll = () => {
    if (window.scrollY > 30) {
      siteHeader?.classList.add("is-scrolled");
    } else {
      siteHeader?.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", (!isOpen).toString());
      mobileMenu.hidden = isOpen;
      document.body.classList.toggle("menu-open", !isOpen);
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
        document.body.classList.remove("menu-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
        document.body.classList.remove("menu-open");
      }
    });
  }

  // 4. GSAP & ScrollTrigger Animations (Subtle & Fast)
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");

  function updateNavActive(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${id}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entrance Animation (Subtle & Fast)
    const heroTl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.5 } });
    heroTl
      .from(".hero-eyebrow-badge", { y: -10, opacity: 0, delay: 0.05 })
      .from(".hero-copy h1", { y: 15, opacity: 0 }, "-=0.3")
      .from(".hero-text", { y: 10, opacity: 0 }, "-=0.3")
      .from(".pill-tag", { y: 8, opacity: 0, stagger: 0.05 }, "-=0.2")
      .from(".hero-copy .cta-row", { y: 10, opacity: 0 }, "-=0.2")
      .from(".hero-proof-compact", { opacity: 0 }, "-=0.1")
      .from(".media-portal-wrap", { scale: 0.98, opacity: 0, duration: 0.6 }, "-=0.4");

    // ScrollTrigger subtle reveal for all .reveal elements
    const revealElements = gsap.utils.toArray(".reveal");
    revealElements.forEach((elem) => {
      gsap.fromTo(
        elem,
        { y: 14, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Active Section Observer with ScrollTrigger
    const sections = gsap.utils.toArray("main section");
    sections.forEach((sec) => {
      const id = sec.getAttribute("id");
      if (!id) return;

      ScrollTrigger.create({
        trigger: sec,
        start: "top 40%",
        end: "bottom 40%",
        onEnter: () => updateNavActive(id),
        onEnterBack: () => updateNavActive(id),
      });
    });
  } else {
    // Fallback Intersection Observer
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    revealElements.forEach((el) => observer.observe(el));
  }

  // 5. Interactive Goal Quiz Selector
  const goalData = {
    dores: {
      title: "Programa de Alívio de Dores & Reabilitação",
      desc: "Desenvolvido especificamente para descompressão da coluna, fortalecimento dos músculos estabilizadores profundos e relaxamento das tensões musculares crônicas.",
      msg: "Olá! Fiz o teste no site da Vitalità e meu objetivo é: Alívio de Dores. Gostaria de agendar uma aula experimental.",
    },
    postura: {
      title: "Programa de Reeducação Postural & Alinhamento",
      desc: "Trabalho de consciência corporal e fortalecimento do Powerhouse (Core) para alinhar ombros, escápulas e coluna vertebral de forma segura e duradoura.",
      msg: "Olá! Fiz o teste no site da Vitalità e meu objetivo é: Melhorar Postura e Alinhamento. Gostaria de agendar uma aula experimental.",
    },
    fortalecimento: {
      title: "Programa de Fortalecimento & Tonificação sem Impacto",
      desc: "Exercícios em aparelhos com resistência por molas para tonificar pernas, braços e abdômen de maneira equilibrada e sem sobrecarga articular.",
      msg: "Olá! Fiz o teste no site da Vitalità e meu objetivo é: Fortalecimento e Tônus Corporal. Gostaria de agendar uma aula experimental.",
    },
    gestacao: {
      title: "Programa Vitalità para Gestantes & Pós-Parto",
      desc: "Série adaptada por trimestre para fortalecimento do assoalho pélvico, alívio de dores lombares na gravidez e preparação para o parto e puerpério.",
      msg: "Olá! Fiz o teste no site da Vitalità e meu objetivo é: Pilates para Gestação / Pós-Parto. Gostaria de agendar uma aula.",
    },
    melhoridade: {
      title: "Programa de Mobilidade & Vitalidade na Terceira Idade",
      desc: "Foco no equilíbrio, prevenção de quedas, flexibilidade e independência física para manter a vitalidade e disposição no dia a dia.",
      msg: "Olá! Fiz o teste no site da Vitalità e meu objetivo é: Pilates para Terceira Idade / Mobilidade. Gostaria de agendar uma aula.",
    },
  };

  const quizButtons = document.querySelectorAll("#quizOptions .quiz-opt-btn");
  const resultTitle = document.getElementById("resultTitle");
  const resultDesc = document.getElementById("resultDesc");
  const quizCtaBtn = document.getElementById("quizCtaBtn");

  quizButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      quizButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const goalKey = btn.getAttribute("data-goal");
      const info = goalData[goalKey];

      if (info && resultTitle && resultDesc && quizCtaBtn) {
        resultTitle.textContent = info.title;
        resultDesc.textContent = info.desc;
        quizCtaBtn.setAttribute("data-msg", info.msg);

        if (typeof gsap !== "undefined") {
          gsap.fromTo("#quizResultBox", { opacity: 0.85 }, { opacity: 1, duration: 0.3, ease: "power1.out" });
        }
      }
    });
  });

  // 6. Video Modal Controls
  const videoModal = document.getElementById("videoModal");
  const openVideoBtn = document.getElementById("openVideoBtn");
  const closeVideoBtn = document.getElementById("closeVideoBtn");

  if (videoModal && openVideoBtn && closeVideoBtn) {
    openVideoBtn.addEventListener("click", () => {
      if (typeof videoModal.showModal === "function") {
        videoModal.showModal();
      } else {
        videoModal.style.display = "block";
      }
    });

    closeVideoBtn.addEventListener("click", () => {
      if (typeof videoModal.close === "function") {
        videoModal.close();
      } else {
        videoModal.style.display = "none";
      }
    });

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        videoModal.close();
      }
    });
  }

  // 7. Auto Update Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
});
