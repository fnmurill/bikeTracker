const Bicycle = require('../models/Bicycle');

//cuando se crea una nueva bicicleta
exports.newBicycle = async(req, res, next) => {

    // Crear objeto de Bicicleta con datos de req.body
    const bicycle = new Bicycle(req.body);

    try {
        await bicycle.save();
        res.json({ message: 'Bicycle added correctly' });
    } catch (error) {
        console.log(error);
        next();
    }

}