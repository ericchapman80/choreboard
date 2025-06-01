# Choreboard Tasks

## Future Enhancements

### Documentation-Centric Approach

#### Overview

Shift from an issue-centric to a documentation-centric approach to enable better AI assistance and project maintainability.

#### Benefits

- **Single Source of Truth**: Architecture and tasks in one place
- **Better AI Assistance**: Structured metadata for improved code generation
- **Improved Traceability**: Clear links between architecture and implementation
- **Automated Synchronization**: Scripts to keep documentation and issues in sync

#### Implementation Plan

##### Phase 1: Documentation Foundation

- [ ] Create comprehensive ARCHITECTURE.md
- [ ] Document current system components and data flows
- [ ] Define metadata standards for AI assistance

##### Phase 2: Task Management

- [ ] Generate TASKS.md from ARCHITECTURE.md
- [ ] Implement synchronization between TASKS.md and issues.txt
- [ ] Update automation scripts to handle new format

##### Phase 3: AI Tooling

- [ ] Add AI-specific metadata to documentation
- [ ] Create prompt templates for common tasks
- [ ] Document common workflows for AI assistance

### AI Tooling Enhancements

#### Goal
Enhance the current workflow to be more AI-friendly for pair programming while maintaining existing functionality.

#### Tasks
- [ ] **feat: Add AI context comments to key scripts** (ai-003)
  _Labels: [enhancement, ai, workflow]_
  Add standard headers to all scripts with CONTEXT, USAGE, and DEPENDENCIES

- [ ] **feat: Document common workflows for AI assistance** (ai-004)
  _Labels: [documentation, ai, workflow]_
  Create WORKFLOWS.md with common development workflows

- [ ] **feat: Add metadata to existing issues** (ai-005)
  _Labels: [enhancement, ai, automation]_
  Enhance issue templates with AI-relevant metadata

- [ ] **feat: Create prompt templates for development tasks** (ai-006)
  _Labels: [documentation, ai]_
  Document common prompts for AI-assisted development

- [ ] **feat: Document system architecture for AI** (ai-007)
  _Labels: [documentation, architecture, ai]_
  Create CONTEXT.md explaining system architecture for AI consumption

## Docs & Blog

- [ ] **docs: Publish blog series documenting build process and learnings** (docs-001)
  _Labels: [documentation, blog]_
  Open-source the journey and share the tech + family impact.

  **Acceptance Criteria:**
  - Posts include screenshots and repo links
  - Covers tech, parenting, and AI use

  **Definition of Done:**
  - 3–5 blog posts published or drafted


##  MVP Setup

- [ ] **chore: Design Google Sheet with 3 tabs: Required Chores, Bounty Board, Dashboard** (mvp-001)
  _Labels: [chore, MVP, sheets]_
      Design Google Sheet with 3 tabs for core functionality.
    

- [ ] **chore: Add data validation (dropdowns, checkboxes, dates) to each tab** (mvp-002)
  _Labels: [chore, MVP, validation]_
      Add robust data validation to all core tabs.
    

- [ ] **chore: Create a Google Form for chore claims and completions** (mvp-003)
  _Labels: [chore, MVP, forms]_
      Create a Google Form to allow children to claim and complete chores.
    

- [ ] **chore: Setup Apps Script for recurring task creation** (mvp-004)
  _Labels: [chore, MVP, automation]_
      Write Apps Script to auto-create recurring tasks in the sheet.
    

- [ ] **chore: Build conditional formatting for overdue/incomplete tasks** (mvp-005)
  _Labels: [chore, MVP, formatting]_
      Use conditional formatting to highlight overdue or incomplete chores.
    

- [ ] **chore: Link Form submissions to the chore sheets via Apps Script** (mvp-006)
  _Labels: [chore, MVP, forms, automation]_
      Use Apps Script to sync Google Form submissions with the chore sheets.
    


##  Automation & Sync

- [ ] **feat: Build github-issue-autocreate.sh to convert issues.txt into live GitHub issues** (auto-001)
  _Labels: [automation, sync, scripts]_
      Automate creation of GitHub Issues from issues.txt.
    

- [ ] **feat: Build github-issue-sync.sh to pull GitHub issues back into issues.txt** (auto-002)
  _Labels: [automation, sync, scripts]_
      Script to sync GitHub Issues back into issues.txt, preserving IDs and metadata.
    

- [ ] **feat: Schedule GitHub Action to run sync script nightly and on issue events** (auto-003)
  _Labels: [automation, github-actions]_
      Use GitHub Actions to automate syncing between issues.txt and GitHub Issues.
    

- [ ] **chore: Add cleanup logic to remove issue_* temp files after CLI run** (auto-004)
  _Labels: [chore, automation, scripts]_
      Ensure all temporary files are cleaned up after sync scripts run.
    

- [ ] **chore: Store issues.txt in utilities/data/ for separation of source material** (auto-005)
  _Labels: [chore, repo-structure]_
      Keep issues.txt in a dedicated data directory.
    

- [ ] **feat: Add label detection in issue creation script** (auto-006)
  _Labels: [automation, labels, scripts]_
      Detect and apply labels automatically when pushing issues to GitHub.
    

- [ ] **docs: Update README with setup instructions + dependency management (Brewfile)** (auto-007)
  _Labels: [docs, automation, dev]_
      Document setup and dependencies for automation scripts.
    


##  Developer Experience

- [ ] **chore: Add Brewfile with gh and jq** (dev-001)
  _Labels: [chore, dev, brew]_
      Add a Brewfile to manage CLI dependencies.
    

- [ ] **chore: Create .github/workflows/sync-issues.yml to automate issues.txt** (dev-002)
  _Labels: [chore, github-actions, dev]_
      Add a GitHub Actions workflow to automate syncing tasks.
    

- [ ] **docs: Add setup instructions and GitHub auth notes to README** (dev-003)
  _Labels: [docs, dev]_
      Document GitHub authentication and setup for contributors.
    

- [ ] **docs: Document architecture in full Markdown format** (dev-004)
  _Labels: [docs, dev]_
      Write a full Markdown architecture doc for the project.
    

- [ ] **chore: Generate GitHub labels in repo settings to avoid CLI errors** (dev-005)
  _Labels: [chore, github-labels, dev]_
      Pre-create all needed labels in the GitHub repo.
    


##  Dashboard & Reporting

- [ ] **feat: Add weekly leaderboard (stars + dollars)** (dash-001)
  _Labels: [dashboard, leaderboard]_
      Add a weekly leaderboard tracking both stars and dollars.
    

- [ ] **feat: Create pivot charts to show completion %, top earners** (dash-002)
  _Labels: [dashboard, charts]_
      Create pivot charts for completion rates and top earners.
    

- [ ] **feat: Filter dashboard by week/date** (dash-003)
  _Labels: [dashboard, filters]_
      Enable dashboard filtering by week or date.
    

- [ ] **feat: Include motivational quote per week (optional)** (dash-004)
  _Labels: [dashboard, fun]_
      Show a motivational quote each week on the dashboard.
    


##  AI Integration

- [ ] **feat: Suggest age-appropriate chores via GPT** (ai-001)
  _Labels: [ai, suggestion]_
      Use GPT to suggest chores by age.
    

- [ ] **feat: Suggest reward levels based on effort and frequency** (ai-002)
  _Labels: [ai, suggestion]_
      Use AI to suggest reward levels for chores.
    

- [ ] **feat: Add natural language interface (e.g., “what chores are due today for Karter?”)** (ai-003)
  _Labels: [ai, nlp]_
      Add a natural language interface for querying chores.
    

- [ ] **feat: Detect burnout or overuse patterns and recommend breaks** (ai-004)
  _Labels: [ai, wellbeing]_
      Use AI to detect burnout and suggest breaks.
    

- [ ] **feat: Automatically generate a weekly schedule template per child** (ai-005)
  _Labels: [ai, schedule]_
      Use AI to generate weekly schedule templates for each child.
    


##  React Frontend

- [ ] **feat: Create Next.js app with Google OAuth** (react-001)
  _Labels: [frontend, react, auth]_
      Create a Next.js frontend with Google OAuth authentication.
    

- [ ] **feat: Add child dashboard: claimed tasks, due today, star tracker** (react-002)
  _Labels: [frontend, react, dashboard]_
      Build a dashboard for children to track and claim tasks.
    

- [ ] **feat: Add parent dashboard: approvals, payout log, filter by child** (react-003)
  _Labels: [frontend, react, dashboard]_
      Build a dashboard for parents to approve tasks and track payouts.
    

- [ ] **feat: Make views embeddable in DAKboard (read-only mode)** (react-004)
  _Labels: [frontend, react, embed]_
      Allow dashboard views to be embedded in DAKboard.
    

- [ ] **feat: Sync UI with sheet backend via GAS proxy or Sheets API** (react-005)
  _Labels: [frontend, react, sync]_
      Sync frontend UI with the Google Sheets backend.
    


##  Misc

- [ ] **Test Issue from CLI** (test-001)
  _Labels: [test]_
      This is a test issue created from the GitHub CLI.

