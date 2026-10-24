# Week05 Pages regeneration — 2026-10-24

Separate generated-output commit in fix/week-05-v2. This is required to publish the confirmed cleanup correction; old bundles do not contain the guards. No Week02–04 source or generated output is changed.

- Source commit: 35181f7ca3db671b2475bc3a9224d757a7446b01
- Node22.23.4, npm12.2.0, Vite8.1.5, unchanged package-lock.json; base ./
- Required checker133/133 and cleanup regression17/17 PASS. Two fixed-source production builds have identical SHA256 inventories.
- Fresh production preview checked new/dashboard/found+missing detail/about/unknown hash-route refresh, with no HTTP404. This is local preview, not proof of public deployment or InPrivate.
- Root build:pages ran on a clean git archive without node_modules/dist, then the complete generated diff was reviewed. Only Week05 publish/docs assets/index and Week05 sourceEntries10→11 in labs.json/submission.json changed. Other weeks are identical; unrelated CRLF-only copy differences were excluded.
- Submission metadata retains historical lab-05-submission-v1/PR9 because v2 tag/merge are not authorized. This draft branch has not been deployed; do not read historical metadata as a claim that v2 is submitted.

| New asset | SHA256 of fresh build |
|---|---|
| assets/index-1O0KRey8.css | c7a927434ddcd6c3981417614a95cfee9414fcc52413d580c48f74571ff168fd |
| assets/index-BlPfdM1C.js | 3efb388526c509993b152c08b03a41a40fd87e37a04782853c1218c5bc79545a |

Generated index.html had CR/CRLF line endings inherited from Windows input; only those HTML line endings were normalized to LF before commit so git diff --check passes. JS/CSS asset bytes are untouched. Raw and committed HTML SHA256 are retained in the remediation output. This is an explicit encoding normalization, not a source logic change.
