# Project Modification Tracker

This document tracks the recommended project improvements from easiest to hardest.

## Status values

- `undone` — Work has not started. This is the default status.
- `doing` — This is the one task currently being worked on. Only one task should have this status at a time.
- `done` — The task is finished and satisfies every item in its **Done when** section.

## Progress

- Total tasks: 18
- Undone: 0
- Doing: 0
- Done: 18

## Modifications

### 1. Remove leftover development code

**Status:** `done`

Remove debugging statements, unused imports and variables, obsolete commented-out code, and empty controller actions that are not intentionally supported.

**Done when:**

- No `dd()` or temporary `console.log()` debugging statements remain in application code.
- Obsolete commented-out implementations and unused imports are removed.
- Every registered controller action returns an intentional response, or its route is removed.
- The application builds and relevant tests pass after cleanup.

### 2. Clean up repository artifacts

**Status:** `done`

Remove generated, duplicated, and runtime files that should not be treated as source code while preserving the SQLite database used for local development.

**Done when:**

- `.DS_Store`, committed runtime logs, build archives, and confirmed duplicate assets are removed from source control.
- `database/database.sqlite` remains available for local development but is ignored by Git so production can use MySQL independently.
- Generated build output is ignored or handled deliberately by the deployment process.
- `.gitignore` covers the local and runtime artifacts the project produces.
- A fresh project checkout can recreate all required generated files.

### 3. Fix formatting

**Status:** `done`

Bring the existing source files into compliance with the project's configured formatters.

**Done when:**

- `npm run format:check` exits successfully.
- PHP formatting checks exit successfully.
- No unrelated functional behavior changes are included in the formatting work.

### 4. Decide whether public registration exists

**Status:** `done`

Public registration is disabled. Visitors are redirected from `/register` to `/login`, registration submissions are rejected, and the default admin is created idempotently through database seeding.

**Done when:**

- The project explicitly supports either enabled or disabled public registration.
- Registration routes and UI match that decision.
- Registration tests match the intended behavior.
- The full backend test suite passes.

### 5. Correct the CI quality workflow

**Status:** `done`

Make CI verify submitted code without silently rewriting it or requesting unnecessary permissions.

**Done when:**

- CI runs formatting and linting in check-only mode.
- CI fails when formatting, linting, type checking, building, or tests fail.
- The workflow uses only the permissions it needs.
- Dependency installation is reproducible using lock files.
- Workflow syntax and all currently clean checks are verified locally; the CI correctly remains red for the known TypeScript baseline until task 6 is completed.

### 6. Fix the TypeScript baseline

**Status:** `done`

Resolve the existing TypeScript errors in shared components, page properties, forms, uploads, and application data models.

**Done when:**

- `npm run types` exits successfully with no TypeScript errors.
- Shared Inertia properties and reusable domain objects have defined types.
- Form and file-upload state does not rely on accidental `any`, `never`, or incorrect null inference.
- Duplicate or conflicting definitions of the same domain model are consolidated.

### 7. Fix the programme frontend model

**Status:** `done`

Make the programme frontend type agree with the backend data, especially the `date_of_event` field.

**Done when:**

- The programme type contains the fields actually returned and rendered by the application.
- `date_of_event` is handled consistently across list, create, edit, and detail pages.
- Programme pages produce no TypeScript errors.
- A programme detail page renders its event date correctly.

### 8. Make resource routes match implemented actions

**Status:** `done`

Register only the dashboard resource actions that the application intentionally supports.

**Done when:**

- No registered resource route points to an empty method or debug response.
- Unsupported resource actions are excluded from route registration.
- Supported actions return the expected response for authorized users.
- Route-level feature tests cover the available resource actions.

### 9. Improve route consistency

**Status:** `done`

Use consistent naming, URL structure, prefixes, and model binding across public and dashboard routes.

**Done when:**

- Public routes that are referenced by the application have stable names.
- Singular and plural URL conventions are applied consistently.
- Dashboard operations use a consistent dashboard prefix.
- Route-model binding is used consistently where appropriate.
- Existing links and redirects are updated and route tests pass.

### 10. Strengthen basic validation

**Status:** `done`

Make request validation complete and consistent with the database and frontend behavior.

**Done when:**

- Deleted gallery images are validated as an array of allowed values before use.
- Contact fields and other free-text inputs have sensible maximum lengths.
- Slugs are validated and normalized consistently.
- Database nullability agrees with request validation requirements.
- Larger create and update operations use reusable request-validation classes where beneficial.
- Feature tests cover valid and invalid submissions.

### 11. Add spam protection to the public contact form

**Status:** `done`

Reduce automated and repeated abuse of the public contact endpoint.

**Done when:**

- The contact submission endpoint has an appropriate rate limit.
- At least one additional low-friction spam control is deliberately implemented or documented as unnecessary.
- Rejected submissions do not create contact records.
- Automated tests verify the selected rate-limiting or spam-control behavior.

### 12. Sanitize rich-text HTML

**Status:** `done`

Prevent stored malicious HTML from executing when blog posts, events, and programmes are displayed.

**Done when:**

- Rich text is sanitized using an explicit allowlist before storage or rendering.
- Scripts, inline event handlers, unsafe URLs, and other dangerous markup are removed.
- Required safe formatting produced by the editor still renders correctly.
- Security-focused tests demonstrate that unsafe HTML cannot execute through each rich-text content type.

### 13. Fix file and database transaction consistency

**Status:** `done`

Ensure image storage and database records remain consistent when create, update, or delete operations fail.

**Done when:**

- Failed creates do not leave orphaned uploaded files.
- Failed updates do not delete a file still referenced by the database.
- Failed deletes leave the database and filesystem in a recoverable, consistent state.
- Event, programme, and post image behavior follows the same documented approach.
- Tests cover successful operations and simulated failure paths.

### 14. Add database constraints and indexes

**Status:** `done`

Enforce important data rules in the database and optimize common lookups and sorting.

**Done when:**

- Category title and slug uniqueness rules are enforced at the database level where required.
- Frequently queried slug, date, status, and relationship fields have justified indexes.
- Foreign keys use deliberate update and delete behavior.
- Migrations work on a fresh database and upgrade an existing database safely.
- Database-related feature tests pass.

### 15. Introduce real authorization

**Status:** `done`

Define who may access and modify users, contacts, posts, categories, events, and programmes.

**Done when:**

- The project's user roles or permission rules are explicitly defined.
- Sensitive controller actions are protected by policies, gates, or equivalent authorization checks.
- Unauthorized users receive the correct denial response.
- Email verification is either properly implemented or removed as an access requirement.
- Authorization tests cover each protected resource and high-risk operation.

### 16. Add tests for the actual application

**Status:** `done`

Build meaningful automated coverage around the project's own behavior rather than relying mainly on starter-kit tests.

**Done when:**

- Tests cover content CRUD, slug uniqueness, uploads, gallery deletion, category deletion rules, contacts, and public detail pages.
- Tests cover authorization and rich-text security behavior.
- Important validation and failure paths are included.
- Placeholder example tests are removed or replaced by meaningful tests.
- The complete test suite passes consistently.

### 17. Improve operational readiness

**Status:** `done`

Document and verify how the project is installed, deployed, operated, backed up, and monitored.

**Done when:**

- A README documents local setup, environment configuration, storage linking, database setup, seeding, builds, queues, tests, and deployment.
- Default seeded credentials are not suitable for accidental production use.
- Production expectations for backups, log rotation, mail, queues, uploaded-file storage, and health checks are documented.
- Dependency and security auditing has a defined repeatable process.
- A clean environment can be set up successfully by following the documentation.

### 18. Consolidate repeated content-management logic

**Status:** `done`

Reduce proven duplication in event, programme, and post management after their behavior is stable and tested.

**Done when:**

- Repeated backend upload, gallery, validation, and deletion behavior is consolidated where it genuinely shares the same rules.
- Repeated frontend form and upload UI is consolidated where doing so improves clarity.
- Content-specific differences remain explicit and understandable.
- Existing application-specific tests continue to pass.
- The resulting code is measurably easier to maintain and is not more abstract than the project requires.
