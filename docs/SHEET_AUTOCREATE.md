# 🧾 SHEET_AUTOCREATE.md

## 📌 Purpose
This document explains how the `createChoreboardSheet.gs` script works to create the Choreboard system in Google Sheets with all necessary tabs, validations, and starter data.

---

## ✅ Sheet Structure Created

| Tab Name        | Purpose                                                             |
|----------------|----------------------------------------------------------------------|
| `Administrators` | Houses parent name, Gmail address, and phone number                |
| `Users`          | Houses child name, Gmail address, and optional contact info        |
| `Reference Data` | Source data for dropdowns (Frequencies, Statuses, etc.)            |
| `Required`       | Mandatory chores assigned by parents                               |
| `Bounty`         | Optional tasks with reward value                                   |
| `Instructions`   | Descriptive tab to help users understand sheet structure & usage   |

---

## 🔄 Validation & Data Consistency

- The `Assigned To` field in the **Required** tab should validate against the `Users` tab.
- The `Approval Status` field validates from the `Reference Data` tab.

---

## 🛠 How to Run the Script

1. Open [Google Apps Script](https://script.google.com/) and create a new script.
2. Paste in `createChoreboardSheet.gs`.
3. Run `createChoreboardSheet()` after authorizing.
4. Your sheet will be created with all required tabs and sample data.

---

## 💡 Tips

- You can modify or expand the reference data (e.g., add more statuses or frequencies).
- You can assign real Gmail addresses to children and parents for use with Forms or email/SMS integrations.
