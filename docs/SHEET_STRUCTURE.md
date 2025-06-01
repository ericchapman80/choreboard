# Choreboard Sheet Structure

This document describes the structure, automation, validation, and menu features of the Choreboard Google Sheet, as created by the Apps Script automation.

## 🧾 Choreboard Google Sheet Structure

Choreboard uses multiple tabs to organize required chores, claimable tasks, tracked rewards, and user access.

---

## 📋 Tabs Overview

| Tab                     | Purpose                                                                 |
|-------------------------|-------------------------------------------------------------------------|
| `Administrators (Parents)` | Parent contact info (name, email, phone)                              |
| `Users (Children)`      | List of kids with Gmail addresses for chore assignment                 |
| `Reference Data`        | Centralized values for dropdowns (e.g., frequency, status)             |
| `Required`              | Recurring or scheduled chores assigned to specific users               |
| `Bounty`                | Optional claimable tasks for extra stars or dollars                    |
| `Leaderboard`           | Auto-calculated scoreboard of approved task points per child          |
| `Chore History`         | Append-only log of completed chores, approvals, and source tab        |
| `Instructions`          | Basic onboarding message and workflow guidance                        |

---

## 🟦 Tab: Required Chores

| Column          | Description                                  | Validation / Format                           |
|------------------|----------------------------------------------|------------------------------------------------|
| Task            | Name of the chore                            | Text                                          |
| Assigned To     | Who is responsible                           | Dropdown (kids' names)                        |
| Frequency       | How often task repeats                       | Dropdown (Daily, Weekly, Monthly, One-time)    |
| Due Date        | Date due                                     | Date picker                                   |
| Completed?      | Has task been done                           | Checkbox                                      |
| Approval Status | Parent approval status                       | Dropdown (Not Started, In Progress, Completed, Approved, Rejected) |

---

## 💰 Tab: Bounty Board

| Column          | Description                                  | Validation / Format                           |
|------------------|----------------------------------------------|------------------------------------------------|
| Task            | Name of the bounty chore                     | Text                                          |
| Bounty ($)      | Dollar reward                                | Number                                        |
| Points (⭐)      | Star points earned                           | Number                                        |
| Claimed By      | Kid who claimed it                           | Dropdown (names)                              |
| Completed?      | Has task been done                           | Checkbox                                      |
| Approval Status | Parent review                                | Dropdown (Not Started, In Progress, Completed, Approved, Rejected) |

---

## 🗂️ Tab: Chore History

| Column        | Description                                   |
|---------------|-----------------------------------------------|
| Timestamp     | When the chore was completed/approved         |
| Task          | Name of the chore                             |
| Assigned To   | Who was responsible                           |
| Completed?    | Was the task completed                        |
| Approval Status | Parent approval status                      |
| Source Tab    | Which tab (Required/Bounty) the chore came from|

---

## 📈 Tab: Dashboard

Uses Google Sheets Pivot Tables and Charts to summarize:

- Total earnings per child
- Number of tasks completed
- Stars earned
- Weekly overview
- Leaderboard

---

## 🧮 Leaderboard Calculation

The `Leaderboard` tab is dynamically updated using Google Sheets formulas.  
It aggregates points from **Approved** tasks across both the `Required` and `Bounty` tabs.

| Column | Description                                 |
|--------|---------------------------------------------|
| Name   | Pulled from all users who completed tasks   |
| Total Points | Sum of approved points across all tabs |

The formula works by:

- Filtering both chore tabs (`Required`, `Bounty`) for rows marked "Approved"
- Matching users by name
- Summing the `Points` field from each tab

---

## 📊 Custom Menu Functions

The Choreboard sheet includes a custom menu that appears in the menu bar when the spreadsheet is opened. This menu provides easy access to key functions:

### Update Leaderboard
- **Purpose:** Refreshes the Leaderboard tab with current point totals
- **When to use:** If the leaderboard seems out of sync with actual chore completions
- **Result:** Updated point totals for all children

### Reset Weekly Chores
- **Purpose:** Resets all weekly chores to their starting state
- **When to use:** At the beginning of each week
- **Result:** All chores with "Weekly" frequency are set to "No" for Completed and "Not Started" for Status

### Setup Triggers
- **Purpose:** Reinstalls the automatic chore history tracking
- **When to use:** If history tracking stops working
- **Result:** Ensures changes to chore status are automatically recorded

### Manual History Entry
- **Purpose:** Manually add entries to the Chore History tab
- **When to use:** For special situations or retroactive entries
- **Result:** Creates a new history entry with the current timestamp

---

## 🔁 Data Validation

All dropdowns are enforced using **data validation** rules that pull from reference or user data:

- **Assigned To** (Required tab): sourced from `Users (Children)` column A  
- **Claimed By** (Bounty tab): sourced from `Users (Children)` column A  
- **Frequency**: validated from `Reference Data` column A  
- **Approval Status**: validated from `Reference Data` column B  
- **Completed?**: uses yes/no, optional for future validation

---

## 🔁 Automation & Scripting

Automation is handled via Apps Script to:

- Generate recurring chores based on frequency
- Auto-update dashboard ranges
- Reset weekly values as needed
- Log completed chores to Chore History

## 💡 Additional Notes

- The sheet is idempotent — re-running the script won't duplicate tabs or headers.
- Data validation prevents user input errors by using dropdowns.
- The script auto-generates seeded tasks for clarity.
- Chore History is append-only and not manually edited.
