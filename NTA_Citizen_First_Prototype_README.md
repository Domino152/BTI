# NTA Citizen-First Prototype

> A student-first redesign concept for discovering, preparing for, applying to, and tracking multiple NTA examinations from one consistent interface.

## Status and disclaimer

This is an independent hackathon prototype. It is not affiliated with, endorsed by, or connected to the National Testing Agency or the Government of India.

- Use synthetic candidate profiles, application numbers, documents, centers, dates, fees, and payment references.
- Label simulated data and actions clearly.
- Official NTA and exam websites are reference links only.
- Do not scrape, imitate, log in to, or send data to private government services.

---

## 1. Product vision

The current public experience spreads information across the main NTA website, large notice archives, mock-test pages, the National Test Abhyas page, and separate exam-specific portals. The prototype reorganizes those services around the student's actual question:

> What am I preparing for, what have I completed, and what must I do next?

The prototype has two distinct experiences:

1. **Public homepage:** a clean entry point with only the most useful student actions.
2. **Authenticated exam workspace:** a personalized area generated only from the examinations selected by the user.

The interface must be a complete visual redesign. Do not copy the current NTA website's layout, oversized institutional carousel, notice dump, typography, card style, dark footer, or visual hierarchy.

---

## 2. Correct first-time user flow

There are **no default JEE, NEET, CUET, or other exam tabs**.

```text
Public homepage
    -> Student login / demo login
    -> If the account has no selected exams, open exam-selection onboarding
    -> User searches and selects one or more exams
    -> Confirm selection
    -> Create workspace tabs only for those selected exams
    -> Open the first selected exam workspace
```

### Required onboarding rules

- The first login must open `/onboarding/exams` when `selectedExamIds` is empty.
- The user can select one exam or multiple exams.
- Continue is disabled until at least one exam is selected.
- Each selected exam becomes a workspace tab after confirmation.
- Unselected exams must not appear as workspace tabs.
- A user who selects only CUET UG sees only `CUET UG` plus an `Add exam` control.
- A user who selects JEE Main and NEET UG sees only those two exam tabs.
- The selection persists after refresh and future logins.
- The user can later add an exam through `Add exam` or remove one through Manage exams after a confirmation dialog.
- Removing a tab must not silently delete application data. In the prototype, archive or hide it instead.

### Example states

| User choice | Resulting workspace tabs |
| --- | --- |
| CUET UG | CUET UG, Add exam |
| JEE Main + NEET UG | JEE Main, NEET UG, Add exam |
| UGC-NET + CSIR-NET + CUET PG | UGC-NET, CSIR-NET, CUET PG, Add exam |

---

## 3. Official NTA site audit

The audit covers the main public and student-relevant surfaces linked from the official NTA website. The notice archive contains well over a thousand historical entries, so the prototype must not reproduce every notice or PDF. It should instead model the information architecture and seed a small, clearly labeled dataset for the demonstration.

### Main public surfaces reviewed

| Official surface | URL | What exists there | Prototype decision |
| --- | --- | --- | --- |
| NTA homepage | https://nta.ac.in/ | Institutional hero, scheme ticker, Mock Test, Abhyas, About NTA, large latest-notice stream, exam cards, partner logos, contact and map | Replace with a focused student homepage |
| About NTA | https://www.nta.ac.in/about | About, vision, objectives, functions and governance navigation | Keep as a compact secondary page/footer link |
| Notice archive | https://nta.ac.in/NoticeBoardArchive | Mixed notices for many examinations and many years | Filter notices by selected exam, type, year and urgency |
| Mock Test | https://nta.ac.in/Quiz | Exam and paper selectors with CBT practice entry | Promote directly inside the homepage hero |
| National Test Abhyas | https://www.nta.ac.in/abhyas | App promotion, mock tests, analytics and student guidance | Promote directly inside the homepage hero |
| Abhyas getting started | https://www.nta.ac.in/Abhyas/started | Device access, login, available tests and offline-test guidance | Link from the Abhyas hero action or Help |
| Abhyas test help | https://www.nta.ac.in/Abhyas/test | Test availability and test-resume guidance | Use as supporting Help content only |
| Abhyas support | https://www.nta.ac.in/Abhyas/help | Test-taking support | Use as supporting Help content only |
| Contact and exam portals | https://www.nta.ac.in/ContactUs | NTA contact plus separate exam websites, emails and phone numbers | Create one searchable Help directory; retain official links |
| RTI | https://www.nta.ac.in/RTI | RTI information and procedures | Keep as a small footer/institutional link |
| RTI officers | https://www.nta.ac.in/RTI/Officers | Public information officer details | Keep outside the student journey |
| Suo-moto disclosures | https://www.nta.ac.in/RTI/SuoMoto | Statutory disclosures | Keep outside the student journey |
| Tenders | https://www.nta.ac.in/Tender | Tender listings and documents | Keep outside the student journey |
| Strategic plan | https://nta.ac.in/StrategicPlan | NTA research and assessment strategy | Optional About-page content, not homepage content |
| Test development | https://nta.ac.in/DevelopmentofTests | Assessment development and mock-test purpose | Optional About-page content, not homepage content |

### Exam portals confirmed through the official contact directory

Use these as external official-source links. Do not visually embed or imitate their private login flows.

| Exam | Official portal |
| --- | --- |
| JEE Main | https://jeemain.nta.nic.in/ |
| NEET UG | https://neet.nta.nic.in/ |
| CUET UG | https://cuet.nta.nic.in/ |
| CUET PG | https://exams.nta.nic.in/cuet-pg/ |
| UGC-NET | https://ugcnet.nta.nic.in/ |
| Joint CSIR-UGC NET | https://csirnet.nta.nic.in/ |
| CMAT | https://cmat.nta.nic.in/ |
| AIAPGET | https://exams.nta.nic.in/aiapget/ |
| SWAYAM examinations | https://exams.nta.nic.in/swayam/ |
| NCHM JEE | https://exams.nta.nic.in/nchm-jee/ |
| AISSEE | https://exams.nta.nic.in/sainik-school-society/ |
| JIPMAT | https://exams.nta.nic.in/jipmat/ |
| SHRESHTA (NETS) | https://exams.nta.nic.in/shreshta/ |
| GAT-B/BET | https://exams.nta.nic.in/gat-bet/ |

### Main UX problems found

1. The homepage gives institutional content more visual weight than the student's next action.
2. Mock Test and Abhyas are useful but visually separated from the hero instead of being part of the main entry experience.
3. The notice stream combines unrelated examinations, years, lifecycle stages and administrative announcements.
4. Exam cards act mainly as links to separate websites; the candidate loses context when moving between exams.
5. The page uses multiple carousels, dense navigation, a moving ticker, many logos and a large footer, producing unnecessary scanning.
6. The current layout does not immediately answer: Which exam is mine? What is urgent? What should I do next?
7. Contact information is organized by agency/exam, but it is not presented as contextual help inside the selected exam journey.

---

## 4. Public homepage specification

The homepage must contain only four visible regions:

1. Navbar
2. Hero with Mock Test and National Test Abhyas included inside it
3. Government and examination ecosystem slider
4. Minimal footer

Do not add a latest-news wall, About NTA block, separate mock-test strip, exam-card grid, map embed, social-media list, or extra feature sections to the homepage.

### 4.1 Navbar

#### Desktop

Left:

- Prototype/NTA-inspired identity mark. Do not falsely present the prototype as the official NTA website.

Center/right navigation:

- Home
- Explore Exams
- Notices
- Help

Actions:

- Language selector
- Accessibility control
- `Student Login` primary button

#### Mobile

- Logo/wordmark
- Student Login button
- Menu button
- Menu opens as a clean sheet/drawer with the same links
- Do not reproduce the desktop navigation as tiny text

#### Navbar behavior

- Sticky after scrolling.
- White or very light surface with a subtle bottom border.
- Active route is clearly visible without a heavy dark rectangular tab.
- Keyboard focus is always visible.
- No social icons, clock, ticker or campaign banner in the main navbar.

### 4.2 Hero

The hero is a single modern student-focused composition, not an image carousel.

#### Copy direction

Suggested headline:

> Every exam. One clear place.

Suggested supporting copy:

> Discover NTA examinations, prepare with official resources, and keep every application milestone organized from one student workspace.

Primary actions:

- `Explore exams`
- `Student login`

#### Mock Test and Abhyas inside the hero

Place two compact interactive cards or a joined action panel inside the hero composition:

**Official Mock Test**

- Short label: Practice the CBT interface
- Action: `Open mock tests`
- Official destination: https://nta.ac.in/Quiz

**National Test Abhyas**

- Short label: Practice and review performance
- Actions: `Explore Abhyas` and optional app-store icon/link
- Official destination: https://www.nta.ac.in/abhyas

These must not appear again as a separate strip below the hero.

#### Hero visual direction

- Create an original illustration or abstract student/exam visual.
- Do not reuse the current laptop-hands stock image.
- Avoid an oversized government-banner aesthetic.
- Keep the layout calm, spacious and credible.
- Use subtle motion only for entrance/focus feedback; no auto-rotating hero.

### 4.3 Government and examination ecosystem slider

Use one accessible horizontal carousel immediately after the hero. Its purpose is to show the official ecosystem without turning the homepage into a directory.

Possible grouped items:

- Ministry of Education
- Digital India
- MyGov
- DigiLocker or other verified government services
- JEE Main
- NEET UG
- CUET UG
- UGC-NET
- CSIR-NET
- SWAYAM

Rules:

- Use only assets and labels that are permitted for the prototype.
- Clearly mark the project as independent; displaying an official link does not imply endorsement.
- Pause on hover and keyboard focus.
- Provide previous/next buttons and touch dragging.
- Do not auto-scroll rapidly.
- All items require descriptive accessible names.
- On small screens, show roughly 1.5 to 2.25 cards so the horizontal behavior is obvious.

### 4.4 Minimal footer

Use a short footer, not the current large three-column block.

Include:

- Independent prototype disclosure
- Official NTA website link
- About
- Accessibility
- Privacy
- Help/contact directory
- Copyright/credits line

Do not place a map, full social-media directory, multiple government badges or long contact table on the homepage.

---

## 5. Logged-in student experience

### 5.1 Empty account

An authenticated account with no selected exams must never receive assumed exam tabs. Show only the selection onboarding.

### 5.2 Exam selection screen

Required UI:

- Heading: `Which examinations are you preparing for?`
- Supporting copy explaining that selections create personalized workspaces and can be changed later
- Search input
- Filters such as level, subject/domain and registration status
- Multi-select exam cards with name, purpose, level and official portal link
- Sticky selected-count summary
- `Continue with selected exams` primary action
- `Decide later` may return to a neutral Explore screen, but must not create tabs

### 5.3 Exam workspace tabs

Tabs are created from `selectedExamIds`, never from hard-coded defaults.

Example:

```text
[ JEE Main ] [ NEET UG ] [ + Add exam ]
```

Inside each selected exam workspace, show three sections:

#### Exam Desk

- Registration/exam dates
- Countdown or upcoming milestone
- Relevant announcements
- Mock papers
- Previous question papers
- Official sources
- Nearby sample examination centers
- Exam-specific help

#### My Journey

- Application state
- Completed/current/upcoming steps
- Saved progress
- Payment state
- City-intimation milestone
- Admit-card milestone
- Exam-day milestone
- Answer-key/result milestone
- One clear next action

#### Explore More

- Other examinations not selected by the user
- Search and filters
- Short eligibility/purpose summary
- Registration status
- Add exam action

### 5.4 Shared profile

Personal information is account-level and reusable across applications. It must not become a separate duplicated profile inside every tab.

- Pre-fill reusable values when a new application starts.
- Require review/confirmation before submission.
- Store exam-specific answers only in that exam's application record.

---

## 6. Data and state contract

```ts
type CandidateProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  selectedExamIds: string[];
  activeExamId: string | null;
};

type ExamConfig = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  domain: string;
  level: string;
  purpose: string;
  officialUrl: string;
  registrationStatus: "open" | "upcoming" | "closed" | "sample";
  dates: ExamDate[];
  notices: Notice[];
  resources: Resource[];
  centers: SampleCenter[];
  applicationSchema: ApplicationSection[];
};

type Application = {
  id: string;
  candidateId: string;
  examId: string;
  state:
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "READY_FOR_REVIEW"
    | "PAYMENT_PENDING"
    | "SUBMITTED";
  currentStep: string | null;
  answers: Record<string, unknown>;
  documentMetadata: Record<string, unknown>;
  paymentReference: string | null;
  updatedAt: string;
};
```

### Derived-tab rule

```ts
const workspaceTabs = examCatalog.filter((exam) =>
  candidate.selectedExamIds.includes(exam.id)
);
```

Do not seed `selectedExamIds` with JEE or NEET. Demo accounts may contain selections only when the demo scenario explicitly identifies them as a returning user. The primary first-login demonstration must show the selection step.

---

## 7. Routes

| Route | Purpose |
| --- | --- |
| `/` | Public redesigned homepage |
| `/login` | Synthetic student login |
| `/onboarding/exams` | Mandatory first-login exam selection |
| `/exams` | Searchable public exam catalogue |
| `/notices` | Searchable and filterable public notices |
| `/help` | Student help and official contact directory |
| `/dashboard` | Personalized overview after selection |
| `/workspace/:examSlug` | Selected exam workspace |
| `/workspace/:examSlug/desk` | Exam Desk |
| `/workspace/:examSlug/journey` | My Journey |
| `/workspace/:examSlug/explore` | Explore More |
| `/apply/:examSlug/:step` | Schema-driven application step |
| `/manage-exams` | Add, archive or restore exam workspaces |
| `/about-prototype` | Sources, simulations, coverage and limitations |

---

## 8. Visual system

The target look is modern, calm, public-service trustworthy and student-friendly.

- Use one universal sans-serif family such as Inter, Source Sans 3 or the system font stack.
- Body text: at least 16 px on mobile.
- Touch targets: at least 44 x 44 px.
- Use white/light-neutral surfaces, deep navy text and one blue primary action color.
- Use green, amber and red only for states, always with text and icons.
- Use consistent 8-12 px corner radii; avoid excessive pills.
- Use a restrained shadow system.
- Avoid glassmorphism, neon gradients, oversized empty cards, cartoonish illustrations and dashboard clutter.
- Support keyboard navigation, reduced motion, semantic landmarks, proper headings and contrast.
- Responsive targets: 360 px, 768 px, 1024 px and 1440 px.

The screenshots supplied by the user show the current official website only. They are **audit references, not visual references for the new design**. Future target screenshots supplied by the user override the visual guidance in this section while preserving the product and state rules.

---

## 9. Prototype scope

### Must work

- Redesigned public homepage
- Synthetic login
- First-login exam selection
- Dynamic selected-exam tabs
- Add-exam interaction
- Three-section exam workspace
- Separate state for at least three seeded exams
- Mock/previous-paper sample downloads
- Exam-filtered sample notices
- Sample center locator
- Schema-driven application progress
- Pending-payment recovery simulation
- Mobile responsive behavior
- Prototype/source disclosure

### Seed deeply

Use three contrasting demo exams, but never select them automatically:

- JEE Main
- NEET UG
- CUET UG

Additional official exams can appear in the searchable catalogue with basic metadata and official links.

### Do not build now

- Real NTA authentication or OTP
- Real application submission
- Real payment processing
- Real admit-card generation
- Real candidate document verification
- Automatic scraping of NTA pages or PDFs
- Unverified eligibility decisions
- Free-form AI answers without official source grounding
- Full replication of every official exam form
- Admin, RTI and tender workflows

---

## 10. Acceptance tests

1. **No default tabs:** Log in with a new account. No exam tab is visible before selection.
2. **Single selection:** Select only CUET UG. Only the CUET UG workspace tab appears.
3. **Multiple selection:** Select JEE Main and NEET UG. Exactly those two tabs appear.
4. **Add later:** Add CUET UG from Explore More. CUET UG appears without removing or resetting existing workspaces.
5. **Persistence:** Refresh and log in again. Selected exams and the active tab are restored.
6. **Isolation:** Save different answers and states for JEE and NEET. Switching tabs never mixes them.
7. **Homepage scope:** The public homepage contains only navbar, combined hero actions, one ecosystem slider and minimal footer.
8. **Mobile:** Homepage, onboarding and workspace function at 360 x 800 with no horizontal page overflow.
9. **Trust:** Every official external action is visibly marked as an official link; every prototype action/data source is visibly marked simulated when appropriate.
10. **Accessibility:** All controls work by keyboard and visible focus is never removed.

---

## 11. Master instruction for the coding agent

```text
Build the NTA Citizen-First hackathon prototype described in this README.

First inspect the existing repository, chosen framework, routing, styling system, assets, package manager and tests. Reuse the project's current stack. Do not replace the framework or add unnecessary dependencies.

Treat the README as the product contract. The most important correction is that JEE, NEET and every other exam must NOT be default workspace tabs. On first login, if selectedExamIds is empty, redirect to /onboarding/exams. The user must select one or more exams. Generate workspace tabs only from those selections and persist them. Adding an exam later creates its tab without changing other exam data.

Redesign the public NTA-inspired homepage completely. Do not imitate the current official NTA layout. The homepage must contain only:
1. A clean responsive navbar.
2. One original hero with Explore exams and Student login actions.
3. Official Mock Test and National Test Abhyas actions integrated inside that same hero.
4. One accessible government/examination ecosystem carousel.
5. One minimal footer.

Do not add a news wall, About block, separate mock-test strip, large exam grid, map embed, social directory, moving ticker or multiple homepage carousels.

Build with synthetic local data. Never connect to a private government system. Keep official portal URLs as external references and clearly disclose that this is an independent prototype.

Implement in vertical slices:
- Public homepage
- Demo login and first-login selection
- Dynamic workspace tabs
- Three-section workspace: Exam Desk, My Journey, Explore More
- Add/manage exams
- Schema-driven application state
- Sample resources/notices/centers
- Pending-payment recovery
- Responsive and accessibility pass

For every slice, implement loading, empty, validation, success and error states where relevant. Persist state across refresh. Prevent cross-exam data leakage. Use one clear primary action per screen.

Run all acceptance tests from this README. At completion, report changed files, commands run, test results and honest remaining limitations. Do not claim a feature works unless it is reproducible in the running prototype.
```

---

## 12. Next visual-spec update

When target UI screenshots are provided, update this README with:

- Exact navbar spacing and behavior
- Hero composition and responsive stacking
- Color and type tokens
- Card geometry
- Carousel appearance and movement
- Mobile navigation
- Logged-in workspace wireframe
- Component-by-component screenshot mapping

Do not change the first-login exam-selection rule unless explicitly requested.
