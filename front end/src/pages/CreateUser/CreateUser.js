import './CreateUser.css';
import LogoHeader from '../../components/LogoHeader/LogoHeader.js';
import UserPWForm from '../../components/UserPWForm/UserPWForm.js';
/* This is the page where a user creates a login and password*/
function CreateUser() {
  return (
    <div className="CreateUser">
      <LogoHeader />
      {/* Form component */}
      <UserPWForm />
    </div>
  );
}

export default CreateUser;