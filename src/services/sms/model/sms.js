const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../db')

const sms = sequelize.define('sms', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  otp: {
    type: DataTypes.STRING,
  },
  expires: {
    type: DataTypes.INTEGER, // seconds after that sms expires
  },
  message: {
    type: DataTypes.STRING,
  },
  provider_response: {
    type: DataTypes.JSON,
  },
  type: {
    type: DataTypes.INTEGER, // otp=0, sms=1
  },
  status: {
    type: DataTypes.INTEGER, // pending=0, success = 1, expired = 2
  },
  template_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'sms_templates',
      key: 'id',
    },
  },
})

module.exports = { sms }

sequelize
  .sync({ force: false })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('sms table created successfully!')
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error('Unable to create table : ', error)
  })
