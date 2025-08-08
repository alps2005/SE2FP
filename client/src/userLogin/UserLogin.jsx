import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "./userlogin.css"

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting to login with:', { email: formData.email });
      
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${API_URL}/api/users/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Login response:', response.data);

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Show success toast
      toast.success('¡Login exitoso!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to home page
      navigate('/');
      
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Error de conexión. Intente nuevamente.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || `Error ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No se puede conectar al servidor. Verifique que esté ejecutándose.';
      }
      
      // Show error toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="userLogin">
      <img src="/user_engine_logo.svg" alt="User Engine Logo" className="logo"/>
      <form className="addLoginForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="inputGroup">
          <button
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
          <Link to="/register" className="btn btn-outline-warning mt-3">Registrarse</Link>
        </div>
      </form>
    </div>
  )
}

export default UserLogin;