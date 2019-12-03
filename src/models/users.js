const Sequelize = require('sequelize');
const seq = require('../seq');

const users = seq.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = users;
