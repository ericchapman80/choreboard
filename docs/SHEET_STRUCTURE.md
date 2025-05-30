# 📊 SHEET_STRUCTURE.md

This document outlines the structure, columns, validations, and rules used in the Choreboard Google Sheet.
npx create-next-app@latest frontend
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
| `Instructions`          | Basic onboarding message and workflow guidance                        |

---

## 🟦 Tab: Required Chores

| Column          | Description                                  | Validation / Format                           |
|------------------|----------------------------------------------|------------------------------------------------|
| Task ID         | Unique identifier (e.g., RC001)              | Auto-generated or manual entry                |
| Task Name       | Name of the chore                            | Text                                          |
| Assigned To     | Who is responsible                           | Dropdown (kids' names)                        |
| Frequency       | How often task repeats                       | Dropdown (Daily, Weekly, Monthly, One-Off)    |
| Due Date        | Date due                                     | Date picker                                   |
| Completed?      | Has task been done                           | Checkbox                                      |
| Approval Status | Parent approval status                       | Dropdown (Pending, Approved, Rejected)        |
| Paid?           | Has payout been made                         | Checkbox                                      |
| Notes           | Any additional comments                      | Text                                          |

---

## 💰 Tab: Bounty Board

| Column          | Description                                  | Validation / Format                           |
|------------------|----------------------------------------------|------------------------------------------------|
| Task ID         | Unique identifier (e.g., BB001)              | Auto-generated or manual entry                |
| Task Name       | Name of the bounty chore                     | Text                                          |
| Bounty ($)      | Dollar reward                                | Number                                        |
| Points (⭐)      | Star points earned                           | Number                                        |
| Available To    | Eligible claimants                           | Dropdown (All, specific names)                |
| Claimed By      | Kid who claimed it                           | Dropdown (names)                              |
| Completed?      | Has task been done                           | Checkbox                                      |
| Approval Status | Parent review                                | Dropdown (Pending, Approved, Rejected)        |
| Paid?           | Payment status                               | Checkbox                                      |
| Notes           | Any comments                                 | Text                                          |

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

## 🔁 Validations

All dropdowns are enforced using **data validation** rules that pull from reference or user data:

- **Assigned To** (Required tab): sourced from `Users (Children)` column A  
- **Claimed By** (Bounty tab): sourced from `Users (Children)` column A  
- **Frequency**: validated from `Reference Data` column A  
- **Approval Status**: validated from `Reference Data` column B  
- **Completed?**: uses yes/no, optional for future validation

---

## 🔁 Automation Notes

Automation will be handled via Apps Script to:
- Generate recurring chores based on frequency
- Auto-update dashboard ranges
- Reset weekly values as needed

## 💡 Notes

- The sheet is idempotent — re-running the script won't duplicate tabs or headers.
- Data validation prevents user input errors by using dropdowns.
- The script auto-generates seeded tasks for clarity.
