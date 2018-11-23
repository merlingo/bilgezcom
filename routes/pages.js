'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function (req, res) {
//    res.sendFile('/views/iframe_pages/index.html', { root: '.' });
//});
router.get('/', function (req, res) {
    res.sendFile('/views/iframe_pages/arama.html', { root: '.' });
});
router.get('/contact', function (req, res) {
    res.sendFile('/views/contact.html', { root: '.' });
});
router.get('/ucuslar', function (req, res) {
    res.sendFile('/views/iframe_pages/ucuslar.html', { root: '.' });
});
router.get('/bilet', function (req, res) {
    res.sendFile('/views/iframe_pages/bilet.html', { root: '.' });
});
module.exports = router;
