import AddUser from './addUser/AddUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import User from './getUser/User';
import UpdateUser from './updateUser/UpdateUser';
import UserLogin from './userLogin/UserLogin';
import UserSignin from './userSignin/UserSignin';

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
    {
      path: "/login",
      element: <UserLogin/>,
    },
    {
      path: "/register", // This should match the Link in UserLogin
      element: <UserSignin/>,
    },
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;