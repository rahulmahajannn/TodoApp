import { useState } from "react";
import axios from "axios";

function FormComponent(props) {
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

  async function updateObject() {
    const updateDb = await axios.post("http://localhost:5000/updateData", {
      id: props.itemId,
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
      updateDb
    );
  }
  return (
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
      <button onClick={updateObject}>Submit</button>
    </div>
  );
}

export default FormComponent;
