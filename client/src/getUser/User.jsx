import React, { useEffect, useState } from 'react'
import './user.css'
import axios from 'axios'
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    const fetchData = async() =>{
      try {
        
        const res = await axios.get('http://localhost:8000/api/getAllUsrs');
        setUsers(res.data)

      } catch (error) {
        console.log("Error al recuperar los datos.",error);
      }
    };
    fetchData();
  },[]);//this is used to ensure the fetch runs only once.


  return (
    <div className='userTable'>
      <Link to="/add" type="button" class="btn btn-primary">Añadir usuario <i class="fa-solid fa-user-plus"></i></Link>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
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
                <td>{user.address}</td>
                <td><button type="button" class="btn btn-warning"><i class="fa-solid fa-file-pen"></i></button> | <button type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
      
    </div>
  )
};

export default User