// import db from "./models/index";
const db = require("./models/index");

db.sequelize.sync({ alter: true });