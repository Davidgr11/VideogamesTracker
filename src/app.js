//CÓDIGO PARA QUE LA APP REQUIERA Y CONSULTE LO NECESARIO
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs.create({
    defaultLayout:'main',
    extname:'.hbs'
}).engine)
app.set('view engine', 'hbs');

app.use(morgan('dev'));//ver peticiones del navegador en consola
app.use(express.json());//necesario para que pueda enviarle datos a través de JSONS
app.use(express.urlencoded({ extended:false}));//que no exitenda el JSON
app.use(require('./routes/home'));//aqui guardamos todo lo que consultamos
app.use(express.static(path.join(__dirname,'public')));//cualquier aplicacion cliente puede solicitar los datos de esa carpeta

module.exports=app;//lo requieres en el index

