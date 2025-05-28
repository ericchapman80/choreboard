function createChoreboardSheet() {
  const ss = SpreadsheetApp.create("Choreboard - Family Chore Tracker");

  // Create 'Administrators' tab first (ensures at least one sheet exists)
  const adminSheet = ss.getActiveSheet();
  adminSheet.setName("Administrators");
  adminSheet.clear();
  adminSheet.appendRow(["Name", "Email", "Phone"]);
  adminSheet.appendRow(["Parent One", "parent1@example.com", "123-456-7890"]);
  adminSheet.appendRow(["Parent Two", "parent2@example.com", "098-765-4321"]);

  // Add additional sheets
  const usersSheet = ss.insertSheet("Users");
  usersSheet.appendRow(["Name", "Email", "Phone"]);
  usersSheet.appendRow(["Child One", "child1@example.com", ""]);
  usersSheet.appendRow(["Child Two", "child2@example.com", ""]);

  const refSheet = ss.insertSheet("Reference Data");
  refSheet.appendRow(["Frequencies", "Statuses"]);
  refSheet.getRange("A2:A5").setValues([["Daily"], ["Weekly"], ["Monthly"], ["One-off"]]);
  refSheet.getRange("B2:B4").setValues([["Pending"], ["Approved"], ["Rejected"]]);

  const requiredSheet = ss.insertSheet("Required");
  requiredSheet.appendRow(["Task", "Assigned To", "Frequency", "Due Date", "Completed?", "Approval Status"]);
  requiredSheet.appendRow(["Take out trash", "Child One", "Daily", "2024-06-01", "No", "Pending"]);
  requiredSheet.appendRow(["Feed the dog", "Child Two", "Weekly", "2024-06-01", "No", "Pending"]);

  const bountySheet = ss.insertSheet("Bounty");
  bountySheet.appendRow(["Task", "Bounty ($)", "Points", "Claimed By", "Completed?", "Approval Status"]);
  bountySheet.appendRow(["Wash Car", "5", "3", "", "No", "Pending"]);
  bountySheet.appendRow(["Vacuum Living Room", "2", "1", "", "No", "Pending"]);

  const instructionsSheet = ss.insertSheet("Instructions");
  instructionsSheet.appendRow(["Welcome to the Choreboard Sheet! Use the tabs below to manage and track family tasks."]);
  instructionsSheet.getRange("A1:F1").merge().setWrap(true);

  // Delete the leftover 'Sheet1' if still exists and it's not renamed
  const maybeSheet1 = ss.getSheetByName("Sheet1");
  if (maybeSheet1) ss.deleteSheet(maybeSheet1);

  // Log URL
  Logger.log("✅ Sheet Created: " + ss.getUrl());
}
}