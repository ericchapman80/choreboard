# Choreboard Task List

This document serves as a running backlog of features, automation, and improvements for Choreboard. Items are grouped by milestone and include references to scripts, Google Sheet/Forms, frontend work, and GitHub actions.

---

## ✅ MVP Setup

- [ ] Design Google Sheet with 3 tabs: Required Chores, Bounty Board, Dashboard
- [ ] Add data validation (dropdowns, checkboxes, dates) to each tab
- [ ] Create a Google Form for chore claims and completions
- [ ] Setup Apps Script for recurring task creation
- [ ] Build conditional formatting for overdue/incomplete tasks
- [ ] Link Form submissions to the chore sheets via Apps Script

---

## 🔁 Automation & Sync

- [ ] Build `github-issue-autocreate.sh` to convert issues.txt into live GitHub issues
- [ ] Build `github-issue-sync.sh` to pull GitHub issues back into issues.txt
- [ ] Schedule GitHub Action to run sync script nightly and on issue events
- [ ] Add cleanup logic to remove `issue_*` temp files after CLI run
- [ ] Store `issues.txt` in `utilities/data/` for separation of source material
- [ ] Add label detection in issue creation script
- [ ] Update README with setup instructions + dependency management (Brewfile)

---

## 🧰 Developer Experience

- [ ] Add `Brewfile` with `gh` and `jq`
- [ ] Create `.github/workflows/sync-issues.yml` to automate issues.txt
- [ ] Add setup instructions and GitHub auth notes to README
- [ ] Document architecture in full Markdown format
- [ ] Generate GitHub labels in repo settings to avoid CLI errors

---

## 📊 Dashboard and Reporting

- [ ] Add weekly leaderboard (stars + dollars)
- [ ] Create pivot charts to show completion %, top earners
- [ ] Filter dashboard by week/date
- [ ] Include motivational quote per week (optional)

---

## 🧠 AI Integration (Future Phase)

- [ ] Suggest age-appropriate chores via GPT
- [ ] Suggest reward levels based on effort and frequency
- [ ] Add natural language interface (e.g., “what chores are due today for Karter?”)
- [ ] Detect burnout or overuse patterns and recommend breaks
- [ ] Automatically generate a weekly schedule template per child

---

## 🎯 React Frontend Phase

- [ ] Create Next.js app with Google OAuth
- [ ] Add child dashboard: claimed tasks, due today, star tracker
- [ ] Add parent dashboard: approvals, payout log, filter by child
- [ ] Make views embeddable in DAKboard (read-only mode)
- [ ] Sync UI with sheet backend via GAS proxy or Sheets API
