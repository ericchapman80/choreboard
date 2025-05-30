import { google } from 'googleapis';

async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Example: Fetch required chores from Google Sheets
      const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
      const jwt = new google.auth.JWT(
        process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        null,
        (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        target
      );

      const sheets = google.sheets({ version: "v4", auth: jwt });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: process.env.SHEET_RANGE || 'Required', // Default to 'Required' tab
      });

      const rows = response.data.values;
      // Map columns based on Choreboard sheet structure
      const mappedData = rows.slice(1).map((row) => ({
        task: row[0] || null,
        assigned_to: row[1] || null,
        frequency: row[2] || null,
        due_date: row[3] || null,
        completed: row[4] || null,
        approval_status: row[5] || null,
      }));

      res.status(200).json({ mappedData });
      return;
    }
    res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default handler;
