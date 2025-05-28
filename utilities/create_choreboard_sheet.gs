function createChoreboardSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("❌ No active spreadsheet found. Please open a Google Sheet before running this script.");
  }

  // Helper to get or create sheet by name
  function getOrCreateSheet(name, rename = null) {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    } else {
      sheet.clear();
    }
    if (rename) sheet.setName(rename);
    return sheet;
  }

  // Administrators tab
  const adminSheet = getOrCreateSheet("Administrators", "Administrators (Parents)");
  adminSheet.appendRow(["Name", "Email", "Phone"]);
  adminSheet.appendRow(["Parent One", "parent1@example.com", "123-456-7890"]);
  adminSheet.appendRow(["Parent Two", "parent2@example.com", "098-765-4321"]);

  // Users tab
  const usersSheet = getOrCreateSheet("Users", "Users (Children)");
  usersSheet.appendRow(["Name", "Email", "Phone"]);
  usersSheet.appendRow(["Child One", "child1@example.com", ""]);
  usersSheet.appendRow(["Child Two", "child2@example.com", ""]);

  // Reference Data
  const refSheet = getOrCreateSheet("Reference Data");
  refSheet.appendRow(["Frequencies", "Statuses"]);
  refSheet.getRange("A2:A5").setValues([["Daily"], ["Weekly"], ["Monthly"], ["One-off"]]);
  refSheet.getRange("B2:B4").setValues([["Pending"], ["Approved"], ["Rejected"]]);

  // Required Chores
  const requiredSheet = getOrCreateSheet("Required");
  requiredSheet.appendRow([
    "Task", "Assigned To", "Frequency", "Due Date", "Completed?", "Approval Status"
  ]);
  requiredSheet.appendRow(["Sweep kitchen", "Child One", "Daily", "2025-06-01", "No", "Pending"]);
  requiredSheet.appendRow(["Take out trash", "Child Two", "Weekly", "2025-06-03", "No", "Pending"]);

  // Data validation for "Assigned To"
  const usersRange = usersSheet.getRange("A2:A");
  const assignedToRange = requiredSheet.getRange("B2:B100");
  const validation = SpreadsheetApp.newDataValidation()
    .requireValueInRange(usersRange, true)
    .setAllowInvalid(false)
    .build();
  assignedToRange.setDataValidation(validation);

  // Instructions tab
  const instructionSheet = getOrCreateSheet("Instructions");
  instructionSheet.getRange("A1").setValue("Welcome to Choreboard! Refer to each tab for guidance. Use dropdowns for valid entries. Parents can approve completed tasks. Kids can use the Form or interface to claim and complete tasks.");
  instructionSheet.getRange("A1").setFontWeight("bold").setFontSize(12).setWrap(true);
  instructionSheet.setRowHeight(1, 60);

  // Log confirmation
  Logger.log("✅ Sheet Created: " + ss.getUrl());
}
