import React, { Component } from 'react';
import axios from 'axios';
import './app.css';;

class Acts extends Component {
  state={
    acts: [],
    upvot: [],
    catname:''
  }
  componentWillMount(){
   // console.log("http://54.197.76.100:8000/api/v1/categories/"+this.props.match.params.catname+"/acts")
    axios.get("http://54.197.76.100:8000/api/v1/categories/"+this.props.match.params.catname+"/acts").then((response) => {
    this.setState({
      acts:response.data
    })
    console.log(response.data)
  });
}
  upvote(id){
    this.state.upvot.push(parseInt(id));
    console.log(this.state.upvot);
    axios.post("http://54.197.76.100:8000/api/v1/acts/upvote",this.state.upvot).then((response)=>{  
    this.state.upvot.pop()
    console.log(response)
    });
    document.getElementById(id).innerHTML=parseInt( document.getElementById(id).innerHTML)+1
  }


  render() {
    let acts=this.state.acts.map((acts)=>{
      return(
        <div className="act_con" key={acts.actid}>
        <center>
        <div>{acts.actid}</div>
        <div>{acts.username}</div>
        <div>{acts.categoryName}</div>
        <div>{acts.timestamp}</div>
        <div><img src={"data:image/jpeg;base64,"+acts.imgB64}/></div>
        <div>{acts.caption}</div>
        <div id={acts.actid}>{acts.upvote}</div>
        <div><button className="but" onClick={this.upvote.bind(this,acts.actid)}>UPVOTE</button></div>
        </center>
        </div>
      )
    });

    return(
      <div>
        {acts}
      </div>
    );  
  }
}

export default Acts;
