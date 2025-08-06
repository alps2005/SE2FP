import React from 'react'
import "./adduser.css";
import { Link } from 'react-router-dom';

const AddUser = () => {
    return (
        <div className="addUser">
          <h3>Add New User</h3>
          <form className="addUserForm" >
            <div className="inputGroup">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
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
