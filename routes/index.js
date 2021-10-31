const { Router } = require('express');
const express = require('express');
const routes = express.Router();

// Importar express validator
const { body } = require('express-validator');

//Importar el controlador
const proyectosController = require('../controllers/proyectosControllers');

module.exports = function() {
    // ruta para el home
    routes.get('/', proyectosController.proyectosHome);
    routes.get('/nuevo-proyecto', proyectosController.formularioProyecto)
    routes.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty()
            .trim()
            .escape(),
        proyectosController.nuevoProyecto)
    
    // Listar proyecto
    routes.get('/proyectos/:url', proyectosController.proyectoPorUrl)

    // Actualizar el proyecto
    routes.get('/proyecto/editar/:id', proyectosController.formularioEditar)

    return routes;
}
