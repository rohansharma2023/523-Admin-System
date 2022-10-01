import React, { useState, useEffect } from "react";
import '../styles/Card.css'
import M from 'materialize-css';
import {Link} from 'react-router-dom'
function Card(props) {
    const[css, setCss] = useState('proposalCard')
    let status = props.value.status;
    let color = props.value.status == 'limbo' ? '#e57373' : props.value.status =='accepted'? '#43a047' : props.value.status == 'open' ? '#00897b' : props.value.status == 'denied' ? '#d32f2f' : null
    return (
        <>
        <Link to = {`/proposal/${props.value._id}`} >
        <div  className={`${css} waves-effect waves-teal`} onMouseEnter = {() => setCss("proposalCardHover")} onMouseLeave = {() => setCss("proposalCard")}>
            <p className="title">{props.value.title}</p>
            <p className="email">From: {props.value.email} </p>

            <div className="description">{props.value.description} 
            
            </div>
            <div className="dateandstatus">
            Date Posted: {props.value.date}    <span className="newstatus" style={{color: `${color}`}}> &nbsp;&nbsp;&nbsp; {status.charAt(0).toUpperCase()+ status.slice(1)}</span>
            </div>

        </div>
        </Link>
        </>
    );
}

export default Card;