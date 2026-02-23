import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export async function POST(req) {
  try {
    const form = await req.formData();

    // Extract text fields
    const fields = {};
    form.forEach((value, key) => {
      if (value instanceof File) return;
      fields[key] = value;
    });

    // Extract files (passport + ID)
    const passportFile = form.get("passport");
    const idFile = form.get("validId");

    const attachments = [];

    // Convert each file to buffer before emailing
    async function fileToAttachment(file) {
      if (!file || typeof file === "string") return null;
      const buffer = Buffer.from(await file.arrayBuffer());
      return {
        filename: file.name,
        content: buffer,
      };
    }

    const passportAttachment = await fileToAttachment(passportFile);
    const idAttachment = await fileToAttachment(idFile);

    if (passportAttachment) attachments.push(passportAttachment);
    if (idAttachment) attachments.push(idAttachment);

    // -------------------------------------------------------
    // 1️⃣  SEND EMAIL (WITH ATTACHMENTS)
    // -------------------------------------------------------

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "doppelhomesltd@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const htmlMessage = `
      <h2>New Affiliate Application</h2>
      <p><b>Full Name:</b> ${fields.fullName}</p>
      <p><b>Email:</b> ${fields.email}</p>
      <p><b>WhatsApp:</b> ${fields.whatsapp}</p>
      <p><b>Gender:</b> ${fields.gender}</p>
      <p><b>Location:</b> ${fields.location}</p>
      <p><b>NIN:</b> ${fields.nin}</p>
      <p><b>ID Type:</b> ${fields.idDocType}</p>
      <p><b>Address:</b> ${fields.address}</p>
      <p><b>Staff Referral:</b> ${fields.staffName}, ${fields.staffEmail}, ${fields.staffNumber}</p>
    `;

    await transporter.sendMail({
      from: "Doppel Homes Website <doppelhomesltd@gmail.com>",
      to: "doppelhomesltd@gmail.com",
      subject: "New Affiliate Application",
      html: htmlMessage,
      attachments,
    });

    // -------------------------------------------------------
    // 2️⃣  SAVE TO GOOGLE SHEET
    // -------------------------------------------------------

    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GS_PROJECT_ID,
        private_key: process.env.GS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GS_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GS_SHEET_ID,
      range: "Sheet1!A:K",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            fields.fullName,
            fields.email,
            fields.whatsapp,
            fields.gender,
            fields.location,
            fields.idDocType,
            fields.address,
            fields.staffName,
            fields.staffEmail,
            fields.staffNumber,
            new Date().toISOString(),
          ],
        ],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}