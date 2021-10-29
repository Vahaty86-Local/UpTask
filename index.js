const express = require('express');
const routes = require('./routes');
const path = require ('path');
const bodyParser = require('body-parser');

// Crear una aplicación de express
const app = express();

// Donde cargar los archivos estáticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine', 'pug');

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);