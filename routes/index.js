const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bicycleController = require('../controllers/bicycleController');


module.exports = function() {

    // Agregar nuevos usuarios via POST
    router.post('/users/newuser',
        userController.newUser
    );

    // Iniciar Sesión 
    router.post('/users/login',
        userController.loginUser
    );

    // Obtener todos los de usuarios en la BD
    router.get('/users',
        userController.getUsers
    );

    // Obtener el usuario solicitado por el idNumber de la BD
    router.get('/users/:idNumber',
        userController.getUser
    );

    // Actualizar el usuario solicitado por idNumber de la BD
    router.put('/users/:idNumber',
        userController.updateUser
    );

    // Elminar el usuario solicitado por idNumber de la BD
    router.delete('/users/:idNumber',
        userController.deleteUser
    );



    // Agregar nuevas bicicletas via POST
    router.post('/bicycle/newbicycle',
        bicycleController.newBicycle
    );

    // Obtener todas las bicicletas registradas en la BD
    router.get('/bicycle',
        bicycleController.getBicycles
    );

    // Obtener la Bicicleta por Serial
    router.get('/bicycle/:serialNumber',
        bicycleController.getBicycle
    );

    // Actualizar la Bicicleta solicitada por Serial de la BD
    router.put('/bicycle/:serialNumber',
        bicycleController.updateBicycle
    );

    // Elminar la Bicicleta solicitada por Serial de la BD
    router.delete('/bicycle/:serialNumber',
        bicycleController.deleteBicycle
    );

    return router;
}