const app = require('./app')
//const functions = require("firebase-functions");
//const logger = require("firebase-functions/logger");

const port = process.env.PORT || 4000;

app.listen(port);
//console.log('Server is running on port 4000');
//exports.api = functions.https.onRequest(app)