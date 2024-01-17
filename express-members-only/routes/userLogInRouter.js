var express = require('express');
var router = express.Router();
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userLogInController = require('../controllers/userLogInController');

// Display Log In form on GET.
router.get('/',  (req, res) => {
    res.render('log_in', { user: req.user, error: undefined, messages: [] });
});
// Handle Log In form on POST.
router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
       if (err) {
          return next(err);
       }
 
       if (!user) {
          // Flash the error message
          req.flash('error', info.message);
          return res.redirect('/log-in');
       }
 
       req.logIn(user, (err) => {
          if (err) {
             return next(err);
          }
 
          return res.redirect('/');
       });
    })(req, res, next);
});

module.exports = router;
