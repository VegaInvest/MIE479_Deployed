import './Keyportfacts.css';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import react, { useState,useEffect } from 'react'
import axios from 'axios';

const Keyportfacts = () => {
/* We need to revtrieve the email and other info from the backend*/
const email=  useLocation().state.values.email;
const [getMessage, setGetMessage] = useState({})

useEffect(() => {
    if (getMessage.Status=='Success') {
        console.log("inside");
      }
        
}, [setGetMessage])

useEffect(() => {
    var fullurl='http://127.0.0.1:5000/portfolios/pushParams/' + email;
    axios.get(fullurl).then(response => {
        console.log("SUCCESS")
        console.log(response.data);
        setGetMessage(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, [])
const HorzProgress=(getMessage.time_difference/getMessage.horizon)*100;
const GoalProgress=(getMessage.lastportval/getMessage.goal)*100;
let navigate = useNavigate();
const NavPort = () => {
    navigate("../portfoliosum", 
        {
            state: {email}
          });
}
const NavQuest = () => {
    navigate("../editquestion", 
        {
            state: {email}
          });
}


return (

    <div className="KeyContainer">
        <div className>
            <div className="Title"> 
            Key Portfolio Facts
            </div>
        </div>
        <div className="KeyRow">
            <strong style={{width: "12rem", marginLeft:'1rem'}}> Investment Horizon: </strong> <div> <ProgressBar style={{width: '15rem', marginTop: '5px'}} now={HorzProgress} /> </div>  <div style={{width: "5rem", marginLeft:"1rem"}}> {getMessage.horizon} years </div>
        </div>
        <div className="KeyRow">
            <strong style={{width: "12rem", marginLeft: '1rem'}}> Investment Goal: </strong> <div> <ProgressBar style={{width: '15rem', marginTop: '5px'}} now={GoalProgress} /> </div>  <div style={{width: "5rem", marginLeft: "1rem"}}> ${getMessage.goal} </div>
        </div>

        <div className="KeyRow"> 
        <strong> Risk Level: {getMessage.risk_appetite}</strong>
        </div>
        <div className="KeyRow">
            {/* These buttons allow the user to navigate to other pages */}
            <Button id="KeyHoldBtn" onClick={NavPort} variant="primary"> View Portfolio Holdings </Button>
            <Button onClick={NavQuest} id="KeyDetBtn" variant="secondary"> Edit Portfolio Details </Button> 
        </div>
    
    </div>
  );

}
export default Keyportfacts