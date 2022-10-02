import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import M from 'materialize-css';
import Proposal from './components/Proposal'
import Login from './components/Login'
import ProposalList from './components/ProposalList'
import { Routes, Route, Link } from "react-router-dom";
const axios = require('axios').default;
function App() {

    const [loggedIn, setLoggedIN] = useState(true)

    
    
        if(!loggedIn){
            return <Login/>
        }
        else{
            return(
        <div className="App">

<Navbar/>
            <Routes>

        <Route path="/" element={<ProposalList/>} />
        <Route path="proposal/:id" element={<Proposal />} />
        <Route path="proposal" element={<Proposal />} />




      </Routes>
            
            {/* <Proposal/> */}
        </div>
    );
}
}
export default App;
