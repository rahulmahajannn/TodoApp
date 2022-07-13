import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import FormComponent from "./FormComponent";

function TaskHolder(props) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const divStyle = {
    display: "flex",
    margin: "10px",
  };
  const pStyling = {
    margin: "0 5px",
    color:
      props.elem.priority == "high"
        ? "red"
        : props.elem.priority == "medium"
        ? "orange"
        : "green",
  };
  const taskDiv = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const buttonStyle = {
    margin: "5px",
    border: "none",
  };
  async function deleteItem(e) {
    // e.preventDefault();
    console.log(props.elem.id);
    const deleteItem = await axios.post("http://localhost:5000/deleteData", {
      id: props.elem.id,
    });
    console.log(
      "🚀 ~ file: taskHolder.js ~ line 32 ~ deleteItem ~ deleteItem",
      deleteItem
    );
    router.reload();
    // window
  }
  async function editItem() {
    setEdit(true);
  }
  return (
    <div style={taskDiv}>
      <div style={divStyle}>
        <p style={pStyling}>{props.elem.task}</p>
        <p style={pStyling}>{props.elem.timeToComplete}</p>
        <p style={pStyling}>{props.elem.priority}</p>
      </div>
      <div>
        <button style={buttonStyle} onClick={editItem} display={!edit}>
          edit
        </button>
        <button
          style={buttonStyle}
          onClick={(e) => deleteItem(e)}
          type="submit"
        >
          delete
        </button>
      </div>
      {edit && <FormComponent itemId={props.elem.id} />}
    </div>
  );
}

export default TaskHolder;
