// pages/api/notify-visit.ts

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const visitorIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Set up the email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // works for Gmail
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: `"Portfolio Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: "🚨 New Portfolio Visit",
    text: `Someone visited your portfolio from IP: ${visitorIP}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Notification sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
}
