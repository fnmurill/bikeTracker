const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const bicycleSchema = new Schema({
    manufacturer: {
        type: String,
        required: [true, 'The Manufacturer is required'],
    },
    serialNumber: {
        type: String,
        required: [true, 'The Serial Number is required'],
        unique: true,
    },
    color: {
        type: String,
        required: [true, 'The Color is required'],
    },
    typeBicycle: {
        type: String,
        required: [true, 'The Type Number is required'],
    },
    status: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.Mixed,
        ref: 'User'
    },
});

//Validamos que el No. Serie sea único en la Base de Datos
bicycleSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});

module.exports = mongoose.model('Bicycle', bicycleSchema);