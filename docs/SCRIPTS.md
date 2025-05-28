# 🧠 SCRIPTS.md

This document outlines the Google Apps Script logic used to automate the Choreboard system. The code is embedded in the associated Google Sheet and enables chore recurrence, form submission processing, and dashboard updates.

---

## 📁 Script Locations

- Open your Google Sheet
- Click `Extensions → Apps Script`
- Copy/paste the relevant functions below into the script editor

---

## 🔁 1. Auto-Generate Recurring Chores

This function creates new rows in the **Required** tab based on the frequency set for each task.

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
