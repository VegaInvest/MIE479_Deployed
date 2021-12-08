import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPg from './pages/LoginPg/LoginPg.js';
import CreateUser from './pages/CreateUser/CreateUser.js';
import Questionnaire from './pages/questionnaire/questionnaire.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import PortfolioSum from './pages/PortfolioSum/PortfolioSum.js';
import Editquestionnaire from './pages/editquestionnaire/editquestionnaire.js';
import LoadingDet from './pages/LoadingDet/LoadingDet.js';
ReactDOM.render(
  <React.StrictMode>
     <Router>
    <Routes>
      {/* This defines all routes/pages */}
      <Route path="/" exact element={<LoginPg />} />
      <Route path="/createUser" exact element={<CreateUser />} />
      <Route path="/question" exact element={<Questionnaire />} />
      <Route path="/editquestion" exact element={<Editquestionnaire />} />
      <Route path="/loading" exact element={<LoadingDet />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/portfoliosum" exact element={<PortfolioSum/>} />
    </Routes>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
