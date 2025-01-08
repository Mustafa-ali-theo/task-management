import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, editTask } from "../redux/tasksSlice";

function HomePage() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "neutral",
    tag: "work",
    complete: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = () => {
    dispatch(addTask(newTask));
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "neutral",
      tag: "work",
      complete: false,
    });
  };

  const handleEditTask = () => {
    dispatch(editTask({ id: editTaskId, updatedTask: newTask }));
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "neutral",
      tag: "work",
      complete: false,
    });
    setEditMode(false);
    setEditTaskId(null);
  };

  const handleEditClick = (task) => {
    setEditMode(true);
    setEditTaskId(task.id);
    setNewTask({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
      tag: task.tag,
      complete: task.complete,
    });
  };

  return (
    <div className='container mx-auto p-4'>
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
          className='block w-full mb-2 p-2 border rounded'
          value={newTask.tag}
          onChange={(e) => setNewTask({ ...newTask, tag: e.target.value })}
        >
          <option value='work'>Work</option>
          <option value='personal'>Personal</option>
          <option value='house'>House</option>
          <option value='family'>Family</option>
        </select>
        {editMode ? (
          <button
            className='bg-yellow-500 text-white px-4 py-2 rounded'
            onClick={handleEditTask}
          >
            Save Changes
          </button>
        ) : (
          <button
            className='bg-blue-600 text-white px-4 py-2 rounded'
            onClick={handleAddTask}
          >
            Add Task
          </button>
        )}
      </div>

      <ul className='mt-4'>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded mb-2 flex justify-between items-center ${
              task.complete ? "bg-green-200" : "bg-gray-200"
            }`}
          >
            <div>
              <h2 className='text-lg font-semibold'>{task.title}</h2>
              <p>{task.description}</p>
              <p>Deadline: {task.deadline}</p>
              <p>Priority: {task.priority}</p>
              <p>Tag: {task.tag}</p>
              <p>Complete: {task.complete ? "Yes" : "No"}</p>
            </div>
            <div>
              <button
                className='bg-green-500 text-white px-4 py-2 rounded mr-2'
                onClick={() =>
                  dispatch(
                    editTask({
                      id: task.id,
                      updatedTask: { ...task, complete: !task.complete },
                    })
                  )
                }
              >
                complete
              </button>
              <button
                className='bg-yellow-500 text-white px-4 py-2 rounded mr-2'
                onClick={() => handleEditClick(task)}
              >
                Edit
              </button>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded'
                onClick={() => dispatch(deleteTask(task.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
