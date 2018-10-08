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
        required: false
    },
    kita: {
        type: String
    },
    hvlmnIsmi: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        default: false
    },
    konum: {
        type: String,
        required: false
    }
    
}, {
        timestamps: false
    });

    

var Havaliman = mongoose.model('Havaliman', havalimanSchema);
// make this available to our Node applications
module.exports = Havaliman;
