import React, { useState, useEffect } from "react";
import M from 'materialize-css';
import Card from './Card.js'
import '../styles/ProposalList.css'

function ProposalList(props) {
const [filter, setFilter] = useState('All')
const [css1, setCss1] = useState('flat1')
const [css2, setCss2] = useState('flat2')
const [css3, setCss3] = useState('flat3')
const [css4, setCss4] = useState('flat4')
const [css5, setCss5] = useState('flat5')

return(
    <>
    <div className="container">
        <div className="filter"><p className="bigTitle "> {filter } Proposals</p>
        <div className="dropDown"> <div id="triangle-up" ></div>
        <div onMouseEnter={()=> setCss1('hover1')} onMouseLeave={()=> setCss1('flat1')} className={`${css1}`} id={`rectangleUp`}><span style={{fontWeight:'bold'}}>All</span></div>
        <div onMouseEnter={()=> setCss2('hover2')} onMouseLeave={()=> setCss2('flat2')} className={`${css2}`}  id={`rectangle1`} ><span style={{color:'#00897b', fontWeight:'bold'}}>Open</span><div id="line"></div></div>
        <div onMouseEnter={()=> setCss3('hover3')} onMouseLeave={()=> setCss3('flat3')} className={`${css3}`}  id={`rectangle2`}><span style={{color:'#43a047', fontWeight:'bold'}}>Accepted</span></div>
        <div onMouseEnter={()=> setCss4('hover4')} onMouseLeave={()=> setCss4('flat4')} className={`${css4}`}  id={`rectangle3`} ><span style={{color:'#d32f2f', fontWeight:'bold'}}>Denied</span></div>
        <div onMouseEnter={()=> setCss5('hover5')} onMouseLeave={()=> setCss5('flat5')} className={`${css5}`}  id={`rectangleDown`} ><span style={{color:'#e57373', fontWeight:'bold'}}>Limbo</span></div></div>
       </div>
    {/* <div className="filter waves-effect"><i className="material-icons small">filter_list</i> <span>Accepted</span>   </div> */}
    {/* <div className="filter" > <p style={{position:'relative',top:'6px'}}>Filter: Accepted</p></div> */}
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
            </div>
            </>
            )
}

export default ProposalList;