const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require("./task")(sequelize, Sequelize.DataTypes);
console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
console.log("🚀 ~ file: dbConnection.js ~ line 22 ~ db.tasks", db.tasks);
console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
db.sequelize.sync().then(() => {
  console.log("yes sync");
});

module.exports = { db };
