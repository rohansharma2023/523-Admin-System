import React, { useState, useEffect } from "react";
import { createBrowserHistory } from 'history';
import '../App.css';
import {Router, Route, Link} from "react-router-dom";
import '../SubmissionCmpl.js';
import FileCard from "./FileCard";
import M from 'materialize-css'
import { FaSmile } from 'react-icons/fa';

import { MdFilePresent } from 'react-icons/md';

import { BsCloudUploadFill } from 'react-icons/bs';


const axios = require('axios').default;

function MainPage() {
    const [title, setTitleName] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [file, setFile] = useState([]);
    const[cssLimbo, setcssLimbo] = useState('disappearLimbo')
    const[cssLimbo2, setcssLimbo2] = useState('disappearLimbo2')
    console.log(file)
    const handleFile = (e) =>{
        if( e.target.files.length + file.length > 3){
            alert("You Can Only Upload Up To 3 Files.")
            return
        }
        for (let i = 0; i< e.target.files.length; i++){
            if (e.target.files[i].size >= 20000000){
                alert("An individual File's Size Can Only be Up To 20MB.")
                return
            }
        }
        let fileArray = file
        console.log(file)

        for (let i = 0; i< e.target.files.length; i++){
            fileArray.push([i + file.length, e.target.files[i]])
        }
        setFile(fileArray)
    }
    const deleteFile = (id) =>{
        console.log(filter)
        var filter = file.filter(document => document[0] != id)
        let newArray = []
        for (let i = 0; i< filter.length; i++){
            newArray.push([i, filter[i]])
        }
        setFile(newArray)

    } 
    //Thank you for submitting page redirect 



    const addToList = () => {
        axios.post("http://localhost:3001/insert", {
            title: title, 
            description: description,
            email: email,
            institution: institution,
            name: name, 
            phone_number: phone_number, 
            file: file, 
        })
        
    };

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
        <div className="App">
            <FaSmile style={{fontSize:'50px'}}/>
            <h3>Welcome!</h3>
            <p>Thank you for your interest in being a client for COMP 523 (Fall 2022).<br></br>
            <br></br>
            In this course we use teams of about 4 undergraduate Computer Science students to develop applications for real clients (that's you!).
            The course is very hands-on, experiential learning for the teams, and we hope also valuable for the client as well.
            With a small time commitment, the client will obtain a working software system that provides a needed solution. 
            </p><p style={{fontWeight:'bold'}}>There are a few conditions we need clients to meet.  PLEASE READ ALL THE FOLLOWING INFORMATION before filling out the form, and by submitting a proposal, you agree you meet them: <br></br>
            <br></br>
            </p>
            {/* <div className="buttons">

            <div className={`${cssLimbo}`}>

<div  className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Next</p></div>
<div  id="triangle-down"></div>
</div>
            <div  onClick={()=>{}}  className={`options waves-effect `}onMouseOver={() => setcssLimbo('showLimbo')} onMouseLeave = {()=>setcssLimbo('disappearLimbo')}  >
    <BiChevronDown className="ghost"/>
    </div>
    </div> */}
    <div className="conditions">
    <p className="subtitle"> ①</p><p className="content">We cannot develop any projects that are protected intellectual property.
        Or better said, we cannot have the student teams be required to sign non-disclosure agreements and enter into legal contracts.</p>
        <p className="subtitle"> ② </p> <p className="content">We cannot have projects where clients risk damage if the team does not produce working code.  While we almost always produce something that works, our teams cannot be put under the pressure to produce "or else someone gets harmed".</p>
        <p className="subtitle">③ </p><p className="content">We want clients that do not need to micro-manage the project.  While we love having clients that have the time and interest in interactions with the team, we also need the team to be making design and scheduling decisions... this is how the students learn.  The teams also have very packed time tables, as they have other classes and activities to manage in addition to this project.  So we welcome client interactions through out the semester, but we also cannot put heavy time constraints on the team (such as weekly or twice-weekly meetings that they cannot afford). </p>
        <p className="subtitle">④</p><p className="content">A client must be able to give the team a few hours at the beginning of the course to develop the requirements for the project.  These hours will happen in an initial meeting or two in the first week or two.  This interaction of the team with the client is a critical component of the students' experience.  After the initial meetings, team-client meetings will be as wanted by the team and client.  Usually a team will want to schedule 2, maybe 3 more meetings during the semester as a checkup to see if what they are building is more-or-less on track with what the client is imagining.</p>
        </div>
        {/* <div className="buttons"> */}
        {/* <div style={{position:'relative',top:'20px'}}>

            <div className={`${cssLimbo}`}>
<div  className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Next</p></div>
<div  id="triangle-down"></div>
</div>
            <div  onClick={()=>{}}  className={`options waves-effect `}onMouseOver={() => setcssLimbo('showLimbo')} onMouseLeave = {()=>setcssLimbo('disappearLimbo')}  >
    <BiChevronDown className="ghost"/>
    </div>
    </div> */}
    {/* </div> */}

            <form>
            {/* <label for = "title">Title: </label>
            <input id="title" type="text" onChange={(event)=>{
                setTitleName(event.target.value);
            }}></input> */}
            <div className="fields">
            <p className = "label"for="Title">Project Title</p>
          <input onChange={(event)=>{
                setTitleName(event.target.value);
            }} id="Title" type="text"></input>
        </div>
        <div className="fields">
        <p className = "label"for="Description">Please Give a Description of Your Project</p>

          <textarea onChange={(event)=>{
                setDescription(event.target.value);
            }}id="Description" className="materialize-textarea"></textarea>
        </div>
        <div className="fields">
        <p className = "label"for="Email">Your Email</p>

          <input onChange={(event)=>{
                setEmail(event.target.value);
            }} id="Email" type="text"  ></input>
        </div>
        <div className="fields">
        <p className = "label"for="Insitution">Your Organization or Insitution</p>

          <input onChange={(event)=>{
                setInstitution(event.target.value);
            }} id="Insitution" type="text"  ></input>
        </div>
        <div className="fields">
        <p className = "label"for="Name">Your Name</p>

          <input onChange={(event)=>{
                setName(event.target.value);
            }} id="Name" type="text"  ></input>
        </div>
        <div className="fields">
        <p className = "label"for="Number">Your Phone Number</p>

          <input onChange={(event)=>{
                setPhoneNumber(event.target.value);
            }} id="Number" type="text"  ></input>
        </div>
        {/* <fieldset action= "/upload" method="POST" 
            enctype="multipart/form-data"> */}
             
                {/* <div class="custom-file mb-3">
                    <input className = "x" type="file" name="file" id="file" class="custom-file-input" onChange={(event)=>{
                        setFile(event.target.value);
                    }}></input>
                    <label for="file" class="custom-file-label">Choose File</label>
                </div> */}
<div className="attachments">
                        <p className = "label"for="F"><br></br>Attachments (Up to 3, each less than 20MB)</p>
    <div className="button"  style= {{float:'right',marginTop:'-12px'}}>
      <div className={`${cssLimbo2}`} >
<div  className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Browse</p></div>
<div  id="triangle-down"></div>
</div>
            <div  onClick={()=>{}}  className={`options waves-effect `}onMouseOver={() => setcssLimbo2('showLimbo2')} onMouseLeave = {()=>setcssLimbo2('disappearLimbo2')}  >
    <MdFilePresent style={{position:'relative',top:'8.5px', left:'0.5px', color:"#ff8a65"}} className="ghost"/>
        <input  onChange={handleFile}  type="file" multiple style = {{opacity:'100', height:'500px',position:'relative',top:'-100px'}}></input>
    </div>
    </div>
    </div>
    

       {/* <div className="validator" style={{display:'inline', width:'50%'}}>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text"></input>
      </div>
      </div> */}
                {/* <input type="submit" value="submit" class="btn btn-primary btn-block"></input> */}
            {/* </fieldset> */}

            {/* <label for = "email">Email: </label>
            <input id="email" type="text" onChange={(event)=>{
                setEmail(event.target.value);
            }}></input>
            <label>Please give a description of your project</label>
            <textarea className="materialize-textarea" type="text" onChange={(event)=>{
                setDescription(event.target.value);
            }}></textarea>
            <label>Please enter the name of your organization or institution</label>
            <input type="text" onChange={(event)=>{
                setInstitution(event.target.value);
            }}></input>
            <label>Please enter your name</label>
            <input type="text" onChange={(event)=>{
                setName(event.target.value);
            }}></input>
            <label>Please enter a valid Phone Number that we can contact</label>
            <input type="text" onChange={(event)=>{
                setPhoneNumber(event.target.value);
            }}></input> */}
            {/* <label>Feel Free to add any files you deem important</label>
            <fieldset action= "/upload" method="POST" 
            enctype="multipart/form-data">
                <div class="custom-file mb-3">
                    <input className = "x" type="file" name="file" id="file" class="custom-file-input" onChange={(event)=>{
                        setFile(event.target.value);
                    }}></input>
                    <label for="file" class="custom-file-label">Choose File</label>
                </div>
                <input type="submit" value="submit" class="btn btn-primary btn-block"></input>
            </fieldset>
            {<input type="text" onChange={(event)=>{
                setFile(event.target.value);
            }}></input>} */}
            {/* <button onClick={() =>{addToList()}}>Submit</button>  */}

            { 
            file.map((val, key)=>{
                return (
                    <div key = {key}>
                    <FileCard id = {val[0]} fileName = {val[1].name} deleteFunction = {() =>{deleteFile(val[0])}}/>

                </div>
            )})}



            {/* <div onClick={() =>{addToList()}} className={`${cssLimbo}`}>
<div  className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Submit</p></div>
<div  id="triangle-down"></div>
</div>
            <div  className={`options waves-effect `}onMouseOver={() => setcssLimbo('showLimbo')} onMouseLeave = {()=>setcssLimbo('disappearLimbo')}  >
    <BsCloudUploadFill style={{color:"#ff8a65"}} className="ghost"/>
    </div> */}
    </form>


        </div>

    );
}

export default MainPage;
