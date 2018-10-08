var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var alinanBiletlerSchema = new Schema({
    FlightID: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: false
    },
    Kayitlikulanci: {
        type: String
    },
    zaman: {
        type: String,
        required: false
    },
    sehir: {
        type: String
        
    }
    
}, {
        timestamps: false
    });

    

var alinBilet = mongoose.model('alinBilet', alinanBiletlerSchema);
// make this available to our Node applications
module.exports = alinBilet;
