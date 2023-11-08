const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config.js");


const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: "mysql",
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

async function connection() {
  try {
    await sequelize.authenticate();
    console.log("Connected");
  } catch (error) {
    console.error("Error can't connect", error);
  }
}
connection();
module.exports = sequelize;
  