const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');

//crear server
const app = express();
//Habilitar el body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Conectar a MongoDb
mongoose.Promise = global.Promise;
const urlMongo = 'mongodb://localhost/gamer_zone';
process.env.URLDB = urlMongo;
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.once('open', () => console.log("Data Base is online"));
db.on('error', (error) => console.error(error));


//Habilitar rutas
app.use('/', routes());


// Definir puerto y arrancar el servidor
const port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log(`Server Started on the port ${port}`);
});