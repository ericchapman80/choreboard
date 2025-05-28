# GitHub Issues Seed (Expanded)

This file reflects planned or existing GitHub issues to support Choreboard development.

---

## chore: Create Google Sheet with Bounty and Required tabs

**Description**  
Set up the initial chore tracking system with two tabs: one for required chores and one for bounty tasks.

**Acceptance Criteria**
- Required tab includes task metadata, due date, and completion fields
- Bounty tab includes reward fields and claimable logic
- Column formats include checkboxes, dropdowns, and dates

**Definition of Done**
- Sheet created with validations and sample data
- Shared with collaborators

---

## feat: Create pivot table dashboard for weekly earnings

**Description**  
Build dashboard using Google Sheets pivot tables for weekly and child-specific summaries.

**Acceptance Criteria**
- Filterable by week or user
- Totals for stars, dollars, completions per user

**Definition of Done**
- At least 1 visual dashboard created and working

---

## feat: Build github-issue-autocreate.sh utility

**Description**  
Shell script to create GitHub issues from structured issues.txt.

**Acceptance Criteria**
- Accepts markdown-formatted input
- Creates issues using GitHub CLI with proper labels

**Definition of Done**
- Successfully creates sample issues in repo
- Cleanup of issue_* temp files after execution

---

## docs: Write detailed ARCHITECTURE.md

**Description**  
Document all major components including sheets, forms, apps script, DAKboard, and future frontend.

**Acceptance Criteria**
- Markdown file describes purpose, integration, and rationale
- AI + automation plans detailed

**Definition of Done**
- File lives at project root and is referenced in README

---

## chore: Add Jest and sample unit tests for React components

**Description**
Set up Jest and React Testing Library for unit testing React components.

### Acceptance Criteria (Jest)

- Jest and React Testing Library are installed and configured
- At least one sample test exists for a simple component
- Test command is documented in the README

### Definition of Done (Jest)

- `npm test` runs and passes sample tests

---

## chore: Add GitHub Actions CI to run unit tests on every build

**Description**
Set up GitHub Actions workflow to run unit tests on every push and pull request.

### Acceptance Criteria (CI)

- Workflow runs `npm test` for the React frontend
- Fails the build if any test fails

### Definition of Done (CI)

- CI badge can be added to README
- PRs are blocked if tests fail
