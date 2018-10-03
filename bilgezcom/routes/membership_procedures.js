'use strict';
var express = require('express');
var Client = require('../models/clients')
var router = express.Router();

/* GET home page. */
router.post('/signup', function (req, res) {
    console.log(req.body);
    var client = new Client(req.body);

    // Save the new model instance, passing a callback
    client.save(function (err) {
        if (err) {
            res.send(err);
            return
        }
        // saved!
        res.json(client);
    });
});
module.exports = router;
