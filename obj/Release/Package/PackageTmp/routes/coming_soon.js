'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('/views/coming_soon.html', { root: '.' });
});

module.exports = router;
