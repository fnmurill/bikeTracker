// ============================
//  Puerto
// ============================

process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Data Base
// ============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/bike_register'
} else {
    urlDB = process.env.MONGO_DB;
}

process.env.URLDB = urlDB;