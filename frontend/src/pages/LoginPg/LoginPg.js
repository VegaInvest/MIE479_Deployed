import './LoginPg.css';
import LogoHeader from '../../components/LogoHeader/LogoHeader.js';
import Login from '../../components/LoginForm/Login.js';

/*This is the Login Page */
function LoginPg() {
  return (
    <div className="LoginPg">
    {/*Login Page Header */}
      <LogoHeader />
    {/* Login Page Form */}
      <Login />
      
    </div>
  );
}

export default LoginPg;
