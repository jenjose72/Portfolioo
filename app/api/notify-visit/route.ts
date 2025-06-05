import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  // Get visitor's IP address
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.ip || 
    "Unknown IP";

  //console.log("📍 Visitor IP:", ip);

  // Setup mail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: "🚨 New Visit to Portfolio",
    text: `Someone visited your site.\n\n📍 IP Address: ${ip}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    //console.log("✅ Email sent with IP:", ip);
    return NextResponse.json({ message: "Email sent with IP address" });
  } catch (error) {
    console.error("❌ Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

// Optional GET handler to show method not allowed
export function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
