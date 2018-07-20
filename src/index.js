import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer'


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

// store.dispatch = addLoggingToDispatch(store);

console.log(store);
console.log('after createStore', store.getState());


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
