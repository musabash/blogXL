import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import './index.css';
import App from './App';
import { UserContextProvider } from './contexts/UserContext';
import { GlobalStyles } from './global-styles';

ReactDOM.render(
  <UserContextProvider>
    <Router>
      <GlobalStyles />
      <App />
    </Router>
  </UserContextProvider>,
  document.getElementById('root')
);