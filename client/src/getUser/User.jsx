import React, { useEffect, useState } from 'react'
import './user.css'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "@fontsource/jetbrains-mono";

const User = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        
        const res = await axios.get('http://localhost:8000/api/users/getAllUsrs');
        setUsers(res.data)

      } catch (error) {
        console.log("Error al recuperar los datos.",error);
      }
    };
    fetchData();
  },[]);//this is used to ensure the fetch runs only once.
  
  const deleteUser = async(userId) => {
    await axios
      .delete(`http://localhost:8000/api/users/deleteUsr/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter(user => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Sesión cerrada exitosamente', { position: "top-right" });
    navigate('/');
  }

  return (
    <div className='userTable'>
      <div><h3>Dashboard</h3></div>
      <div class="container d-flex justify-content-center gap-3">
        <Link to="/addNewUser" type="button" class="btn btn-success">Resgistrar nuevo usuario <i class="fa-solid fa-user-plus"></i></Link>
        <button onClick={handleLogout} type="button" class="btn btnexit btn-outline-danger">Cerrar sesion <i class="fa-solid fa-sign-out-alt"></i></button>
      </div>
      
      {users.length === 0?(
        <div className='noData'>
          <h3>No existen datos que mostrar</h3>
          <p>Resgistra un nuevo usuario</p>
        </div>
      ):(<table className='table table-bordered'>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Cédula</th>
            <th scope="col">Dirección</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index)=>{
            return (
              <tr>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.stateId}</td>
                <td>{user.address}</td>
                <td>
                  <Link to={`/updateUser/${user._id}`} type="button" class="btn mb-4 btn-outline-warning">
                    <i class="fa-solid fa-file-pen"></i>
                  </Link> <Link type="button" onClick={()=>deleteUser(user._id)} class="btn mb-4 btn-outline-danger">
                    <i class="fa-solid fa-trash-can"></i>
                  </Link>
                </td>
              </tr>
            )
          })}
          
        </tbody>
      </table>)}
    </div>
  )
};

export default User