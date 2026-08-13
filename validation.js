export function validateSettingsForm({ name, email }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  }

  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}
