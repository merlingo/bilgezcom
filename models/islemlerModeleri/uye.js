var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var uyeSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    zaman: {
        type: String
        
    },
    duration: {
        type: String
    },
    islemsequence: {
        type: String,
        required: false
    },
    sehir: {
        type: String
        
    }
    
}, {
        timestamps: false
    });

    

var uye = mongoose.model('uye', uyeSchema);
// make this available to our Node applications
module.exports = uye;
