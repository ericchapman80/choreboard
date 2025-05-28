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

---

## ✅ Coming Soon

- AI-powered task suggestions based on skipped chores
- Predictive charting and smart reward scaling
- Email reminders and mobile push notifications