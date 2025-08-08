import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./addUser.css";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const users = {
    name: "",
    email: "",
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
    
    // Check if any field is empty
    if (!user.name.trim() || !user.email.trim() || !user.stateId.trim() || !user.address.trim()) {
      toast.error("Todos los campos son obligatorios!", { position: "top-right" });
      return;
    }

    await axios.post("http://localhost:8000/api/users/createUsr", user).then((res)=>{
      toast.success(res.data.message, { position: "top-right" });
      navigate("/");
    }).catch((error)=>{
      console.log(error);
      toast.error("Error al crear usuario", { position: "top-right" });
    });
  }

    return (
        <div className="addUser">
          <h3>Agregar un nuevo usuario</h3>
          <form className="addUserForm" onSubmit={submitForm}>
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
                Submit
              </button>
            </div>
          </form>
          <Link to="/" type="button" class="btn btn-outline-warning mt-3"><i class="fa-solid fa-circle-arrow-left"></i> Regresar</Link>
        </div>
      );
};

export default AddUser;
