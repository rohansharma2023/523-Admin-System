import React, { useState, useEffect } from "react";
import './App.css';
import { useNavigate} from "react-router-dom";


const axios = require('axios').default;

function App() {
    const [title, setTitleName] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [institution, setInstitution] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [file, setFile] = useState("");

    //Thank you for submitting page redirect 
    const navigate = useNavigate();
    

    const addToList = () => {
        axios.post("http://localhost:3001/insert", {
            title: title, 
            description: description,
            email: email,
            date: date, 
            status: status, 
            institution: institution,
            name: name, 
            phone_number: phone_number, 
            file: file, 
        });
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
            <h1>Client Proposal</h1>
            <p>Thank you for your interest in being a client for COMP 523 (Fall 2022).  PLEASE READ ALL THE FOLLOWING INFORMATION before filling out the form.<br></br>
            In this course we use teams of about 4 undergraduate Computer Science students to develop applications for real clients (that's you!).<br></br>
            The course is very hands-on, experiential learning for the teams, and we hope also valuable for the client as well.<br></br>
            With a small time commitment, the client will obtain a working software system that provides a needed solution. <br></br>
            There are a few conditions we need clients to meet.  Please review these and by submitting a proposal, you agree you meet them:<br></br>
            <br></br>
            1) We cannot develop any projects that are protected intellectual property.
            Or better said, we cannot have the student teams be required to sign non-disclosure agreements and enter into legal contracts<br></br>
            2) We cannot have projects where clients risk damage if the team does not produce working code.  While we almost always produce something that works, our teams cannot be put under the pressure to produce "or else someone gets harmed".<br></br>
            3)  We want clients that do not need to micro-manage the project.  While we love having clients that have the time and interest in interactions with the team, we also need the team to be making design and scheduling decisions... this is how the students learn.  The teams also have very packed time tables, as they have other classes and activities to manage in addition to this project.  So we welcome client interactions through out the semester, but we also cannot put heavy time constraints on the team (such as weekly or twice-weekly meetings that they cannot afford)<br></br>
            
4) A client must be able to give the team a few hours at the beginning of the course to develop the requirements for the project.  These hours will happen in an initial meeting or two in the first week or two.  This interaction of the team with the client is a critical component of the students' experience.  After the initial meetings, team-client meetings will be as wanted by the team and client.  Usually a team will want to schedule 2, maybe 3 more meetings during the semester as a checkup to see if what they are building is more-or-less on track with what the client is imagining.<br></br>

            </p>
            <form>
            <fieldset>
            <label>Title: </label>
            <input type="text" onChange={(event)=>{
                setTitleName(event.target.value);
            }}></input>
            </fieldset>
            <fieldset>
            <label>Please give a description of your project</label>
            <textarea type="text" onChange={(event)=>{
                setDescription(event.target.value);
            }}></textarea>
            </fieldset>
            <fieldset>
            <label>Date</label>
            <input type="text" onChange={(event)=>{
                setDate(event.target.value);
            }}></input>
            </fieldset>
            <fieldset>
            <label>Status</label>
            <input type="text" onChange={(event)=>{
                setStatus(event.target.value);
            }}></input>
            </fieldset>
            <fieldset>
            <label>Please enter the name of your organization or institution</label>
            <input type="text" onChange={(event)=>{
                setInstitution(event.target.value);
            }}></input>
            </fieldset>
            <fieldset>
            <label>Please enter your name</label>
            <input type="text" onChange={(event)=>{
                setName(event.target.value);
            }}></input>
            </fieldset>
            <fieldset>
            <label>Please enter a valid Phone Number that we can contact</label>
            <input type="text" onChange={(event)=>{
                setPhoneNumber(event.target.value);
            }}></input>
            </fieldset>
            </form>
            <label>Feel Free to add any files you deem important</label>
            <fieldset action= "/upload" method="POST" 
            enctype="multipart/form-data">
                <div class="custom-file mb-3">
                    <input className = "x" type="file" name="file" id="file" class="custom-file-input" onChange={(event)=>{
                        setFile(event.target.value);
                    }}></input>
                    <label for="file" class="custom-file-label">Choose File</label>
                </div>
                {/*<input type="submit" value="submit" class="btn btn-primary btn-block"></input>*/}   
            </fieldset>
            {/*<input type="text" onChange={(event)=>{
                setFile(event.target.value);
            }}></input>*/} 
            <button onClick={() =>{addToList()}}>Submit</button> 
        </div>
    );
}

export default App;
