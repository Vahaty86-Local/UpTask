const { Router } = require('express');
const express = require('express');
const routes = express.Router();

// Importar express validator
const { body } = require('express-validator');

//Importar controladores
const proyectosController = require('../controllers/proyectosControllers');
const tareasController = require('../controllers/tareasControllers');
const usuariosController = require('../controllers/usuariosControllers');

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

    // Gestionar proyectos
    routes.delete('/proyectos/:url', proyectosController.eliminarProyecto);
    routes.post('/proyectos/:url', tareasController.agregarTarea);

    // Gestionar tareas
    routes.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
    routes.delete('/tareas/:id', tareasController.eliminarTarea);

    //Gestionar cuentas
    routes.get('/crear-cuenta', usuariosController.formCrearCuenta);
    routes.post('/crear-cuenta', usuariosController.crearCuenta);

    return routes;
}
