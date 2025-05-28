# 📋 FORMS.md

This form is used to collect submissions from kids for claimed or completed chores.

---

## 🔗 Google Form: Chore Claim & Completion

**Form Fields**:
1. **Select Task** (Dropdown linked from Sheet)
2. **Your Name** (Dropdown or short answer)
3. **Completion Status** (Checkbox or dropdown)
4. **Optional Notes**

---

## 📤 Submission Workflow

1. Kid fills out form
2. Response feeds into a new Sheet tab
3. Apps Script processes submission:
   - Updates correct tab (Required or Bounty)
   - Marks `Completed?` as ✅
   - Sets `Approval Status` to `Pending`

---

## ✅ Admin (Parent) Flow

Parents review submitted tasks via the `Required` or `Bounty` tabs and:
- Mark as Approved/Rejected
- Mark payment as complete
