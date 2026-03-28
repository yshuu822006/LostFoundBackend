import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {registerNewUser} from "../../Services/LoginService";

const RegisterUser=()=>{
    const [lostFoundUser,setLostFoundUser] = useState({
        username:"",
        password: "",
        personalName:"",
        email:"",
        role:"",
    });

  const [flag,setFlag]=useState(false);
  const [confirmPassword,setConfirmPassword]=useState("");
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const createNewUser = (event) => {
    event.preventDefault();
       if(lostFoundUser.password===confirmPassword){
         registerNewUser(lostFoundUser).then((response)=>{
          setFlag(true);
         });
    }
 };
 useEffect(() => {
  setFlag(false);
}, []);
 
const  onChangeHandler = (event) =>{
    event.persist();
    setFlag(false);
    const name = event.target.name;
        const value = event.target.value;
       setLostFoundUser(values =>({...values, [name]: value }));
   };
 
   const returnBack=()=>{
    navigate('/');
   }
 const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
 
    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
 
    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    else if (lostFoundUser.password.length < 5 || lostFoundUser.passwordlength > 10) {
       tempErrors.password="Password must be 5-10 characters long";
      isValid = false;
    }
    else if (lostFoundUser.password!==confirmPassword) {
      tempErrors.password="Both the passwords are not matched";
     isValid = false;
   }
 
  if (!lostFoundUser.personalName.trim()) {
        tempErrors.personalName = "Personal Name is required";
        isValid = false;
    }
if (!lostFoundUser.email.trim()) {
        tempErrors.email = "Email is required";
        isValid = false;
      }
      else if(!emailPattern.test(lostFoundUser.email)){
        tempErrors.email = "Invalid Email Format";
        isValid = false;
      }
    if (!lostFoundUser.role.trim()) {
        tempErrors.role = "Role is required";
        isValid = false;
      }
      if (!confirmPassword.trim()) {
        tempErrors.confirmPassword = "Confirm Password is required";
        isValid = false;
      }
 
   setErrors(tempErrors);
    if (isValid) {
        createNewUser(event);
    }
  };
 return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-center text-primary mb-4">
              New User Registration
            </h2>
            <form method="post">
  <div className="mb-3">
    <label className="form-label fw-bold">User Name</label>
    <input
      type="text"
      placeholder="Enter username"
      name="username"
      className="form-control form-control-lg"
      value={lostFoundUser.username}
      onChange={onChangeHandler}
    />
    {errors.username && <div className="text-danger small">{errors.username}</div>}
  </div>

  <div className="mb-3">
    <label className="form-label fw-bold">Password</label>
    <input
      type="password"
      placeholder="Enter password"
      name="password"
      className="form-control form-control-lg"
      value={lostFoundUser.password}
      onChange={onChangeHandler}
    />
    {errors.password && <div className="text-danger small">{errors.password}</div>}
  </div>

  <div className="mb-3">
    <label className="form-label fw-bold">Confirm Password</label>
    <input
      type="password"
      placeholder="Retype password"
      name="confirmPassword"
      className="form-control form-control-lg"
      value={confirmPassword}
      onChange={e => setConfirmPassword(e.target.value)}
    />
    {errors.confirmPassword && <div className="text-danger small">{errors.confirmPassword}</div>}
  </div>

  <div className="mb-3">
    <label className="form-label fw-bold">Personal Name</label>
    <input
      type="text"
      placeholder="Enter full name"
      name="personalName"
      className="form-control form-control-lg"
      value={lostFoundUser.personalName}
      onChange={onChangeHandler}
    />
    {errors.personalName && <div className="text-danger small">{errors.personalName}</div>}
  </div>

  <div className="mb-3">
    <label className="form-label fw-bold">Email</label>
    <input
      type="email"
      placeholder="Enter email"
      name="email"
      className="form-control form-control-lg"
      value={lostFoundUser.email}
      onChange={onChangeHandler}
    />
    {errors.email && <div className="text-danger small">{errors.email}</div>}
  </div>

  <div className="mb-4">
    <label className="form-label fw-bold">Role</label>
    <select
      name="role"
      className="form-select form-select-lg"
      value={lostFoundUser.role}
      onChange={onChangeHandler}
    >
      <option value="">Select Role</option>
      <option value="Student">Student</option>
      <option value="Admin">Admin</option>
    </select>
    {errors.role && <div className="text-danger small">{errors.role}</div>}
  </div>

  <div className="text-center">
    <button className="btn btn-primary btn-lg w-75" onClick={handleValidation}>
      Create Account
    </button>
  </div>
</form>
  {flag && (
              <div className="alert alert-success mt-3" role="alert">
                New User Created... Go to Login &nbsp;
                <button className="btn btn-sm btn-success" onClick={returnBack}>Login</button>
              </div>
            )}
         </div>
        </div>
       </div>
    </div>
   </div>
);
 
}

export default RegisterUser;