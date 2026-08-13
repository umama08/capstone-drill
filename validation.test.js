import assert from "node:assert/strict";
import test from "node:test";
import { JSDOM } from "jsdom";
import { setupSettingsForm } from "./app.js";
import { isFormValid, validateSettingsForm } from "./validation.js";

const formMarkup = `
  <form id="settings-form" novalidate>
    <label for="name">Name</label>
    <input type="text" id="name" name="name">
    <span id="name-error" hidden role="alert"></span>
    <label for="email">Email</label>
    <input type="email" id="email" name="email">
    <span id="email-error" hidden role="alert"></span>
    <button type="submit">Save Settings</button>
  </form>
`;

function createFormDom() {
  const dom = new JSDOM(formMarkup);
  const form = dom.window.document.getElementById("settings-form");
  setupSettingsForm(form);
  return dom;
}

test("empty name shows a name error", () => {
  const errors = validateSettingsForm({ name: "", email: "user@example.com" });

  assert.equal(errors.name, "Name is required.");
  assert.equal(errors.email, undefined);
  assert.equal(isFormValid(errors), false);
});

test("empty email shows an email error", () => {
  const errors = validateSettingsForm({ name: "Jane Doe", email: "" });

  assert.equal(errors.name, undefined);
  assert.equal(errors.email, "Email is required.");
  assert.equal(isFormValid(errors), false);
});

test("invalid email format shows an email format error", () => {
  const errors = validateSettingsForm({ name: "Jane Doe", email: "not-an-email" });

  assert.equal(errors.name, undefined);
  assert.equal(errors.email, "Please enter a valid email address.");
  assert.equal(isFormValid(errors), false);
});

test("valid input passes validation", () => {
  const errors = validateSettingsForm({
    name: "Jane Doe",
    email: "jane@example.com",
  });

  assert.deepEqual(errors, {});
  assert.equal(isFormValid(errors), true);
});

test("errors appear only after submit attempt", () => {
  const dom = createFormDom();
  const { document } = dom.window;
  const form = document.getElementById("settings-form");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");

  assert.equal(nameError.hidden, true);
  assert.equal(emailError.hidden, true);

  const submitted = form.dispatchEvent(
    new dom.window.Event("submit", { bubbles: true, cancelable: true })
  );

  assert.equal(submitted, false);
  assert.equal(nameError.hidden, false);
  assert.equal(emailError.hidden, false);
  assert.equal(nameError.textContent, "Name is required.");
  assert.equal(emailError.textContent, "Email is required.");
});
