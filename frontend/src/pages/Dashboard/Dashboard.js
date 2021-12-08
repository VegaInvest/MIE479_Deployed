import react, { useState,useEffect } from 'react';
import './Dashboard.css';
import Dashhead from '../../components/Dashhead/Dashhead.js'
// import Plot from "react-plotly.js";
import PortfolioGraph from '../../components/PortfolioGraph/PortfolioGraph'
import Footer from '../../components/Footer/Footer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Keyportfacts from '../../components/Keyportfacts/Keyportfacts.jsx';
import axios from 'axios';

const Dashboard = () => {
/* Quering data from MongoDB and loading the user email */
  const email=  useLocation().state.values.email;
  const [getMessage, setGetMessage] = useState({})
  useEffect(() => {
    const url = 'https://vegainvest.herokuapp.com/'
    var fullurl= url + 'portfolios/pushParams/' + email;
    axios.get(fullurl).then(response => {
        console.log("SUCCESS")
        console.log(response.data);
        setGetMessage(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, [])
/* computing the return */
const rtotal=(getMessage.lastportval/getMessage.amount_invested -1)*100 ;
  

  return(

 <div className="Dashbd">  
   <div> 
     <Dashhead> </Dashhead>
   </div>

   <div className="Dashrowcontain">
     {/* This is a graph component */}
      <div> <PortfolioGraph></PortfolioGraph> </div>

{/* This is a table of statistics*/}
    <div className="Dashcolcontain">
      <div className="tb"> 
      <Table id="table" striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Portfolio Statistic</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr> 
      <td> Amount Invested $ </td>
      <td> {getMessage.amount_invested} </td> 
      </tr>
      <tr> 
      <td> Total Return % </td>
      <td>  {rtotal} </td> 
      </tr>
    <tr>
      <td> Annualized Return % </td>
      <td> {getMessage.returns} </td>
    </tr>
    <tr>
      <td> Annualized Volatility % </td>
      <td> {getMessage.vol} </td>
    </tr>
     <tr>
      <td> Annualized Sharpe Ratio % </td>
      <td> {getMessage.sharpe} </td>
    </tr>
  </tbody>
</Table>
</div>
   {/* This is the key portfolio facts components */}
<Keyportfacts> </Keyportfacts>
</div>
   </div>
   <div>
     {/* Footer components */}
   <Footer> </Footer>
   </div>
  </div>
  );

}
export default Dashboard