// ============================
//  Puerto
// ============================

process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Expiración del Token
// ============================
/**
 * 60 Segundos
 * 60 Minutos
 * 24 Horas
 * 30 Días
 */
process.env.EXPIRY_TOKEN = '48h';

// ============================
//  SEED de Autenticación
// ============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

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