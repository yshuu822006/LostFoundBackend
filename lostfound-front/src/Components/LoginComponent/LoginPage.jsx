import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {validateUser} from "../../Services/LoginService";
 
const LoginPage=()=>{

let navigate=useNavigate();
    const [errors, setErrors] = useState({});
    const [loginData, setLoginData] =useState ({
      username: "",
      password: "",
    });
    const [flag,setFlag]=useState(true);
 
    const validateLogin=(e)=>{
      e.preventDefault();
      validateUser(loginData.username,loginData.password).then((response)=>{
       let role=String(response.data);
       if(role==="Admin")
            navigate('/admin-menu');
       else if(role==="Student")
           navigate('/student-menu');
      else
         setFlag(false);
      });
   }
   const  onChangeHandler = (event) =>{
      event.persist();
      setFlag(true);
      const name = event.target.name;
      const value = event.target.value;
      setLoginData(values =>({...values, [name]: value }));
  };
  const handleValidation = (event) => {
      event.preventDefault();
      let tempErrors = {};
      let isValid = true;
 
      if (!loginData.username.trim()) {
        tempErrors.username = "User Name is required";
        isValid = false;
      }
 
      if (!loginData.password.trim()) {
        tempErrors.password = "Password is required";
        isValid = false;
      }
 
      setErrors(tempErrors);
      if (isValid) {
        validateLogin(event);
      }
    };
    const registerNewUser=(e)=>{
      navigate('/register');
  }
  return(
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">User Login Page</h2>
          
          <form className="login-form">
            <div className="form-group-custom">
              <label className="form-label">User Name:</label>
              <input 
                placeholder="username" 
                name="username" 
                className="form-input"
                value={loginData.username} 
                onChange={onChangeHandler} 
              />
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>

            <div className="form-group-custom">
              <label className="form-label">Password:</label>
              <input 
                type="password"   
                name="password" 
                className="form-input"
                value={loginData.password} 
                onChange={onChangeHandler}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <button className='btn-submit' onClick={handleValidation}>Submit</button>
          </form>

          {!flag && <p className="error-message login-error">Invalid UserId or Password</p>}

          <button className='btn-register' onClick={(e) => registerNewUser(e)}>Register New User</button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;