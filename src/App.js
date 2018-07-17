import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'


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
        {this.props.showLoginPage ? <Login loggedIn={this.props.loggedIn}/> : null}


        {/* <svg height="200" width="300" style={{border: "1px solid #16a085"}} viewBox="0 0 100 100">
          <path d="M 20 20 C 20 110, 110 110, 110 20" stroke="green" fill="transparent"/>

          <path d="M 20 20 V 80 H 50" stroke="black" stroke-width="2" fill="transparent" />
        </svg>

        <svg>
        <circle cx={100} cy={100} r={50} />
        </svg>

       <svg>
       <g fill="white" stroke="green" stroke-width="5">
        <circle cx="40" cy="100" r="25" />
        <circle cx="60" cy="60" r="25" />
      </g>
       </svg> */}

      </div>
    );
  }
  handleLogout=()=>{
    this.props.logOut("LOGOUT_EVENT");
    localStorage.removeItem("token");
  }

  // setSearch=(data)=> {
  //   const action = {
  //     type: "LOAD_EVENT", // variety of things
  //     payload: {
  //       data: data,
  //       // value: event.target.value,
  //     } // bunch of stuff being delivered
  //   }
  //   this.props.dispatch(action);
  // }


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

