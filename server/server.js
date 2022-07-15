const express = require("express");
const { db } = require("./model");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const app = express();
app.use(express.json());
const TASK = db.tasks;
const cors = require("cors");

app.use(cors());

const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

// app.post("/addData", async (req, res) => {
//   const { task, priority, timeToComplete } = req.body;
//   let priorityValue;
//   priority == "high"
//     ? (priorityValue = 1)
//     : priority == "medium"
//     ? (priorityValue = 2)
//     : (priorityValue = 3);
//   const response = await TASK.create({
//     task,
//     priority,
//     timeToComplete,
//     priorityValue,
//   });
//   return res.send(response);
// });

app.get("/getData", async (req, res) => {
  console.log("?????>>>>>>>>>>>");
  const response = await TASK.findAll();
  return res.send(response);
});

app.post("/deleteData", async (req, res) => {
  const { id } = req.body;
  const response = await TASK.destroy({
    where: {
      id,
    },
  });
});

app.post("/updateData", async (req, res) => {
  const { id, task, priority, timeToComplete } = req.body;
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
  const getResponse = await TASK.find({
    where: {
      id,
    },
  });
  console.log(getResponse);
  return res.send(getResponse);
});

app.listen(5000, () => {
  console.log("app running on port 5000");
});
