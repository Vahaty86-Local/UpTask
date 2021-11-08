const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un Correo Válido'
            },
            notEmpty: {
                msg: 'El Email no puede ir vacío'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario Ya Registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El Password no puede ir vacío'
            }
        }
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(usuarioParam) {
            const { password } = usuarioParam;
            usuarioParam.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        }
    }
});

Usuarios.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password); 
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;