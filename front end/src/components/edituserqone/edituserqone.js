import react, { useState,useEffect } from 'react'
import './edituserqone.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';

const Edituserqone = () => {

/* Fetching values from the back end*/
const email=  useLocation().state.email;
const values = {
  email: email,
}
const [pvalues, setpValues] = useState(
    {
    amount_invest: "",
    goal: "",
    horizon: "", 
    risk_appetite: "",  
    }
);
const handleGoalChange = (event) => {
    setpValues({...pvalues, goal: event.target.value})
}
const handleHorizonChange = (event) => {
    setpValues({...pvalues, horizon: event.target.value})
}
const handleAmountInvestChange = (event) => {
    setpValues({...pvalues, name: event.target.value})
}

const onChangeMC = (event) => {
  setpValues({...pvalues, risk_appetite: event.target.value});

}

let navigate = useNavigate();


const HandlePortfolio = () => {
  /*if (isNaN(parseInt(pvalues.horizon))) {
    setErrormsg('Invalid Horizon!');
  }
  else if (isNaN(parseInt(pvalues.goal))) {
    setErrormsg('Invalid Goal!');
  }
  else if (isNaN(parseInt(pvalues.amount_invest))) {
    setErrormsg('Invalid Amount Invested!');
  }
  else if (parseInt(pvalues.amount_invest)<=0) {
    setErrormsg('Invalid Amount Invested!');
  }
  else if (parseInt(pvalues.goal)<=0) {
    setErrormsg('Invalid Goal!');
  }
  else if (parseInt(pvalues.horizon)<=0) {
    setErrormsg('Invalid Horizon1');
  }
  else if (parseInt(pvalues.goal) <= parseInt(pvalues.amount_invest)){
    setErrormsg('Goal Must Exceed Amount Invested!');
  }
  else if (pvalues.risk_appetite==="") {
    setErrormsg('You must select a Risk Level!')
  }

  else {
  */
  navigate("../dashboard", 
        {
        state: {values}
        });
}

return (
  <form>
 <div className="mccontainer"> 
 <div className="question"> 
 {/* Questions of the questionnaire */}
 1. What is your risk tolerance for this portfolio?
 </div> 
   <div className="rad" onChange={onChangeMC}>
        <input type="radio" value="high" name="risk" /> High, bring it on!
        <br />
        <input type="radio" value="medium" name="risk" /> Moderate, some risk for some reward.
        <br />
        <input type="radio" value="low" name="risk" /> Low, losing money makes me squirm.
        <br /> 
      </div>
<div className="question">
   2. How much do you have to invest? 
    </div>
  <input
            onChange={handleAmountInvestChange}
            value={pvalues.amount_invest}
            className="formfield"
            placeholder={pvalues.amount_invest}
            name="amount_invest"
  />
   <div className="question">
  3. What is your investment goal?
  </div>
 <input
            onChange={handleGoalChange}
            value={pvalues.goal}
            className="formfield"
            placeholder={pvalues.goal}
            name="goal"
  />
  <div className="question">
    4. What is your investment horizon?
    </div>
    <input
            onChange={handleHorizonChange}
            value={pvalues.horizon}
            className="formfield"
            placeholder={pvalues.horizon}
            name="horizon"
  /> 
  {/* Creating the button and defining how it responds to a click */}
<Button variant="secondary"  onClick= {HandlePortfolio}  className="pBtn"> Recalculate Portfolio </Button>
</div>
 </form>
  );

}
export default Edituserqone