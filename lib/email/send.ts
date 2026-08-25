import "server-only";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "tinhdausongnguyen.com@gmail.com";

/**
 * Sends an admin notification email via Resend. Silently skips (with a console
 * warning) when RESEND_API_KEY isn't configured, so order/newsletter capture
 * keeps working even before email is wired up.
 */
export async function sendNotificationEmail({ subject, html }: { subject: string; html: string }) {
  if (!RESEND_API_KEY) {
    console.warn(`[email] RESEND_API_KEY chưa được cấu hình — bỏ qua gửi email: ${subject}`);
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Song Nguyên Website <onboarding@resend.dev>",
        to: NOTIFICATION_EMAIL,
        subject,
        html,
      }),
    });
    if (!response.ok) {
      console.error(`[email] Gửi email thất bại (${response.status}):`, await response.text());
    }
  } catch (error) {
    console.error("[email] Lỗi khi gửi email:", error);
  }
}
