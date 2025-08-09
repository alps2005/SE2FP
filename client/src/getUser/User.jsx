import React, { useEffect, useState } from 'react'
import './user.css'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "@fontsource/jetbrains-mono";

const User = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const navigate = useNavigate();

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
        setFilteredUsers(res.data) // Initialize filtered users
      } catch (error) {
        console.log("Error al recuperar los datos.",error);
      }
    };
    fetchData();
  },[]);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.stateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);
  
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

  const handleSearch = (e) => {
    e.preventDefault();
    // Search filtering is handled in the useEffect above
  }

  return (
    <div className='userCard'>
      <div className="d-flex-co justify-content-between align-items-center mb-2">
        <h3>Dashboard</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque harum numquam placeat accusamus nesciunt laborum amet neque quos enim dolorum sequi, voluptas, earum soluta quaerat. Similique nihil accusamus totam facilis?</p>
      </div>

      <div className="container d-flex justify-content-center gap-3 mb-3">
        <Link to="/addNewUser" type="button" className="btn btn-outline-success btn">Registrar nuevo usuario <i className="fa-solid fa-user-plus"></i></Link>
        <button onClick={handleLogout} type="button" className="btn btnexit btn-outline-danger">Cerrar sesión <i className="fa-solid fa-sign-out-alt"></i></button>
      </div>
      
      <div className="container d-flex justify-content-center mb-4">
        <form onSubmit={handleSearch} className="custom-search-wrapper" role="search" aria-label="Buscar usuarios">
          <input 
            className="custom-search-input" 
            type="search" 
            placeholder="Buscar usuarios..." 
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="custom-search-btn" type="submit" aria-label="Buscar">
            <i className="fa-solid fa-search" aria-hidden="true"></i>
          </button>
        </form>
      </div>

      {filteredUsers.length === 0 && users.length > 0 ? (
        <div className='noData'>
          <h3>No se encontraron resultados</h3>
          <p>Intenta con otros términos de búsqueda</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className='noData'>
          <h3>No existen datos que mostrar</h3>
          <p>Registra un nuevo usuario</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
          {filteredUsers.map((user, index) => (
            <div key={user._id} className="col">
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}<br/>
                    <strong>Cédula:</strong> {user.stateId}<br/>
                    <strong>Dirección:</strong> {user.address}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>ID:</strong> {user._id}
                  </li>
                </ul>
                <div className="card-body">
                  <div className="d-flex gap-2">
                    <Link to={`/updateUser/${user._id}`} className="btn btn-outline-warning btn-sm"><i className="fa-solid fa-file-pen"></i> Editar</Link>
                    <button onClick={() => deleteUser(user._id)} className="btn btn-outline-danger btn-sm"><i className="fa-solid fa-trash-can"></i> Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default User
