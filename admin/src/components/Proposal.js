import React, { useState, useEffect } from "react";
import '../styles/Proposal.css'
import M from 'materialize-css';
import { BiCheck } from 'react-icons/bi';
import { BiGhost } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { MdWork } from 'react-icons/md';
import {Navigate} from 'react-router'
import { MdDelete } from 'react-icons/md';

import { BsFillTelephoneFill } from 'react-icons/bs';
import Error  from "./Error";
import FileCard from './FileCard'
import { useParams, useNavigate } from "react-router-dom";
const axios = require('axios').default;

function Proposal(props) {
    let params = useParams();
    const navigate = useNavigate()
    const [record, setRecord] = useState(null);
    const [color, setColor ] = useState("")
    const [status, setStatus] = useState("")
    const [file, setFile] = useState([])
    const [fileName, setFileName] = useState([])

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const[cssApprove, setCssApprove] = useState('disappearApprove')
    const[cssDeny, setcssDeny] = useState('disappearDeny')
    const[cssLimbo, setcssLimbo] = useState('disappearLimbo')
    const[cssDelete, setcssDelete] = useState('disappearDelete')

    // function for updating the proposal's status
    const updateStatus = (newStatus) => {

        try {
            if (!status || status.toLowerCase() !== newStatus){
                axios.put("https://tame-teal-ray.cyclic.app/update", {
                    id: params.id,
                    newStatus: newStatus,
                }).then((res)=>{
                    axios.get(`https://tame-teal-ray.cyclic.app/fetchById/${params.id}`).then((res)=>{
                        
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
    // function for deleting the proposal and its attachments
    const deleteProposal = (id) => {
        try {
            axios.post(`https://tame-teal-ray.cyclic.app/delete`, {
                id: params.id,
                fileId : JSON.stringify(file)
            }).then((res)=>{
                console.log(res)
                if (res['data'] === 'deleted'){
                alert("Proposal successfully deleted!")
                navigate('/')

                }
                else{
                    alert("Something went wrong when discarding the proposal. Please try again.")
                }
            });
            
            
        } catch(err) {
            alert("Something went wrong when discarding the proposal. Please try again.")

            console.log(err);
        }

    }
    
    useEffect(()=>{
    // function for fetching the proposal according to the given ID   
        axios.get(`https://tame-teal-ray.cyclic.app/fetchById/${params.id}`).then((res)=>{
            if(!res.data[0]){
                setRecord("error")
                return
            }
            if (res.data !== 'Proposal Does not Exist.'){
            setRecord(res.data[0])
            setStatus(res.data[0].status)
            setColor(res.data[0].status == 'limbo' ? '#e57373' : res.data[0].status =='accepted'? '#43a047' : res.data[0].status == 'open' ? '#00897b' : res.data[0].status == 'denied' ? '#d32f2f' : null)
            if (res.data[0].fileId){
            setFile(res.data[0].fileId.split(',').slice(0,-1))
            setFileName(res.data[0].fileName.split(',').slice(0,-1))
}
        }  
            else{
                setRecord("error")
            }
        })
        function handleResize() {
            setWindowWidth(window.innerWidth)
    }
    
        window.addEventListener('resize', handleResize)
    }, []);
    return (
        
        !record ? <div style={{fontWeight:'bold'}}>Loading...</div> : 
        record === 'error' ? <Error message = 'Proposal Does not Exist.'/> : 
        <div className="container">
            
            <div className="information">
            <h3 className="proposalTitle">{record.title}</h3>
            <h5 className="proposalDate" style={{fontSize:'18px',marginBottom:'20px',marginTop:'25px',fontWeight:'bold', color:'#616161'}}>Date Posted: {`${record.date.split(" ")[1] + " "  + record.date.split(" ")[2] + ", " + record.date.split(" ")[3]}`}</h5>
            <h5 className="proposalStatus" style={{marginBottom:'20px',marginTop:'25px',fontWeight:'bold',color:'#616161'}}><span>Status: </span><span style={{color:`${color}`}}> {record.status.charAt(0).toUpperCase()+ record.status.slice(1)} </span></h5>

            <div className="proposalInfo"><BsFillPersonFill className="proposalIcon"/><span>{record.name}</span></div>
            <div className="proposalInfo"><MdEmail className="proposalIcon"/><span>{record.email}</span></div>
            <div className="proposalInfo"><MdWork className="proposalIcon"/><span style={{width:'100%'}}>{record.institution}</span></div>
            <div className="proposalInfo"><BsFillTelephoneFill className="proposalIcon"/><span>{record.phone_number}</span></div>
            <div style={{display:'flex', flexDirection:`${windowWidth >= 550 ? 'row' : 'column'}`}}>
            { 
            file.slice(0,2).map((val, index)=>{
                if (!val){
                    return
                }
                return (
                        <FileCard
                        key = {index}
                        id = {val} 
                        names = {fileName[index]}
                        />
                )})}
            </div>
            <div style={{display:'flex', flexDirection:`${windowWidth >= 550 ? 'row' : 'column'}`}}>
            { 
            file.slice(2,4).map((val, index)=>{
                if (!val){
                    return
                }
                return (
                        <FileCard
                        key = {index}
                        id = {val} 
                        names = {fileName[index + 2]}
                        />
                )})}
            </div>
            </div>
            <div className="proposalDescription"><span>{record.description} 
            </span></div>


        {props.loggedIn ? <div  className="buttons">
            <div style={{display:"inline-block", margin:'-9px'}}>
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
        <div style={{display:"inline-block", margin:'-9px'}}>
        <div className={`${cssDeny}`}>
            
            <div className="buttonText" style={{visibility: status === 'denied'? "hidden" : null}}><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Deny</p></div>
            <div style={{visibility: status === 'denied'? "hidden" : null}} id="triangle-down"></div>
</div>
        <div  style = {{cursor:status === 'denied'? "not-allowed" : ''}} onClick={()=>{updateStatus("denied")}}  className={`options waves-effect ${ status !== 'denied'? 'waves-red' : ''}`} onMouseOver={() => setcssDeny('showDeny')} onMouseLeave = {()=>setcssDeny('disappearDeny')} >
        <i className="material-icons close"      style = {{ color:status === "denied" ? '#bdbdbd':'#d32f2f'}}  
>close </i>
        </div>
    </div>
    <div style={{display:"inline-block", margin:'-9px'}}>
    <div className={`${cssLimbo}`}>

        <div  style={{visibility: status === 'limbo'? "hidden" : null}} className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Limbo</p></div>
        <div  style={{visibility: status === 'limbo'? "hidden" : null}} id="triangle-down"></div>
        </div>

    <div style = {{cursor:status === 'limbo'? "not-allowed" : ''}} onClick={()=>{ updateStatus("limbo")}}  className={`options waves-effect ${ status !== 'limbo'? 'waves-red' : ''}`}onMouseOver={() => setcssLimbo('showLimbo')} onMouseLeave = {()=>setcssLimbo('disappearLimbo')}  >
    <BiGhost className="ghost"  style = {{     color:status === "limbo" ? '#bdbdbd':'#e57373'
}}/>
    </div>
    </div>
    <div style={{display:"inline-block", margin:'-9px'}}>

    <div className={`${cssDelete}`}>

        <div   className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Discard</p></div>
        <div   id="triangle-down"></div>
        </div>

    <div  onClick={()=>{window.confirm("Are you sure you want to discard this proposal?") ? deleteProposal(params.id) : console.log()}}  className={`options waves-effect waves-red`}onMouseOver={() => setcssDelete('showDelete')} onMouseLeave = {()=>setcssDelete('disappearDelete')}  >
    <MdDelete className="ghost"  style = {{     color:'#e53935'
}}/>
    </div>
    </div>

    
</div> : <></>}
</div>
    );
}
export default Proposal;