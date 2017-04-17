import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import reducers from './reducers';

let middleware = []
if(process.env.NODE_ENV !== 'production'){
  middleware.push(createLogger())
} 

const store = createStore(reducers,applyMiddleware(...middleware))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
