import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">

        <svg height="200" width="300" style={{border: "1px solid #16a085"}} viewBox="0 0 100 100">
          <path d="M 20 20 C 20 110, 110 110, 110 20" stroke="green" fill="transparent"/>

          <path d="M 20 20 V 80 H 50" stroke="black" stroke-width="2" fill="transparent" />
        </svg>

        <svg>
        <circle cx={100} cy={100} r={50} />
        </svg>

      </div>
    );
  }

  setSearch(data) {
    const action = {
      type: "LOAD_EVENT", // variety of things
      payload: {
        data: data,
        // value: event.target.value,
      } // bunch of stuff being delivered
    }
    this.props.dispatch(action);
  }


}

const mapStateToProps = (state) => {
  return {
    // shows: state.shows,
    // selectedShow: state.selectedShow,
    // searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    dispatch
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

