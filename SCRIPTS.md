# 🧠 SCRIPTS.md

This document outlines the Google Apps Script logic used to automate the Choreboard system. The code is embedded in the associated Google Sheet and enables chore recurrence, form submission processing, and dashboard updates.

## 📁 Script Locations

- Open your Google Sheet
- Click `Extensions → Apps Script`
- Copy/paste the relevant functions below into the script editor

---

## 🔁 1. Auto-Generate Recurring Chores

```javascript
function generateRecurringChores() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Required');
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  
  data.forEach((row, index) => {
    const [taskId, taskName, assignedTo, frequency, dueDate, completed, approved] = row;
    if (index === 0 || completed || approved === 'Approved') return;

    const due = new Date(dueDate);
    if (shouldRecur(frequency, due, today)) {
      sheet.appendRow([`${taskId}-R`, taskName, assignedTo, frequency, new Date(), '', 'Pending', false, '']);
    }
  });
}

function shouldRecur(frequency, dueDate, today) {
  const oneDay = 24 * 60 * 60 * 1000;
  switch (frequency) {
    case 'Daily': return (today - dueDate) >= oneDay;
    case 'Weekly': return (today - dueDate) >= 7 * oneDay;
    case 'Monthly': return today.getMonth() !== dueDate.getMonth();
    default: return false;
  }
}
```

---

## 📝 2. Process Google Form Submissions

```javascript
function processFormSubmissions() {
  const formSheet = SpreadsheetApp.getActive().getSheetByName('Form Responses 1');
  const requiredSheet = SpreadsheetApp.getActive().getSheetByName('Required');
  const bountySheet = SpreadsheetApp.getActive().getSheetByName('Bounty');
  const formData = formSheet.getDataRange().getValues();

  formData.slice(1).forEach(row => {
    const [timestamp, taskName, studentName, status, notes] = row;
    const matchAndUpdate = (sheet) => {
      const data = sheet.getDataRange().getValues();
      data.forEach((r, i) => {
        if (r[1] === taskName && r[2] === studentName && !r[5]) {
          sheet.getRange(i + 1, 6).setValue(true); // Completed?
          sheet.getRange(i + 1, 7).setValue('Pending'); // Approval Status
          sheet.getRange(i + 1, 9).setValue(notes); // Notes
        }
      });
    };

    matchAndUpdate(requiredSheet);
    matchAndUpdate(bountySheet);
  });

  formSheet.clearContents(); // optional: reset form sheet
}
```

---

## 🔄 3. Weekly Summary / Reset

```javascript
function summarizeWeeklyStats() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Dashboard');
  const now = new Date();
  sheet.getRange('A1').setValue(`Weekly Summary (Generated: ${now.toDateString()})`);
  // Additional summary logic can be added here
}
```

---

## 🔒 Authorization + Deployment

1. Open the Google Sheet
2. Go to `Extensions → Apps Script`
3. Paste the code, save, and click the 🔒 lock icon to authorize
4. Grant access to run on behalf of your Google account
5. Set up triggers in `Triggers` menu (`clock` icon on the left)

- `generateRecurringChores()` – Trigger daily
- `processFormSubmissions()` – Trigger every 15 minutes or on form submission
- `summarizeWeeklyStats()` – Trigger weekly


## 📜 Script: `buildChoreboard()`

This script builds the full Choreboard system from scratch. It is designed to be idempotent, meaning it can be re-run without breaking existing structure. It:

- Creates all necessary tabs: Required, Bounty, Leaderboard, Reference Data, Users (Children), Admins, Instructions
- Populates each with sample data and clear formatting
- Automatically sets up dropdown validations and point-tracking formulas
- Enforces naming and structure for consistency

### 🔧 How to Use
1. Open your Google Sheet
2. Go to **Extensions > Apps Script**
3. Replace any existing code with the provided `.gs` script
4. Save and run the function: `buildChoreboard`

> This will create or reset the entire chore tracking structure in your spreadsheet.

---

## 🧠 Formula Logic for Leaderboard

Each row in the Leaderboard uses the following formula to sum points from both the Required and Bounty sheets:

```excel
=SUMIF('Required'!$B$2:$B,A2,'Required'!$E$2:$E) + SUMIF('Bounty'!$B$2:$B,A2,'Bounty'!$E$2:$E)
```

Where:
- Column B in both sheets is **Assigned To**
- Column E is **Points**
- `A2` is the child's name on the Leaderboard

This formula is automatically applied per user by the script.

If you wish to count **only completed chores**, change the formula to a `SUMIFS` and add a condition for "Completed" in column D.

---

## 🧪 Validations Setup

Each of the following columns gets validation from the `Reference Data` tab:
- `Assigned To`: Validated against names in `Users (Children)`
- `Frequency`: Daily, Weekly, Monthly, One-time
- `Status`: Not Started, In Progress, Completed

These validations prevent typos and ensure consistent dropdown selection in the Required and Bounty tabs.

---

## ✅ Status
This script is ready for use. It auto-creates all sheets and structures needed for Choreboard with one click.

Re-running the script:
- Clears content but retains tabs and structure
- Does not duplicate or break dropdowns/formulas

Feel free to fork or modify to fit your needs.


---

## ✅ Coming Soon

- AI-powered task suggestions based on skipped chores
- Predictive charting and smart reward scaling
- Email reminders and mobile push notifications