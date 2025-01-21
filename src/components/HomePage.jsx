import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask } from "../redux/tasksSlice";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editingTask, setEditingTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "neutral",
    tag: "work",
    complete: false,
  });

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setUpdatedTask(task);
  };

  const saveEdit = () => {
    dispatch(editTask({ id: editingTask, updatedTask }));
    setEditingTask(null);
    alert("Task updated successfully!");
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className='container mx-auto p-4 relative'>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded mb-2 ${
              task.complete ? "bg-green-100" : "bg-gray-200"
            }`}
          >
            {editingTask === task.id ? (
              <div className='bg-white p-4 rounded shadow'>
                <input
                  type='text'
                  value={updatedTask.title}
                  className='block w-full mb-2 p-2 border rounded'
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, title: e.target.value })
                  }
                />
                <textarea
                  value={updatedTask.description}
                  className='block w-full mb-2 p-2 border rounded'
                  onChange={(e) =>
                    setUpdatedTask({
                      ...updatedTask,
                      description: e.target.value,
                    })
                  }
                ></textarea>
                <input
                  type='date'
                  value={updatedTask.deadline}
                  className='block w-full mb-2 p-2 border rounded'
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, deadline: e.target.value })
                  }
                />
                <select
                  value={updatedTask.priority}
                  className='block w-full mb-2 p-2 border rounded'
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, priority: e.target.value })
                  }
                >
                  <option value='very important'>Very Important</option>
                  <option value='important'>Important</option>
                  <option value='neutral'>Neutral</option>
                  <option value='not important'>Not Important</option>
                </select>
                <select
                  value={updatedTask.tag}
                  className='block w-full mb-4 p-2 border rounded'
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, tag: e.target.value })
                  }
                >
                  <option value='work'>Work</option>
                  <option value='personal'>Personal</option>
                  <option value='house'>House</option>
                  <option value='family'>Family</option>
                </select>
                <div className='flex gap-2'>
                  <button
                    className='bg-green-500 text-white px-4 py-2 rounded'
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                  <button
                    className='bg-gray-500 text-white px-4 py-2 rounded'
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className='text-lg font-semibold'>{task.title}</h2>
                <p>Description: {task.description}</p>
                <p>Deadline: {task.deadline}</p>
                <p>Priority: {task.priority}</p>
                <p>Tag: {task.tag}</p>
                <p>Complete: {task.complete ? "Yes" : "No"}</p>
                <div className='flex gap-2 mt-2'>
                  <button
                    className='bg-green-500 text-white px-4 py-2 rounded'
                    onClick={() =>
                      dispatch(
                        editTask({
                          id: task.id,
                          updatedTask: { ...task, complete: !task.complete },
                        })
                      )
                    }
                  >
                    {task.complete ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button
                    className='bg-yellow-500 text-white px-4 py-2 rounded'
                    onClick={() => handleEdit(task)}
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
              </div>
            )}
          </li>
        ))}
      </ul>

      <button
        className='bg-blue-600 text-white w-16 h-16 rounded-full fixed bottom-4 right-4 shadow-lg flex items-center justify-center text-xl'
        onClick={() => navigate("/add-task")}
      >
        +
      </button>
    </div>
  );
}

export default HomePage;
