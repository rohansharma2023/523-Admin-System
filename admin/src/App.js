import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import M from 'materialize-css';
import Proposal from './components/Proposal'
import ProposalList from './components/ProposalList'
import { Routes, Route, Link } from "react-router-dom";
const axios = require('axios').default;

function App() {

    const [proposalList, setProposalList] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3001/read").then((res)=>{
            // console.log(res);
            setProposalList(res.data);
        });
    }, []);
    
    return (
        <div className="App">
            <Navbar/>

            <Routes>
        <Route path="/" element={<ProposalList proposalList = {proposalList}/>} />
        <Route path="proposal/:id" element={<Proposal proposalList = {proposalList}/>} />
        

      </Routes>
            
            {/* <Proposal/> */}
        </div>
    );
}

export default App;
