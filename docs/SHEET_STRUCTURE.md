# 📊 SHEET_STRUCTURE.md

This document outlines the structure, columns, validations, and rules used in the Choreboard Google Sheet.

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

## 🔁 Automation Notes

Automation will be handled via Apps Script to:
- Generate recurring chores based on frequency
- Auto-update dashboard ranges
- Reset weekly values as needed
