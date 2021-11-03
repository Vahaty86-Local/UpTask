const Proyectos = require('../models/Proyectos');
const Tareas = require("../models/Tareas");

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    const proyecto = {}

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos,
        proyecto
    });
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

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
            proyectos,
            errores
        });
    } else {
        //Inserción en BD
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
} 

exports.proyectoPorUrl = async (req, res, next) => {

    const proyectosPromise = Proyectos.findAll();

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
        proyectos,
        proyecto,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render("nuevoProyecto", {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    console.log(req.body.nombre);
    console.log(req.params.id);

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
    console.log(req.params);
    console.log(req.query);
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: {url: urlProyecto}});

    if(!resultado) {
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente');
}