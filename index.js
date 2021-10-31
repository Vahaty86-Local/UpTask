const express = require('express');
const routes = require('./routes');
const path = require ('path');
const bodyParser = require('body-parser');

// Helpers con funciones
const helpers = require('./helpers')

// Crear conexion a BD
const db = require('./config/db');

// Importar modelos
require('./models/Proyectos');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.error(error));

// Crear una aplicación de express
const app = express();

// Donde cargar los archivos estáticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine', 'pug');

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Pasar var dump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();

});

// Habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);