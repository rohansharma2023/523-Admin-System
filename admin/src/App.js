import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import M from 'materialize-css';
import Proposal from './components/Proposal'
import ProposalList from './components/ProposalList'
import { Routes, Route, Link } from "react-router-dom";


function App() {

    
    return (
        <div className="App">
            <Navbar/>

            <Routes>
        <Route path="/" element={<ProposalList />} />
        <Route path="proposal" element={<Proposal />} />
      </Routes>
            
            {/* <Proposal/> */}
        </div>
    );
}

export default App;
