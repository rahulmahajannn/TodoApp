const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Task {
        id: ID!
        task: String!,
        timeToComplete: String!,
        priority: String!,
        priorityValue: Int!
    }

    type TaskDeleteInfo {
        message: String!
    }

    input taskData {
        task: String!,
        timeToComplete: String!,
        priority: String!
    }

    input taskDeleteData {
        id: Int!
    }

    input taskUpdateData {
        task: String!,
        timeToComplete: String!,
        priority: String!,
        id: Int!
    }

    type RootQuery {
        hello: String!
    }

    type RootMutation {
        createTask(taskInput: taskData): Task! 
        deleteTask(taskInput: taskDeleteData): TaskDeleteInfo!
        updateTask(taskInput: taskUpdateData): Task!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
