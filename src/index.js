import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import FormStore from './libs/redux/FormStore.js';

import './index.css';
import App from './App';

//npm install redux react-redux @reduxjs/toolkit
//npm install react-router-dom
//npm install date-fns
//npm install date-fns/locale 
//npm install dayjs   
//npm install @date-io/date-fns


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Provider store={FormStore}>
        <App />
      </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
