const passport = require('passport');

exports.outlookAuth = passport.authenticate('windowslive', {
    scope: ['openid', 'profile', 'offline_access', 'https://outlook.office.com/Mail.ReadWrite']
});

exports.outlookCallback = passport.authenticate('windowslive', {
    failureRedirect: '/'
});

exports.redirectAfterLogin = (req, res) => {
    res.redirect('/sync');
};
