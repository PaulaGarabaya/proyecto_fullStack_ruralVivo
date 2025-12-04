const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getUserByEmail, signup } = require('../models/userModels');
const { createToken } = require('../config/jwt');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL, // Ej: http://localhost:3000/api/google/callback
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        let user = await getUserByEmail(email);

        if (!user) {
            // Crea usuario con password dummy o NULL
            user = await signup(profile.displayName, email, null, 'user');
        }

        // Crear JWT
        const token = createToken({
            user_id: user.user_id,
            email: user.email,
            role: user.role
        });

        return done(null, { ...user, token });
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
