const express = require('express');
const mongoose = require('mongoose');

//create server
const app = express();


//Conect to MongoDb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gamer_zone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


app.listen(3000, function() {
    console.log('Server Started');
});