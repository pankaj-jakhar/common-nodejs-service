const { Sequelize } = require("sequelize");
const { POSTGRES_HOST, POSTGRES_PASS, POSTGRES_USER, POSTGRES_DATABASE } = require("../constants");

const sequelize = new Sequelize(
 POSTGRES_DATABASE,
 POSTGRES_USER,
 POSTGRES_PASS,
  {
    host: POSTGRES_HOST,
    dialect: 'postgres'
  }
);

sequelize.authenticate().then(() => {
   // eslint-disable-next-line no-console
   console.log('Connection has been established successfully.');
}).catch((error) => {
   // eslint-disable-next-line no-console
   console.error('Unable to connect to the database: ', error);
});

module.exports={sequelize}