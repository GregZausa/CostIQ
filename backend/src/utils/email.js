import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "CostIQ <onboarding@resend.dev>";

const isProduction = process.env.NODE_ENV === "production";

const BASE_URL = isProduction ? process.env.PRODUCTION_URL : process.env.URL;

export const sendVerificationEmail = async (email, token) => {
  const url = `${BASE_URL}/verify-email?token=${token}`;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Verify your CostIQ account",
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; background: #080c14; color: #e8edf5; padding: 40px; max-width: 500px; margin: 0 auto; border-radius: 16px;">
        <div style="font-size: 28px; font-weight: 900; letter-spacing: 3px; margin-bottom: 24px;">
          COST<span style="color: #f59e0b;">IQ</span>
        </div>
        <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 12px; color: #e8edf5;">
          Verify your email
        </h2>
        <p style="color: rgba(232,237,245,0.6); font-size: 14px; line-height: 1.7; margin-bottom: 32px;">
          You're almost in. Click the button below to verify your email and activate your CostIQ account.
        </p>
        <a href="${url}" style="display: inline-block; background: #f59e0b; color: #080c14; font-weight: 700; font-size: 14px; padding: 14px 32px; border-radius: 8px; text-decoration: none; letter-spacing: 1px;">
          VERIFY EMAIL →
        </a>
        <p style="color: rgba(232,237,245,0.3); font-size: 12px; margin-top: 32px;">
          This link expires in 24 hours. If you didn't create a CostIQ account, ignore this email.
        </p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email, token) => {
  const url = `${BASE_URL}/reset-password?token=${token}`;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Reset your CostIQ password",
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; background: #080c14; color: #e8edf5; padding: 40px; max-width: 500px; margin: 0 auto; border-radius: 16px;">
        <div style="font-size: 28px; font-weight: 900; letter-spacing: 3px; margin-bottom: 24px;">
          COST<span style="color: #f59e0b;">IQ</span>
        </div>
        <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 12px; color: #e8edf5;">
          Reset your password
        </h2>
        <p style="color: rgba(232,237,245,0.6); font-size: 14px; line-height: 1.7; margin-bottom: 32px;">
          We received a request to reset your CostIQ password. Click below to set a new one.
        </p>
        <a href="${url}" style="display: inline-block; background: #f59e0b; color: #080c14; font-weight: 700; font-size: 14px; padding: 14px 32px; border-radius: 8px; text-decoration: none; letter-spacing: 1px;">
          RESET PASSWORD →
        </a>
        <p style="color: rgba(232,237,245,0.3); font-size: 12px; margin-top: 32px;">
          This link expires in 1 hour. If you didn't request a reset, ignore this email.
        </p>
      </div>
    `,
  });
};
