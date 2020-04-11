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

    // Obtener el usuarios solicitado por ID de la BD
    router.get('/users/:id',
        userController.getUser
    );

    // Actualizar el usuarios solicitado por ID de la BD
    router.put('/users/:id',
        userController.updateUser
    );

    // Elminar el usuarios solicitado por ID de la BD
    router.delete('/users/:id',
        userController.deleteUser
    );



    // Agregar nuevas bicicletas via POST
    router.post('/bicycle',
        bicycleController.newBicycle
    );

    return router;
}