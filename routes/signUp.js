let express = require('express');
let router = express.Router();
let db = require('../db/index');

router.post('/', (req, res, next) => {
    let credentials = req.body;
    db.signUpAttempt(credentials, (error, response) => {
        if (error) {
            throw error;
        } else {
            if (response === 'Username already exists') {
                res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    });
})

module.exports = router;