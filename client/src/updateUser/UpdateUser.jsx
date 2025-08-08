import React, {useEffect, useState} from 'react'
import "./updateUser.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {

  const users = {
    name: "",
    email: "",
    password: "",
    stateId: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const {name, value} = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };
  
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/users/getUsrById/${id}`).then((res)=>{
      setUser(res.data);
    }).catch((err)=>{
      console.log(err);
    });
  },[id]);


  const submitForm = async(e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/users/updateUsr/${id}`, user).then((response)=>{toast.success(response.data.message, { position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true, })

    navigate("/usersdisplay");

  }).catch((error)=>{
      console.log(error);
    })
  };

    return (
        <div className="updateUser">
          <form className="updateUserForm" onSubmit={submitForm}>
            <h3>Actualizar Usuario</h3>
            <div className="inputGroup">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                value={user.name}
                onChange={inputHandler}
                name="name"
                autoComplete="off"
                placeholder=""
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="email">Correo electronico:</label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={inputHandler}
                name="email"
                autoComplete="off"
                placeholder=""
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={inputHandler}
                name="password"
                autoComplete="off"
                placeholder=""
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="stateId">Cedula:</label>
              <input
                type="text"
                id="stateId"
                value={user.stateId}
                onChange={inputHandler}
                name="stateId"
                autoComplete="off"
                placeholder=""
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                id="address"
                value={user.address}
                onChange={inputHandler}
                name="address"
                autoComplete="off"
                placeholder=""
              />
            </div>
            <div className="inputGroup">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
            <Link to="/usersdisplay" type="button" class="btn btn-outline-warning mt-3"><i class="fa-solid fa-circle-arrow-left"></i> Regresar</Link>
          </form>
        </div>
      );
};

export default UpdateUser;
