const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../db')

const s3 = sequelize.define('s3', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  key: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.INTEGER, // pending=0, success = 1
  },
})

module.exports = { s3 }

sequelize
  .sync({ force: false })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('s3 table created successfully!')
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error('Unable to create table : ', error)
  })
