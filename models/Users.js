const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    idDocument: {
        type: String,
        required: true
    },
    idNumber: {
        type: Number,
        required: true
    },
    birthDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    homeAddress: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },


});

module.exports = mongoose.model('User', userSchema);