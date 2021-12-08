import react, { useState } from 'react'
import Vegalogo from './VegaInvestLogo.png'
import './LogoHeader.css'

const LogoHeader = () => {

return (

    <div className="Logoheader">
     <img alt="logo" src={Vegalogo} height='150px' width='200px' />
    </div>
  );

}
export default LogoHeader