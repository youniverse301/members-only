var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    // Use a callback function for req.logout()
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
