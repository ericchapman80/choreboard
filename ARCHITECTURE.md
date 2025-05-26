# Architecture

## Overview

**Choreboard** is a gamified, AI-assisted chore tracking system designed for families. It balances a robust backend (Google Sheets), user-friendly input (Forms and UI), and visual engagement (via DAKboard and a custom React frontend). Our architecture reflects priorities in accessibility, automation, and future extensibility with AI and analytics.

---

## Components

### 1. Google Sheets (Backend Database)

**Why Sheets?**
- Familiar interface for non-technical users (parents/admins)
- Easy validation, filtering, and formula logic
- Seamless integration with Forms and Apps Script
- Compatible with embedding tools like DAKboard

**Sheet Tabs:**
- `Required Chores`: Assigned recurring chores that must be completed
- `Bounty Board`: Optional, claimable chores with star/$ incentives
- `Dashboard`: Pivot tables and visual charts summarizing performance

**Core Columns:**
| Field | Description |
|-------|-------------|
| Task ID | Unique ID (optional for API use later) |
| Task Name | Description of the chore |
| Assigned To / Available To | Who it’s assigned to or available for |
| Frequency | Daily, Weekly, Monthly, One-Off |
| Due Date | Target completion date |
| Completed? | Checkbox (TRUE/FALSE) |
| Claimed By | Who picked the bounty (optional for required) |
| Approval Status | Pending / Approved / Rejected |
| Approved By / Date | Parent sign-off fields |
| Paid? | Whether payout has occurred |
| Notes | Freeform notes or messages |

**Validations:**
- Dropdowns for status fields
- Checkboxes for completion/payment
- Date pickers for due/approval dates
- Conditional formatting to flag overdue/incomplete/unapproved tasks

---

### 2. Google Forms (User Input for Kids)

**Why Google Forms?**
- Mobile-friendly, secure input for kids
- Avoids giving direct sheet access
- Low friction for task claiming and completions

**Form Fields:**
- Child name (dropdown or prefilled via QR link)
- Task name or ID
- Action: Claim or Complete
- Optional note/comments

**Flow:**
- Submissions go to a separate tab
- Google Apps Script matches submission to original task and updates `Completed?`, `Claimed By`, or `Approval Status` accordingly

---

### 3. Google Apps Script (Automation Engine)

**Purpose:**
- Automatically generate recurring tasks based on frequency
- Match Form submissions to Sheet rows
- Tally rewards and weekly payouts
- (Future) Email digests or reminders

**Trigger Examples:**
- Time-based: Run daily to generate new tasks
- Form-based: On submit, update chore status
- Manual button: “Approve all pending” or “Tally rewards this week”

---

### 4. DAKboard Display (Home Dashboard)

**Purpose:**
- Passive display of current tasks, leaderboard, and charts
- Embedded from either a published Google Sheet view or future React app

**Layout Ideas:**
- Rotating views per child
- Leaderboard + quote/motivation of the day
- “Bounties up for grabs” carousel

---

### 5. Custom React Frontend (Planned Phase)

**Why a Custom App?**
- Full control over UX for kids and parents
- Real-time updates and dynamic filtering
- Supports Google OAuth for secure logins
- Enables gamification and personalization

**Features Planned:**
- Child Dashboard: Tasks to complete, bounties to claim, badges earned
- Parent Dashboard: Approvals, reward summaries, weekly logs
- Admin Config Panel: Manage recurring templates, payout rules, etc.
- REST/GAS proxy or Sheets API for backend

---

## Data Flow

1. **Parent/Admin** updates Sheets or sets rules
2. **Apps Script** generates new rows for recurring tasks
3. **Kids** interact via Form (claim/complete) or frontend
4. **Apps Script** updates Sheets with submission + approval data
5. **Dashboard Tab** aggregates totals, completion %, and reward payout
6. **DAKboard** or React UI displays results in a family-friendly way

---

## AI Integration

**Current & Future AI Use:**
- Prompt-based task suggestion generation (by age, season, mood)
- Reward balancing (suggest $ or stars based on effort)
- Behavior detection (AI finds drop-offs or overuse patterns)
- Voice/chat-based task check-ins (LLM assistant)
- GPT-powered code support and automation via ChatGPT (used throughout development)

---

## Dev & Repo Tooling

- **Brewfile** for instant local dev setup (`gh`, `jq`)
- **GitHub Actions** to sync issues.txt from live issues
- **CLI utilities**:
  - `github-issue-autocreate.sh`: creates issues from `issues.txt`
  - `github-issue-sync.sh`: pulls GitHub issues into `issues.txt`
- **DAKboard integration** planned for frontend embed
- **GitHub project board** for tracking deliverables

---

## Design Principles

- **Low friction** for families to use
- **Tech-agnostic admin tools** (Sheets + Forms)
- **Automation-first**: minimize busywork
- **Gamified experience**: fun, rewarding, motivating
- **AI-enhanced**: smarter home task management
