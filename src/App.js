import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import GameContainer from './components/GameContainer'
import WordContainer from './components/WordContainer'
import {login, clickLogin, logout, clickMenu, setScore} from './actions'
import WordList from './components/WordList';
import ScoreBoard from './components/ScoreBoard'
import Multiplayer from './components/multi/multiContainer'

import { connect } from 'react-redux'

class App extends Component {
  componentDidMount(){
    document.body.style = 'background: #ECEFF1;';
    const token = localStorage.getItem("token");
    if(!!token){
      const data = JSON.parse( atob(token.split(".")[1]));
      
      this.props.loggedIn(data);
      // console.log(data)
    }
  }

  displayContent=() =>{
    let display = null;
    switch (this.props.menu) {
      case "math":
       display = <GameContainer 
       score = {this.props.score}
       setScore={this.props.setScore} />;
        break;
      case "word":
       display = <WordContainer 
       score = {this.props.score}
       setScore={this.props.setScore} />;
        break;
      case "list":
        display = <WordList 
        id= {this.props.currentUserId}/>;
        break;
      case "multi":
       display = <Multiplayer 
            score = {this.props.score}
            setScore={this.props.setScore}/>;
        break;

      case "score":
        display = <ScoreBoard 
        id= {this.props.currentUserId}/>;
        break;
      
      default:
      display = <Multiplayer 
      score = {this.props.score}
      setScore={this.props.setScore}/>;
        break;
    }
    //testing multiplayer
    return display;
  }


  handleLogout=()=>{
    this.props.logOut();
    localStorage.removeItem("token");
  }


  render() {
    return (
      <div className="App" style={{backgroundColor: "#ECEFF1"}}>
        <NavBar currentUserId={this.props.currentUserId}
        score = {this.props.score}
        userId = {this.props.currentUserId}
        logOut={this.handleLogout}
        clickMenu={this.props.clickMenu}
        onClick={() => this.props.showLogin(!this.props.showLoginPage)}/>
        {this.props.showLoginPage ? 
        <Login loggedIn={this.props.loggedIn}/> : this.displayContent()
        }
      </div>
    );
  }



}

const mapStateToProps = (state) => {
  return {
    showLoginPage: state.showLoginPage,
    currentUserName: state.currentUserName,
    currentUserId: state.currentUserId,
    menu: state.menu,
    score: state.score
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (data)=> dispatch(clickLogin(data)),
    loggedIn:(data) => dispatch(login(data)),
    logOut:() => dispatch(logout()),
    clickMenu: (data) => dispatch(clickMenu(data)),
    setScore: (data) => dispatch(setScore(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

