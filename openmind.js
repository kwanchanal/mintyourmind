const langToggle = document.getElementById("openmindLangToggle");
const langButtons = Array.from(document.querySelectorAll(".openmind-lang-btn"));

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

getTranslator().onChange(() => {
  renderLanguageToggle();
});

renderLanguageToggle();

if (typeof initQuiz === "function") {
  initQuiz();
}
