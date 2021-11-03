const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');

exports.agregarTarea = async (req, res) => {
    const proyecto = await Proyectos.findOne({
        where: {url: req.params.url}
    });

    const {tarea} = req.body;
    const {id} = proyecto;
    const estado = 0;

    const resultado = await Tareas.create({tarea: tarea, estado: estado, proyectoId: id});

    if(!resultado) {
        return next();
    }

    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res) => {
    res.send('Everything ok');
}