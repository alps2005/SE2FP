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

    // Enhanced validation
    if (!formData.email.trim()) {
      toast.error("El correo electrónico es obligatorio!", { position: "top-right" });
      return;
    }

    if (!formData.password.trim()) {
      toast.error("La contraseña es obligatoria!", { position: "top-right" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Por favor ingrese un correo electrónico válido!", { position: "top-right" });
      return;
    }
    
    setLoading(true);

    try {
      console.log('Attempting to login with:', { email: formData.email });
      
      const response = await axios.post(`http://localhost:8000/api/users/login`, {
        email: formData.email.trim(),
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });

      console.log('Login response:', response.data);

      if (response.data.user) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Show success toast
        toast.success('¡Login exitoso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to home page
        navigate('/usersdisplay');
      } else {
        throw new Error('Respuesta del servidor inválida');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Error de conexión. Intente nuevamente.';
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        if (status === 401) {
          errorMessage = 'Credenciales inválidas. Verifique su correo y contraseña.';
        } else if (status === 400) {
          errorMessage = error.response.data?.message || 'Datos de entrada inválidos.';
        } else if (status === 500) {
          errorMessage = 'Error interno del servidor. Intente más tarde.';
        } else {
          errorMessage = error.response.data?.message || `Error ${status}`;
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Tiempo de espera agotado. Verifique su conexión.';
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No se puede conectar al servidor. Verifique que esté ejecutándose en el puerto 8000.';
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
        <div class="input-group mb-3">
            <span htmlFor="email" class="input-group-text" id="basic-addon1"><i class="fa-solid fa-envelope"/></span>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" placeholder="ejemplo@gmail.com" required class="form-control"/>
        </div>
        <div className="input-group mb-3">
        <span htmlFor="password" class="input-group-text" id="basic-addon1"><i class="fa-solid fa-key"></i></span>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} autoComplete="current-password" placeholder="" required class="form-control"
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
          <Link to="/userSignIn" className="btn btn-outline-success mt-3">Registrarse</Link>
        </div>
      </form>
    </div>
  )
}

export default UserLogin;