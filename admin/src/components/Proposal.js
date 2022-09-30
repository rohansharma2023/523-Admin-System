import React, { useState, useEffect } from "react";
import '../styles/Proposal.css'
import M from 'materialize-css';
import { BiCheck } from 'react-icons/bi';
import { BiGhost } from 'react-icons/bi';

function Proposal(props) {
    // const[css, setCss] = useState('proposalCard')
    let status = props.status;
    let approveBut;
    let denyBut;
    let limboBut;


    const[cssApprove, setCssApprove] = useState('disappearApprove')
    const[cssDeny, setcssDeny] = useState('disappearDeny')

    const[cssLimbo, setcssLimbo] = useState('disappearLimbo')

    // let color = props.status == 'limbo' ? '#e57373' : props.status =='accepted'? '#43a047' : props.status == 'open' ? '#00897b' : props.status == 'denied' ? '#d32f2f' : null
    return (
        <>
        <div className="buttons">
            <div style={{display:"inline-block"}}>
                <div className={`${cssApprove}`}>
                <div className="buttonText"><p style={{fontWeight:'300', position:'relative',top:'2px'}}>Accept</p></div>
                <div id="triangle-down"></div>
                </div>
        <div  className={`options  waves-effect waves-green`} onMouseOver={() => setCssApprove('showApprove')} onMouseLeave = {()=>setCssApprove('disappearApprove') } >
        <i className=" material-icons check">check </i>
        </div>
        </div>
        <div style={{display:"inline-block"}}>
        <div className={`${cssDeny}`}>

            <div className="buttonText"><p style={{fontWeight:'300', position:'relative',top:'2px'}}>Deny</p></div>
            <div id="triangle-down"></div>
</div>
        <div className={`options  waves-effect waves-red`} onMouseOver={() => setcssDeny('showDeny')} onMouseLeave = {()=>setcssDeny('disappearDeny')} >
        <i className="material-icons close">close </i>
        </div>
    </div>
    <div style={{display:"inline-block"}}>
    <div className={`${cssLimbo}`}>

        <div className="buttonText"><p style={{fontWeight:'300', position:'relative',top:'2px'}}>Limbo</p></div>
        <div id="triangle-down"></div>
        </div>

    <div className={`options  waves-effect waves-red`}onMouseOver={() => setcssLimbo('showLimbo')} onMouseLeave = {()=>setcssLimbo('disappearLimbo')}  >
    <BiGhost className="ghost"/>
    </div>
</div>
</div>
</>
    //     // <div className={`${css} waves-effect waves-teal`} onMouseEnter = {() => setCss("proposalCardHover")} onMouseLeave = {() => setCss("proposalCard")}>
    //     //     <p className="title">{props.title}</p>
    //     //     <p className="email">From: {props.email} </p>

    //     //     <div className="description">{props.description}
            
    //     //     </div>
    //     //     <div className="dateandstatus">
    //     //     Date Posted: {props.date}    <span className="newstatus" style={{color: `${color}`}}> &nbsp;&nbsp;&nbsp; {status.charAt(0).toUpperCase()+ status.slice(1)}</span>
    //     //     </div>
    //     // </div>
    );
}

export default Proposal;