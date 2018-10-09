'use strict';
var express = require('express');
var Havaliman = require('../models/Havalimani')
var ucBilge = require('../models/ucusBilgeleri')
var alinBilet = require('../models/islemlerModeleri/alinanBiletler')
var arama = require('../models/islemlerModeleri/aramalar')
var girisler = require('../models/islemlerModeleri/SiteyeGirisler')
var uye = require('../models/islemlerModeleri/uye')
var yarKalan = require('../models/islemlerModeleri/yarimkalanlar')

var router = express.Router();

//##############Havalimani Belgeleri API################

router.post('/hvliman', function (req, res) {
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


router.post('/ucBilgesi', function (req, res) {
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

router.get('/ucuslar', function (req, res) {
    ucBelge.find({}, function (err, uclar) {
        res.send(uclar);
    });
})


//##############Alinan biletleri API################

router.post('/almisBilet', function (req, res) {
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

router.get('/alinmisBilet', function (req, res) {
    alinBilet.find({}, function (err, alb) {
        res.send(alb);
    });
})


//##############Aramalar API################

router.post('/ara', function (req, res) {
    console.log(req.body);
    var ar = new arama(req.body);

    // Save the new model instance, passing a callback
    ar.save(function (err) {
        if (err) {
            res.send(err);
            return
        }
        // saved!
        res.json(ar);
    });
});

router.get('/aram', function (req, res) {
    arama.find({}, function (err, ara) {
        res.send(ara);
    });
})


//##############site girisleri API################

router.post('/girisSayi', function (req, res) {
    console.log(req.body);
    var giris = new girisler(req.body);

    // Save the new model instance, passing a callback
    giris.save(function (err) {
        if (err) {
            res.send(err);
            return
        }
        // saved!
        res.json(giris);
    });
});

router.get('/girislere', function (req, res) {
    girisler.find({}, function (err, gir) {
        res.send(gir);
    });
})

//##############uye API################

router.post('/uye', function (req, res) {
    console.log(req.body);
    var u = new uye(req.body);

    // Save the new model instance, passing a callback
    u.save(function (err) {
        if (err) {
            res.send(err);
            return
        }
        // saved!
        res.json(u);
    });
});

router.get('/members', function (req, res) {
    uye.find({}, function (err, uy) {
        res.send(uy);
    });
})


//##############yarim kalanlar API################

router.post('/yarim', function (req, res) {
    console.log(req.body);
    var yar = new yarKalan(req.body);

    // Save the new model instance, passing a callback
    yar.save(function (err) {
        if (err) {
            res.send(err);
            return
        }
        // saved!
        res.json(yar);
    });
});

router.get('/kalan', function (req, res) {
    yarKalan.find({}, function (err, yk) {
        res.send(yk);
    });
})

module.exports = router;
