const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const passport = require('passport');
const OutlookStrategy = require('passport-outlook').Strategy;
const client = require('./elasticsearch');

passport.use(new OutlookStrategy({
    clientID: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true
},
    async function (req, accessToken, refreshToken, profile, done) {

        // Save user profile and tokens to the session
        req.session.outlookProfile = profile;
        req.session.outlookToken = accessToken;

        // Save user to Elasticsearch
        await client.index({
            index: 'users',
            body: {
                id: profile.id,
                displayName: profile.displayName,
                emails: profile.emails,
                accessToken
            }
        });

        return done(null, profile);
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
