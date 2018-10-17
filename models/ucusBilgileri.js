var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var ucusBilgileriSchema = new Schema({
    no: String,
   
    nereden: {
        type: Schema.Types.ObjectId, ref: 'havalimanlari', required: true

    },
    nereye: {
        type: Schema.Types.ObjectId, ref: 'havalimanlari', required: true
    },
    fiyat: [{
        ucret: String,
        zaman: { Type: Date, default: Date.now },
        eco: Boolean
    }],
    sure: {
        type: String,
        default: "12 hrs"
    },
    
    firma: {
        type: String,
        required: false
    },
    ucaktip: String,
    tarih: {
        type: Date,
        required:true
    }
    
}, {
        timestamps: true
    });

    

var ucB = mongoose.model('ucuslar', ucBilgeSchema,"ucuslar");
// make this available to our Node applications
module.exports = ucB;
