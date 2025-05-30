# Google Sheets API Setup for Choreboard Frontend

This guide will walk you through setting up Google Sheets API credentials for secure access from your Next.js app.

---

## 1. Create a Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com/).
- Create a new project (or select an existing one).

## 2. Enable Google Sheets API
- In your project, go to **APIs & Services > Library**.
- Search for "Google Sheets API" and click **Enable**.

## 3. Create a Service Account
- Go to **APIs & Services > Credentials**.
- Click **Create Credentials > Service account**.
- Give it a name (e.g., `choreboard-service-account`).
- Grant it the **Editor** role (or more restrictive as needed).
- Click **Done**.

## 4. Create and Download a JSON Key
- In the Service Accounts list, click your new account.
- Go to the **Keys** tab.
- Click **Add Key > Create new key**.
- Choose **JSON** and download the file.

## 5. Share Your Google Sheet
- Open your Choreboard Google Sheet.
- Click **Share** and add the service account email (from the JSON file) with **Editor** access.

## 6. Add Credentials to Your Next.js Project
- Open the JSON key file and copy these values:
  - `client_email`
  - `private_key`
- In your project root, create a `.env.local` file (see below).

## 7. Set Environment Variables
Add the following to `.env.local` in your frontend directory:

```
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SPREADSHEET_ID=your_google_sheet_id
SHEET_RANGE=Required
```
- Replace values with your actual credentials and sheet info.
- The private key must be a single line with `\n` for newlines.

## 8. Restart Your Dev Server

---

You can now securely access your Google Sheet from the Next.js API route!
