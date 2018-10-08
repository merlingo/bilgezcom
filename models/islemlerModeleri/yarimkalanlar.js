var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var yarimkalanSchema = new Schema({
    flightID: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String
        
    },
    kayitliKulanci: {
        type: String
    },
    zaman: {
        type: String
        
    },
    sehir: {
        type: String
        
    },
    asama: {
        type: String,
        required: false
    }
    
}, {
        timestamps: false
    });

    

var yarim = mongoose.model('yarim', yarimkalanSchema);
// make this available to our Node applications
module.exports = yarim;
