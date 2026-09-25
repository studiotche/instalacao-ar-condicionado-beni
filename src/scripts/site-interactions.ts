const initHeroReveal = (): void => {
  const heroCopy = document.querySelector<HTMLElement>(".hero-copy-container");
  if (!heroCopy) return;

  const heroEyebrow = heroCopy.querySelector<HTMLElement>(".hero-eyebrow");
  const heroTitle = heroCopy.querySelector<HTMLElement>("h1");
  const heroDescription = heroCopy.querySelector<HTMLElement>(".hero-description");
  const heroActions = heroCopy.querySelector<HTMLElement>(".hero-actions");
  const heroBadge = heroCopy.querySelector<HTMLElement>(".hero-badge");

  const splitHeroWords = (element: HTMLElement | null): HTMLElement[] => {
    if (!element) return [];
    // Preserva <br> como marcador de quebra de linha (antes era descartado).
    const segments: ({ text: string; isHighlight: boolean } | { br: true })[] = [];
    const walk = (node: Node): void => {
      if (node.nodeType === Node.TEXT_NODE) {
        const isHighlight = node.parentElement?.closest(".hero-title-highlight") !== null;
        (node.textContent || "")
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .forEach((text) => segments.push({ text, isHighlight }));
      } else if (node.nodeName === "BR") {
        segments.push({ br: true });
      } else {
        node.childNodes.forEach(walk);
      }
    };
    element.childNodes.forEach(walk);

    element.replaceChildren();
    const words: HTMLElement[] = [];
    segments.forEach((segment) => {
      if ("br" in segment) {
        const marker = document.createElement("span");
        marker.className = "hero-reveal-br";
        marker.setAttribute("aria-hidden", "true");
        element.append(marker);
        return;
      }
      const word = document.createElement("span");
      word.className = `hero-reveal-word${segment.isHighlight ? " hero-title-highlight" : ""}`;
      word.textContent = segment.text;
      element.append(word, " ");
      words.push(word);
    });
    return words;
  };

  const scheduleHeroWords = (
    container: HTMLElement | null,
    startDelay: number,
  ): number => {
    if (!container) return 1;
    let line = 0;
    let wordInLine = 0;
    let previousTop: number | null = null;

    Array.from(container.children).forEach((child) => {
      const element = child as HTMLElement;
      if (element.classList.contains("hero-reveal-br")) {
        line += 1;
        wordInLine = 0;
        previousTop = null;
        return;
      }
      const currentTop = element.offsetTop;
      if (previousTop !== null && Math.abs(currentTop - previousTop) > 2) {
        line += 1;
        wordInLine = 0;
      }
      element.style.setProperty(
        "--hero-delay",
        `${startDelay + line * 0.07 + wordInLine * 0.018}s`,
      );
      wordInLine += 1;
      previousTop = currentTop;
    });

    return line + 1;
  };

  // Calcula e aplica todos os delays (idempotente: pode rodar de novo após fonts.ready).
  const scheduleAllHeroDelays = (): void => {
    const eyebrowDelay = 0.05;
    const titleDelay = 0.12;
    const titleLines = scheduleHeroWords(heroTitle, titleDelay);
    const descDelay = titleDelay + titleLines * 0.07 + 0.24;
    const descLines = scheduleHeroWords(heroDescription, descDelay);
    const actionsDelay = descDelay + descLines * 0.07 + 0.24;
    const badgeDelay = actionsDelay + 0.3;

    heroEyebrow?.style.setProperty("--hero-delay", `${eyebrowDelay}s`);
    heroActions?.querySelectorAll<HTMLElement>(":scope > *").forEach((item, index) => {
      item.style.setProperty(
        "--hero-delay",
        `${actionsDelay + index * 0.06}s`,
      );
    });
    heroBadge?.style.setProperty("--hero-delay", `${badgeDelay}s`);
  };

  const startHeroReveal = (): void => {
    if (heroCopy.classList.contains("hero-reveal-ready")) return;
    try {
      splitHeroWords(heroTitle);
      splitHeroWords(heroDescription);
      heroCopy.classList.add("hero-reveal-ready");
      document.documentElement.classList.remove("hero-pending");
      scheduleAllHeroDelays();
    } catch {
      heroCopy.classList.add("hero-reveal-ready");
      document.documentElement.classList.remove("hero-pending");
    }
  };

  const begin = (): void => {
    if (heroCopy.dataset.heroRevealInit === "true") return;
    heroCopy.dataset.heroRevealInit = "true";
    // Failsafe: se fonts.ready pendurar, revela de qualquer forma.
    window.setTimeout(() => {
      if (!heroCopy.classList.contains("hero-reveal-ready")) startHeroReveal();
    }, 2500);

    // Espera as fontes (limite 700ms) para medir as quebras de linha corretamente.
    // O pré-hide síncrono do <head> cobre a espera: sem flash, sem espera longa.
    if (document.fonts?.ready) {
      const fontsTimeout = new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });
      Promise.race([document.fonts.ready.then(() => undefined), fontsTimeout]).then(
        startHeroReveal,
      );
    } else {
      startHeroReveal();
    }
  };

  const desktopQuery = window.matchMedia("(min-width: 761px)");
  if (desktopQuery.matches) {
    begin();
  } else {
    // Carregou no mobile e expandiu para desktop: dispara o reveal ao cruzar (uma vez).
    desktopQuery.addEventListener(
      "change",
      (event) => {
        if (event.matches) begin();
      },
      { once: true },
    );
  }
};

const initHeaderScroll = (): void => {
  // Header styling is statically handled with GPU acceleration in global.css
  // Avoiding scroll-driven class toggles prevents layout thrashing in Safari and mobile.
};

const initMobileDrawer = (): void => {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mobile-menu-close");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("mobile-backdrop");

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = (): void => {
    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    document.body.classList.add("overflow-hidden");
    toggleBtn.setAttribute("aria-expanded", "true");
  };

  const closeDrawer = (): void => {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.classList.remove("overflow-hidden");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  toggleBtn.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  // Fecha ao clicar em qualquer link do drawer (navegação, CTA ou logo).
  // Delegação em vez de classe fixa: o markup usa .mobile-nav-link-custom.
  drawer.addEventListener("click", (event) => {
    const anchor = (event.target as HTMLElement | null)?.closest?.("a[href]");
    if (anchor) closeDrawer();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
};

const initFaqAccordion = (): void => {
  const faqItems = document.querySelectorAll<HTMLDetailsElement>(".faq-list details");
  if (!faqItems.length) return;

  const faqTimeouts = new WeakMap<HTMLDetailsElement, number>();
  const FAQ_DURATION = 400;

  const clearFaqTimeout = (details: HTMLDetailsElement) => {
    const timeout = faqTimeouts.get(details);
    if (timeout !== undefined) window.clearTimeout(timeout);
  };

  const finishOpenFaq = (details: HTMLDetailsElement, answer: HTMLElement) => {
    clearFaqTimeout(details);
    faqTimeouts.set(
      details,
      window.setTimeout(() => {
        if (details.open && !details.classList.contains("is-closing")) {
          answer.style.height = "auto";
        }
      }, FAQ_DURATION)
    );
  };

  const animatedCloseFaq = (details: HTMLDetailsElement) => {
    const answer = details.querySelector<HTMLElement>(".faq-answer");
    if (!details.open || !answer || details.classList.contains("is-closing")) return;
    details.classList.add("is-closing");
    answer.style.height = `${answer.offsetHeight}px`;
    answer.style.opacity = "1";
    void answer.offsetHeight; // force reflow
    answer.style.height = "0px";
    answer.style.opacity = "0";
    clearFaqTimeout(details);
    faqTimeouts.set(
      details,
      window.setTimeout(() => {
        details.removeAttribute("open");
        details.classList.remove("is-closing");
        answer.style.height = "";
        answer.style.opacity = "";
      }, FAQ_DURATION)
    );
  };

  const animatedOpenFaq = (details: HTMLDetailsElement) => {
    const answer = details.querySelector<HTMLElement>(".faq-answer");
    if (!answer || details.open) return;
    details.classList.remove("is-closing");
    details.setAttribute("open", "");
    answer.style.height = "0px";
    answer.style.opacity = "0";
    void answer.offsetHeight; // force reflow
    answer.style.height = `${answer.scrollHeight}px`;
    answer.style.opacity = "1";
    finishOpenFaq(details, answer);
  };

  faqItems.forEach((details) => {
    const summary = details.querySelector("summary");
    if (!summary) return;

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (details.classList.contains("is-closing")) {
        clearFaqTimeout(details);
        details.classList.remove("is-closing");
        const answer = details.querySelector<HTMLElement>(".faq-answer");
        if (answer) {
          answer.style.height = `${answer.scrollHeight}px`;
          answer.style.opacity = "1";
          finishOpenFaq(details, answer);
        }
        return;
      }
      if (details.open) {
        animatedCloseFaq(details);
      } else {
        faqItems.forEach((other) => {
          if (other !== details && other.open) animatedCloseFaq(other);
        });
        animatedOpenFaq(details);
      }
    });
  });
};

// Wizard de orçamento vive em quote-wizard.ts (single owner do #quote-modal).
// Mantido como no-op para compatibilidade de chamadas antigas.
const initQuoteModal = (): void => {};

const initServiceHover = (): void => {
  const serviceItems = document.querySelectorAll(".service-item");
  const featuredImg = document.getElementById("service-featured-img") as HTMLImageElement | null;

  if (!featuredImg || serviceItems.length === 0) return;

  serviceItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const nextSrc = item.getAttribute("data-service-img");
      if (nextSrc && !featuredImg.src.endsWith(nextSrc)) {
        featuredImg.style.opacity = "0";
        featuredImg.style.transform = "scale(1.02)";
        setTimeout(() => {
          featuredImg.src = nextSrc;
          featuredImg.style.opacity = "1";
          featuredImg.style.transform = "scale(1)";
        }, 150);
      }
    });
  });
};

const initScrollReveal = (): void => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const revealElements = document.querySelectorAll(".reveal-up, .reveal-scale, .reveal-fade, .reveal-line-x, .reveal-line-y");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "60px 0px 60px 0px",
    threshold: 0,
  });

  revealElements.forEach((el) => observer.observe(el));
};

const initScrollSpy = (): void => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-link");

  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active-nav-link");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active-nav-link");
          }
        });
      }
    });
  }, {
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  });

  sections.forEach((sec) => observer.observe(sec));
};

const initFloatingWhatsApp = (): void => {
  const whatsappBtn = document.querySelector<HTMLElement>(".floating-whatsapp");
  const secondSection = document.getElementById("servicos"); // The second section of the site
  if (!whatsappBtn || !secondSection) return;

  const mobileQuery = window.matchMedia("(max-width: 760px)");

  const handleVisibility = () => {
    if (!mobileQuery.matches) {
      whatsappBtn.classList.add("is-visible");
      return;
    }

    const rect = secondSection.getBoundingClientRect();
    // If the top of the second section is above or equal to the window height, it means we scrolled to it.
    if (rect.top <= window.innerHeight) {
      whatsappBtn.classList.add("is-visible");
    } else {
      whatsappBtn.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", handleVisibility, { passive: true });
  mobileQuery.addEventListener("change", handleVisibility);
  handleVisibility();
};

const initApp = (): void => {
  initHeroReveal();
  initHeaderScroll();
  initMobileDrawer();
  initFaqAccordion();
  initQuoteModal();
  initServiceHover();
  initScrollReveal();
  initScrollSpy();
  initFloatingWhatsApp();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
