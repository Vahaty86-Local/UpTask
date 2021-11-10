const usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = async (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
    });
}

exports.formIniciarSesion= async (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesión en UpTask',
        error
    });
}

exports.crearCuenta = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        await usuarios.create({ email, password });
        
        const usuario = {
            email
        };

        // Url de reset
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        // Enviar correo con el token
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta UpTask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });

        req.flash('correcto', 'Enviamos un correo, confirma tu cuenta');
        res.redirect('/iniciar-sesion');      
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta en UpTask',
            email,
            password
        }); 
    }
}

exports.formRestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Contraseña'
    });
};

exports.confirmarCuenta = async (req, res) => {

    const usuario = await usuarios.findOne({where: { email: req.params.email }});

    if(!usuario) {
        req.flash('error', 'Correo no válido');
        res.redirect('/crear-cuenta');
    }
    
    usuario.activo = 1;

    await usuario.save();

    req.flash('correcto', 'Cuenta activada correctamente');
    res.redirect('/iniciar-sesion')
}