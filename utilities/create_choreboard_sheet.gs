function buildChoreboard() {
  const ss = SpreadsheetApp.create("Choreboard - Family Chore Tracker");

  const frequencies = ['Daily', 'Weekly', 'Monthly', 'One-time'];
  const statuses = ['Not Started', 'In Progress', 'Completed', 'Approved', 'Rejected'];

  const sheetNames = [
    "Administrators (Parents)",
    "Users (Children)",
    "Reference Data",
    "Required",
    "Bounty",
    "Leaderboard",
    "Chore History",
    "Instructions"
  ];

  // Create sheets in order and populate them
  sheetNames.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (sheet) {
      sheet.clear();
    } else {
      sheet = ss.insertSheet(name);
    }

    switch (name) {
      case "Administrators (Parents)":
        sheet.appendRow(["Name", "Email", "Phone"]);
        sheet.appendRow(["Parent One", "parent1@example.com", "123-456-7890"]);
        sheet.appendRow(["Parent Two", "parent2@example.com", "098-765-4321"]);
        break;

      case "Users (Children)":
        sheet.appendRow(["Name", "Email", "Phone"]);
        sheet.appendRow(["Child One", "child1@example.com", ""]);
        sheet.appendRow(["Child Two", "child2@example.com", ""]);
        break;

      case "Reference Data":
        sheet.appendRow(["Frequency", "Status"]);
        sheet.getRange(2, 1, frequencies.length, 1).setValues(frequencies.map(f => [f]));
        sheet.getRange(2, 2, statuses.length, 1).setValues(statuses.map(s => [s]));
        break;

      case "Required":
        sheet.appendRow(["Task", "Assigned To", "Frequency", "Due Date", "Completed?", "Approval Status"]);
        const today = new Date();
        sheet.appendRow(["Sweep kitchen", "Child One", "Daily", today, "No", "Pending"]);
        sheet.appendRow(["Take out trash", "Child Two", "Weekly", today, "No", "Pending"]);
        break;

      case "Bounty":
        sheet.appendRow(["Task", "Bounty ($)", "Points", "Claimed By", "Completed?", "Approval Status"]);
        sheet.appendRow(["Wash Car", 5, 20, "", "No", "Pending"]);
        sheet.appendRow(["Mow Lawn", 10, 15, "", "No", "Pending"]);
        break;

      case "Leaderboard":
        sheet.appendRow(["Child Name", "Total Points"]);
        const usersSheet = ss.getSheetByName("Users (Children)");
        const userValues = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1).getValues();
        userValues.forEach((user, i) => {
          const row = i + 2;
          sheet.getRange(row, 1).setValue(user[0]);
          sheet.getRange(row, 2).setFormula(
            `=SUMIF('Required'!$B$2:$B,A${row},'Required'!$F$2:$F)+SUMIF('Bounty'!$D$2:$D,A${row},'Bounty'!$C$2:$C)`
          );
        });
        break;

      case "Chore History":
        sheet.appendRow(["Timestamp", "Task", "Assigned To", "Completed?", "Approval Status", "Source Tab"]);
        break;

      case "Instructions":
        sheet.getRange("A1").setValue("📋 Welcome to Choreboard - Family Chore Tracker").setFontSize(14).setFontWeight("bold");
        sheet.getRange("A2").setValue("This sheet tracks household chores with points, approvals, bounties, and history tracking.").setWrap(true);

        const instructions = [
          ["Sheet", "Purpose", "Key Columns", "Dropdowns/Validation", "Notes"],
          ["Administrators (Parents)", "List of parent users", "Name, Email, Phone", "None", "Reference only"],
          ["Users (Children)", "Children who complete chores", "Name, Email, Phone", "Used for dropdowns", "Required"],
          ["Reference Data", "Defines Frequency and Status options", "Frequency, Status", "Used in dropdowns", "Can be modified"],
          ["Required", "Recurring assigned chores", "Task, Assigned To, Frequency, Due Date, Completed?, Approval Status", "Assigned To, Frequency, Approval Status", "Auto-sets today's date for due date"],
          ["Bounty", "Optional extra chores", "Task, Bounty ($), Points, Claimed By, Completed?, Approval Status", "Approval Status", "Claimed By + Completion required for points"],
          ["Leaderboard", "Points summary per child", "Child Name, Total Points", "Formula-based", "Do not edit manually"],
          ["Chore History", "Tracks past completed chores", "Timestamp, Task, Assigned To, etc.", "None", "Append-only history"],
          ["Instructions", "How to use Choreboard", "This tab", "None", "For reference"]
        ];
        sheet.getRange(4, 1, instructions.length, 5).setValues(instructions);
        sheet.setColumnWidths(1, 5, 180);
        sheet.getRange("A4:E4").setFontWeight("bold");
        break;
    }
  });

  // Setup validations
  const userSheet = ss.getSheetByName("Users (Children)");
  const refSheet = ss.getSheetByName("Reference Data");
  const requiredSheet = ss.getSheetByName("Required");
  const bountySheet = ss.getSheetByName("Bounty");

  const usersRange = userSheet.getRange(2, 1, userSheet.getLastRow() - 1);
  const freqRange = refSheet.getRange(2, 1, frequencies.length);
  const statusRange = refSheet.getRange(2, 2, statuses.length);

  const userRule = SpreadsheetApp.newDataValidation().requireValueInRange(usersRange, true).build();
  const freqRule = SpreadsheetApp.newDataValidation().requireValueInRange(freqRange, true).build();
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInRange(statusRange, true).build();

  // Apply to Required sheet
  const reqRows = requiredSheet.getMaxRows() - 1;
  requiredSheet.getRange(2, 2, reqRows).setDataValidation(userRule);     // Assigned To
  requiredSheet.getRange(2, 3, reqRows).setDataValidation(freqRule);     // Frequency
  requiredSheet.getRange(2, 6, reqRows).setDataValidation(statusRule);   // Approval Status

  // Apply to Bounty sheet
  const bountyRows = bountySheet.getMaxRows() - 1;
  bountySheet.getRange(2, 4, bountyRows).setDataValidation(userRule);    // Claimed By
  bountySheet.getRange(2, 6, bountyRows).setDataValidation(statusRule);  // Approval Status

  Logger.log("✅ Choreboard created: " + ss.getUrl());
}
