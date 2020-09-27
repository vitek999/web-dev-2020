const Sequelize = require('sequelize')
const sequelize = require('./index')

const Model = Sequelize.Model
class User extends Model {}

User.init({
    id: {
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    }
    ,
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize
})

module.exports = User