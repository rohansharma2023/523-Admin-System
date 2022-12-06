import React from 'react'
import M from 'materialize-css'
import qs from 'qs'
import axios from 'axios'
import {CgAttachment} from 'react-icons/cg'
import filesaver from 'file-saver'

export default function FileCard(props) {
    const download =  (id, name) => {
        console.log(id)
        let data = {fileId: id}
        axios({
            method: "post",
            url: "http://localhost:3001/download",  //change this link to hosted server link to test it on hosted server
            data: qs.stringify(data),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            responseType: "blob",
          })
            .then(res => {
                console.log(res);
                filesaver.saveAs(res.data, name);

            })
            .catch(function (response) {
              //handle error
              alert("An error occured when looking for the file in the database.")
              console.log(response)
            });
    
    }
  return (
    <div id="fileContent" className='' style={{display: 'flex', flexDirection:'row',height: '60px', marginRight:'auto', marginLeft:'0',
        borderRadius: "7px",
        boxShadow: "1px 2px 8px 1px #e0e0e0", marginTop:"20px"}} >
        <div style={{position: "relative",
        top: "18px",
        marginLeft: "12px",
        }} className='button'>
            <CgAttachment style={{fontSize:'22px',position:'relative', top:"1px"}}/>
            </div>
            <div style={{marginLeft:'0px', marginRight:'auto', width:'70%'}}>
        <p style={{  textAlign:'left',overflow: 'hidden', textOverflow:'ellipsis',
        whiteSpace: 'nowrap', position:'relative', left:'8px', top:'3.5px'}}>{props.names} </p>
        </div>
        <div id='deleteBut' className='button2 waves-effect' onClick={() => {download(props.id, props.names)}} style = {{minHeight: '40px',
            minWidth: '40px',
            maxWidth: '40px',
            maxHeight: '40px',
            borderRadius: '50%', position: "relative",
            top: "11px",
            marginLeft: "auto",
            marginRight: "8px"}}>

        <i class="material-icons" style={{fontSize:'22px', color:'#ef5350', position:'relative', top:'8.5px',left:'8.8px'}}>file_download</i>
        </div>
    </div> 
    )
}