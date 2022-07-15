const { db } = require("../model");
const TASK = db.tasks;

module.exports = {
  createTask: async function ({ taskInput }, req) {
    console.log("????????????????????");
    console.log(taskInput);
    const task = taskInput.task;
    const priority = taskInput.priority;
    const timeToComplete = taskInput.timeToComplete;
    let priorityValue;
    priority == "high"
      ? (priorityValue = 1)
      : priority == "medium"
      ? (priorityValue = 2)
      : (priorityValue = 3);
    console.log("resolver se aya!");
    const response = await TASK.create({
      task,
      priority,
      timeToComplete,
      priorityValue,
    });
    return { ...response.dataValues };
  },
  deleteTask: async function ({ taskInput }, req) {
    const id = taskInput.id;
    const response = await TASK.destroy({
      where: {
        id,
      },
    });
    return {
      message: `Task with id ${id.toString()} deleted successfully`,
    };
  },
  updateTask: async function ({ taskInput }, req) {
    console.log("ddddddddddddddddddddddddd");
    const id = taskInput.id;
    const task = taskInput.task;
    const priority = taskInput.priority;
    const timeToComplete = taskInput.timeToComplete;
    let priorityValue;
    priority == "high"
      ? (priorityValue = 1)
      : priority == "medium"
      ? (priorityValue = 2)
      : (priorityValue = 3);
    const response = await TASK.update(
      {
        task,
        priority,
        timeToComplete,
        priorityValue,
      },
      {
        where: {
          id,
        },
      }
    );
    const getResponse = await TASK.findByPk(id);
    return { ...getResponse.dataValues };
  },
};
