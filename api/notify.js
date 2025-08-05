// api/notify.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { timestamp, url, userAgent } = req.body;
  
    try {
      // Send email via Resend API
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "PortNotify <onboarding@resend.dev>", // Resend's test sender
          to: "YOUR_EMAIL@gmail.com", // Change to your email
          subject: "Portfolio Visit Alert 🚨",
          html: `
            <h2>New Portfolio Visit</h2>
            <p><strong>Time:</strong> ${timestamp}</p>
            <p><strong>URL:</strong> ${url}</p>
            <p><strong>User Agent:</strong> ${userAgent}</p>
          `,
        }),
      });
  
      if (!response.ok) {
        const err = await response.text();
        console.error("Resend error:", err);
        return res.status(500).json({ message: "Email sending failed" });
      }
  
      res.status(200).json({ message: "Notification sent!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  