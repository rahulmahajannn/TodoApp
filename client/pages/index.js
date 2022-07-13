import { useEffect, useState } from "react";
import TaskHolder from "../public/components/taskHolder";
import axios from "axios";

function HomePage() {
  const taskTable = {
    height: "50px",
    width: "max-content",
  };

  const mainDiv = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const inputStyle = {
    margin: "5px",
  };

  const [timeToComplete, setTimeToComplete] = useState();
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState();
  const [array, setArray] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  function handleTaskName(e) {
    setTask(e.target.value);
  }

  function handleTimeToComplete(e) {
    setTimeToComplete(e.target.value);
  }

  function handlePriority(e) {
    setPriority(e.target.value);
  }

  async function addObject() {
    const addDataToDb = await axios.post("http://localhost:5000/addData", {
      task,
      timeToComplete,
      priority,
    });
    setButtonClicked(!buttonClicked);
    setTask("");
    setPriority("select priority");
    setTimeToComplete("");
    console.log(
      "🚀 ~ file: index.js ~ line 46 ~ updateObject ~ addDataToDb",
      addDataToDb
    );
  }

  function sortTasks(e) {
    const sortMethod = e.target.value;
    array.sort((a, b) =>
      a.priorityValue > b.priorityValue
        ? -1 * sortMethod
        : b.priorityValue > a.priorityValue
        ? 1 * sortMethod
        : 0
    );
    console.log(array);
    setArray([...array]);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get("http://localhost:5000/getData");
      console.log(data.data);
      setArray([...data.data]);
    }
    fetchData();
  }, [buttonClicked]);

  return (
    <div style={mainDiv}>
      <h1>TODO List</h1>
      <div>
        <input
          placeholder="taskName"
          style={inputStyle}
          onChange={(e) => {
            handleTaskName(e);
          }}
          value={task}
        />
        <input
          placeholder="timeToComplete"
          style={inputStyle}
          onChange={(e) => {
            handleTimeToComplete(e);
          }}
          value={timeToComplete}
        />
        <select style={inputStyle} onChange={(e) => handlePriority(e)}>
          <option disabled selected value>
            select priority
          </option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button onClick={addObject}>Submit</button>
      </div>
      <div>
        <select onChange={(e) => sortTasks(e)}>
          <option disabled selected value>
            select to sort
          </option>
          <option value={1}>low to high</option>
          <option value={-1}>high to low</option>
        </select>
      </div>
      <div style={taskTable}>
        {array.length == 0 ? (
          <h1>Please add the tasks</h1>
        ) : (
          array.map((elem, ind) => {
            return <TaskHolder elem={elem} count={ind} key={ind} />;
          })
        )}
      </div>
    </div>
  );
}

export default HomePage;
