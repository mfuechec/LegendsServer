let express = require('express');
let router = express.Router();
let db = require('../db/index');

router.get('/', (req, res, next) => {
    db.findTrending((error, response) => {
        if (error) {
            throw error;
        } else {
            res.send(response);
        }
    })
})

module.exports = router;