import React, { useState, useEffect, useRef } from "react";
import '../App.css';
import '../SubmissionCmpl.js';
import FileCard from "./FileCard";
import logo from './UNC_logo.png'; 
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
    const [testState, setTestState] = useState("")
    const [file, setFile] = useState([]);
    const [agree, setAgree] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const[cssLimbo, setcssLimbo] = useState('disappearLimbo')
    const[cssLimbo2, setcssLimbo2] = useState('disappearLimbo2')
    const text = useRef()

    function changedValue(text) {
        text.current.style.overflowY = "scroll";
    }
    const handleFile = (e) =>{
        let fileArray = file
        let curSize = 0
        if( e.target.files.length + file.length > 4){
            alert("You can only upload up to 4 files.")
            return
        }
        for (let i = 0; i< file.length; i++){
            curSize += file[i][1].size
        }

        for (let i = 0; i< e.target.files.length; i++){
            curSize += e.target.files[i].size
        }
        console.log(curSize)
        // do a warning when total file size exceeds 20 MB
        if (curSize >= 20000000){
            alert("The total size of files can only be up to 20MB.")
            return
        }

        for (let i = 0; i< e.target.files.length; i++){
            fileArray.push([i + file.length, e.target.files[i]])
        }
        setFile(fileArray)
        if (testState === ""){
            setTestState()
        }
        else{
            setTestState("")
        }
    }
    // function for deleting a certain attachment
    const deleteFile = (id) =>{
        // delete the attachment whose ID mactches the given ID
        var filter = file.filter(document => document[0] !== id)
        let newArray = []
        // reset the attachment array by looping through all the remaining attachments
        for (let i = 0; i< filter.length; i++){
            newArray.push([i, filter[i][1]])
        }
        setFile(newArray)

    }
    // function for uploading the attachment to mongoDB
    const addToList = () => {
        if (!title || !description || !email||!institution||!name){
            alert("Fields with \"*\" are required.")
            return
        }
        if (!agree){
            alert("Please read and agree with the terms and conditions.")
            return
        }
        if (file.length >= 0){
        var bodyFormData = new FormData();
        for (let i = 0; i < file.length; i ++){
            bodyFormData.append('file', file[i][1])
        }

        bodyFormData.append('title', title)
        bodyFormData.append('description', description)
        bodyFormData.append('email', email)
        bodyFormData.append('institution', institution)
        bodyFormData.append('name', name)
        bodyFormData.append('phone_number', phone_number)
        axios({
            method: "post",
            url: "https://elated-deer-cap.cyclic.app/insert",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              alert("Proposal Successfully Submitted!")
              //window.location.reload(false);
              console.log(response)
            })
            .catch(function (response) {
              //handle error
              alert("An Error Occured. Please Try Again.")
              console.log(response)
            });
        }
    }
    useEffect(()=>{
        function handleResize() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    }, []);

    return (
        <div className="App" style={{height:'2400px'}}>
            <img src={logo} />
            <h3>Welcome!</h3>
            <p>Thank you for your interest in being a client for COMP 523 (Fall 2022).<br></br>
            <br></br>
            In this course we use teams of about 4 undergraduate Computer Science students to develop applications for real clients (that's you!).
            The course is a very hands-on learning experience for the teams, and we hope the clients find it valuable as well.
            With a small time commitment, the clients will obtain a working software system that provides a needed solution. 
            </p><p style={{fontWeight:'bold'}}>There are a few conditions we need clients to meet.  PLEASE READ ALL THE FOLLOWING INFORMATION before filling out the form, and by submitting a proposal, you agree you meet them: <br></br>
            <br></br>
            </p>
            <div className="conditions">
                <p className="subtitle"> ①</p><p className="content">We cannot develop any projects that are protected intellectual property.
                Or better said, we cannot have the student teams be required to sign non-disclosure agreements and enter into legal contracts.</p>
                <p className="subtitle"> ② </p> <p className="content">We cannot have projects where clients risk damage if the team does not produce working code.  While we almost always produce something that works, our teams cannot be put under the pressure to produce "or else someone gets harmed".</p>
                <p className="subtitle">③ </p><p className="content">We want clients that do not need to micro-manage the project.  While we love having clients that have the time and interest in interactions with the team, we also need the team to be making design and scheduling decisions... this is how the students learn.  The teams also have very packed time tables, as they have other classes and activities to manage in addition to this project.  So we welcome client interactions through out the semester, but we also cannot put heavy time constraints on the team (such as weekly or twice-weekly meetings that they cannot afford). </p>
                <p className="subtitle">④</p><p className="content">A client must be able to give the team a few hours at the beginning of the course to develop the requirements for the project.  These hours will happen in an initial meeting or two in the first week or two.  This interaction of the team with the client is a critical component of the students' experience.  After the initial meetings, team-client meetings will be as wanted by the team and client.  Usually a team will want to schedule 2, maybe 3 more meetings during the semester as a checkup to see if what they are building is more-or-less on track with what the client is imagining.</p>
                </div>
                <p>
                <label>
                    <input style={{}} type="checkbox" onChange={() =>{
                        setAgree(!agree)        }}/>
                    <span style={{color:'black', fontWeight:'600'}}>I Agree with the Terms and Conditions</span>
                </label>
                </p>
                <form>
                <div className="fields">
                <p className = "label"for="Title">Project Title <span style = {{color:'#e53935'}}>*</span></p>
                <input required onChange={(event)=>{
                        setTitleName(event.target.value);
                    }} id="Title" type="text"></input>
            </div>
            <div className="fields">
                <p className = "label"for="Name">Your Name <span style = {{color:'#e53935'}}>*</span> </p>

                <input required onChange={(event)=>{
                    setName(event.target.value);
                }} id="Name" type="text"  ></input>
            </div>
        
            <div className="fields">
                <p className = "label"for="Email">Email <span style = {{color:'#e53935'}}>*</span></p>

                <input  required onChange={(event)=>{
                    setEmail(event.target.value);
                }} id="Email" type="text"  ></input>
            </div>
            <div className="fields">
                <p className = "label"for="Insitution">Organization / Institution <span style = {{color:'#e53935'}}>*</span></p>

                <input required onChange={(event)=>{
                        setInstitution(event.target.value);
                    }} id="Insitution" type="text"  ></input>
            </div>
        
            <div className="fields">
                <p className = "label"for="Number">Phone Number</p>

                <input   onChange={(event)=>{
                        setPhoneNumber(event.target.value);
                    }} id="Number" type="text"  ></input>
            </div>
            <div className="fields">
                <p className = "label"for="Description">Description of the Project <span style = {{color:'#e53935'}}>*</span></p>

                <textarea class="materialize-textarea" rows="5" ref={text} onChange={(event)=>{
                    changedValue(text)
                        setDescription(event.target.value);
                    }}id="Description" className="materialize-textarea"></textarea >
            </div>
            <div className="attachments">
                <p className = "label"for="F"><br></br>Attachments (Up to 4 files, less than 20MB in total. Larger files are best sent through cloud services with links given in description)</p>
                <div className="button"  style= {{float:'right',marginTop:'-12px'}}>
                <div className={`${cssLimbo2}`} >
            <div  className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Browse</p></div>
            <div  id="triangle-down"></div>
            </div>
                    <div  onClick={()=>{}}  className={`options waves-effect `}onMouseOver={() => setcssLimbo2('showLimbo2')} onMouseLeave = {()=>setcssLimbo2('disappearLimbo2')}  >
            <MdFilePresent style={{position:'relative',top:'8.5px', left:'0.5px', color:"#6EA5E4"}} className="ghost"/>
                <input  onChange={handleFile}  type="file" name = "file" multiple style = {{opacity:'100', height:'500px',position:'relative',top:'-100px'}}></input>
            </div>
            </div>
            </div>
                { 
                file.map((val, key)=>{
                    return (
                        <FileCard key = {key} id = {val[0]} fileName = {val[1].name } deleteFunction = {() =>{deleteFile(val[0])}}/>
                )})}

            <div onClick={() =>{addToList()}}  className="buttonContainer" style={{bottom: `${file.length == 0 ? 0 : windowWidth >= 550 ?  -90 * Math.ceil(file.length / 2) : -90 * Math.ceil(file.length) - 20}px`}}>
                        <div className={`${cssLimbo}`}>
            <div  className="buttonText"><p style={{fontWeight:'500', position:'relative',top:'2px'}}>Submit</p></div>
            <div  id="triangle-down"></div>
            </div>
                <div  className={`options waves-effect `}onMouseOver={() => setcssLimbo('showLimbo')} onMouseLeave = {()=>setcssLimbo('disappearLimbo')} >
            <BsCloudUploadFill style={{color:"#6EA5E4"}} className="ghost"/>
            </div>
            </div>
            </form>
        </div>
    );
}
export default MainPage;