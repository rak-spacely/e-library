const THEME_STORAGE_KEY = "placid-theme";

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupNavigationToggle();
  setupSearch();
  setupContactForm();
});

function setupThemeToggle() {
  const toggle = document.querySelector("#theme-toggle");
  if (!toggle) {
    return;
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  updateThemeToggleLabel(toggle);

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    updateThemeToggleLabel(toggle);
  });
}

function updateThemeToggleLabel(toggle) {
  const isDark = document.body.classList.contains("dark-mode");
  toggle.setAttribute("aria-pressed", String(isDark));
  const content = toggle.querySelector(".theme-toggle__icon");
  if (content) {
    content.textContent = isDark ? "Light" : "Dark";
  }
}

function setupNavigationToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector("#primary-navigation");
  if (!menuToggle || !primaryNav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.getAttribute("data-open") === "true";
    const nextState = !isOpen;
    primaryNav.setAttribute("data-open", String(nextState));
    menuToggle.setAttribute("aria-expanded", String(nextState));
  });
}

function setupSearch() {
  const searchForms = document.querySelectorAll(".search-form");
  searchForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });

  const categoryGrid = document.querySelector("[data-filter-group]");
  const searchInput = document.querySelector("#search-input");
  const feedback = document.querySelector(".search-feedback");
  if (!categoryGrid || !searchInput) {
    return;
  }

  const cards = Array.from(categoryGrid.querySelectorAll(".category-card"));

  const applyFilter = (value) => {
    const query = value.trim().toLowerCase();
    let matchCount = 0;

    cards.forEach((card) => {
      const haystack =
        (card.dataset.category || "") + " " + card.textContent.toLowerCase();
      const isVisible = query.length === 0 || haystack.includes(query);
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) {
        matchCount += 1;
      }
    });

    if (feedback) {
      feedback.textContent =
        query.length === 0
          ? ""
          : matchCount > 0
          ? `Showing ${matchCount} categor${matchCount === 1 ? "y" : "ies"} for "${value}"`
          : `No categories found for "${value}". Try a different search.`;
    }
  };

  searchInput.addEventListener("input", (event) => {
    applyFilter(event.target.value);
  });
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) {
    return;
  }

  const feedback = form.querySelector(".form-feedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formElements = {
      fullName: form.querySelector("#full-name"),
      email: form.querySelector("#email-address"),
      subject: form.querySelector("#subject"),
      message: form.querySelector("#message"),
    };

    let isValid = true;
    clearErrors(formElements);

    if (!formElements.fullName.value.trim()) {
      markFieldInvalid(formElements.fullName);
      isValid = false;
    }

    if (!validateEmail(formElements.email.value)) {
      markFieldInvalid(formElements.email);
      isValid = false;
    }

    if (!formElements.subject.value) {
      markFieldInvalid(formElements.subject);
      isValid = false;
    }

    if (!formElements.message.value.trim()) {
      markFieldInvalid(formElements.message);
      isValid = false;
    }

    if (!feedback) {
      return;
    }

    if (!isValid) {
      feedback.textContent =
        "Please complete all required fields and ensure your email address is valid.";
      feedback.classList.remove("is-success");
      feedback.classList.add("is-error");
      return;
    }

    feedback.textContent =
      "Thank you for reaching out. Your message has been received and our team will respond within 48 hours.";
    feedback.classList.remove("is-error");
    feedback.classList.add("is-success");
    form.reset();
  });
}

function markFieldInvalid(element) {
  element.classList.add("error");
  element.setAttribute("aria-invalid", "true");
}

function clearErrors(formElements) {
  Object.values(formElements).forEach((element) => {
    element.classList.remove("error");
    element.removeAttribute("aria-invalid");
  });
}

function validateEmail(value) {
  const email = value.trim();
  if (email.length === 0) {
    return false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

