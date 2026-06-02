import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "./db.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";
import { saveRefreshToken } from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const googleId = profile.id;
        const firstName = profile.name?.givenName ?? "";
        const lastName = profile.name?.familyName ?? "";

        let { rows } = await pool.query(
          `SELECT * FROM users WHERE google_id = $1`,
          [googleId],
        );

        let user = rows[0];

        if (!user) {
          const existing = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email],
          );

          if (existing.rows[0]) {
            const updated = await pool.query(
              `UPDATE users SET google_id = $1, is_email_verified = true
               WHERE email = $2 RETURNING *`,
              [googleId, email],
            );
            user = updated.rows[0];
          } else {
            const created = await pool.query(
              `INSERT INTO users (first_name, last_name, email, google_id, is_email_verified)
               VALUES ($1, $2, $3, $4, true) RETURNING *`,
              [firstName, lastName, email, googleId],
            );
            user = created.rows[0];
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

export default passport;
