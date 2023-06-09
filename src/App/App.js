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
import Four from '../404/404';
import WishList from '../WishList/WishList';



function App() {
  return (
    <Router>
    <div className="app">
      <Navigation/>
      <div className="container">
      <Aside/>
      <Main >
      <Switch>
        <Route path="/" exact component={Events}></Route>
        <Route path="/events" exact component={Events}></Route>
        <Route path="/create"  component={CreateEvent}></Route>
        <Route path="/wishList" component={WishList}></Route>
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
