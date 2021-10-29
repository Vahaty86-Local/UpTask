const { Router } = require('express');
const express = require('express');
const routes = express.Router();

//Importar el controlador
const proyectosController = require('../controllers/proyectosControllers');

module.exports = function() {
    // ruta para el home
    routes.get('/', proyectosController.proyectosHome);
    routes.get('/nuevo-proyecto', proyectosController.formularioProyecto)
    routes.post('/nuevo-proyecto', proyectosController.nuevoProyecto)

    return routes;
}
