var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var ucBilgeSchema = new Schema({
    nereden: {
        type: String,
        required: true
    },
    nereye: {
        type: String,
        required: true
    },
    Bfiyat: {
        type: String
    },
    Efiyat: {
        type: String,
        required: false
    },
    sure: {
        type: String,
        default: "12 hrs"
    },
    firma: {
        type: String,
        required: false
    },
    tarih: {
        type: Date,
        default: Date.now

    }
    
}, {
        timestamps: false
    });

    

var ucB = mongoose.model('ucB', ucBilgeSchema);
// make this available to our Node applications
module.exports = ucB;
