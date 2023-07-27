const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../db')

const sms_template = sequelize.define('sms_templates', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
})

module.exports = { sms_template }

sequelize
  .sync({ force: false })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('sms_template table created successfully!')
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error('Unable to create table : ', error)
  })
