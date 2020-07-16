import React, { Component } from 'react';
import './App.css';
import NavBar from './components/layouts/NavBar';
import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import Footer from './components/layouts/Footer';
import Profile from './components/screens/Profile';
import { connect } from 'react-redux';
import { CHECK_AUTH } from './redux/actions/authActions';
import ModalLogout from './components/layouts/modalLogout';
import NewPost from './components/screens/NewPost';



class App extends Component {
 
  render(){
    this.props.Check_Auth();
  return (
      <div className="App">
        <NavBar onLoginClick={this.onLoginClick}/>
        <Switch>
           <Route exact path="/" component={Home} />
           <Route exact path="/login" component={SignIn} />
           <Route exact path="/signup" component={SignUp} />
           <Route path="/:username" component={Profile} />
           <Route exact path="/newpost" component={NewPost} />
           <Redirect to="/"/>
        </Switch>
        <ModalLogout ref={this.loginModalRef}/>
        <Footer/>
      </div>
  );
  }
}



const mapDispatchToProps=(dispatch)=>{
  return {
    Check_Auth:()=>{dispatch(CHECK_AUTH())}
  }
}



export default connect(null,mapDispatchToProps)(App);