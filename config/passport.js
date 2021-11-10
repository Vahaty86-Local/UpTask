const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

//Referencia al modelo de autenticacion
const Usuarios = require('../models/Usuarios');

// Local strategy - Login con credenciales propias (usuario y password)
passport.use(
    new localStrategy(
        //Por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({where : { email, activo: 1 }})

                //El usuario existe, se verifica la password
                if(!usuario.verificarPassword(password)){
                    return done(null, null, {
                        message: 'Password Incorrecta'
                    });
                }

                // El email existe y el password es correcto
                return done(null, usuario);
            } catch (error) {
                // Ese usuario no existe
                return done(null, null, {
                    message: 'Esa cuenta no existe'
                });
            }
        }
    )
);

//serializar el usuario 
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;
