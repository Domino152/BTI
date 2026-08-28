# Citizen First — NTA journey prototype

A Vite + React implementation of the product contract in `NTA_Citizen_First_Prototype_README.md`.

## Run locally

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:5173`.

Use **Student login** to enter the synthetic demo. A clean browser profile starts with no selected exams and is sent to the exam-selection onboarding. To repeat that flow, use **Reset demo to first login** on the login page.

## Verification

```bash
pnpm build
node scripts/verify.cjs
```

The browser verification expects Microsoft Edge at its standard Windows installation path and a dev server running on port `5173`.

All candidate, application, date, center, notice, fee, and payment data is simulated. Official links open external public websites; this prototype never connects to private government systems.
