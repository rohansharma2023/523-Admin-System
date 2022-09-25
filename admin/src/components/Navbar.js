import React, { useState, useEffect } from "react";
import '../styles/Navbar.css'
import M from 'materialize-css';
import { BiLogInCircle } from 'react-icons/bi';

function Navbar(props) {

    return (
        <div className="navbar">
            <ul>
                <li>          
                    <i class="material-icons">book</i>
                    <a href="#home">Proposals</a></li>
                <li>
                    <a href="#news">Login</a>
                    <BiLogInCircle />
                </li>
            </ul>
        </div>
    );
}

export default Navbar;