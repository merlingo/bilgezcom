'use strict';
var express = require('express');
var Client = require('../models/clients')
var router = express.Router();

/* GET home page. */
router.post('/signup', function (req, res) {
    console.log(req.body);
    var client = new Client(req.body);
    console.log(client);
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
router.post('/signin', function (req, res) {
    console.log(req.body);
    var client = new Client(req.body);
    console.log(client);
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
router.get('/users', function (req, res) {
    Client.find({}, function (err, clients) {
        res.send(clients);
    });
})
module.exports = router;
