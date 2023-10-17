require("dotenv").config();
const { Sequelize } = require("sequelize");
const {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USER} = process.env
const Subscription = require("../db/models/subscription")
const connection = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "mysql",
  logging: false,
}); 



const modelDefiners = [
Subscription
]


for (const modelDefiner of modelDefiners) {
	modelDefiner(connection);
}
 
module.exports = connection

