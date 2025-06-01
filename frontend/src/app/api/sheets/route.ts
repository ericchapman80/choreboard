import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n") || '';
    if (!privateKey || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      privateKey,
      target
    );
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: process.env.SHEET_RANGE || 'Required',
    });
    const rows = response.data.values || [];
    const mappedData = rows.slice(1).map((row: string[]) => ({
      task: row[0] || null,
      assigned_to: row[1] || null,
      frequency: row[2] || null,
      due_date: row[3] || null,
      completed: row[4] || null,
      approval_status: row[5] || null,
    }));
    return NextResponse.json({ mappedData });
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
