
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Load configuration
require('./config/elasticsearch');
require('./config/passport');

// Middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static('src/views'));


// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/emails', require('./routes/emailRoutes'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
