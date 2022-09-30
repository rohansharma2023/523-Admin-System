import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import M from 'materialize-css';
import Proposal from './components/Proposal'
const axios = require('axios').default;

function App() {

    const [proposalList, setProposalList] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3001/read").then((res)=>{
            console.log(res);
            setProposalList(res.data);
        });
    }, []);

    return (
        <div className="App">
            <Navbar/>
            {/* <div className="container">

            
            {proposalList.map((val, key)=>{
                return (
                    <div key = {key}>
                        <Card
                            title = {val.title} 
                            description = {val.description}
                            email = {val.email}
                            date = {val.date}
                            status = {val.status}
                        />
                    </div>
                );
            })}
            </div> */}
            <Proposal/>
        </div>
    );
}

export default App;
