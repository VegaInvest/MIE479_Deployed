import react, { useState } from 'react'
import Vegalogo from './VegaLogoCon.jpeg'
import './Dashhead.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'


const Dashhead = () => {
/*Need to retrieve email */
const email = useLocation().state.values.email;
let navigate = useNavigate();
/* Need to define the path from this header to the edit portfolio details questionnaire*/
const NavQuest = () => {
    navigate("../editquestion", 
        {
            state: {email}
          });
}
return (
    <div className="Dashhead">
      <div> 
     <img alt="logo" src={Vegalogo} height='50px' width='75px' />
     </div>
     <div> 
     <DropdownButton id="dropdown-basic-button" title={email} id="dropBtn" variant="secondary">
       
    <Dropdown.Item href="/"> Logout  </Dropdown.Item>
    <Dropdown.Item  onClick={NavQuest}>  Edit Portfolio Details </Dropdown.Item>
    </DropdownButton>
    </div>
    </div>
  );

}
export default Dashhead;