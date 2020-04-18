const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const validRoles = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} it`s not a valid role'
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    idDocument: {
        type: String,
        required: false
    },
    idNumber: {
        type: String,
        unique: 1,
        required: false
    },
    birthDate: {
        type: Date,
        //default: Date.now,
        required: false
    },
    email: {
        type: String,
        unique: 1,
        required: true,
        trim: true
    },
    homeAddress: {
        type: String,
        required: false,
        trim: true
    },
    city: {
        type: String,
        required: false,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        default: 'USER',
        required: true,
        enum: validRoles,
    },
});

const bcrypt = require('bcrypt');
const SALT = 10;
//encripta la contraseña antes guardarla en la base de datos
userSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    };
});

//Comparo las contraseñas
userSchema.methods.comparePassword = function(candidatePassword, checkPassword) {

    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return checkPassword(err)
        checkPassword(null, isMatch)
    });
};

//Validamos que el correo sea unico en la Base de Datos
userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});

module.exports = mongoose.model('User', userSchema);