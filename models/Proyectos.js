const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortId = require('shortid');

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100)
}, {
    hooks: {
        beforeCreate(proyectoParam) {
            const url = slug(proyectoParam.nombre).toLowerCase();
            
            proyectoParam.url = `${url}-${shortId.generate()}`;
        }
    }
});

module.exports = Proyectos;