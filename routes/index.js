const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bicycleController = require('../controllers/bicycleController');


module.exports = function() {

    // Agregar nuevos usuarios via POST
    router.post('/users',
        userController.newUser
    );

    // Obtiene todos los registros de usuarios en la BD
    router.get('/users',
        userController.getUsers
    );



    // Agregar nuevas bicicletas via POST
    router.post('/bicycle',
        bicycleController.newBicycle
    );

    return router;
}