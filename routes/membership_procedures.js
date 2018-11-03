'use strict';
var express = require('express');
var Client = require('../models/clients')
var jsonwebtoken = require('jsonwebtoken');
var config = require('../config');
var router = express.Router();
var superSecret = config.secretKey;
function createtoken(user) {
   return jsonwebtoken.sign({
            _id: user._id,
            name: user.mail,
            username: user.name
        }, superSecret);
}

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
    Client.findOne({"email":req.body.email}).select('password').exec( function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        if (!user) {
            console.log("no user found!");
            res.send({ msg: "no user found!" });

        } else if (user) {
            console.log("user:" + JSON.stringify(user));
            var validPassword = user.comparePass(req.body.password);

            if (validPassword)
            {
                console.log("valid password");
                //token
                var token = createtoken(user);
                res.json({
                    success: true,
                    message: "Successful!",
                    token: token
                });

            } else {
                console.log("invalid password");
                res.send({ msg: "invalid password" });
            }
        }

    });
});

router.get('/me', function (req, res) {
    res.json(req.decoded);
})

router.get('/users', function (req, res) {
    Client.find({}, function (err, clients) {
        res.send(clients);
    });
})
module.exports = router;
