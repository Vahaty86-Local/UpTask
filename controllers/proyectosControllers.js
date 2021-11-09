const Proyectos = require('../models/Proyectos');
const Tareas = require("../models/Tareas");

exports.proyectosHome = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}});

    res.render('index', {
        nombrePagina: 'Proyectos',
        usuario: res.locals.usuario.email,
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}});
    const proyecto = {}

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        usuario: res.locals.usuario.email,
        proyectos,
        proyecto
    });
}

exports.nuevoProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}});

    // Validar que tengamos algo en el input
    const { nombre } = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'});
    }

    //si hay errores
    if(errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            usuario: res.locals.usuario.email,
            proyectos,
            errores
        });
    } else {
        //Inserción en BD
        const proyecto = await Proyectos.create({ nombre, usuarioId });
        res.redirect('/');
    }
} 

exports.proyectoPorUrl = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: {usuarioId}});

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //Consultar tareas del proyecto
    const tareas = await Tareas.findAll({
        where : { proyectoId: proyecto.id }
    });

    if(!proyecto) {
        return next();
    } 
    
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        usuario: res.locals.usuario.email,
        proyectos,
        proyecto,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: {usuarioId}});

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render("nuevoProyecto", {
        nombrePagina: 'Editar Proyecto',
        usuario: res.locals.usuario.email,
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}});


    // Validar que tengamos algo en el input
    const { nombre } = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'});
    }

    //si hay errores
    if(errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            usuario: res.locals.usuario.email,
            proyectos,
            errores
        });
    } else {
        //Inserción en BD
        const proyecto = await Proyectos.update(
            { nombre: nombre },
            {where: { id: req.params.id }
        });
        res.redirect('/');
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: {url: urlProyecto}});

    if(!resultado) {
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente');
}