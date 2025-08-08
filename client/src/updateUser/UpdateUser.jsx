import React, {useEffect, useState} from 'react'
import "./updateUser.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {

  const users = {
    name: "",
    email: "",
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
    axios.get(`http://localhost:8000/api/getUsrById/${id}`).then((res)=>{
      setUser(res.data);
    }).catch((err)=>{
      console.log(err);
    });
  },[id]);


  const submitForm = async(e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/updateUsr/${id}`, user).then((response)=>{toast.success(response.data.message, { position: "top-right" })

    navigate("/");

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
                placeholder="Enter your Name"
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
                placeholder="Enter your Email"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="email">Correo electronico:</label>
              <input
                type="text"
                id="stateId"
                value={user.stateId}
                onChange={inputHandler}
                name="stateId"
                autoComplete="off"
                placeholder="Enter your Email"
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
                placeholder="Enter your Address"
              />
            </div>
            <div className="inputGroup">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
            <Link to="/" type="button" class="btn btn-outline-warning mt-3"><i class="fa-solid fa-circle-arrow-left"></i> Regresar</Link>
          </form>
        </div>
      );
};

export default UpdateUser;
