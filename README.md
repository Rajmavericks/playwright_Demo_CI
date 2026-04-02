# Playwright E2E Automation Framework

End-to-end UI automation framework built with Playwright + TypeScript, using Page Object Model (POM), data-driven tests, and Allure reporting.

## Highlights

- Playwright test runner with TypeScript
- Page Object Model based structure
- Data-driven testing support
- HTML, JUnit, and Allure reporting
- CI-ready with Jenkins and GitHub Actions.

## Tech Stack

- Node.js
- TypeScript
- Playwright
- Allure Report

## Project Structure

```text
.
|-- tests/                 # Test specs
|-- pages/                 # Page objects
|-- fixtures/              # Shared fixtures
|-- utils/                 # Utility helpers
|-- data/                  # Test data (JSON)
|-- playwright.config.ts   # Playwright configuration
|-- package.json           # NPM scripts and dependencies
|-- Jenkinsfile            # Jenkins pipeline
`-- .github/workflows/     # GitHub Actions workflow
```

## Prerequisites

- Node.js 20+
- npm
- Git
- Java (required for Allure report generation)

## Installation

```bash
npm ci
npx playwright install --with-deps
```

## Run Tests Locally

Run all tests:

```bash
npm test
```

Run specific test:

```bash
npm run test:register
```

Run in headed mode:

```bash
npm run test:headed
```

Run with Playwright UI:

```bash
npm run test:ui
```

## Reports

### Playwright HTML Report

```bash
npm run report
```

### Allure Report

Clean old Allure artifacts:

```bash
npm run allure:clean
```

Generate Allure report from results:

```bash
npm run allure:generate
```

Generate and open Allure report:

```bash
npm run allure:report
```

Run clean test + generate Allure report:

```bash
npm run allure:fresh
```

## Jenkins CI

This repository includes a pipeline in `Jenkinsfile` that:

- Checks out source
- Installs dependencies
- Installs Playwright browsers
- Runs tests
- Publishes JUnit and Allure data
- Archives test artifacts

### Jenkins Setup Notes

- Create a **Pipeline** job (not Freestyle)
- Use **Pipeline script from SCM**
- Script path: `Jenkinsfile`
- Configure NodeJS tool in Jenkins as `NodeJS_20`
- Install plugins:
  - Git
  - Pipeline
  - JUnit
  - Allure Jenkins Plugin (optional but recommended)

## GitHub Actions CI

Workflow file: `.github/workflows/playwright.yml`

Triggers:

- Push to `main` or `master`
- Pull requests to `main` or `master`

It performs:

- Dependency installation
- Playwright browser installation
- Test execution
- Allure report generation
- Artifact uploads (`playwright-report`, `test-results`, `allure-results`, `allure-report`)
- Optional deployment of Allure HTML report to `docs/` for GitHub Pages

## GitHub Pages (Allure)

To host Allure report on GitHub Pages:

1. Go to **Settings -> Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`
4. Folder: `/docs`

After successful workflow run, report will be available at:

```text
https://<your-username>.github.io/<your-repo-name>/
```

## Useful NPM Scripts

- `npm test` - Run full test suite
- `npm run test:register` - Run register-user scenario
- `npm run test:ci` - CI-friendly target suite
- `npm run report` - Open Playwright HTML report
- `npm run allure:clean` - Remove Allure output folders
- `npm run allure:generate` - Build Allure HTML report
- `npm run allure:open` - Open generated Allure report
- `npm run allure:fresh` - Clean + run + generate Allure

## Troubleshooting

### Allure report not generated

- Verify `allure-results/` exists after test run
- Ensure Java is installed (`java -version`)
- Run:

```bash
npx allure generate allure-results --clean -o allure-report
```

### TypeScript error: Cannot find name 'process'

- Ensure `tsconfig.json` includes Node types:

```json
"types": ["node", "@playwright/test"]
```

## Contribution Guidelines

1. Fork the repository and create a feature branch from `main`.
2. Keep one logical change per pull request.
3. Follow existing project structure (`tests/`, `pages/`, `fixtures/`, `utils/`).
4. Add or update test data in `data/` when required.
5. Run tests locally before pushing:

```bash
npm ci
npx playwright install --with-deps
npm test
```

6. For UI test changes, include evidence in PR (Playwright report or Allure screenshots).
7. Ensure CI passes (GitHub Actions and/or Jenkins) before requesting review.

## Branching Strategy

- `main`: stable and releasable branch.
- `feature/<short-description>`: new test cases, framework enhancements, refactoring.
- `bugfix/<short-description>`: fixes for flaky tests, selectors, or pipeline issues.
- `hotfix/<short-description>`: urgent fixes directly targeting production stability.
- `release/<version>` (optional): final validation branch before release.

Recommended flow:

1. Create branch from `main`.
2. Commit with clear messages (example: `test: add registration negative validation`).
3. Open pull request to `main`.
4. Require at least one review and passing CI checks.
5. Merge using squash merge to keep history clean.

## Author

Rajkumar
