import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { timestamp, url, userAgent } = req.body;

  // Send email via Resend
  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: "PortNotify <onboarding@resend.dev>",
      to: "your-email@gmail.com",
      subject: "Portfolio Visit Alert",
      html: `<p>Someone visited your portfolio!</p>
             <p>Time: ${timestamp}</p>
             <p>URL: ${url}</p>
             <p>User Agent: ${userAgent}</p>`,
    }),
  });

  res.status(200).json({ message: "Notification sent!" });
}
