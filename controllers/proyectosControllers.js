const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
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

    if(!proyecto) {
        return next();
    } 
    
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyectos,
        proyecto
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