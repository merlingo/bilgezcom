'use strict';
var express = require('express');
var Havaliman = require('../models/Havalimani')
var ucusModel = require('../models/ucusBilgileri')
var alinBilet = require('../models/alinanBiletler')
var secretkey = config.secretkey;
const fs = require('fs');
var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
    var token = jsonwebtoken.sign({
        id:user._id,
        name:user.name,
        username:user.username
    }, secretkey,{
        expirtesInMinute:1440
    }
    
    ); 
    
    return token;
}

module.exports= function(app,express){
    
    var api= express.router();
    
    api.post('/signup',function(req,res){
        
        var.user = new user({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
       
        user.save(function(err){
            if(err){
                
                res.send(err);
                return;
            }
            res.json({message:'Kullanıcı oluşturuldu'});
            
        });
    });
    api.get('/users',function(req,res){
        
        user.find({},function(err,users){
            if(err){
                res.send(err);
                return;
            }
            res.json(users);
            
        });
    });
    
    api.post('/login',function(req,res){
        
        user.findOne({
            username: req.body.username
        }).select('password').exec(function(err,user){
            
            if(err) throw err;
            if(!user){
                res.send({ message: "kullanıcı mevcut değil" });
            } else if(user){
                var validpassword = user.comparePassword(req.body.password);
                
                if(!validpassword){
                    
                    res.send({message:"geçersiz şifre"});
                } else {
                    ///// token
                    
                    var token = createToken(user);
                    res.json({
                        
                        success:true,
                        message:"başarlı giriş!",
                        token:token
                    });
                }
                
            }
        });
    });
    
    api.use(function(req,res,next){
        
        console.log("somebody just came to our app!");
        var token = req.body.token | | req.param('token')  || req.headers['x-access-token'];
        
        //check if token exist
        if(token){
            
            jsonwebtoken.verify(token,secretkey,function(err,decoded){
                if(err){
                    res.status(403).send({success:false,message:'Failed to authenticate user'});
                } else{
                    //
                    req.decoded =decoded;
                    next();
                    
                }
                
                
            });
        } else {
            res.status(403).send({success:false,message'no token povided'});
        }
        
    });
    
    //destination B // provide a legitimate token
    
    api.route('/')
    
    .post(function(req,res){
        var story=new story({
            
            creator:req.decoded.id,
            content:req.body.content,
             
        });
        
        story.save(function(err) {
            
            if(err){
                
                res.send(err);
                return
            }
            res.json({message:"new story created!"});
        });
        
    })
    
    .get(function(req,res){
        
        story.find({creator:req.decoded.id},function(err,stories){
            if(err){
                res.send(err);
                return;
                
                }
            res.json(stories);
        });
    });
    
    api.get('/me',function(req,res){
        
        res.json(req.decoded);
        
    });
    return api
    
}


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
    //    console.log("C�FTLEME OLACAKTI DURDURULDU!!!!");
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
router.get('/havalimani/:sehir', function (req, res) {
    var sehir = req.params.sehir;
    var reg = sehir + ".*";
    console.log(reg)

    Havaliman.find({
        "state": "Balochistan"//{ $regex: reg }
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
