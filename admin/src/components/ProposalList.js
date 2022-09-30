import React, { useState, useEffect } from "react";
import M from 'materialize-css';
import Card from './Card.js'
import '../styles/ProposalList.css'

function ProposalList(props) {
    const axios = require('axios').default;

    const [proposalList, setProposalList] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3001/read").then((res)=>{
            console.log(res);
            setProposalList(res.data);
        });
    }, []);
return(
    <>
    <div className="container">
    <p className="bigTitle">Proposals</p>
    <div className="divider"></div>

            
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
            </div></>)
}

export default ProposalList;