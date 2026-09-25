import { siteData, buildWhatsAppUrl, getLeadTag } from "../data/site";

interface WizardState {
  service: string;
  property: string;
  detail1: string;
  detail2: string;
  urgency: string;
  city: string;
  district: string;
  name: string;
  phone: string;
}

const TOTAL_STEPS = 7;

const isInstallLike = (service: string): boolean =>
  service.toLowerCase().includes("instala");
const isMaintenanceLike = (service: string): boolean =>
  service.toLowerCase().includes("manuten");
const isHygieneLike = (service: string): boolean =>
  service.toLowerCase().includes("higien");
const isCommercialService = (service: string): boolean =>
  service.includes("PMOC") || service.includes("VRF") || service.toLowerCase().includes("mara");

const resolveConditional = (service: string): string => {
  if (isInstallLike(service)) return "instalacao";
  if (isMaintenanceLike(service)) return "manutencao";
  if (isHygieneLike(service)) return "higienizacao";
  if (isCommercialService(service)) return "comercial";
  return "generico";
};

const maskPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const isValidPhone = (masked: string): boolean => {
  const digits = masked.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
};

export const initQuoteWizard = (): void => {
  const modal = document.getElementById("quote-modal");
  const backdrop = document.getElementById("quote-modal-backdrop");
  const openButtons = document.querySelectorAll<HTMLElement>("[data-open-quote]");
  const closeButton = document.getElementById("close-quote-modal");
  const nextButton = document.getElementById("wizard-next") as HTMLButtonElement | null;
  const backButton = document.getElementById("wizard-back") as HTMLButtonElement | null;
  const errorBox = document.getElementById("wizard-error");
  const progressFill = document.getElementById("wizard-progress-fill");
  const stepLabel = document.getElementById("wizard-step-label");
  const percentLabel = document.getElementById("wizard-percent-label");
  const steps = Array.from(
    document.querySelectorAll<HTMLElement>("[data-wizard-step]"),
  );
  if (!modal || !backdrop || steps.length === 0) return;

  let current = 1;
  const state: WizardState = {
    service: "",
    property: "",
    detail1: "",
    detail2: "",
    urgency: "",
    city: "Ivoti",
    district: "",
    name: "",
    phone: "",
  };

  const showError = (message: string): void => {
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.hidden = false;
  };

  const clearError = (): void => {
    if (!errorBox) return;
    errorBox.textContent = "";
    errorBox.hidden = true;
  };

  const syncConditional = (): void => {
    const key = state.service ? resolveConditional(state.service) : "generico";
    document.querySelectorAll<HTMLElement>(".wizard-conditional").forEach((block) => {
      const matches = block.dataset.conditional === key;
      block.hidden = !matches;
    });
  };

  const syncSelectedCards = (): void => {
    document.querySelectorAll<HTMLElement>(".wizard-option[data-group]").forEach((btn) => {
      const group = btn.dataset.group as keyof WizardState | undefined;
      if (!group) return;
      const value = btn.dataset.value ?? "";
      const active = group in state && state[group as keyof WizardState] === value;
      btn.classList.toggle("is-selected", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };

  const renderSummary = (): void => {
    const list = document.getElementById("wizard-summary");
    if (!list) return;
    const detailLine =
      [state.detail1, state.detail2].filter(Boolean).join(" • ") || "—";
    const rows: Array<[string, string]> = [
      ["Serviço", state.service || "—"],
      ["Imóvel", state.property || "—"],
      ["Detalhe", detailLine],
      ["Urgência", state.urgency || "—"],
      ["Local", `${state.city || "—"} / ${state.district || "—"}`],
      ["Nome", state.name || "—"],
      ["WhatsApp", state.phone || "—"],
    ];
    list.innerHTML = rows
      .map(([k, v]) => `<li><span>${k}</span><strong>${v}</strong></li>`)
      .join("");
  };

  const goTo = (step: number): void => {
    current = Math.min(Math.max(step, 1), TOTAL_STEPS);
    steps.forEach((panel) => {
      const active = Number(panel.dataset.wizardStep) === current;
      panel.classList.toggle("is-active", active);
      if (active) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    });
    const percent = Math.round((current / TOTAL_STEPS) * 100);
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (stepLabel) stepLabel.textContent = `Etapa ${current} de ${TOTAL_STEPS}`;
    if (percentLabel) percentLabel.textContent = `${percent}%`;
    const nav = modal.querySelector<HTMLElement>(".wizard-nav");
    if (nav) {
      if (current === TOTAL_STEPS) nav.setAttribute("hidden", "");
      else nav.removeAttribute("hidden");
    }
    if (backButton) backButton.hidden = current === 1;
    if (nextButton) {
      nextButton.textContent = current === 6 ? "Revisar →" : "Continuar →";
    }
    if (current === 3) syncConditional();
    if (current === 7) renderSummary();
    syncSelectedCards();
    clearError();
    modal.querySelector<HTMLElement>(".modal-content")?.scrollTo({ top: 0 });
  };

  const validateStep = (step: number): boolean => {
    if (step === 1 && !state.service) {
      showError("Escolha o serviço para continuar.");
      return false;
    }
    if (step === 2 && !state.property) {
      showError("Escolha onde será o serviço.");
      return false;
    }
    if (step === 3) {
      const key = resolveConditional(state.service);
      if (key === "instalacao" && (!state.detail1 || !state.detail2)) {
        showError("Selecione se já tem o aparelho e quantos ambientes.");
        return false;
      }
      if (key === "manutencao" && !state.detail1) {
        showError("Selecione o que está acontecendo com o aparelho.");
        return false;
      }
      if (key === "higienizacao" && (!state.detail1 || !state.detail2)) {
        showError("Selecione a quantidade e a última limpeza.");
        return false;
      }
      if (key === "comercial" && !state.detail1) {
        showError("Selecione o porte do local.");
        return false;
      }
    }
    if (step === 4 && !state.urgency) {
      showError("Selecione a urgência do atendimento.");
      return false;
    }
    if (step === 5) {
      const cityEl = document.getElementById("wizard-city") as HTMLSelectElement | null;
      const districtEl = document.getElementById("wizard-district") as HTMLInputElement | null;
      state.city = cityEl?.value.trim() ?? "";
      state.district = districtEl?.value.trim() ?? "";
      if (!state.city) {
        showError("Selecione a cidade do atendimento.");
        return false;
      }
      if (state.district.length < 2) {
        showError("Informe o bairro para calcularmos o deslocamento.");
        return false;
      }
    }
    if (step === 6) {
      const nameEl = document.getElementById("wizard-name") as HTMLInputElement | null;
      const phoneEl = document.getElementById("wizard-phone") as HTMLInputElement | null;
      const lgpdEl = document.getElementById("wizard-lgpd") as HTMLInputElement | null;
      state.name = nameEl?.value.trim() ?? "";
      state.phone = phoneEl?.value.trim() ?? "";
      if (state.name.length < 2) {
        showError("Informe seu nome.");
        return false;
      }
      if (!isValidPhone(state.phone)) {
        showError("Informe um WhatsApp válido com DDD.");
        return false;
      }
      if (lgpdEl && !lgpdEl.checked) {
        showError("Autorize o contato para enviarmos o orçamento.");
        return false;
      }
    }
    return true;
  };

  const buildMessage = (): string => {
    const tag = getLeadTag(state.urgency || "");
    const detailLine = [state.detail1, state.detail2].filter(Boolean).join(" • ");
    return [
      `*NOVO LEAD SITE ${tag}* — ${siteData.company.name}`,
      "",
      `*Serviço:* ${state.service}`,
      `*Imóvel:* ${state.property}`,
      detailLine ? `*Detalhe:* ${detailLine}` : "",
      `*Urgência:* ${state.urgency}`,
      `*Local:* ${state.city} / ${state.district}`,
      `*Nome:* ${state.name}`,
      `*WhatsApp:* ${state.phone}`,
      "",
      "Aguardo disponibilidade e proposta. Obrigado!",
    ]
      .filter((line) => line !== "")
      .join("\n");
  };

  const openModal = (presetService?: string): void => {
    if (presetService) {
      state.service = presetService;
      state.detail1 = "";
      state.detail2 = "";
    }
    modal.classList.add("is-open");
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    goTo(presetService ? 2 : 1);
    window.setTimeout(() => {
      modal.querySelector<HTMLElement>(".wizard-option, .wizard-input, #wizard-next")?.focus();
    }, 60);
  };

  const closeModal = (): void => {
    modal.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  openButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(btn.dataset.service || undefined);
    });
  });
  closeButton?.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    if (event.key === "Enter" && modal.classList.contains("is-open") && current < TOTAL_STEPS) {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag !== "INPUT" && tag !== "SELECT" && tag !== "TEXTAREA") {
        event.preventDefault();
        nextButton?.click();
      }
    }
  });

  document.querySelectorAll<HTMLElement>(".wizard-option[data-group]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.group as keyof WizardState;
      const value = btn.dataset.value ?? "";
      if (group === "service" && state.service !== value) {
        state.detail1 = "";
        state.detail2 = "";
      }
      (state[group] as string) = value;
      syncSelectedCards();
      clearError();
      window.setTimeout(() => {
        if (validateStep(current)) goTo(current + 1);
      }, 180);
    });
  });

  const detailTextMan = document.getElementById("wizard-detail2-text") as HTMLInputElement | null;
  detailTextMan?.addEventListener("input", () => {
    state.detail2 = detailTextMan.value.trim();
  });
  const detailTextCom = document.getElementById(
    "wizard-detail2-text-com",
  ) as HTMLInputElement | null;
  detailTextCom?.addEventListener("input", () => {
    state.detail2 = detailTextCom.value.trim();
  });
  const detailTextGen = document.getElementById("wizard-detail1-text") as HTMLInputElement | null;
  detailTextGen?.addEventListener("input", () => {
    state.detail1 = detailTextGen.value.trim();
  });

  const phoneEl = document.getElementById("wizard-phone") as HTMLInputElement | null;
  phoneEl?.addEventListener("input", () => {
    phoneEl.value = maskPhone(phoneEl.value);
    state.phone = phoneEl.value;
  });

  nextButton?.addEventListener("click", () => {
    if (validateStep(current)) goTo(current + 1);
  });
  backButton?.addEventListener("click", () => goTo(current - 1));

  document.getElementById("wizard-send")?.addEventListener("click", () => {
    if (!validateStep(6)) {
      goTo(6);
      return;
    }
    const url = buildWhatsAppUrl(buildMessage());
    window.open(url, "_blank", "noopener,noreferrer");
    closeModal();
  });

  document.getElementById("wizard-review-back")?.addEventListener("click", () => {
    goTo(current - 1);
  });

  goTo(1);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuoteWizard);
} else {
  initQuoteWizard();
}
