import React, { useState, useEffect } from "react";
import '../styles/Proposal.css'
import M from 'materialize-css';
import { BiCheck } from 'react-icons/bi';
import { BiGhost } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { MdWork } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import Error  from "./Error";

import { useParams } from "react-router-dom";
const axios = require('axios').default;

function Proposal(props) {
    let params = useParams();
    const [record, setRecord] = useState(null);
    const [color, setColor ] = useState("")
    const [status, setStatus] = useState("")

    const[cssApprove, setCssApprove] = useState('disappearApprove')
    const[cssDeny, setcssDeny] = useState('disappearDeny')
    const[cssLimbo, setcssLimbo] = useState('disappearLimbo')

    const updateStatus = (newStatus) => {
        try {
            if (!status || status.toLowerCase() !== newStatus){
                console.log(newStatus);
                console.log(params.id);
                axios.put("http://localhost:3001/update", {
                    id: params.id,
                    newStatus: newStatus,
                }).then((res)=>{
                    axios.get(`http://localhost:3001/fetchById/${params.id}`).then((res)=>{
                        setRecord(res.data[0])
                        setStatus(res.data[0].status)
                        setColor(res.data[0].status == 'limbo' ? '#e57373' : res.data[0].status =='accepted'? '#43a047' : res.data[0].status == 'open' ? '#00897b' : res.data[0].status == 'denied' ? '#d32f2f' : null)
                    })
                });
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    useEffect(()=>{
        axios.get(`http://localhost:3001/fetchById/${params.id}`).then((res)=>{
            if (res.data !== 'Proposal Does not Exist.'){
            setRecord(res.data[0])
            setStatus(res.data[0].status)
            setColor(res.data[0].status == 'limbo' ? '#e57373' : res.data[0].status =='accepted'? '#43a047' : res.data[0].status == 'open' ? '#00897b' : res.data[0].status == 'denied' ? '#d32f2f' : null)}
            else{
                setRecord("error")
            }
        })
    }, []);
    

    return (
        !record ? <div>Loading...</div> : 
        record === 'error' ? <Error message = 'Proposal Does not Exist.'/> : 
        <div className="container">
            
            <div className="information">
        {/* <p className="title">{record.title}</p>
            <p className="email">From: {record.email} </p>

            <div className="description">{record.description}
            
            </div>
            <div className="dateandstatus">
            Date Posted: {record.date}    <span className="newstatus" style={{color: `${color}`}}> &nbsp;&nbsp;&nbsp; {record.status.charAt(0).toUpperCase()+ record.status.slice(1)}</span>
            </div> */}
            <h3 className="proposalTitle">{record.title}</h3>
            <h5 className="proposalDate" style={{fontSize:'18px',marginBottom:'20px',marginTop:'25px',fontWeight:'bold', color:'#616161'}}>Date Posted: {record.date}</h5>
            <h5 className="proposalStatus" style={{marginBottom:'20px',marginTop:'25px',fontWeight:'bold',color:'#616161'}}><span>Status: </span><span style={{color:`${color}`}}> {record.status.charAt(0).toUpperCase()+ record.status.slice(1)} </span></h5>

            <div className="proposalInfo"><BsFillPersonFill className="proposalIcon"/><span>{record.name}</span></div>
            <div className="proposalInfo"><MdEmail className="proposalIcon"/><span>{record.email}</span></div>
            <div className="proposalInfo"><MdWork className="proposalIcon"/><span style={{width:'100%'}}>{record.institution}</span></div>
            <div className="proposalInfo"><BsFillTelephoneFill className="proposalIcon"/><span>{record.phone_number}</span></div>

            </div>
            <div className="proposalDescription"><span>{record.description} 
            </span></div>


        <div className="buttons">
            <div style={{display:"inline-block"}}>
                <div className={`${cssApprove}`}>
                <div  style={{visibility: status === 'accepted'? "hidden" : null}} className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Accept</p></div>
                <div  style={{visibility: status === 'accepted'? "hidden" : null}} id="triangle-down"></div>
                </div>
        <div  style = {{cursor:status === 'accepted'? "not-allowed" : ''}} onClick={()=>{updateStatus("accepted")}}  className={`options waves-effect ${ status !== 'accepted'? 'waves-green' : ''}`} onMouseOver={() => setCssApprove('showApprove')} onMouseLeave = {()=>setCssApprove('disappearApprove') } >
        <i className=" material-icons check"  style = {{color:status === "accepted" ? '#bdbdbd':'#43a047'}}
>check 
        </i>
        </div>
        </div>
        <div style={{display:"inline-block"}}>
        <div className={`${cssDeny}`}>
            
            <div className="buttonText" style={{visibility: status === 'denied'? "hidden" : null}}><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Deny</p></div>
            <div style={{visibility: status === 'denied'? "hidden" : null}} id="triangle-down"></div>
</div>
        <div  style = {{cursor:status === 'denied'? "not-allowed" : ''}} onClick={()=>{updateStatus("denied")}}  className={`options waves-effect ${ status !== 'denied'? 'waves-red' : ''}`} onMouseOver={() => setcssDeny('showDeny')} onMouseLeave = {()=>setcssDeny('disappearDeny')} >
        <i className="material-icons close"      style = {{ color:status === "denied" ? '#bdbdbd':'#d32f2f'}}  
>close </i>
        </div>
    </div>
    <div style={{display:"inline-block"}}>
    <div className={`${cssLimbo}`}>

        <div  style={{visibility: status === 'limbo'? "hidden" : null}} className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Limbo</p></div>
        <div  style={{visibility: status === 'limbo'? "hidden" : null}} id="triangle-down"></div>
        </div>

    <div style = {{cursor:status === 'limbo'? "not-allowed" : ''}} onClick={()=>{ updateStatus("limbo")}}  className={`options waves-effect ${ status !== 'limbo'? 'waves-red' : ''}`}onMouseOver={() => setcssLimbo('showLimbo')} onMouseLeave = {()=>setcssLimbo('disappearLimbo')}  >
    <BiGhost className="ghost"  style = {{     color:status === "limbo" ? '#bdbdbd':'#e57373'
}}/>
    </div>
    
</div>
</div>

</div>

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