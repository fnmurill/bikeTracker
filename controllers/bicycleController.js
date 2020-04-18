const Bicycle = require('../models/Bicycle');

//cuando se crea una nueva bicicleta
exports.newBicycle = async(req, res, next) => {

    // Crear objeto de Bicicleta con datos de req.body
    const bicycle = new Bicycle({
        manufacturer: req.body.manufacturer,
        serialNumber: req.body.serialNumber,
        color: req.body.color,
        typeBicycle: req.body.typeBicycle
    });

    try {
        await bicycle.save();
        res.json({ message: 'Bicycle added correctly' });
    } catch (error) {
        console.log(error);
        next();
    };

};

/** Obtiene todas bicicletas */

exports.getBicycles = async(req, res, next) => {
    try {
        const bicycle = await Bicycle.find({});
        res.json(bicycle);
    } catch (error) {
        console.log(error);
        next();
    };
};

/**Obtiene la bicicleta por su Numero de Serie */
exports.getBicycle = async(req, res, next) => {
    try {
        const bicycle = await Bicycle.findOne(req.body.serialNumber);
        res.json(bicycle);
    } catch (error) {
        console.log(error);
        next();
    };
};

/** Actualizar los datos registrados de una bicicleta por su serialNumber */
exports.updateBicycle = async(req, res, next) => {
    try {
        const bicycle = await Bicycle.findOneAndUpdate({ serialNumber: req.params.serialNumber }, req.body, {
            new: true
        });
        res.json(bicycle);
    } catch (error) {
        console.log(error);
        next();
    };
};

/* Eliminar los datos registrados de una bicicleta por su serialNumber*/
exports.deleteBicycle = async(req, res, next) => {
    try {
        await Bicycle.findOneAndDelete({ serialNumber: req.params.serialNumber });
        res.json({ message: 'Bicycle deleted correctly' });
    } catch (error) {
        console.log(error);
        next();
    };
};