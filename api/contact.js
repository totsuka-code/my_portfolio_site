import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "Missing fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `お問い合わせ: ${name}`,
      text: [
        `お名前: ${name}`,
        `メール: ${email}`,
        "",
        message,
      ].join("\n"),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ ok: false, message: "Mail send failed" });
  }
}