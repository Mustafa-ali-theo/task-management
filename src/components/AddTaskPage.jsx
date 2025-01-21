import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import { useNavigate } from "react-router-dom";

function AddTaskPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "neutral",
    tag: "work",
    complete: false,
  });

  const handleAddTask = () => {
    if (newTask.title.trim() === "") {
      alert("Title is required!");
      return;
    }
    dispatch(addTask(newTask));
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "neutral",
      tag: "work",
      complete: false,
    });
    alert("Task added successfully!");
    navigate("/");
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Add New Task</h1>
      <div className='bg-white p-4 rounded shadow'>
        <input
          type='text'
          placeholder='Title'
          className='block w-full mb-2 p-2 border rounded'
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder='Description'
          className='block w-full mb-2 p-2 border rounded'
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        ></textarea>
        <input
          type='date'
          className='block w-full mb-2 p-2 border rounded'
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <select
          className='block w-full mb-2 p-2 border rounded'
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value='very important'>Very Important</option>
          <option value='important'>Important</option>
          <option value='neutral'>Neutral</option>
          <option value='not important'>Not Important</option>
        </select>
        <select
          className='block w-full mb-4 p-2 border rounded'
          value={newTask.tag}
          onChange={(e) => setNewTask({ ...newTask, tag: e.target.value })}
        >
          <option value='work'>Work</option>
          <option value='personal'>Personal</option>
          <option value='house'>House</option>
          <option value='family'>Family</option>
        </select>
        <button
          className='bg-blue-600 text-white px-4 py-2 rounded w-full'
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default AddTaskPage;
