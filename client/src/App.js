import AddUser from './addUser/AddUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import User from './getUser/User';

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<User />,
    },
    {
      path:"/add",
      element: <AddUser />,

    },
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
