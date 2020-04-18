const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const bicycleSchema = new Schema({
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    serialNumber: {
        type: String,
        required: true,
        unique: 1,
    },
    color: {
        type: String,
        required: true,
    },
    typeBicycle: {
        type: String,
        required: true,
    },
});

//Comparo los seriales
bicycleSchema.methods.compareserialNumber = function(candidateSerial, checkSerial) {

    compare(candidateSerial, this.serialNumber, function(err, isMatch) {
        if (err) return checkSerial(err)
        checkSerial(null, isMatch)
    });
};

//Validamos que el No. Serie sea único en la Base de Datos
bicycleSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});

module.exports = mongoose.model('Bicycle', bicycleSchema);