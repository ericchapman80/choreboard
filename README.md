# Choreboard

> **"Choreboard — where chores meet dashboards, bounties, and badges."**

**Choreboard** is a co-designed, AI-assisted, gamified family chore dashboard that combines **Google Sheets**, **Forms**, and a **React frontend**. It helps families track required chores, claim bounty tasks, and earn rewards — all from a DAKboard-friendly visual display.

💡 Powered by smart automation and GPT-based planning, Choreboard can suggest new chores, calculate fair rewards, and optimize family routines.

---

## ✨ Features

- Google Sheets backend with auto-refreshing chore data
- Claimable "bounty" system with stars and dollars
- Parental approval workflows
- Google Forms for kid-friendly submission
- Custom React frontend (Next.js) with Google login
- DAKboard-friendly display views
- Weekly dashboard, summaries, and leaderboard

---

## 📚 Tech Stack

- Google Sheets + Forms + Apps Script
- React (Next.js) + Google OAuth
- DAKboard embedding
- Markdown documentation and GitHub project boards

---

## 🔍 Tags

`chore-tracker` `dakboard` `family-dashboard` `google-sheets` `react` `gamification` `household-management` `google-apps-script` `task-tracker` `parenting-tools`


---

## 🛠 Setup Instructions (macOS)

To install required tools and get started:

### 1. Clone the repo

```bash
git clone https://github.com/ericchapman80/choreboard.git
cd choreboard
```

### 2. Install Dependencies via Homebrew

```bash
brew bundle
```

This installs:
- `gh` (GitHub CLI)
- `jq` (JSON processor for issue sync)

### 3. Authenticate with GitHub

```bash
gh auth login
```

### 4. Run the Issue Sync Script

```bash
./utilities/github-issue-sync.sh
```

This will pull all issues from GitHub and format them into `utilities/data/issues.txt`.

---


## 🧰 Utilities

### Automated GitHub Issue Creation

To bulk-import issues into your GitHub repo from `issues.txt`, use the helper script:

```bash
cd utilities
./github-issue-autocreate.sh
```

This script will:
- Split `issues.txt` into individual issue files
- Automatically create each issue via the GitHub CLI

📄 Be sure you're authenticated with `gh auth login` and that you're in the correct repo context.
