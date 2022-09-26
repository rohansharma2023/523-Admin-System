import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from './components/Navbar';
const axios = require('axios').default;

function App() {

    const [proposalList, setProposalList] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3001/readProposal").then((res)=>{
            console.log(res);
            setProposalList(res.data);
        });
    }, []);

    return (
        <div className="App">
            <Navbar/>

            <h1>Proposal List</h1>
            {proposalList.map((val, key)=>{
                return (
                    <div key="key" className="food">
                        <h1>{val.title}</h1>
                        <h1>{val.description}</h1>
                        <h1>{val.email}</h1>
                        <h1>{val.date}</h1>
                        <h1>{val.status}</h1>
                        

                        <button >Update</button>
                        <button >Delete</button>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
