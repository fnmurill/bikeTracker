const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');

//crear server
const app = express();


//Conectar a MongoDb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gamer_zone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


//Habilitar el body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Habilitar rutas
app.use('/', routes())


// Definir puerto y arrancar el servidor
app.listen(3000, function() {
    console.log('Server Started');
});