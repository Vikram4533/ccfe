import React, { Component } from 'react';
import axios from 'axios';
import './app.css';
const image2base64 = require('image-to-base64');
const dateTime = require('date-time');

class Addact extends Component {
  state={
    newact:{
      username:'',  
      caption:'',
      timestamp:'',
      actId:0,
      categoryName:'',
      imgB64:''
    },
    selfile:'',
    da:''
  }
  addact(){
    var tim=dateTime()
    var tim=tim.split(" ");
    var date=tim[0].split("-")
    var time=tim[1].split(":")
    var ft=date[2]+"-"+date[1]+"-"+date[0]+":"+time[2]+"-"+time[1]+"-"+time[0]
    let {newact}=this.state;
    newact.timestamp=ft;
    newact.imgB64=document.getElementById("error").innerHTML;
    this.setState({newact});
  //////////////////////////////////////////////////////////////////////
    axios.post("http://54.197.76.100:8000/api/v1/acts",this.state.newact)
    .then((response)=>{
      console.log(response.status)
      console.log("success");
      document.getElementById("error1").innerHTML = "act added";
    })
    .catch((error)=> {
      document.getElementById("error1").innerHTML ="some problem! check details" ;
      console.log("error");
    });
  }

  filehandler(name){
    var file = name.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        var txt=reader.result.split("base64,")[1]
        document.getElementById("error").innerHTML=txt
        document.getElementById("error").style.display = "none"
      }
    reader.readAsDataURL(file);
  }

  delete(){
    axios.delete("http://54.197.76.100:8000/api/v1/acts/"+this.state.da)
    .then((response)=>{
      console.log(response.status)
      console.log("success");
      document.getElementById("error").innerHTML ="Success deleted act";
    })
    .catch((error)=> {
      document.getElementById("error").innerHTML = "act doesnt exist";
      console.log("error");
    });
  }
  render() {
    return(
        <div>
        <div className="acts1">
        <h2>Add Act</h2>
            <label>Username : </label>
            <input type="text" placeholder="Enter Username" name="username" required value={this.state.newact.username} onChange={(e)=>{
              let {newact}=this.state;
              newact.username=e.target.value;
              this.setState({newact});
            }}></input><br></br>
            <label>actId : </label>
            <input type="number" placeholder="Enter actid" name="actid" required required value={this.state.newact.actId} onChange={(e)=>{
              let {newact}=this.state;
              newact.actId=e.target.value;
              this.setState({newact});
            }}></input><br></br>
            <label>caption : </label>
            <input type="text" placeholder="Enter caption" name="caption" required required value={this.state.newact.caption} onChange={(e)=>{
              let {newact}=this.state;
              newact.caption=e.target.value;
              this.setState({newact});
            }}></input><br></br>
              <label>categoryName : </label>
            <input type="text" placeholder="Enter category name" name="catname" required required value={this.state.newact.categoryName} onChange={(e)=>{
              let {newact}=this.state;
              newact.categoryName=e.target.value;
              this.setState({newact});
            }}></input><br></br>
            <input type="file" name="filename"  onChange={this.filehandler.bind(this)}></input><br></br>
            <button type="submit" onClick={this.addact.bind(this)}>Add Act</button>
        </div>
        <div className="da">
          <h2>Delete act</h2>
          <input type="number" placeholder="Enter actid" name="catname" required required value={this.state.id} onChange={(e)=>{
              this.setState({
                id:e.target.value
              })
            }}></input>
            <button type="submit" onClick={this.delete.bind(this)}>Delete</button>
        </div>
        <div id="error" >
        </div>
        <div id="error1" >
        </div>
        </div>
    );  
  }
}

export default Addact;
