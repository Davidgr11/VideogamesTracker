//CÓDIGO PARA CONFIFURAR Y UTILIZAR FIREBASE
require('dotenv').config()//pide las credenciales con ruta

//declaraciones
const {initializeApp, applicationDefault} = require('firebase-admin/app');//inicias firebase
const {getFirestore } = require('firebase-admin/firestore')//llamamos a firestore

//funciones
initializeApp({//iniciamos la app con las credenciales default
    credential: applicationDefault(),
    
});


const db = getFirestore()

db.settings({ ignoreUndefinedProperties: true });

module.exports = {
    db
}