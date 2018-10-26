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
    ucusid = req.params.ucusid;

})
router.post('/ucus', function (req, res) {
    //bir ucus secildi, yeni alinanBiletler objesi yaratilmali
    var ucusgirdi = req.body.ucusgirdi;
    console.log(ucusgirdi);
    ucusModel.find({ "nereden": ucusgirdi.nereden, "nereye": ucusgirdi.nereye, "zaman": ucusgirdi.checkin }, function (err, ucuslar) {
        if (err) {
            res.send(err);
            return
        }
        res.send(ucuslar);
    });

})




module.exports = router;
    