require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/**Configuración global de rutas*/
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) throw err;
        console.log('Data Base Online')

    });

app.listen(process.env.PORT, () => {
    console.log(`Server Started on the port: ${process.env.PORT}`)
});