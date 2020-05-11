const express = require('express');
const _ = require('underscore');
const Bicycle = require('../models/bicycle');
const { checkToken, checkAdminRole } = require('../middlewares/authentication');

const app = express();

/*Registramos una Bicicleta */
app.post('/bicycle/newbicycle', checkToken, function(req, res) {

    let body = req.body;

    const bicycle = new Bicycle({
        manufacturer: body.manufacturer,
        serialNumber: body.serialNumber,
        color: body.color,
        typeBicycle: body.typeBicycle,
        user: [req.user.name, req.user.email] //agrego el nombre y el correo del usuario que registro la bicicleta tomando los datos del payload del token
    });

    bicycle.save((err, bicycleDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!bicycleDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'Bicycle added correctly',
            bicycle: bicycleDB
        });
    });
});

/**Obtenemos todas las Bicicletas registradas con paginación*/
app.get('/bicycle', [checkToken, checkAdminRole], function(req, res) {

    let since = req.query.since || 0;
    since = Number(since);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    Bicycle.find({ status: true }) /** como segundo parametro mandamos las exclusiones de los campos que queremos que aparezcan*/
        .skip(since)
        .limit(limit)
        .exec((err, bicycles) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Bicycle.count({ status: true }, (err, count) => {

                res.json({
                    ok: true,
                    bicycles,
                    quantum: count
                });
            });
        });
});

/*Obtengo una Bicicleta por su Serial*/
app.get('/bicycle/:serialNumber', function(req, res) {

    const serialNumber = req.params.serialNumber;
    const body = req.body

    Bicycle.findOne({ serialNumber }, body, { new: true }, (err, bicycleDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Bicycle.count({ status: true }, (err, count) => {

            res.json({
                ok: true,
                bicycleDB,
                quantum: count
            });
        });
    });
});

/*Actualizamos una Bicicleta por su Serial*/
app.put('/bicycle/:serialNumber', function(req, res) {

    const serialNumber = req.params.serialNumber;
    const body = _.pick(req.body, ['color', 'img', 'status']); //"pick" regresa una copia del objeto filtrando solo los valores que necesito (quiero)

    Bicycle.findOneAndUpdate({ serialNumber }, body, { new: true, runValidators: true }, (err, bicycleDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            bicycle: bicycleDB
        });
    })

});

/**Eliminamos (Cambiamos de estado) una Bicicleta por su Serial */
app.delete('/bicycle/:serialNumber', [checkToken, checkAdminRole], function(req, res) {

    const serialNumber = req.params.serialNumber;
    const changeStatus = {
            status: false
        }
        //Bicycle.findOneAndRemove({ serialNumber }, { new: true }, (err, deleteBicycle) => { /** Con esta Linea eliminamos el registro de la BD */
    Bicycle.findOneAndUpdate({ serialNumber }, changeStatus, { new: true }, (err, deleteBicycle) => { /** Acá cambiamos el estado del registro en la BD */
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!deleteBicycle) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Bicycle Not Found'
                }

            });
        }
        res.json({
            ok: true,
            message: 'Bicycle deleted correctly',
            bicycle: deleteBicycle
        });
    });

});



module.exports = app;