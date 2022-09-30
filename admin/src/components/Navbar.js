import React, { useState, useEffect } from "react";
import '../styles/Navbar.css'
import M from 'materialize-css';
import { FiLogOut } from 'react-icons/fi';
import { Routes, Route, Link } from "react-router-dom";


function Navbar(props) {

    return (
        <>
        <div className="container">
        <div className="navbar">
            <ul><Link to ='/'>
                <li > 
                <div className="hover-underline-animation">
    
                <div className="icons"><i className="material-icons">book</i></div>

                    <div className="optionName">Proposals</div>   
                    </div>  
                    </li>
                    </Link>

                    <Link to ='/login'>

                <li  style={{position:'relative',left:"40px"}}>
                <div className="hover-underline-animation">
                <div className="iconsLogin"> <FiLogOut /></div>

                <div className="optionName">Log Out</div>  
                </div>   
                </li>
                </Link>
            </ul>
        </div>
        </div>
        </>
    );
}

export default Navbar;