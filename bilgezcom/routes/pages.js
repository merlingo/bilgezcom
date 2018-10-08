'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('/views/index.html', { root: '.' });
});
router.get('/contact', function (req, res) {
    res.sendFile('/views/contact.html', { root: '.' });
});
/* GET home page. */
router.get('/yakinda', function (req, res) {
    res.sendFile('/views/coming_soon.html', { root: '.' });
});
module.exports = router;
