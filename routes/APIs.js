'use strict';
var express = require('express');
var Havaliman = require('../models/Havalimani')
var ucBilge = require('../models/ucusBilgeleri')
var alinBilet = require('../models/alinanBiletler')

var router = express.Router();

//##############Havalimani Belgeleri API################

router.post('/havalimani', function (req, res) {
    console.log(req.body);
    var hava = new Havaliman(req.body);

    // Save the new model instance, passing a callback
    hava.save(function (err) {
        if (err) {
            res.send(err);
            return
        }
        // saved!
        res.json(hava);
    });
});
router.get('/havalimanlar', function (req, res) {
    Havaliman.find({}, function (err, havalar) {
        res.send(havalar);
    });
})

//##############ucusBilgeleri API################


router.post('/ucus', function (req, res) {
    console.log(req.body);
    var bilge = new ucBilge(req.body);

    // Save the new model instance, passing a callback
    bilge.save(function (err) {
        if (err) {
            res.send(err);
            return
        }
        // saved!
        res.json(bilge);
    });
});

router.get('/ucus', function (req, res) {
    //Arama kriterlerine gore ucuslar listelenmeli
    ucBelge.find({}, function (err, uclar) {
        res.send(uclar);
    });
})
router.get('/ucus/:ucusid', function (req, res) {
    //Arama kriterlerine gore ucuslar listelenmeli
    ucusid = req.params.ucusid;

})
router.post('/ucus', function (req, res) {
    //bir ucus secildi, yeni alinanBiletler objesi yaratilmali
    ucusid = req.body.ucusid;
    ab = req.body.biletbilgi;

})

//##############Alinan biletleri API################

router.post('/bilet', function (req, res) {
    console.log(req.body);
    var bilet = new alinBilet(req.body);

    // Save the new model instance, passing a callback
    bilet.save(function (err) {
        if (err) {
            res.send(err);
            return
        }
        // saved!
        res.json(bilet);
    });
});





module.exports = router;
