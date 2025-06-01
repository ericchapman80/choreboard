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
- GitHub Actions (CI/CD)
- Google OAuth2 (Authentication)
- GitHub API (Issue Syncing)
- DAKboard embedding

---

## 🚀 Development Setup

### Prerequisites

- Node.js 16+ and npm/yarn
- Google Cloud Platform account with Sheets API enabled
- GitHub account with repository access

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/ericchapman80/choreboard.git
   cd choreboard
   ```

2. **Install dependencies**

   ```bash
   npm install  # or yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Update the `.env` file with your configuration:
   - Google OAuth2 credentials
   - GitHub token (for issue syncing)
   - Google Sheets API key and spreadsheet ID

4. **Start the development server**

   ```bash
   npm run dev  # or yarn dev
   ```

   The app will be available at `http://localhost:3000`

### Environment Variables

Key environment variables needed (see `env.example` for full list):

```env
# Google OAuth2
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# GitHub Integration
GITHUB_TOKEN=your-github-token

# Google Sheets
GOOGLE_SHEETS_API_KEY=your-api-key
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
```


### GitHub Actions

The repository includes GitHub Actions workflows for:

- Syncing GitHub issues with `issues.txt`
- Running tests on pull requests
- Automated dependency updates

Make sure to set up the following secrets in your GitHub repository settings:

- `GH_TOKEN`: GitHub token with `repo` scope
- Any other required API keys

## 📖 Documentation

- [Project Structure](/docs/PROJECT_STRUCTURE.md)
- [Sheet Structure](/docs/SHEET_STRUCTURE.md)
- [API Documentation](/docs/API.md)

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
