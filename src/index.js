import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import './index.css';
import App from './App';
import { UserContextProvider } from './contexts/UserContext';

ReactDOM.render(
  <UserContextProvider>
    <Router>
      <App />
    </Router>
  </UserContextProvider>,
  document.getElementById('root')
);