import React, { useState, useEffect } from "react";
import M from 'materialize-css';
import Card from './Card.js'
import '../styles/ProposalList.css'

function ProposalList(props) {
    
return(
    <>
    <div className="container">
    <p className="bigTitle">Proposals</p>
    <div className="divider"></div>

            
            {props.proposalList.map((val, key)=>{
                return (
                    <div key = {key}>
                        <Card
                        value = {val} 
                            // id = {val._id}
                            // title = {val.title} 
                            // description = {val.description}
                            // email = {val.email}
                            // date = {val.date}
                            // status = {val.status}
                        />
                    </div>
                );
            })}
            </div></>)
}

export default ProposalList;