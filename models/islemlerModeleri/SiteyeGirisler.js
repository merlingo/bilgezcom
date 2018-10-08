var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var siteGrisSchema = new Schema({
    ipAddress: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    zaman: {
        type: String
    },
    Duration: {
        type: String,
        required: false
    },
    tikSayisi: {
        type: String
    },
    islemSequence: {
        type: String,
        required: false
    }
    
}, {
        timestamps: true
    });

    

var giris = mongoose.model('giris', siteGrisSchema);
// make this available to our Node applications
module.exports = giris;
