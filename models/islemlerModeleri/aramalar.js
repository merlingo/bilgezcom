var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var aramalarSchema = new Schema({
    nereden: {
        type: String,
        required: true
    },
    nereye: {
        type: String,
        required: true
    },
    gidisTarih: {
        type: Date
    },
    donusTarih: {
        type: Date,
        required: false
    },
    yolcuSayisi: {
        type: String,
        default: "1"
    },
    ipAddress: {
        type: String,
        required: false
    },
    sehir: {
        type: String

    },
    kayitliKullanci: {
        type: String

    },
    zaman: {
        type: String

    },
    listelenUcusler: {
        type: String

    }
    
}, {
        timestamps: false
    });

    

var arama = mongoose.model('arama', aramalarSchema);
// make this available to our Node applications
module.exports = arama;
