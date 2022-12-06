import React, { useState, useEffect } from "react";
import '../styles/Navbar.css'
import M from 'materialize-css';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Routes, Route, Link } from "react-router-dom";


function Navbar(props) {

    // function for logging out and cleaning the record in local storage
    const logout = () =>{
        if (window.confirm("Are you sure that you want to log out?")){
            localStorage.clear()
            let a =  props.change
            a()

        }
    }

    // function for choosing to display log in or log out in navbar depending on log in state
    const rendering = () =>{
        if (props.loggedIn){
            return <>
                <div  onClick = {() =>logout()}>
                <div className="iconsLogin"> <FiLogOut /></div>

                <div className="optionName">Log Out</div>
                </div>
            </>}
        else{
            return <>
                <div>
                <div className="iconsLogin"> <FiLogIn /></div>

                <div className="optionName">Log In</div>
                </div>
            </>
        }
    }

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

                    <Link to = {`${props.loggedIn ? '/' : '/login'}`}>

                <li  style={{position:'relative',left:"40px"}}>
                <div className="hover-underline-animation">
                {rendering()}
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