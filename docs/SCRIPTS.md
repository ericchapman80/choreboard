# 🧰 Choreboard Automation Scripts

This document details all the Google Apps Script automations used in the Choreboard system. These scripts enable dynamic sheet creation, weekly resets, and integration with Google Forms.

---

## 🚀 `createChoreboardSheet.gs`

Initializes and structures the entire Choreboard Google Sheet with tabs, sample data, validations, and guidance.

### What It Creates:

* **Administrators (Parents)**: Name, email, phone for approval and notifications
* **Users (Children)**: Name, email, phone for identity and auth
* **Reference Data**: Frequency and approval status dropdown options
* **Required**: Task list of assigned recurring chores
* **Instructions**: A helpful how-to for setup and use

### How to Use:

1. Open [https://sheets.new](https://sheets.new) to create a new sheet.
2. Go to `Extensions > Apps Script`.
3. Paste in the code from `createChoreboardSheet.gs`.
4. Click the ▶️ (Run) button.
5. Authorize access if prompted.
6. Your sheet will now contain:

   * Sample parent/child records
   * Dropdowns powered by the "Users" and "Reference Data" tabs
   * Example chores and instructional guidance

> ⚡ This script is **safe to re-run** and will refresh your sheet contents.

---

## ⏰ `weeklyReset.gs` (Coming Soon)

Summarizes weekly task completion and resets completion fields to prepare for the next week.

* Compiles dashboard-level stats per child
* Clears "Completed?" and "Approval Status" for a fresh slate
* Optionally archives completed chores

---

## ✍️ `processFormSubmissions.gs` (Coming Soon)

Integrates with the Google Form used by children to claim/complete tasks.

* Parses form input
* Updates matching rows in the sheet
* Marks submission as complete and pending approval

---

## ⚡ `authorizeAppsScript.gs` (Coming Soon)

* Walks users through OAuth prompts
* Ensures required scopes are granted
* Adds helpful in-script authorization tips

---

## 📝 Future Enhancements

* SMS notifications via Twilio or Google Voice
* Email digests to parents summarizing chore status
* Automatic bounty payouts

---

## File Location

All scripts are stored in:

```bash
/utilities/google-apps-scripts/
```

Each `.gs` file corresponds to one function and is referenced via documentation.

---

For setup walkthroughs, visit [`SHEET_AUTOCREATE.md`](./SHEET_AUTOCREATE.md).
