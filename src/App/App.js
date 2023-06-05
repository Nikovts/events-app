import React from 'react';
import Navigation from '../Navigation/Navigation'
import './App.css';
import Aside from '../Aside/Aside';
import Events from '../Event/Events';
import Main from '../Main/Main';
import Footer from '../Footer/Footer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateEvent from'../CreateEvent/CreateEvent';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Four from '../404/404';
import Logout from '../Logout/Logout'



function App() {
  const isLOgin=sessionStorage.getItem('authtoken')!==null
  return (
    <Router>
    <div className="App">
      <Navigation isLOgin={isLOgin}/>
      <div className="Container">
      <Aside/>
      <Main >
      <Switch>
        <Route path="/" exact component={Events}></Route>
        <Route path="/AllEvents" exact component={Events}></Route>
        <Route path="/home" >WELLCOME</Route>
        <Route path="/Event"  component={CreateEvent}></Route>
        <Route path="/Profile"  component={Profile}></Route>
        <Route path="/Login"  component={Login}></Route>
        <Route path="/Register"  component={Register}></Route>
        <Route path="/Logout" component={Logout}></Route>
        <Route path="*" component={Four}></Route>
      </Switch>
      </Main>
      </div>
      <Footer/>
    </div>
    </Router>

  );
}

export default App;
