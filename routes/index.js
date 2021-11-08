const { Router } = require('express');
const express = require('express');
const routes = express.Router();

// Importar express validator
const { body } = require('express-validator');

//Importar controladores
const proyectosController = require('../controllers/proyectosControllers');
const tareasController = require('../controllers/tareasControllers');
const usuariosController = require('../controllers/usuariosControllers');
const authController = require('../controllers/authControllers');

module.exports = function() {
    // --------- Ruta para el home ---------
    routes.get('/', 
        authController.usuarioAutenticado,
        proyectosController.proyectosHome
    );
    
    // --------- Gestión Nuevo proyecto ---------
    routes.get('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto
    );

    routes.post('/nuevo-proyecto',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    
    // --------- Listar proyecto ---------
    routes.get('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl
    );

    // --------- Actualizar el proyecto ---------
    routes.get('/proyecto/editar/:id', 
        authController.usuarioAutenticado,
        proyectosController.formularioEditar
    );

    routes.post('/nuevo-proyecto/:id', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    // --------- Gestionar proyectos ---------
    routes.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto
    );
    
    routes.post('/proyectos/:url', 
        authController.usuarioAutenticado,
        tareasController.agregarTarea
    );

    // --------- Gestionar tareas ---------
    routes.patch('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
    );

    routes.delete('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    // --------- Gestionar cuentas ---------
    routes.get('/crear-cuenta', usuariosController.formCrearCuenta);
    routes.post('/crear-cuenta', usuariosController.crearCuenta);

    // --------- Iniciar sesión ---------
    routes.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    routes.post('/iniciar-sesion', authController.autenticarUsuarios);

    // --------- Cerrar sesión ---------
    routes.get('/cerrar-sesion', authController.cerrarSesion);

    // --------- Restablecer contraseña  ---------
    routes.get('/reestablecer', usuariosController.formRestablecerPassword);
    routes.post('/reestablecer', authController.enviarToken);
    routes.get('/reestablecer/:token', authController.resetPassword);

    return routes;
}
