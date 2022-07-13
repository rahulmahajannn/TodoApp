module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("tasks", {
    task: DataTypes.STRING,
    priority: DataTypes.STRING,
    priorityValue: DataTypes.INTEGER,
    timeToComplete: DataTypes.STRING,
  });
  return Task;
};
