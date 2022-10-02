import React, { useState, useEffect } from "react";
import '../styles/Login.css'
import M from 'materialize-css';
import {Link} from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';

function Login(props) {
    
    return (
        <>
        <div className="container" style = {{position:'relative', top:'85px'}}>
            <MdAccountCircle style = {{fontSize:'50px',position:'relative', top:'-10px'}}/>
       <h5 className="loginPage" style = {{fontWeight :'bold',position:'relative',position:'relative', top:'-10px'}}>Login</h5>
       <div className="input-field">
        <p style = {{fontWeight:'bold', textAlign :'left', position:'relative', top:'10px'}}>Username</p>
       <input id="user name" type="text" ></input>

       </div>
       
       <div className="input-field">
       <p style = {{fontWeight:'bold', textAlign :'left', position:'relative', top:'10px'}}>Password</p>

       <input id="password" type="text" ></input>

       </div>
       <div   className={`options waves-effect`} style = {{ position:'relative', top:'40px'}}>
       <FiLogIn style={{fontSize:'20px', position:'relative', top:'19px',left:'-1.5px'}}/>
       </div>
        </div>
        </>
    );
}

export default Login;