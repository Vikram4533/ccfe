import React, { Component } from 'react';
import axios from 'axios';
import Cats from './Cats'
import './app.css';
import {NavLink} from "react-router-dom"

class User extends Component {
  constructor(props) {
    super(props);
    this.state={
    newuser:{
      username:'',  
      password:''
    },
    delusr:''
  }
}
  adduser(){
    var sha1 = require('../../node_modules/sha1/sha1');
    let {newuser}=this.state;
    newuser.password=sha1(this.state.newuser.password);;
    this.setState({newuser});
    //this.state.newuser.password=sha1(this.state.newuser.password);
    axios.post("http://54.197.76.100:8080/api/v1/users",this.state.newuser)
    .then((response)=>{
      console.log(response.status)
      console.log("success");
      document.getElementById("error").innerHTML ="Success";
    })
    .catch((error)=> {
      document.getElementById("error").innerHTML = "User Already exist ";
      console.log("error");
    });
  }


  deluser(){
    axios.delete("http://54.197.76.100:8080/api/v1/users/"+this.state.delusr)
    .then((response)=>{
      console.log(response.status)
      console.log("success");
      document.getElementById("error").innerHTML ="Success user deleted";
    })
    .catch((error)=> {
      document.getElementById("error").innerHTML = "User doesnty exist ";
      console.log("error");
    });
  }

  render() {
    return(
        <div>
        <div className="sds">
        <div className="user">
            <h2>Add User</h2>
            <label>Username : </label>
            <input type="text" placeholder="Enter Username" name="username" required value={this.state.newuser.username} onChange={(e)=>{
              let {newuser}=this.state;
              newuser.username=e.target.value;
              this.setState({newuser});
            }}></input><br></br>
            <label>Password : </label>
            <input type="password" placeholder="Enter Password" name="password" required required value={this.state.newuser.password} onChange={(e)=>{
              let {newuser}=this.state;
              newuser.password=e.target.value;
              this.setState({newuser});
            }}></input><br></br>
            <button className="button1" type="submit" onClick={this.adduser.bind(this)}>Login</button>
        </div>
        <div className="delusr">
            <h2>Delete User</h2>
            <label>Username : </label>
            <input type="text" placeholder="Enter Username to be deleted" name="username" required value={this.state.delusr} onChange={(e)=>{
             this.setState({
               delusr:e.target.value
             })
            }}></input><br></br>
            <button className="button1" type="submit" onClick={this.deluser.bind(this)}>Login</button>
        </div></div>
        <div>
          <div id="error">
          </div>
          <br></br><br></br>
          <div>
          <NavLink to="/cat">Categories</NavLink></div>
          <br></br><br></br>
        </div>
        </div>
    );  
  }
}

export default User;
