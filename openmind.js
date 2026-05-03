const langToggle = document.getElementById("openmindLangToggle");
const langButtons = Array.from(document.querySelectorAll(".openmind-lang-btn"));
const homeBtn = document.getElementById("openmindHomeBtn");
const content = document.getElementById("openmindContent");
let hasStartedQuiz = false;

function getTranslator() {
  return window.openmindI18n || {
    getLanguage: () => "en",
    setLanguage: () => {},
    t: (key) => key,
    onChange: () => {}
  };
}

function renderLanguageToggle() {
  const i18n = getTranslator();
  const currentLanguage = i18n.getLanguage();

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  langToggle?.setAttribute("aria-label", i18n.t("ui.toggleLabel"));
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    getTranslator().setLanguage(button.dataset.lang);
  });
});

homeBtn?.addEventListener("click", () => {
  hasStartedQuiz = false;
  renderLanding();
  window.scrollTo({ top: 0, behavior: "auto" });
});

getTranslator().onChange(() => {
  renderLanguageToggle();
});

renderLanguageToggle();

function startQuiz() {
  hasStartedQuiz = true;
  document.body.classList.remove("openmind-is-landing");

  if (typeof initQuiz === "function") {
    initQuiz();
  }

  window.scrollTo({ top: 0, behavior: "auto" });
}

function renderLanding() {
  if (!content) return;

  document.body.classList.add("openmind-is-landing");
  content.innerHTML = `
    <section class="openmind-landing" aria-label="Openmind landing">
      <button type="button" class="openmind-go-btn" id="openmindGoBtn">GO</button>
    </section>
  `;

  document.getElementById("openmindGoBtn")?.addEventListener("click", startQuiz);
}

if (hasStartedQuiz && typeof initQuiz === "function") {
  initQuiz();
} else {
  renderLanding();
}
