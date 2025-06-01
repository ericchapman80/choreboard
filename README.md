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
- Frontend: React 19, Next.js 15, TypeScript, Tailwind CSS
- Backend: Next.js API Routes, Google Sheets API
- Authentication: NextAuth.js with Google OAuth
- State Management: Zustand
- Data Fetching: @tanstack/react-query
- Styling: Tailwind CSS, Headless UI
- Testing: Jest, React Testing Library
- Linting: ESLint, Prettier
- CI/CD: GitHub Actions
- Hosting: Vercel
---

## 🚀 Development Setup

### Prerequisites

- macOS (recommended) or Linux
- [Homebrew](https://brew.sh/)
- Git
- GitHub CLI (`brew install gh`)
- Node.js 20+ (managed by nvm)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/ericchapman80/choreboard.git
   cd choreboard
   ```

2. **Set up the development environment**

   ```bash
   # Make the setup script executable
   chmod +x utilities/scripts/setup-dev.sh
   
   # Run the setup script
   ./utilities/scripts/setup-dev.sh
   ```

   This will install Node.js and configure the development environment. Additional tools like VS Code extensions are optional.

3. **Start the development server**

   ```bash
   cd frontend
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google Sheets API
GOOGLE_SHEETS_API_KEY=your-google-sheets-api-key
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
```

### NVM (Node Version Manager)

This project uses NVM to manage Node.js versions. The required version is specified in `.nvmrc`.

- Install the correct Node.js version:

  ```bash
  nvm install
  ```

- Use the project's Node.js version:

  ```bash
  nvm use
  ```

### Available Scripts

In the `frontend` directory, you can run:

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm start` - Start the production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🛠 Project Structure

```text
frontend/
├── src/
│   ├── app/                 # Next.js 13+ App Router
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (dashboard)/     # Dashboard pages
│   │   ├── api/             # API routes
│   │   ├── components/      # Shared components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities and configs
│   │   ├── stores/          # State management
│   │   ├── types/           # TypeScript types
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── styles/              # Global styles
└── public/                  # Static files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🗂 Project Structure

```
frontend/
  app/
    page.tsx        # Main entry point (App Router)
    api/
      sheets/
        route.ts    # Example API route (App Router style)
  public/
  src/
  package.json
  tsconfig.json
  next.config.ts
  ...
```

**⚠️ Do NOT add a `/pages` directory to this project.**
- This project uses the Next.js App Router (`/app` directory).
- If you add `/pages` (including `/pages/api`), you will break routing and get cryptic errors.
- API routes should be placed inside `/app/api/your-endpoint/route.ts`.

### Adding API Routes (App Router)

To add an API endpoint, create a file like:

```
frontend/app/api/hello/route.ts
```

Example:
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from App Router API!' });
}
```

---

## 🛠 Development Setup

### Prerequisites

- Node.js 20+ (managed by nvm)
- Google Cloud Platform account with Sheets API enabled
- GitHub account with repository access

### Environment Setup

1. **Set up environment variables**

   ```bash
   cp frontend/env.example frontend/.env.local
   ```

   Update the `frontend/.env.local` file with your configuration:
   - Google OAuth2 credentials
   - GitHub token (for issue syncing)
   - Google Sheets API key and spreadsheet ID

2. **Install dependencies**

   ```bash
   cd frontend
   npm install  # or yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev  # or yarn dev
   ```

   The app will be available at `http://localhost:3000`

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
