/**
 * Triggered when the spreadsheet is opened
 * Creates the custom Choreboard menu
 */
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Choreboard')
      .addItem('Update Leaderboard', 'updateLeaderboard')
      .addItem('Reset Weekly Chores', 'resetWeeklyChores')
      .addSeparator()
      .addItem('Setup Triggers', 'setupTriggers')
      .addItem('Manual History Entry', 'manualHistoryEntry')
      .addToUi();
    
    Logger.log('✅ Custom menu created');
  } catch (error) {
    Logger.log('⚠️ Error creating custom menu: ' + error.message);
  }
}

/**
 * Builds a complete Choreboard spreadsheet with all necessary tabs,
 * validations, sample data, and chore tracking functionality.
 * @return {SpreadsheetApp.Spreadsheet} The created spreadsheet
 */
function buildChoreboard() {
  try {
    const ss = SpreadsheetApp.create("Choreboard - Family Chore Tracker");
    Logger.log("📊 Creating new Choreboard spreadsheet");

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
        // Title and intro
        sheet.getRange("A1").setValue("📋 Welcome to Choreboard - Family Chore Tracker").setFontSize(16).setFontWeight("bold");
        sheet.getRange("A2:E2").merge();
        sheet.getRange("A2").setValue("This sheet tracks household chores with points, approvals, bounties, and automatic history tracking.").setWrap(true);
        
        // Getting Started section
        sheet.getRange("A4").setValue("🚀 Getting Started").setFontSize(14).setFontWeight("bold");
        sheet.getRange("A5:E5").merge();
        sheet.getRange("A5").setValue("1. Add your family members to the 'Users (Children)' and 'Administrators (Parents)' tabs\n2. Customize the chores in the 'Required' and 'Bounty' tabs\n3. Children mark tasks as 'Completed' when done\n4. Parents approve completed tasks\n5. The Leaderboard automatically updates with earned points").setWrap(true);
        
        // Tabs Overview section
        sheet.getRange("A7").setValue("📑 Tabs Overview").setFontSize(14).setFontWeight("bold");
        const instructions = [
          ["Sheet Name", "Purpose", "Key Columns", "Special Features", "Best Practices"],
          ["Administrators (Parents)", "List of parent users who can approve tasks", "Name, Email, Phone", "None - reference data only", "Keep this list updated with parent contact info"],
          ["Users (Children)", "Children who complete chores", "Name, Email, Phone", "Names appear in dropdowns throughout the sheet", "Each child must be listed here to be assigned chores"],
          ["Reference Data", "Defines dropdown options used throughout", "Frequency, Status", "Modify these values to change dropdown options", "Add custom frequencies or statuses as needed"],
          ["Required", "Recurring mandatory chores", "Task, Assigned To, Frequency, Due Date, Completed?, Approval Status", "Tracks recurring chores with assignments", "Use Completed? and Approval Status checkboxes to update status"],
          ["Bounty", "Optional extra chores for rewards", "Task, Bounty ($), Points, Claimed By, Completed?, Approval Status", "Children can earn money and points", "Set different point values based on difficulty"],
          ["Leaderboard", "Points summary per child", "Child Name, Total Points", "Auto-calculated using formulas", "Do not edit this tab manually - it updates automatically"],
          ["Chore History", "Automatic log of all completed chores", "Timestamp, Task, Assigned To, Completed?, Approval Status, Source", "Updated automatically via triggers", "Use this for accountability and tracking over time"],
          ["Instructions", "How to use Choreboard", "This tab!", "Contains guides and explanations", "Refer here for help using the system"]
        ];
        sheet.getRange(8, 1, instructions.length, 5).setValues(instructions);
        
        // Formulas and Automation section
        sheet.getRange("A" + (8 + instructions.length + 2)).setValue("⚙️ Formulas & Automation").setFontSize(14).setFontWeight("bold");
        const automationRow = 8 + instructions.length + 3;
        const automationInfo = [
          ["Feature", "Description", "How It Works", "Where To Find It", "Notes"],
          ["Leaderboard Calculation", "Automatically tallies points per child", "Uses SUMIF formulas to add points from Required and Bounty tabs", "Leaderboard tab", "Updates whenever points change"],
          ["Chore History Tracking", "Records all chore completions and approvals", "Automatic trigger runs when Completed? or Approval Status changes", "Chore History tab", "Creates a permanent record of all activity"],
          ["Data Validation", "Ensures consistent data entry", "Dropdown menus for Assigned To, Frequency, Status fields", "Throughout all tabs", "Based on Reference Data and Users tabs"],
          ["Auto-Dating", "Sets today's date for new chores", "Default value for the Due Date column", "Required tab", "Can be changed manually if needed"]
        ];
        sheet.getRange(automationRow, 1, automationInfo.length, 5).setValues(automationInfo);
        
        // Tips and Tricks section
        const tipsRow = automationRow + automationInfo.length + 2;
        sheet.getRange("A" + tipsRow).setValue("💡 Tips & Tricks").setFontSize(14).setFontWeight("bold");
        sheet.getRange("A" + (tipsRow + 1) + ":E" + (tipsRow + 1)).merge();
        sheet.getRange("A" + (tipsRow + 1)).setValue("• To add a new chore: Add a row to either the Required or Bounty tab\n• To assign chores to different children each week: Just change the 'Assigned To' field\n• For recurring chores: Copy the row and update the due date\n• For viewing history: Filter the Chore History tab by child name or date range\n• For motivation: Share the Leaderboard results weekly with the family").setWrap(true);
        
        // Formatting
        sheet.getRange("A8:E8").setFontWeight("bold");
        sheet.getRange("A" + automationRow + ":E" + automationRow).setFontWeight("bold");
        sheet.setColumnWidths(1, 5, 200);
        
        // Add borders and styling
        sheet.getRange("A8:E" + (8 + instructions.length - 1)).setBorder(true, true, true, true, true, true);
        sheet.getRange("A" + automationRow + ":E" + (automationRow + automationInfo.length - 1)).setBorder(true, true, true, true, true, true);
        
        // Adding version and last updated info
        sheet.getRange("A" + (tipsRow + 5)).setValue("Choreboard Version: 1.0");
        sheet.getRange("A" + (tipsRow + 6)).setValue("Last Updated: " + new Date().toDateString());
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

  // Add triggers for chore history tracking
  setupTriggers(ss);
  
  // Set up triggers for the onOpen function
  ScriptApp.newTrigger('onOpen')
    .forSpreadsheet(ss)
    .onOpen()
    .create();
    
  // Run the onOpen function to create the menu immediately
  onOpen();
    
  Logger.log("✅ Choreboard created: " + ss.getUrl());
  return ss;
  } catch (error) {
    Logger.log("❌ Error creating Choreboard: " + error.message);
    throw new Error("Failed to create Choreboard: " + error.message);
  }
}

/**
 * Sets up the onEdit trigger to track chore history
 * @param {SpreadsheetApp.Spreadsheet} ss - The spreadsheet to set triggers for
 */
function setupTriggers(ss) {
  try {
    // Delete existing triggers to avoid duplicates
    const triggers = ScriptApp.getProjectTriggers();
    for (let i = 0; i < triggers.length; i++) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
    
    // Create new trigger for tracking chore history
    ScriptApp.newTrigger('trackChoreHistory')
      .forSpreadsheet(ss)
      .onEdit()
      .create();
      
    Logger.log("✅ Chore history tracking trigger set up");
  } catch (error) {
    Logger.log("⚠️ Warning: Failed to set up triggers: " + error.message);
    // Non-fatal error
  }
}

/**
 * Event handler that tracks chore history when status changes
 * @param {Object} e - The onEdit event object
 */
function trackChoreHistory(e) {
  try {
    // Only run if we're editing a relevant sheet
    const sheet = e.source.getActiveSheet();
    const sheetName = sheet.getName();
    
    if (sheetName !== 'Required' && sheetName !== 'Bounty') {
      return; // Not a sheet we need to track
    }
    
    const range = e.range;
    const row = range.getRow();
    const col = range.getColumn();
    
    // Only track changes to Completed? (col 5) or Approval Status (col 6)
    if ((sheetName === 'Required' && (col === 5 || col === 6)) ||
        (sheetName === 'Bounty' && (col === 5 || col === 6))) {
      
      // Get the data we need for the history entry
      const ss = e.source;
      const historySheet = ss.getSheetByName('Chore History');
      
      if (!historySheet) {
        Logger.log("⚠️ Chore History sheet not found");
        return;
      }
      
      // Get the row data
      const dataRange = (sheetName === 'Required') ? 
        sheet.getRange(row, 1, 1, 6).getValues()[0] : // Task, Assigned To, Frequency, Due Date, Completed?, Approval Status
        sheet.getRange(row, 1, 1, 6).getValues()[0]; // Task, Bounty, Points, Claimed By, Completed?, Approval Status
      
      // Get the relevant fields based on which sheet we're editing
      const task = dataRange[0]; // Task is always column 1
      const assignedTo = (sheetName === 'Required') ? 
        dataRange[1] : // Assigned To for Required
        dataRange[3]; // Claimed By for Bounty
      const completed = dataRange[4]; // Completed? is always column 5
      const approvalStatus = dataRange[5]; // Approval Status is always column 6
      
      // Only log entries that are completed or have approval status changes
      if (completed === "Yes" || approvalStatus === "Approved" || approvalStatus === "Rejected") {
        // Add to history
        historySheet.appendRow([
          new Date(), // Timestamp
          task, // Task
          assignedTo, // Assigned To or Claimed By
          completed, // Completed?
          approvalStatus, // Approval Status
          sheetName // Source Tab
        ]);
        
        Logger.log(`✏️ Tracked history: ${task} by ${assignedTo} (${sheetName})`);
      }
    }
  } catch (error) {
    Logger.log("❌ Error tracking chore history: " + error.message);
    // Non-fatal, don't stop execution
  }
}

/**
 * Updates the leaderboard based on current chore data
 * @param {SpreadsheetApp.Spreadsheet} ss - The spreadsheet to update
 */
function updateLeaderboard(ss) {
  try {
    // If no spreadsheet is provided, use the active one
    ss = ss || SpreadsheetApp.getActiveSpreadsheet();
    
    const leaderboardSheet = ss.getSheetByName("Leaderboard");
    const usersSheet = ss.getSheetByName("Users (Children)");
    
    if (!leaderboardSheet || !usersSheet) {
      Logger.log("⚠️ Warning: Required sheets for leaderboard update not found");
      if (SpreadsheetApp.getUi) {
        SpreadsheetApp.getUi().alert("Leaderboard update failed: Required sheets not found");
      }
      return;
    }
    
    // Clear previous leaderboard data except header
    if (leaderboardSheet.getLastRow() > 1) {
      leaderboardSheet.getRange(2, 1, leaderboardSheet.getLastRow() - 1, leaderboardSheet.getLastColumn()).clear();
    }
    
    // Recreate the header if it's missing
    if (leaderboardSheet.getLastRow() === 0) {
      leaderboardSheet.appendRow(["Child Name", "Total Points"]);
    }
    
    // Add each user to the leaderboard
    const userValues = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1).getValues();
    userValues.forEach((user, i) => {
      const row = i + 2;
      leaderboardSheet.getRange(row, 1).setValue(user[0]);
      leaderboardSheet.getRange(row, 2).setFormula(
        `=SUMIF('Required'!$B$2:$B,A${row},'Required'!$F$2:$F)+SUMIF('Bounty'!$D$2:$D,A${row},'Bounty'!$C$2:$C)`
      );
    });
    
    Logger.log("✅ Leaderboard updated");
    
    if (SpreadsheetApp.getUi) {
      SpreadsheetApp.getUi().alert("Leaderboard updated successfully");
    }
  } catch (error) {
    Logger.log("❌ Error updating leaderboard: " + error.message);
    if (SpreadsheetApp.getUi) {
      SpreadsheetApp.getUi().alert("Error updating leaderboard: " + error.message);
    }
  }
}

/**
 * Resets weekly chores to their starting state
 * Used for beginning of a new week
 */
function resetWeeklyChores() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const requiredSheet = ss.getSheetByName("Required");
    
    if (!requiredSheet) {
      SpreadsheetApp.getUi().alert("Required sheet not found!");
      return;
    }
    
    // Get all data
    const data = requiredSheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find indices for important columns
    const freqColIdx = headers.indexOf("Frequency");
    const completedColIdx = headers.indexOf("Completed?");
    const approvalColIdx = headers.indexOf("Approval Status");
    
    if (freqColIdx === -1 || completedColIdx === -1 || approvalColIdx === -1) {
      SpreadsheetApp.getUi().alert("Required columns not found!");
      return;
    }
    
    // How many rows were reset?
    let resetCount = 0;
    
    // Start from row 1 (skip headers)
    for (let i = 1; i < data.length; i++) {
      // Only reset weekly chores
      if (data[i][freqColIdx] === "Weekly") {
        requiredSheet.getRange(i + 1, completedColIdx + 1).setValue("No");
        requiredSheet.getRange(i + 1, approvalColIdx + 1).setValue("Not Started");
        resetCount++;
      }
    }
    
    // History entry for the reset
    const historySheet = ss.getSheetByName("Chore History");
    if (historySheet) {
      historySheet.appendRow([
        new Date(), // Timestamp
        "Weekly Reset", // Task
        "System", // Assigned To
        "No", // Completed?
        "Reset", // Approval Status
        "System" // Source Tab
      ]);
    }
    
    SpreadsheetApp.getUi().alert(`Reset ${resetCount} weekly chores to 'Not Started'`);
    Logger.log(`✅ Reset ${resetCount} weekly chores`);
  } catch (error) {
    Logger.log("❌ Error resetting weekly chores: " + error.message);
    SpreadsheetApp.getUi().alert("Error: " + error.message);
  }
}

/**
 * Allows manual entry into the chore history for special circumstances
 */
function manualHistoryEntry() {
  try {
    const ui = SpreadsheetApp.getUi();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const historySheet = ss.getSheetByName("Chore History");
    
    if (!historySheet) {
      ui.alert("Chore History sheet not found!");
      return;
    }
    
    // Get task description
    const taskResponse = ui.prompt(
      'Manual History Entry',
      'Enter task description:',
      ui.ButtonSet.OK_CANCEL);
    if (taskResponse.getSelectedButton() !== ui.Button.OK) return;
    const task = taskResponse.getResponseText();
    
    // Get assigned to
    const assignedResponse = ui.prompt(
      'Manual History Entry',
      'Who was assigned/claimed this task?',
      ui.ButtonSet.OK_CANCEL);
    if (assignedResponse.getSelectedButton() !== ui.Button.OK) return;
    const assigned = assignedResponse.getResponseText();
    
    // Add entry
    historySheet.appendRow([
      new Date(),
      task,
      assigned,
      "Yes",  // Completed
      "Manual Entry",
      "Manual"
    ]);
    
    ui.alert("History entry added successfully.");
    Logger.log(`✅ Manual history entry added for ${task} assigned to ${assigned}`);
  } catch (error) {
    Logger.log("❌ Error adding manual history entry: " + error.message);
    SpreadsheetApp.getUi().alert("Error: " + error.message);
  }
}
