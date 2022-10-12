import React, { useState, useEffect } from "react";
import { createBrowserHistory } from 'history';
import '../App.css';
import M from 'materialize-css'
import {useSpring, animated as a } from 'react-spring'
import { BiChevronDown } from 'react-icons/bi';

const axios = require('axios').default;

function Conditions() {
    const [title, setTitleName] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [file, setFile] = useState("");
    const[cssLimbo, setcssLimbo] = useState('disappearLimbo')
    const animatedProps = useSpring({
        from:{marginBottom: -3000, opacity:0},
        opacity:1,
        marginBottom:0,
        config:{ mass : 4, tension:150, friction:10}
    });


    //Thank you for submitting page redirect 



    

    /* const updateFood = (id) => {
        axios.put("http://localhost:3001/update", {
            id: id,
            newFoodName: newFoodName,
        });
    } */

    /* const deleteFood = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`);
    } */

   /*  useEffect(()=>{
        axios.get("http://localhost:3001/read").then((res)=>{
            console.log(res);
            setFoodList(res.data);
        });
    }, []);*/

    return (
        <a.div style = {{...animatedProps}}>
        <p className="subtitle"> ①</p><p className="content">We cannot develop any projects that are protected intellectual property.
        Or better said, we cannot have the student teams be required to sign non-disclosure agreements and enter into legal contracts.</p>
        <p className="subtitle"> ② </p> <p className="content">We cannot have projects where clients risk damage if the team does not produce working code.  While we almost always produce something that works, our teams cannot be put under the pressure to produce "or else someone gets harmed".</p>
        <p className="subtitle">③ </p><p className="content">We want clients that do not need to micro-manage the project.  While we love having clients that have the time and interest in interactions with the team, we also need the team to be making design and scheduling decisions... this is how the students learn.  The teams also have very packed time tables, as they have other classes and activities to manage in addition to this project.  So we welcome client interactions through out the semester, but we also cannot put heavy time constraints on the team (such as weekly or twice-weekly meetings that they cannot afford). </p>
        <p className="subtitle">④</p><p className="content">A client must be able to give the team a few hours at the beginning of the course to develop the requirements for the project.  These hours will happen in an initial meeting or two in the first week or two.  This interaction of the team with the client is a critical component of the students' experience.  After the initial meetings, team-client meetings will be as wanted by the team and client.  Usually a team will want to schedule 2, maybe 3 more meetings during the semester as a checkup to see if what they are building is more-or-less on track with what the client is imagining.</p>
        <div className="buttons">
        <div style={{position:'relative',top:'20px'}}>

            <div className={`${cssLimbo}`}>
<div  className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Next</p></div>
<div  id="triangle-down"></div>
</div>
            <div  onClick={()=>{}}  className={`options waves-effect `}onMouseOver={() => setcssLimbo('showLimbo')} onMouseLeave = {()=>setcssLimbo('disappearLimbo')}  >
    <BiChevronDown className="ghost"/>
    </div>
    </div>
    </div>
        </a.div>
            
      
    );
}

export default Conditions;
