# [WORKFLOW.md](http://WORKFLOW.md)

## The Drill

I built the same feature — a settings form with Name and Email fields — twice. Round 1 used a single vague prompt ("Add a settings form to this app.") with no context, no constraints, and I accepted the output without reviewing it. Round 2 used a detailed prompt specifying the exact file, the validation rules, the expected error behavior, accessibility requirements (labels), and asked the AI to write and run tests.

## Correctness

Round 1 produced a form with Name and Email fields and a Save button, but there was no validation logic at all. Leaving Email blank and clicking Save did nothing — no error, no feedback, the "save" just silently succeeded with invalid data.

Round 2 added real validation: required-field checks and email format checking, with error messages meant to display under each field. However, even in round 2 the AI's output wasn't immediately correct — when I first tested it, the errors weren't appearing on the page at all, even though the console showed no crash. I eventually traced this to two separate issues, not one: first, opening the HTML file directly in the browser (file:// protocol) blocked the JavaScript files from loading due to CORS, which had nothing to do with the AI's code and everything to do with how I was testing it. Once I ran a local server (python -m http.server) and reloaded through it, the actual validation logic worked as expected.

## Accessibility

Round 1's fields had visible text labels but they weren't properly connected to the inputs (no `for`/`id` pairing), so a screen reader wouldn't associate "Email" with the email input. Round 2 explicitly required proper `<label>`-to-`<input>` linking, and the AI did include this.

## Edge Cases

Round 1 handled zero edge cases — empty fields, invalid email format, and valid input were all treated identically (silently accepted). Round 2's prompt explicitly asked for test cases covering empty name, empty email, invalid email format, and valid input, and the AI generated a validation.test.js file for these.

## A Mistake I Caught

When the AI set up testing for round 2, it installed a dependency (jsdom) for the test to run, but never added a .gitignore file. This meant the entire node_modules folder — over 1,300 files — got committed and pushed to the repository. I had to catch this myself, remove it with `git rm -r --cached node_modules`, and add a proper .gitignore afterward. This wouldn't have been obvious just by reading the diff of index.html; it only showed up when I looked at what actually got pushed to GitHub.

## Time and Effort

Round 1 took about 2 minutes to prompt and accept, but produced something unusable — it would have taken significant additional time to notice the missing validation and accessibility issues if I hadn't already known to check for them. Round 2 took longer to prompt (writing out the constraints) and longer to review (reading the diff, testing manually, fixing the node_modules issue), but the end result was actually correct and tested. The real lesson: round 2 felt slower while I was doing it, but round 1 would have cost more time overall once you factor in the debugging and fixing that vague output demands.