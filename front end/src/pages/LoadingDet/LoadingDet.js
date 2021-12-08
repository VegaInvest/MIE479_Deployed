import './LoadingDet.css';
import react, { useState ,useEffect} from 'react'
import Dashhead from '../../components/Dashhead/Dashhead.js'
// import Plot from "react-plotly.js";
import Footer from '../../components/Footer/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

/* This is the Loading Page */
const LoadingDet= () => {

const pvalues=  useLocation().state
const [getPostMessage, setGetPostMessage] = useState({})
let navigate = useNavigate(); 
useEffect(() => {
    if (getPostMessage.Status=='portfolio created!') {
        console.log("inside");
        navigate("../", 
        {
          });
      }
    else {
      console.log(getPostMessage);
      console.log('error!');
      }        
}, [getPostMessage])

useEffect(() => {
  var fullurl='http://127.0.0.1:5000/portfolios/new';
  axios.post(fullurl, pvalues).then(response => {
      console.log(response.data)
      setGetPostMessage(response.data)
    }).catch(error => {
      console.log('yo')
    })
  },[]);
  return(
 <div className="LoadingDetbd">  
   <div> 
   </div>
   <div className="mainLoadingMSG">
      <div>
          Creating Portfolio...
      </div>
   </div>
   <div className="mainLoadingMSG">
         <Box sx={{ display: 'flex'}}>
      <CircularProgress size="200px" />
    </Box>
   </div>

    <div>
   <Footer> </Footer>
   </div>
  </div>
  );

}
export default LoadingDet