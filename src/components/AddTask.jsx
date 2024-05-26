import React, { useState } from "react";
import { addNewTask } from "../helpers/database";

function AddTask() {
  const [input, setInput] = useState({ task: "", difficulty: "easy" });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let { task, difficulty } = input;

    addNewTask(task, difficulty, setInput);
  };

  return (
    <div className="task-form">
      <div className="form-input">
        <form onSubmit={handleSubmit}>
          <input
            name="task"
            placeholder="Input task"
            type="text"
            onChange={handleChange}
            value={input.task}
            required
          />
          <label htmlFor="task" className="label-name">
            <span className="content-name">Task</span>
          </label>
          <br />
          <select
            name="difficulty"
            id="difficulty"
            onChange={handleChange}
            value={input.difficulty}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label htmlFor="difficulty" className="label-name">
            <span className="content-name">Difficulty</span>
          </label>
          <div className="btn">
            <button title="submit" aria-label="submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
