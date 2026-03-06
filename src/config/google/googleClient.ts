import env from "#config/env/env.js";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({ keyFile: env.GOOGLE_CREDENTIALS_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
export const sheets = google.sheets({ version: "v4", auth });
