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
      navigate("/usersdisplay");
    }).catch((error)=>{
      console.log(error);
      toast.error("Error al crear usuario", { position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, });
    });
  }

    return (
        <div className="addUser">
          <h3>Agregar un nuevo usuario</h3>
          <form className="addUserForm" onSubmit={submitForm}>
            <div className="input-group mt-4 mb-3">
              <span htmlFor="name" class="input-group-text" id="basic-addon1"><i class="fa-solid fa-at"/></span>
              <input type="text" id="name" onChange={inputHandler} name="name" autoComplete="off" placeholder="Ingresar nombre completo" class="form-control"/>
            </div>
            <div className="input-group mb-3">
              <span htmlFor="email" class="input-group-text" id="basic-addon1"><i class="fa-solid fa-envelope"/></span>
              <input type="email" id="email" onChange={inputHandler} name="email" autoComplete="off" placeholder="nombre@ejemplo.com" class="form-control"/>
            </div>
            <div className="input-group mb-3">
              <span htmlFor="password" class="input-group-text" id="basic-addon1"><i class="fa-solid fa-lock"/></span>
              <input type="password" id="password" onChange={inputHandler} name="password" autoComplete="off" placeholder="tucontraseñasegura123" class="form-control"/>
            </div>
            <div className="input-group mb-3">
              <span htmlFor="text" class="input-group-text" id="basic-addon1"><i class="fa-solid fa-id-card"/></span>
              <input type="text" id="stateId" onChange={inputHandler} name="stateId" autoComplete="off" placeholder="no. de cedula" class="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span htmlFor="text" class="input-group-text" id="basic-addon1"><i class="fa-solid fa-map-location-dot"/></span>
              <input type="text" id="address" onChange={inputHandler} name="address" autoComplete="off" placeholder="Calle X, Ecuador" class="form-control"/>
            </div>
            <div className="inputGroup">
              <button type="submit" class="btn btn-success mt-2">Agregar</button>
            </div>
          </form>
          <Link to="/usersdisplay" type="button" class="btn btn-outline-danger mt-3"><i class="fa-solid fa-circle-arrow-left"></i> Regresar</Link>
        </div>
      );
};

export default AddUser;
