const usuarios = require('../models/Usuarios');

exports.formCrearCuenta = async (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
    })
}

exports.crearCuenta = async (req, res) => {
    
    const { email, password } = req.body;

    usuarios.create({ email, password })
        .then(() => {
            res.redirect('/iniciar-sesion');
        });
}