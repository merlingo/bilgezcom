var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var havalimanSchema = new Schema({
    code: String,
    lat: Number,
    lon: Number,
    name: String,
    city: String,
    state: String,
    country: String,
    woeid: Number,
    tz: String,
    phone: String,
    type: String,
    email: String,
    url: String,
    runway_length: Number,
    elev: Number,
    icao: String,
    direct_flights: Number,
    carriers: Number
    
}, {
        timestamps: false
    });

    

var Havaliman = mongoose.model('Havalimanlari', havalimanSchema,"havalimanlari");
// make this available to our Node applications
module.exports = Havaliman;
