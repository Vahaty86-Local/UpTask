const express = require('express');
const routes = require('./routes');
const path = require ('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
require('dotenv').config({path: 'variables.env'});

// Helpers con funciones
const helpers = require('./helpers')

// Crear conexion a BD
const db = require('./config/db');

// Importar modelos
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

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

// Agregar flash message
app.use(flash());

// Agrega cookies
app.use(cookieParser());

// Añadir sesión para navegar entre paginas sin autenticar
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Pasar var dump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
});

// Habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

app.use('/', routes());

// Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host);