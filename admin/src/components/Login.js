import React, { useState, useEffect } from "react";
import '../styles/Login.css'
import M from 'materialize-css';
import {Link} from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

function Login(props) {
    
    return (
        <>
        <div className="container">
       <div className="loginPage"><p>Log In</p></div>
       <div className="input-field">
        <p>User Name</p>
       <input placeholder="Placeholder" id="first_name" type="text" class="validate"></input>

       </div>
       
       <div className="input-field">
       <p>Password</p>

       <input placeholder="Placeholder" id="first_name" type="text" class="validate"></input>

       </div>
       <div id="logInIcon" className="waves-effect"><FiLogIn/></div>
       </div>

        </>
    );
}

export default Login;