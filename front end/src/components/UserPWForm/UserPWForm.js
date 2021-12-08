import react, { useState ,useEffect} from 'react'
import './UserPWForm.css'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

/*This allows the user to create a PW and then store it in the DB */
const UserPwForm = () => {

const [values, setValues] = useState(
    {
    email: "",
    password: "",
    confirmpassword: "",   
    }
);

const [Errormsg,setErrormsg] = useState("")

const handleEmailChange = (event) => {
    setValues({...values, email: event.target.value})
}

const handlePasswordInputChange = (event) => {
    setValues({...values, password: event.target.value})
    
}
const handleConfirmPasswordInputChange = (event) => {
    setValues({...values, confirmpassword: event.target.value})
}

const [getPostMessage, setGetPostMessage] = useState({});

let navigate = useNavigate();

useEffect(() => {
    if (getPostMessage.Status=='registered') {
        console.log("inside");
        navigate("../question", 
        {
            state: {
              values
            }
          });
      }
    else {
        setErrormsg(getPostMessage.Status);

    }
        
}, [getPostMessage])

const HandleRegister = () => {
    if (values.password==values.confirmpassword){
    var fullurl='http://127.0.0.1:5000/users/register';
    /*Attempts to post the password and email to the DB */
    axios.post(fullurl, values).then(response => {
        setGetPostMessage(response.data)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
}
    else {
        console.log("passwords don't match");
        setErrormsg("Passwords don't match!");
    }
}
return (

    <div className="UserPWForm-container">
        <div className="UserPWFormHeader">
        Register Email and Password
        </div>
        <div className="form">
        <form className="UserPW-form">
            <input
            onChange={handleEmailChange}
            type="email"
            value={values.email}
            className="form-field"
            placeholder="Enter your Email"
            name="email"
            />
            <br />
            <input
            onChange={handlePasswordInputChange}
            value={values.password}
            className="form-field"
            placeholder="Enter a Password"
            name="password"
            type="password"
            />
            <br />
            <input
            onChange={handleConfirmPasswordInputChange}
            value={values.confirmpassword}
            className="form-field"
            placeholder="Confirm Password"
            name="confirmpassword"
            type="password"
            />
            <br />
            <div className="errMessage"> {Errormsg} </div>
            <br />
            <Button onClick={HandleRegister} variant="secondary" className="UserPWBtn"> Create New User </Button>
            </form>    
        </div>
    
    </div>
  );

}
export default UserPwForm