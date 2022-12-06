import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import M from 'materialize-css';
import Proposal from './components/Proposal'
import Error from "./components/Error";
import Login from './components/Login'
import ProposalList from './components/ProposalList'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
const axios = require('axios').default;

function App() {
    const navigate = useNavigate();
    const changeLoggedIn = () =>{
        alert(loggedIn? "Log out successful." : "Log in successful.")
        setLoggedIn (!loggedIn)
    }
    const [loggedIn, setLoggedIn] = useState(false)
    
    useEffect(()=>{
        // get logged in status from local storage and if logged in, set loggedIn to true
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser){
            setLoggedIn(true)
        }
    },[])

    return(
        <div className="App">
        <Navbar loggedIn = {loggedIn} change = {changeLoggedIn}/>
        <Routes>
            <Route path="/" element={loggedIn ? <ProposalList/> : <Error message = {"You need to log in to see all proposals."}/>} />
            <Route path="proposal/:id" element={ <Proposal loggedIn = {loggedIn}/>} />
            <Route path="proposal" element={<Error message = {"Please Provide the ID of the Desired Proposal."}/> } />
            <Route path="*" element={<Error message = {"This Page Does Not Exist."}/>} />
            <Route path="/login" element={<Login loggedIn = {loggedIn} change = {changeLoggedIn} />} />
        </Routes>
        </div>
    );
}

export default App;