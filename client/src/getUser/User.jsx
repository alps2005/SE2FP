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
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [sessionStartTime, setSessionStartTime] = useState(null)
  const [sessionDuration, setSessionDuration] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      
      // Get session start time from localStorage or set current time
      const sessionTime = localStorage.getItem('sessionStartTime');
      if (!sessionTime) {
        const now = new Date();
        localStorage.setItem('sessionStartTime', now.toISOString());
        setSessionStartTime(now);
      } else {
        setSessionStartTime(new Date(sessionTime));
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Update session duration every second
  useEffect(() => {
    if (!sessionStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - sessionStartTime;
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setSessionDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

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
  
  const searchUserById = async (id) => {
    setIsSearching(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/users/getUsrById/${id.trim()}`);
      setSelectedUser(response.data);
      setShowModal(true);
      setSearchTerm('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Usuario no encontrado', { position: "top-right" });
      } else {
        toast.error('Error al buscar usuario', { position: "top-right" });
      }
    } finally {
      setIsSearching(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const deleteUser = async(userId) => {
    // Check if user is trying to delete their own account
    if (currentUser && (currentUser._id === userId || currentUser.id === userId)) {
      toast.error('NO PUEDES ELIMINAR TUS PROPIOS DATOS EN UNA SESIÓN ACTIVA!', { 
        position: "top-right",
        duration: 4000 
      });
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/users/deleteUsr/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter(user => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error al eliminar usuario', { position: "top-right" });
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('sessionStartTime');
    toast.success('Sesión cerrada exitosamente', { position: "top-right" });
    navigate('/');
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      return;
    }

    // Check if the search term looks like an ID (MongoDB ObjectId format)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(searchTerm.trim());
    
    if (isObjectId) {
      // Search by ID
      await searchUserById(searchTerm);
    } else {
      // Regular text search is handled by useEffect
      // Just ensure the search is active
      if (searchTerm.trim() !== '') {
        const filtered = users.filter(user => 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.stateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    }
  }

  // Helper function to check if user is the current logged-in user
  const isCurrentUser = (userId) => {
    return currentUser && (currentUser._id === userId || currentUser.id === userId);
  }

  return (
    <div className='userCard'>
      <div className="d-flex-co justify-content-between align-items-center mb-2">
        <h3>Dashboard</h3>
        <p>          
        En esta pagina encontrar informacion relevante a los datos de los usuarios registrados. Utilize la interfaz para manipular usuarios en particular.<br />
          <strong>Dueño de la sesion actual:</strong> <text>{currentUser?.name || 'Cargando...'}</text> <br />
          <strong>Id:</strong> <text>{currentUser?._id || currentUser?.id || 'Cargando...'}</text><br />
          <strong>Tiempo:</strong> <text>{sessionDuration || '00:00:00'}</text>
        </p>
      </div>

      <div className="container d-flex justify-content-center gap-3 mb-3">
        <Link to="/addNewUser" type="button" className="btn btn-outline-success btn">Registrar nuevo usuario <i className="fa-solid fa-user-plus"></i></Link>
        <button onClick={handleLogout} type="button" className="btn btnexit btn-outline-danger">Cerrar sesión <i className="fa-solid fa-sign-out-alt"></i></button>
      </div>
      
      <div className="container d-flex justify-content-center mb-4">
        <form onSubmit={handleSearch} className="custom-search-wrapper" role="search" aria-label="Buscar usuarios por nombre, email, cédula, dirección o ID">
          <input 
            className="custom-search-input" 
            type="search" 
            placeholder="Buscar por nombre, email, cédula, dirección o ID..." 
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="custom-search-btn" type="submit" aria-label="Buscar" disabled={isSearching}>
            {isSearching ? (
              <i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
            ) : (
              <i className="fa-solid fa-search" aria-hidden="true"></i>
            )}
          </button>
        </form>
      </div>

      {/* User Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Información del Usuario</h5>
              <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {selectedUser.name}
                    {isCurrentUser(selectedUser._id) && (
                      <span className="badge bg-primary ms-2">Tu cuenta</span>
                    )}
                  </h5>
                  <p className="card-text">
                    <strong>Email:</strong> {selectedUser.email}<br/>
                    <strong>Cédula:</strong> {selectedUser.stateId}<br/>
                    <strong>Dirección:</strong> {selectedUser.address}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>ID:</strong> {selectedUser._id}
                  </li>
                </ul>
                <div className="card-body">
                  <div className="d-flex gap-2">
                    <Link to={`/updateUser/${selectedUser._id}`} className="btn btn-outline-warning btn-sm" onClick={closeModal}>
                      <i className="fa-solid fa-file-pen"></i> Editar
                    </Link>
                    <button 
                      onClick={() => {
                        deleteUser(selectedUser._id);
                        closeModal();
                      }} 
                      className={`btn btn-outline-danger btn-sm ${isCurrentUser(selectedUser._id) ? 'opacity-50' : ''}`}
                      title={isCurrentUser(selectedUser._id) ? 'No puedes eliminar tu propia cuenta durante una sesión activa' : 'Eliminar usuario'}
                    >
                      <i className="fa-solid fa-trash-can"></i> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div className={`card h-100 shadow ${isCurrentUser(user._id) ? 'border-primary' : ''}`}>
                <div className="card-body">
                  <h5 className="card-title">
                    {user.name}
                    {isCurrentUser(user._id) && (
                      <span className="badge bg-primary ms-2">Tu cuenta</span>
                    )}
                  </h5>
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
                    <Link to={`/updateUser/${user._id}`} className="btn btn-outline-warning btn-sm">
                      <i className="fa-solid fa-file-pen"></i> Editar
                    </Link>
                    <button 
                      onClick={() => deleteUser(user._id)} 
                      className={`btn btn-outline-danger btn-sm ${isCurrentUser(user._id) ? 'opacity-50' : ''}`}
                      title={isCurrentUser(user._id) ? 'No puedes eliminar tu propia cuenta durante una sesión activa' : 'Eliminar usuario'}
                    >
                      <i className="fa-solid fa-trash-can"></i> Eliminar
                    </button>
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