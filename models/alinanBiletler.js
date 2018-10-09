var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var biletAlimiSchema = new Schema({
    //Iletisim Bilgileri
    ucus: Schema.Types.ObjectId,

    mail: {
        type: String,
        required: true
    },
    telefon: {
        country: String,
        code: Number,
        no: Number
    },
    izin: {
        type: Boolean
    },
    //Kisisel Bilgiler
    ad: {
        type: String,
        required: true
    },
    soyad: {
        type: Number,
        required: true
    },
    dogumtarihi: {
        gun: Number,
        ay: Number,
        yil: Number
    },
    tc: String,
    erkekmi: Boolean,
    //Fatura Bilgileri
    faturatipi: String,
    sehir: String,
    ilce: String,
    sigorta: Boolean,
    guvence: Boolean,
    //Islem Bilgileri
    yarimkaldi: Boolean,
    ip: String,
    lokasyon: String

});
var ucB = mongoose.model('alinanbiletler', biletAlimiSchema, "alinanbiletler");
// make this available to our Node applications
module.exports = ucB;
