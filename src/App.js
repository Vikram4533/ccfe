import React, { Component } from 'react';
import Acts from './components/Acts'
import User from './components/User';
import Cats from './components/Cats'
import Addact from './components/Addact'
import {BrowserRouter,Route,Switch} from "react-router-dom";

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
        <Route path="/" component={User} exact />
        <Route path="/cat" component={Cats}/>
        <Route path="/acts/:catname" component={Acts}/>
        <Route path="/aa" component={Addact}/>
        </Switch>
      </BrowserRouter>
    );  
  }
}

export default App;
