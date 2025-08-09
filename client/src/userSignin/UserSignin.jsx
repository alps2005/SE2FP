import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./userSignin.css";
import axios from "axios";
import toast from "react-hot-toast";

const UserSignin = () => {
  const users = {
    name: "",
    email: "",
    password: "",
    stateId: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    
    const {name, value} = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });

  }

  const submitForm = async(e) => {
    e.preventDefault();
    
    if (!user.name.trim() || !user.email.trim() || !user.stateId.trim() || !user.address.trim()) {
      toast.error("Todos los campos son obligatorios!", { position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, });
      return;
    }

    await axios.post("http://localhost:8000/api/users/createUsr", user).then((res)=>{
      toast.success(res.data.message, { position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, });
      navigate('/');
    }).catch((error)=>{
      console.log(error);
      toast.error("Esta direccion de correo ya esta en uso", { position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, });
    });
  }

    return (
        <div className="userSignIn">
          <h3>Ingresa los siguientes datos</h3>
          <form className="userSignInForn" onSubmit={submitForm}>
            <div className="inputGroup">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                onChange={inputHandler}
                name="name"
                autoComplete="off"
                placeholder="Ingresar nombre completo"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="email">Correo electronico:</label>
              <input
                type="email"
                id="email"
                onChange={inputHandler}
                name="email"
                autoComplete="off"
                placeholder="nombre@ejemplo.com"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                onChange={inputHandler}
                name="password"
                autoComplete="off"
                placeholder="tucontraseñasegura123"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="address">Cedula:</label>
              <input
                type="text"
                id="stateId"
                onChange={inputHandler}
                name="stateId"
                autoComplete="off"
                placeholder="xxxxxxx987"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                id="address"
                onChange={inputHandler}
                name="address"
                autoComplete="off"
                placeholder="Calle X, Ecuador"
              />
            </div>
            <div className="inputGroup">
              <button type="submit" class="btn btn-primary">
                Resgistrarse
              </button>
            </div>
          </form>
          <Link to="/" type="button" class="btn btn-outline-danger mt-3"><i class="fa-solid fa-circle-arrow-left"></i> Regresar</Link>
        </div>
      );
};

export default UserSignin;
