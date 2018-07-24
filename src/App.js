import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import GameContainer from './components/GameContainer'
import {login, clickLogin, logout} from './actions'
import Adapter from './Adapter'

import { connect } from 'react-redux'

class App extends Component {
  componentDidMount(){
    const token = localStorage.getItem("token");
    if(!!token){
      const data = atob(token.split(".")[1]);
      this.props.loggedIn(data);
      // console.log(data)
    }
  }

  render() {
    Adapter.seedWords();

    return (
      <div className="App">
        <NavBar currentUserId={this.props.currentUserId}
        logOut={this.handleLogout}
        onClick={() => this.props.showLogin(!this.props.showLoginPage)}/>
        {this.props.showLoginPage ? 
        <Login loggedIn={this.props.loggedIn}/> : 
        <GameContainer />}

      </div>
    );
  }

  handleLogout=()=>{
    this.props.logOut();
    localStorage.removeItem("token");
  }



}

const mapStateToProps = (state) => {
  return {
    showLoginPage: state.showLoginPage,
    currentUserName: state.currentUserName,
    currentUserId: state.currentUserId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (data)=> dispatch(clickLogin(data)),
    loggedIn:(data) => dispatch(login(data)),
    logOut:() => dispatch(logout()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

