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

> ✅ This will auto-generate:
>
> * `Instructions`
> * `Administrators (Parents)`
> * `Users (Children)`
> * `Reference Data`
> * `Required`
> * `Bounty`

---

### 📋 Tab Descriptions

| Tab Name                 | Purpose                                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| Instructions             | General usage guide inside the Sheet                                   |
| Administrators (Parents) | Maintains parent details (Name, Gmail, Phone)                          |
| Users (Children)         | Maintains child details (Name, Gmail, optional Phone)                  |
| Reference Data           | Controlled values for frequency, status, etc. Used for data validation |
| Required                 | Required chores with dropdowns, dates, and approval tracking           |
| Bounty                   | Claimable chores with dollar/point values and status tracking          |

---

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
