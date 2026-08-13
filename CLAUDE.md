# Claude Instructions

Use this file when working on the Capstone Drill project.

## Project context

This is a simple HTML/JavaScript settings form with submit-time validation. Keep changes minimal and focused.

## Key files

- `index.html` — form markup, labels, and error message elements under each field
- `app.js` — wires up the form and shows errors on submit
- `validation.js` — pure validation logic (testable)
- `validation.test.js` — Node test suite

## Requirements to preserve

- Name and Email are both required.
- Email must use a valid email format.
- Show an error message **below each field**, only after submit.
- Each input must have a properly connected `<label for="...">`.
- Use accessible markup: `aria-describedby`, `aria-invalid`, `role="alert"`.



## Coding guidelines

- Match existing plain HTML/JS style — no frameworks unless asked.
- Keep validation logic in `validation.js`, not duplicated in tests or UI code.
- Run `npm test` after validation or form behavior changes.
- Do not commit `node_modules/`.



## Testing

Run:

```bash
npm test
```

Expected cases:

- empty name
- empty email
- invalid email format
- valid input
- errors hidden until submit



## Do not

- Add unnecessary dependencies.
- Show validation errors before the user submits.
- Remove or break accessibility attributes on form fields.



## Rules learned from the WORKFLOW drill (round1-lazy vs round2-careful)

- Any form must show validation errors inline under the field on submit —
not just prevent submission silently. A form that "does nothing" on
invalid input is not acceptable; the user needs visible feedback.
- Every `<input>` must have a properly connected `<label for="...">` /
`id="..."` pair, not just nearby label text. This is required for
accessibility and must be checked in review, not assumed.
- Before installing any dependency (test libraries, packages, etc.), add
a `.gitignore` with `node_modules/` first. Never commit installed
packages — check `git status` before committing to catch this.
- Test the app through a local server (`python -m http.server` or
equivalent), not by opening the HTML file directly — `file://` blocks
script loading via CORS and gives false "broken" results.

