import React, { useState, useEffect } from "react";
import M from 'materialize-css';
import Card from './Card.js'
import '../styles/ProposalList.css'
const axios = require('axios').default;

function ProposalList(props) {
    const [filter, setFilter] = useState('All')
    const [css1, setCss1] = useState('flat1')
    const [css2, setCss2] = useState('flat2')
    const [css3, setCss3] = useState('flat3')
    const [css4, setCss4] = useState('flat4')
    const [css5, setCss5] = useState('flat5')
    const [cssIcon1, setCssIcon1] = useState('away')
    const [cssIcon2, setCssIcon2] = useState('away')

    const [cssDropDown, setCssDropDown] = useState('hidden')
    const [proposalList, setProposalList] = useState([]);

    let address = []
    for (let i = 0; i<proposalList.length;i++) {
        if (proposalList[i].status === filter.toLowerCase()){
            address.push(proposalList[i].email);
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:3001/read").then((res)=>{
            // console.log(res);
            setProposalList(res.data);
        });
    }, []);

return(
    <div onClick = {() => cssDropDown === 'shown'?setCssDropDown('hidden') : null}>
    <div className="container">
    <div className="titleContainer">

        <div className="filter">
        <div onClick = {()=>cssDropDown === 'hidden'?setCssDropDown('shown') : setCssDropDown('hidden')} onMouseEnter={()=>setCssIcon1('hover')} onMouseLeave={()=>setCssIcon1('away')} id="filterIconContainer" className={`${cssIcon1} waves-effect`}><i id="filterIcon" className="small material-icons">filter_list</i></div>

        <div className={`dropDown ${cssDropDown}`} > <div id="triangle-up" ></div>
        <div onClick={()=>setFilter('All')} onMouseEnter={()=> setCss1('hover1')} onMouseLeave={()=> setCss1('flat1')} className={`${css1}`} id={`rectangleUp`}><span style={{fontWeight:'bold'}}>All</span></div>
        <div onClick={()=>setFilter('Open')} onMouseEnter={()=> setCss2('hover2')} onMouseLeave={()=> setCss2('flat2')} className={`${css2}`}  id={`rectangle1`} ><span style={{color:'#00897b', fontWeight:'bold'}}>Open</span><div id="line"></div></div>
        <div onClick={()=>setFilter('Accepted')} onMouseEnter={()=> setCss3('hover3')} onMouseLeave={()=> setCss3('flat3')} className={`${css3}`}  id={`rectangle2`}><span style={{color:'#43a047', fontWeight:'bold'}}>Accepted</span></div>
        <div onClick={()=>setFilter('Denied')} onMouseEnter={()=> setCss4('hover4')} onMouseLeave={()=> setCss4('flat4')} className={`${css4}`}  id={`rectangle3`} ><span style={{color:'#d32f2f', fontWeight:'bold'}}>Denied</span></div>
        <div onClick={()=>setFilter('Limbo')} onMouseEnter={()=> setCss5('hover5')} onMouseLeave={()=> setCss5('flat5')} className={`${css5}`}  id={`rectangleDown`} ><span style={{color:'#e57373', fontWeight:'bold'}}>Limbo</span></div></div>
       </div>



<p className="bigTitle " > {filter } Proposals</p>
<div onClick={() =>console.log(address)} style={{visibility: filter === 'All'? 'hidden':'visible'}} onMouseEnter={()=>setCssIcon2('hover')} onMouseLeave={()=>setCssIcon2('away')} id="emailIconContainer"  className={`${cssIcon2} waves-effect`}><i id="EmailIcon" className="small material-icons">email</i></div>

</div>
        
    {/* <div className="filter waves-effect"><i className="material-icons small">filter_list</i> <span>Accepted</span>   </div> */}
    {/* <div className="filter" > <p style={{position:'relative',top:'6px'}}>Filter: Accepted</p></div> */}
    <div className="divider"></div>

            
            { 
            proposalList.map((val, key)=>{
                if (filter === 'All' || val.status === filter.toLowerCase() ){
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
                );}
                
            })}
            </div>
            </div>
            )
}

export default ProposalList;