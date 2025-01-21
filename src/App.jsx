import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import CategorizePage from "./components/CategorizePage";
import { Provider } from "react-redux";
import store from "./redux/store";
import AddTaskPage from "./components/AddTaskPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/categorize",
    element: <CategorizePage />,
  },
  {
    path: "/add-task",
    element: <AddTaskPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className='min-h-screen bg-gray-100'>
        <nav className='bg-blue-600 text-white p-4'>
          <div className='container mx-auto flex justify-evenly'>
            <a href='/' className='text-lg font-semibold'>
              Home
            </a>
            <a href='/categorize' className='text-lg font-semibold'>
              Categorize
            </a>
          </div>
        </nav>
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
