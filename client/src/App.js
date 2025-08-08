import AddUser from './addUser/AddUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import User from './getUser/User';
import UpdateUser from './updateUser/UpdateUser';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/addNewUser",
      element: <AddUser />,
    },
    {
      path: "/updateUser/:id",
      element: <UpdateUser/>,
    },
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
