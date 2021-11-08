const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');

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

    res.redirect(resetUrl);
};

exports.resetPassword = async (req, res) => {
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