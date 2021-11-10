const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuarios = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

// Función para comprobar si el usuario está logeado

exports.usuarioAutenticado = (req, res, next) => {
    //Si el usuario está autenticado, sino redirecciona a inicar sesión
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/iniciar-sesion');
    }
};

// Función para cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion'); 
    });
};

// Genera tokens si el usuario es válido
exports.enviarToken = async (req, res) => {
    const { email } = req.body;
    const respuestaUsuario = await Usuarios.findOne({where: { email }});

    // Si el usuario no exite
    if(!respuestaUsuario) {
        req.flash('error', `No existe la cuenta ${email}`);
        res.redirect('/reestablecer');
    }

    // Si existe el usuario
    respuestaUsuario.token = crypto.randomBytes(20).toString('hex');
    respuestaUsuario.expiracion = Date.now() + 3600000;

    await respuestaUsuario.save();

    // Url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${respuestaUsuario.token}`;

    // Enviar correo con el token
    await enviarEmail.enviar({
        usuario: respuestaUsuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reestablecer-password'
    });

    req.flash('correcto', 'Email enviado');
    res.redirect('/iniciar-sesion');
};

exports.validarToken = async (req, res) => {
    const respuestaUsuario = await Usuarios.findOne({where: { token: req.params.token}});

    // Si no hay usuario con ese token
    if(!respuestaUsuario){
        req.flash('error', 'No válido');
        res.redirect('/reestablecer');
    }

    // Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer Contraseña',
    });
};

exports.actualizarPassword = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    });

    //Verificar si el usuario existe
    if(!usuario) {
        req.flash('error', 'No válido');
        res.redirect('/reestablecer');
    }

    //hashear el password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    await usuario.save();

    req.flash('correcto', 'Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
}