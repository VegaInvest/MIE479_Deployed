import react, { useState,useEffect } from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';


/*Login form */
const Login = () => {
/* Defining a state*/
const [values, setValues] = useState(
    {
    email: "",
    password: "",    
    }
);

/* Error message */
const [error, setError] = useState("");

const [getPostMessage, setGetPostMessage] = useState({});

const handleEmailChange = (event) => {
    setValues({...values, email: event.target.value})
}
const handlePasswordInputChange = (event) => {
    setValues({...values, password: event.target.value})
}

let navigate = useNavigate();

useEffect(() => {
    if (getPostMessage.Status=='found') {
        navigate("../dashboard", 
        {
            state: {
              values
            }
          });
      }
    else {
        /*We want to store the error messsage */
        setError(getPostMessage.Status);

    }
        
}, [getPostMessage])

/*We check if the email and pw match the DB */
 const HandleLogin = () => {
    var fullurl='http://127.0.0.1:5000/users/login';
    axios.post(fullurl, values).then(response => {
        setGetPostMessage(response.data)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
}



return (

    <div className="Login-container">
        <div className="LoginHeader"> 
        Welcome to VegaInvest!
        </div>
        <div className="form"> 
        {/* Define a form with the email and pw input*/}
        <form className="Login-form">
            <input 
            onChange={handleEmailChange}
            type="email"
            value={values.email}
            className="form-field"
            placeholder="Enter Your Email"
            name="email"
            /> 
            <br />
            <input 
            onChange={handlePasswordInputChange}
            values={values.password}
            className="form-field"
            type="password"
            placeholder="Enter Your Password"
            name="password"
            />
            <br />
        <div id="errorMessage"> {error} </div>
        <br />
        {/* Login and Sign Up Buttons*/}
        <Button onClick={HandleLogin} variant="secondary" className="LoginBtn" id="BtnLogin"> Log In </Button>
        <br />
        <Link to="/createuser" style={{ textDecoration: 'none', color: 'black' }}> 
        <Button variant="dark" className="LoginBtn" id="SignUp"> 
        Sign Up 
        </Button>
        </Link> 
        
        </form>
        </div>
    </div>
  );

}
export default Login