var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
// sistemde kayitli müsteriler icin  model - Mongoose model for clients registered in the system
var clientSchema = new Schema({
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
    
}, {
        timestamps: true
    });

clientSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();
    hashedPass = bcrypt.hash(user.password, null,null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});
clientSchema.methods.comparePass = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}
var Musteri = mongoose.model('Musteri', clientSchema);
// make this available to our Node applications
module.exports = Musteri;
