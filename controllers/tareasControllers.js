const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');

exports.agregarTarea = async (req, res) => {
    const proyecto = await Proyectos.findOne({
        where: {url: req.params.url}
    });

    const { tarea } = req.body;
    const { id } = proyecto;
    const estado = 0;

    const resultado = await Tareas.create({tarea: tarea, estado: estado, proyectoId: id});

    if(!resultado) {
        return next();
    }

    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: {id} });
    let { estado } = tarea;

    const resultado = await Tareas.update(
        {estado: estado == 0 ? 1 : 0},
        {where: {id: id}});

    if(!resultado) {
        return next();
    }

    res.status(200).send('Tarea Actualizada Correctamente');
}

exports.eliminarTarea = async (req, res) => {
    const { idTarea } = req.query;
    
    const respuesta = await Tareas.destroy({where: {id: idTarea}});

    if(!respuesta) return next();
    
    res.status(200).send('Tarea Eliminada Correctamente');
}