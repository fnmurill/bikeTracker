const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');

const app = express();


/**Registramos un Usuario */
app.post('/user/newuser', function(req, res) {

    const body = req.body;

    const user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'User added correctly',
            user: userDB
        });
    });
});

/**Obtenemos todos los Usuarios registrados con paginación*/
app.get('/user', function(req, res) {

    let since = req.query.since || 0;
    since = Number(since);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    User.find({ status: true }, 'name email role status google role img') /** como segundo parametro mandamos las exclusiones de los campos que queremos que aparezcan*/
        .skip(since)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ status: true }, (err, count) => {

                res.json({
                    ok: true,
                    users,
                    quantum: count
                });
            });

        });
});

/*Obtengo un Usuario por su email */
app.get('/user/:email', function(req, res) {

    const email = req.params.email;
    const body = req.body

    User.findOne({ email }, body, { new: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        User.count({ status: true }, (err, count) => {

            res.json({
                ok: true,
                userDB,
                quantum: count
            });
        });
    });
});

/*Actualizamos un Usuario por su email*/
app.put('/user/:email', function(req, res) {

    const email = req.params.email;
    const body = _.pick(req.body, ['name', 'email', 'img', 'role', 'homeAddress', 'city', 'phoneNumber', 'password', 'status']); //"pick" regresa una copia del objeto filtrando solo los valores que necesito (quiero)

    User.findOneAndUpdate({ email }, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            user: userDB
        });
    })

});

/**Eliminamos (Cambiamos de estado) un Usuario por su email */
app.delete('/user/:email', function(req, res) {

    const email = req.params.email;
    const changeStatus = {
            status: false
        }
        //User.findOneAndRemove({ email }, { new: true }, (err, deleteUser) => { /** Con esta Linea eliminamos el registro de la BD */
    User.findOneAndUpdate({ email }, changeStatus, { new: true }, (err, deleteUser) => { /** Acá cambiamos el estado del registro en la BD */
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!deleteUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User Not Found'
                }

            });
        }
        res.json({
            ok: true,
            message: 'User deleted correctly',
            user: deleteUser
        });
    });

});


module.exports = app;