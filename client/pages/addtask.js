import { useState } from "react";
import { dummyData } from "../public/data";

function AddTask() {
  const [taskName, setTaskName] = useState();
  const [timeToComplete, setTimeToComplete] = useState();
  const [priority, setPriority] = useState();

  let taskObject = {};
  function handleTaskName(e) {
    setTaskName(e.target.value);
  }

  function handleTimeToComplete(e) {
    setTimeToComplete(e.target.value);
  }

  function handlePriority(e) {
    setPriority(e.target.value);
  }

  function updateObject() {
    console.log("click hua");
    taskObject["taskName"] = taskName;
    taskObject["timeToComplete"] = timeToComplete;
    taskObject["priority"] = priority;
    console.log(taskObject);
    dummyData.push(taskObject);
    console.log(dummyData);
  }

  return (
    <>
      <input
        placeholder="taskName"
        onChange={(e) => {
          handleTaskName(e);
        }}
      />
      <input
        placeholder="timeToComplete"
        onChange={(e) => {
          handleTimeToComplete(e);
        }}
      />
      <input
        placeholder="priority"
        onChange={(e) => {
          handlePriority(e);
        }}
      />
      <button onClick={updateObject}>Submit</button>
    </>
  );
}

export default AddTask;
