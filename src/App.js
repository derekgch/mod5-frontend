import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import GameContainer from './components/GameContainer'


import { connect } from 'react-redux'

class App extends Component {
  render() {
    console.log("RENDER!")
    console.log(this.props.showLoginPage)

    return (
      <div className="App">
        <NavBar currentUserId={this.props.currentUserId}
        logOut={this.handleLogout}
        onClick={() => this.props.showLogin("CLICK_LOGIN_EVENT",!this.props.showLoginPage)}/>
        {this.props.showLoginPage ? 
        <Login loggedIn={this.props.loggedIn}/> : 
        <GameContainer />}

      </div>
    );
  }
  
  handleLogout=()=>{
    this.props.logOut("LOGOUT_EVENT");
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
    showLogin: (type, data)=> dispatch({type: type, payload:{data: data} }),
    loggedIn:(type, data) => dispatch({type: type, payload:{data: data}}),
    logOut:(type) => dispatch({type: type}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

