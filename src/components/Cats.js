import React, { Component } from 'react';
import {Modal,FormGroup,ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './app.css';
import Acts from './Acts';
import {NavLink} from "react-router-dom";

class Cats extends Component {
    state={
        cats: {},
        catnam:[],
        catn:'',
        newcat:false
      }
  componentWillMount(){
        axios.get('http://54.197.76.100:8000/api/v1/categories').then((response) => {
        this.setState({
          cats:response.data
        })
      });
    }
  
  del(cat){
    axios.delete("http://54.197.76.100:8000/api/v1/categories/"+cat);
    document.getElementById(cat).remove();
  }

  toggleNewCatModel(){
    this.setState({
      newcat:true
    });
  }

  toggleNewCatModeloff(){
    this.setState({
      newcat:false
    });
  }

  listacts(catname){
    console.log(catname)
  }

  addcat(){
    this.state.catnam.push(this.state.catn);
    axios.post("http://54.197.76.100:8000/api/v1/categories",this.state.catnam)
      .then((response)=>{
        console.log(response.status)
        this.state.catnam.pop()
        console.log("success");
        document.getElementById("tab").innerHTML +=`<tr key=${this.state.catn} id=${this.state.catn}><td>${this.state.catn}</td><td>0</td><td><button className='but'>Acts</button></td><td><button className='but' onClick=${this.del.bind(this,this.state.catn)}>Delete</button></td></tr>`;
      })
      .catch((error)=> {
        document.getElementById("error").innerHTML = "category exist";
        console.log("error");
        this.state.catnam.pop()
      });
  }


 
  render() {
    const {cats} = this.state;
    return(
      <div>
      <button color="primary" className="but" onClick={this.toggleNewCatModel.bind(this)}>Add Category</button>
      <Modal isOpen={this.state.newcat} toggle={this.toggleNewCatModel.bind(this)}>
          <ModalHeader toggle={this.toggleNewCatModeloff.bind(this)}>Add Category</ModalHeader>
          <ModalBody>
            <FormGroup>
             <label>Category Name</label>
             <input type="text" placeholder="Enter Name" name="catn" required required value={this.state.catn} onChange={(e)=>{
              let {catn}=this.state;
              catn=e.target.value;
              this.setState({catn});
            }}></input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <button color="primary" onClick={this.addcat.bind(this)}>Add</button>
          </ModalFooter>
        </Modal>  
      <div className="cats">
      <table>
        <tbody id="tab"> 
        {   
          Object.keys(cats).map((key, index) => ( 
            <tr key={index} id={key}>
              <td>{key}</td>
              <td>{cats[key]}</td>
              <td><NavLink to={"/acts/"+key}>ACTS</NavLink></td>
              <td><button className="but" onClick={this.del.bind(this,key)}>Delete</button></td>
            </tr>
          ))
        }
        </tbody>
      </table></div>
      <div id="error"></div>
      <br></br><br></br>
      <NavLink to="/aa">ADD ACT</NavLink>
      </div>  
    );  
  }
}

export default Cats;
