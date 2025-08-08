import React, {useState} from 'react'
import "./adduser.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const users = {
    name: "",
    email: "",
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
    await axios.post("http://localhost:8000/api/createUsr", user).then((response)=>{toast.success(response.data.message, { position: "top-right" })

    navigate("/");

  }).catch((error)=>{
      console.log(error);
    })
  }

    return (
        <div className="addUser">
          <h3>Add New User</h3>
          <form className="addUserForm" onSubmit={submitForm}>
            <div className="inputGroup">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
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
                onChange={inputHandler}
                name="email"
                autoComplete="off"
                placeholder="Enter your Email"
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
                placeholder="Enter your Address"
              />
            </div>
            <div className="inputGroup">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <Link to="/" type="button" class="btn btn-secondary mt-2"><i class="fa-solid fa-circle-arrow-left"></i> Regresar</Link>
        </div>
      );
};

export default AddUser;
