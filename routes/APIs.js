'use strict';
var express = require('express');
var Havaliman = require('../models/Havalimani')
var ucusModel = require('../models/ucusBilgileri')
var alinBilet = require('../models/alinanBiletler')
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

router.post('/havalimani', function (req, res) {
    var hvs = req.files.file.data.toString('utf8');

    var data = validateJSON(hvs);
    try {
        var multiplesave = function (bigjson) {
            var hvjson = bigjson.pop();
            console.log(hvjson);
            console.log(bigjson.length);

            var i = 1;
            if (!hvjson) {
                res.json({ msg: i + " havalimani kayit edildi" });
                return;
            }

            var hv = new Havaliman(hvjson);
            hv.save(function (err) {
                if (err) {
                    console.log("2hata burada" + err);

                    return res.send(err);
                }

                      multiplesave(bigjson);
                //res.json({ msg: data.length + " havalimani kayit edildi" });

            });
        }
        multiplesave(data);

    } catch (e)
        {
            console.log(e);
        }
   // }
    //multiplesave(hvs);
    //if (data) {
    //    console.log("json dosyasi:" + data[0]);
    //    Havaliman.insertMany(data, function (err, kvs) {
    //        if (err) {
    //            console.log(err);
    //            res.send(err);
    //            return
    //        }
    //         //saved!
    //        res.json({ msg: kvs.length + " havalimani kayit edildi" });
    //    });
    //}

});
router.get('/havalimanlar/:sehir', function (req, res) {
    sehir = req.params.adi;
    Havaliman.find({
        "city": { $regex: ".*"+sehir+".*" }}, function (err, havalar) {
        res.send(havalar);
    });
})

//##############ucusBilgeleri API################

router.get('/ucus/:ucusid', function (req, res) {
    //bir ucus secildi, yeni alinanBiletler objesi yaratilmali
    ucusid = req.params.ucusid;

})
router.post('/ucus', function (req, res) {
    //bir ucus secildi, yeni alinanBiletler objesi yaratilmali
    ab = req.body.ucusgirdi;
    ucusModel.find({ "nereden": ucusgirdi.nereden, "nereye": ucusgirdi.nereye, "zaman": ucusgirdi.checkin }, function (err, ucuslar) {
        if (err) {
            res.send(err);
            return
        }
        res.send(ucuslar);
    });

})




module.exports = router;
