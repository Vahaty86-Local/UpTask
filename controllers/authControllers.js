const passport = require('passport');

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