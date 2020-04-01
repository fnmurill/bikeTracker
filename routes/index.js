const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


module.exports = function() {

    // Agregar nuevos usuarios via POST
    router.post('/users',
        userController.newUser
    )


    return router;
}