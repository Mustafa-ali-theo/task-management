import { useState } from "react";
import { useSelector } from "react-redux";

function CategorizePage() {
  const tasks = useSelector((state) => state.tasks);

  const [filterType, setFilterType] = useState("tag");
  const [filterValue, setFilterValue] = useState("");

  const getFilterOptions = () => {
    switch (filterType) {
      case "tag":
        return ["work", "personal", "house", "family"];
      case "priority":
        return ["very important", "important", "neutral", "not important"];
      case "complete":
        return ["true", "false"];
      case "deadline":
        return [...new Set(tasks.map((task) => task.deadline))].filter(Boolean);
      default:
        return [];
    }
  };

  const filterTasks = () => {
    switch (filterType) {
      case "tag":
        return tasks.filter((task) => task.tag === filterValue);
      case "priority":
        return tasks.filter((task) => task.priority === filterValue);
      case "deadline":
        return tasks.filter((task) => task.deadline === filterValue);
      case "complete":
        return tasks.filter(
          (task) => task.complete === (filterValue === "true")
        );
      default:
        return tasks;
    }
  };

  const filteredTasks = filterTasks();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Categorize Tasks</h1>

      <div className='bg-white p-4 rounded shadow mb-4'>
        <label className='block mb-2 font-semibold'>Filter By:</label>
        <select
          className='block w-full mb-2 p-2 border rounded'
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setFilterValue("");
          }}
        >
          <option value='tag'>Tag</option>
          <option value='priority'>Priority</option>
          <option value='deadline'>Deadline</option>
          <option value='complete'>Completion Status</option>
        </select>

        <label className='block mb-2 font-semibold'>Filter Value:</label>
        <select
          className='block w-full mb-2 p-2 border rounded'
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          {getFilterOptions().map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded mb-2 ${
              task.complete ? "bg-green-100" : "bg-gray-200"
            }`}
          >
            <h2 className='text-lg font-semibold'>{task.title}</h2>
            <p>Description: {task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Priority: {task.priority}</p>
            <p>Tag: {task.tag}</p>
            <p>Complete: {task.complete ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <p className='text-gray-600 mt-5 text-lg'>
          No tasks match the selected filter.
        </p>
      )}
    </div>
  );
}

export default CategorizePage;
