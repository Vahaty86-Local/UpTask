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
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate(usuarioParam) {
            const { password } = usuarioParam;
            usuarioParam.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        }
    }
});

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;