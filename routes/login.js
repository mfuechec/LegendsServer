let express = require('express');
let router = express.Router();
let db = require('../db/index');

router.post('/', (req, res, next) => {
    let credentials = req.body;
    db.loginAttempt(credentials, (error, response) => {
        if (error) {
            throw error;
        } else {
            if (response === 'Login attempt failed') {
                res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    });
})

module.exports = router;