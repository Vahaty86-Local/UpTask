const { Router } = require('express');
const express = require('express');
const routes = express.Router();

// Importar express validator
const { body } = require('express-validator');

//Importar controladores
const proyectosController = require('../controllers/proyectosControllers');
const tareasController = require('../controllers/tareasControllers');

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
    routes.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty()
            .trim()
            .escape(),
        proyectosController.actualizarProyecto)

    routes.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    routes.post('/proyectos/:url', tareasController.agregarTarea);

    routes.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    return routes;
}
