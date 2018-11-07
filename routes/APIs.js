'use strict';
var mongoose = require('mongoose');
var Havaliman = require('../models/Havalimani')
var ucusModel = require('../models/ucusBilgileri')
var alinBilet = require('../models/alinanBiletler')
var express = require('express');
const fs = require('fs');


var router = express.Router();
function validateJSON(body) {
    try {
        var data = JSON.parse(body);
        // if came to here, then valid
        return data;
    } catch (e) {
        // failed to parse
        return null;
    }
}
//##############Havalimani Belgeleri API################
function multiplesave(bigjson,yuklenenler) {
    var hvjson = bigjson.pop();
    console.log(hvjson);
    console.log(bigjson.length);
    //if (yuklenenler.indexOf(hvjson) >= 0) {
    //    console.log("CÝFTLEME OLACAKTI DURDURULDU!!!!");
    //    return;

    //}
    if (!hvjson) {
        return -1;
    }
    Havaliman.find({ code: hvjson.code }, function (err, docs) {
        if (docs.length) {
            console.log('Havalimani exists already');
        } else {
            var hv = new Havaliman(hvjson);

            hv.save(function (err) {
                if (err) {
                    console.log("2hata burada" + err);

                    return err;
                }
                //yuklenenler.push(hvjson);
                multiplesave(bigjson);
                //res.json({ msg: data.length + " havalimani kayit edildi" });

            });
        }
    })
   
}
router.post('/havalimani', function (req, res) {
    var hvs = req.files.file.data.toString('utf8');

    var data = validateJSON(hvs);
    try {
        var yuklenenler = [];
      
      var r =   multiplesave(data, yuklenenler);
      if (r < 0) {
          res.json({ msg: i + " havalimani kayit edildi" });

      }
      else
          res.json(r);


    } catch (e)
        {
            console.log(e);
        }
});
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
router.get('/havalimani/:sehir', function (req, res) {
    var sehir = capitalizeFirstLetter(req.params.sehir);
    var reg ="^"+sehir + ".*";
    console.log(reg)

    Havaliman.find({
        "state": { $regex: reg }
    }, function (err, havalar) {
        if (err) {
            console.log(err);
            res.send(err);
            return
        }
        console.log(havalar);
        res.status(200).json(havalar);
    });
})

//##############ucusBilgeleri API################

router.get('/ucus/:ucusid', function (req, res) {
    //bir ucus secildi, yeni alinanBiletler objesi yaratilmali
    var ucusid = req.params.ucusid;
    ucusModel.findOne({ "_id": ucusid }).populate({ path: 'nereden', model: Havaliman }).populate({ path: 'nereye', model: Havaliman }).exec( function (err, u) {
        if (err) {
            console.log("err" + err);
            res.send(err);
            return
        }
        console.log("ucus: " + JSON.stringify(u));

        res.send(u);

    });
})
router.post('/ucus', function (req, res) {
    //bir ucus secildi, yeni alinanBiletler objesi yaratilmali
    var ucusgirdi = req.body;
    console.log(ucusgirdi);
    var filter = { "nereden": ucusgirdi.nereden, "nereye": ucusgirdi.nereye, "zaman": ucusgirdi.checkin };
    ucusModel.find({}).populate({ path: 'nereden', model: Havaliman }).populate({ path: 'nereye', model: Havaliman }).exec(function (err, ucuslar) {
        if (err) {
            console.log("err" + err);
            res.send(err);
            return
        }
        console.log("ucuslar: " + JSON.stringify(ucuslar));

        res.send(ucuslar);
    });

})
router.post('/ucuskayit', function (req, res) {
    //bir ucus secildi, yeni alinanBiletler objesi yaratilmali
    var ucusgirdi = req.body;
    console.log(ucusgirdi);
    var queryNereden = Havaliman.findOne({ code: ucusgirdi.nereden });
    var queryNereye = Havaliman.findOne({ code: ucusgirdi.nereye });

    queryNereden.then(function (nereden) {
        queryNereye.then(function (nereye) {
            var ucus = new ucusModel({
                nereden: nereden._id,
                nereye: nereye._id,
                sure: ucusgirdi.sure,
                firma: ucusgirdi.firma,
                ucaktip: ucusgirdi.ucaktip,
                tarih: new Date(ucusgirdi.tarih)
            });
            ucus.save(function (err) {
                if (err) {
                    console.log("2hata burada" + err);
                    res.send(err);
                    return err;
                }
                res.json({ msg: "basari ile kayit edildi" });
                });
        });
    });

})




module.exports = router;
    