import "./App.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//Importing all actions from the reducer.
import { addTask, deleteTask, editTask, taskCompleted } from "../store/Tasks";

//This App component render a list of div with an input, edit button, complete button and a delete button.
function App() {
  //The useDispatch function is used update the state in our reducer.
  const dispatch = useDispatch();
  //The useSelector function is used to get the value of the state from our reducer.
  const taskList = useSelector((state) => state.tasks.value);

  const [newTask, setNewTask] = useState("");
  const [newContent, setNewContent] = useState("");

  //This function alert the user of empty field.
  const alertUser = () => {
    alert("The field is empty!");
  };

  return (
    // Add Task Section
    <div className="App">
      <div className="addTask">
        <input
          className="addTaskInput"
          value={newTask}
          type="text"
          placeholder="Add Task..."
          onChange={(event) => {
            setNewTask(event.target.value);
          }}
        />
        {/* This button add a new task in taskList inside the reducer. */}
        <button
          className="addTaskButton"
          onClick={() => {
            newTask === ""
              ? alertUser()
              : dispatch(
                  addTask({
                    id:
                      taskList.length === 0
                        ? 1
                        : taskList[taskList.length - 1].id + 1,
                    data: {
                      1: { content: newTask, completed: false },
                    },
                  })
                );
            setNewTask("");
          }}
        >
          Add task
        </button>
      </div>
      {/* Display task section where all tasks are rendered. */}
      <div className="displayTasks">
        {/* This map go trough the taskList inside the reducer and render every task inside the list */}
        {taskList.map((task, i) => {
          return task.data[1].completed !== true ? (
            <div key={i}>
              <h1> {task.data[1].content}</h1>
              <input
                className="input"
                value={newContent}
                type="text"
                placeholder="Edit Task..."
                onChange={(event) => {
                  setNewContent(event.target.value, i);
                }}
              />
              {/* This button is used to modify the key content in the reducer, assigning the content entered by the user
              in the input above.*/}
              <button
                className="button editButton"
                onClick={() => {
                  newContent === ""
                    ? alertUser()
                    : dispatch(editTask({ id: task.id, data: newContent }));
                  setNewContent("");
                }}
              >
                Edit Task
              </button>
              {/* This button is used to modify the key completed in the reducer, assigning true as value when cliked. */}
              <button
                className="button completeButton"
                onClick={() => {
                  dispatch(
                    taskCompleted({
                      id: task.id,
                      data: true,
                    })
                  );
                }}
              >
                Complete
              </button>
              {/* This button is used to delete the state in the reducer, when cliked. */}
              <button
                className="button deleteButton"
                onClick={() => {
                  dispatch(deleteTask({ id: task.id }));
                }}
              >
                X
              </button>
            </div>
          ) : (
            //Completed tasks section.
            <div className="completed" key={i}>
              <h1> {task.data[1].content}</h1>
              <button className="completedButton">Completed</button>
              <button
                className="completeDeleteButton"
                onClick={() => {
                  dispatch(deleteTask({ id: task.id }));
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
