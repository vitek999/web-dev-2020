const Sequelize = require('sequelize')

const sequelize = new Sequelize('regex', 'connector', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize