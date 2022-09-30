import React, { useState, useEffect } from "react";
import '../styles/Card.css'
import M from 'materialize-css';
import {Link} from 'react-router-dom'
function Card(props) {
    const[css, setCss] = useState('proposalCard')
    let status = props.status;
    let color = props.status == 'limbo' ? '#e57373' : props.status =='accepted'? '#43a047' : props.status == 'open' ? '#00897b' : props.status == 'denied' ? '#d32f2f' : null
    return (
        <>
        <Link to = {`/proposal`}>
        <div  className={`${css} waves-effect waves-teal`} onMouseEnter = {() => setCss("proposalCardHover")} onMouseLeave = {() => setCss("proposalCard")}>
            <p className="title">{props.title}</p>
            <p className="email">From: {props.email} </p>

            <div className="description">{props.description}
            
            </div>
            <div className="dateandstatus">
            Date Posted: {props.date}    <span className="newstatus" style={{color: `${color}`}}> &nbsp;&nbsp;&nbsp; {status.charAt(0).toUpperCase()+ status.slice(1)}</span>
            </div>
        </div>
        </Link>
        </>
    );
}

export default Card;