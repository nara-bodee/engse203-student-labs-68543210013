# Week05 manual closeout — 25 October2026

Actual revision source tree a548e5bbba219c7ca13d078dd7e1f4cad10db14f, isolated origin127.0.0.1:5605, only synthetic data.

- TC19 PASS:3 add/delete cycles, exact IDs/counts in FINAL_MANUAL_RESULTS.json.
- TC21 PASS: real browser GUI keyboard journey,108 focus observations; visible3px orange focus on all interactive observations. Native select/radio arrow keys and ordinary text entry complement Tab/Shift+Tab/Enter/Space. The native reset confirmation was not part of this keyboard journey.
- TC02 PARTIAL: routes/active state passed; Network document reload inspection UNVERIFIED.
- TC07 UNVERIFIED: actual LocalStorage envelope via DevTools remains pending.
- TC17 UNVERIFIED: reset from non-all and preservation of another key remain pending.

The last three are mandatory verification blockers for PR38 under [the instructor test template](https://github.com/se-rmutl/engse203-lab/blob/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-05-react-mini-app/lab05/evidence-templates/TEST_REPORT.md), not newly demonstrated code failures. Current native input is intercepted by Windows Security/PickerHost; direct coordinate input and fresh-window activation recovery failed. The user was asked only to handle that system window, not to grant merge approval again. No security settings were changed and no unverified case was marked PASS. Other PRs proceed independently.

The ten required screenshots remain complete. Original Edge InPrivate screenshot remains explicitly pre-PR38/public-deployment evidence. No screenshot history is rewritten.

Latest native observation: Windows lock screen is visible instead of the selected Edge window. Native input needs the user to unlock Windows. Browser DOM automation remained usable for TC19/TC21, but that does not substitute for the required DevTools inspection.
