const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('uptasknode', 'root', 'gaviota6', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 33060,
    define: {
        timestamps: false
    }
});

module.exports = sequelize;