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
        zaman: { Type: Schema.Types.Date },
        eco: Boolean
    }],
    sure: {
        type: Schema.Types.String,
        default: "12 hrs"
    },
    
    firma: {
        type: Schema.Types.String,
        required: false
    },
    ucaktip: Schema.Types.String,
    tarih: {
        type: Schema.Types.Date,
        required:true
    }
    
}, {
        timestamps: true
    });

    

var ucB = mongoose.model('ucuslar', ucusBilgileriSchema,"ucuslar");
// make this available to our Node applications
module.exports = ucB;
