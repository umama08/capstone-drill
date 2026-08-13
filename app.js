import { validateSettingsForm, isFormValid } from "./validation.js";

export function setupSettingsForm(form) {
  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const nameError = form.querySelector("#name-error");
  const emailError = form.querySelector("#email-error");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errors = validateSettingsForm({
      name: nameInput.value,
      email: emailInput.value,
    });

    showFieldError(nameInput, nameError, errors.name);
    showFieldError(emailInput, emailError, errors.email);

    if (isFormValid(errors)) {
      form.reset();
      showFieldError(nameInput, nameError);
      showFieldError(emailInput, emailError);
    }
  });
}

function showFieldError(input, errorElement, message) {
  if (message) {
    errorElement.textContent = message;
    errorElement.hidden = false;
    input.setAttribute("aria-invalid", "true");
    return;
  }

  errorElement.textContent = "";
  errorElement.hidden = true;
  input.removeAttribute("aria-invalid");
}

if (typeof document !== "undefined") {
  const form = document.getElementById("settings-form");
  if (form) {
    setupSettingsForm(form);
  }
}
