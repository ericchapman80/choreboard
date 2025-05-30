# SHEET\_AUTOCREATE.md

## 📄 Sheet Auto-Creation Instructions (One-Click Setup)

This guide walks you through setting up the **Choreboard** Google Sheet using a fully automated Apps Script. It creates all necessary tabs, sample data, reference lists, and validation rules.

---

### 🚀 Quick Start (Recommended)

1. **Open a new Google Sheet** ([https://sheets.new](https://sheets.new)).
2. From the menu, click `Extensions > Apps Script`.
3. Replace any existing code with the full script from [`ChoreBoard.gs`](../utilities/ChoreBoard.gs).
4. Click the **disk icon** 💾 or press `Ctrl+S` to save.
5. Click the **Run ▶️** button.
6. When prompted, grant script authorization to access your Google Sheet.


The following tabs are created automatically by the `buildChoreboard()` script:

### 1. **Administrators (Parents)**
- Purpose: Lists the parent/guardian administrators.
- Columns: `Parent Name`, `Email`
- Sample Data:
  - Parent 1 | parent1@example.com
  - Parent 2 | parent2@example.com

### 2. **Users (Children)**
- Purpose: Lists children who can be assigned chores.
- Column: `Child Name`
- Sample Data:
  - Alice
  - Bob

### 3. **Reference Data**
- Purpose: Stores dropdown values used for validation in chores.
- Columns:
  - `Frequency`: Daily, Weekly, Monthly, One-time
  - `Status`: Not Started, In Progress, Completed

### 4. **Required**
- Purpose: Tracks required (mandatory) chores.
- Columns: `Chore`, `Assigned To`, `Frequency`, `Status`, `Points`
- Sample Data:
  - Wash Dishes | Alice | Daily | Not Started | 5
  - Take Out Trash | Bob | Weekly | Not Started | 10

### 5. **Bounty**
- Purpose: Tracks optional chores for bonus points.
- Columns: `Chore`, `Assigned To`, `Frequency`, `Status`, `Points`
- Sample Data:
  - Wash Car | Alice | One-time | Not Started | 20
  - Mow Lawn | Bob | Monthly | Not Started | 15

### 6. **Leaderboard**
- Purpose: Auto-calculates total points from Required + Bounty tabs.
- Columns: `Child Name`, `Total Points`
- Formula (per row):
  ```excel
  =SUMIF('Required'!$B$2:$B,A2,'Required'!$E$2:$E) + SUMIF('Bounty'!$B$2:$B,A2,'Bounty'!$E$2:$E)
  ```
- Auto-updated when new chores or children are added.

### 7. **Instructions**
- Purpose: Guides users on how to use Choreboard.
- Content:
  - Add children in the `Users (Children)` tab.
  - Add chores in `Required` or `Bounty`.
  - Check points in `Leaderboard`.

## 🔁 Validations
All dropdowns are set using the `Reference Data` tab:
- **Frequency**: Daily, Weekly, Monthly, One-time
- **Status**: Not Started, In Progress, Completed
- **Assigned To**: Pulled from `Users (Children)`

Each validation is applied to columns in the **Required** and **Bounty** sheets, from row 2 onward, and auto-updates when new names or values are added within the defined range.


### 📌 Notes

* **Re-runnable**: You can safely re-run this script to reset all tab data without affecting the structure.
* **Dropdowns**: Fields such as `Assigned To`, `Frequency`, and `Approval Status` are dynamically validated using the `Users` and `Reference Data` tabs.
* **Form Integration**: This sheet is designed to work with a linked Google Form for chore submissions (optional).

---

### 💡 Troubleshooting

* ❌ **No active spreadsheet found**:
  Ensure you're running the script from within a bound Google Sheet (not standalone at [scripts.google.com](https://scripts.google.com)).

* ⚠️ **Authorization Error**:
  If this is your first time running the script, follow the prompt to grant permissions.

---

### 🛠️ Next Steps

* Customize your `Users` and `Administrators` tabs with real names/emails.
* Use the `Instructions` tab to help your family learn how to use the sheet.
* Explore the `SCRIPTS.md` file for recurring task generation and automation setup.

---

Happy choreboarding! 🎯
