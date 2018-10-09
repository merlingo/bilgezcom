var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var havalimanSchema = new Schema({
    sehir: {
        type: String,
        required: true
    },
    ulke: {
        type: String,
        required: true
    },
    kita: {
        type: String,
        required: true
    },
    havalimani: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        default: false
    },
    konum: {
        longitude: Number,
        latitude: Number
    }
    
}, {
        timestamps: false
    });

    

var Havaliman = mongoose.model('Havalimanlari', havalimanSchema,"havalimanlari");
// make this available to our Node applications
module.exports = Havaliman;
