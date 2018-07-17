import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer'

// const initialState = {
//     showLoginPage: false,
//     // shows: [],
//     // selectedShow: null,
//     // searchTerm: "",
// }


// const reducer = (state = initialState, action, id) => {
//     console.log('state', state);
//     console.log('action', action);
//     // console.log('id:arg', id);
//     // console.log('id:meow', action.id);

//     switch(action.type) {
//       case "CLICK_EVENT":
//         const { data } = action.payload;
//         let found = state.shows.find( e => e.id === data)
//         return {...state, selectedShow: found }

//       case "LOAD_EVENT":
//         return { ...state, shows: action.payload.data }
//       case "LOGIN_EVENT":
//         return { ...state, showLoginPage: action.payload.data }
//     //   case "TOGGLE_DANCING":
//     //     return { ...state, dancing: !state.dancing }
//     //   case "SET_COUNTER":
//     //     return { ...state, counter: action.payload.value }
//       default:
//         return state;
//     }
  
//   }

const store = createStore(reducer);

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group("SPECIAL")
    console.log('%c before', 'color: blue', store.getState());
    const returnValue = rawDispatch(action);
    console.log('%c after', 'color: red', store.getState());
    console.groupEnd()
    return returnValue;
  }
}

store.dispatch = addLoggingToDispatch(store);

console.log(store);
console.log('after createStore', store.getState());


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
