import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  '../../Display.css';
import {getAllStudents, deleteUser} from '../../Service/LoginService';


const StudentReport = () => {
    let navigate = useNavigate();
    const [lostFoundUser,setLostFoundUser] = useState([]);

    const setAllStudents = () => {
        getAllStudents().then((response) => {
            setLostFoundUser(response.data);    
        });
    }

    useEffect(() => {
        setAllStudents();
    },[]);

    const returnBack = () => {
        navigate('/admin-menu');
    }
    const removeStudent = (id) => {
        deleteUser(id).then( response => {
           let remainStudents = lostFoundUser.filter((student) => student.Username!== id);
            setLostFoundUser(remainStudents);
            navigate('/student-report');
        });
    }
    return(
   <div className="text-center">
   <div>
     <h2 className="text-center">Student List</h2>
     <div className = "row">
       <table className = "table table-striped table-bordered">
         <thead>
           <tr>
             <th>User Id</th>
             <th>Personal Name</th>
             <th>Email</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
         {
           lostFoundUser.map((student, index) => (
           <tr key = {student.username}>
             <td>{student.username}</td>
              <td>{student.personalName}</td>    
              <td>{student.email}</td>
              <td><button style={{marginLeft: "10px"}} onClick={()=>removeStudent(student.username)} className="btn btn-danger">Delete</button></td>
           </tr>                                        
         ))
       }                        
     </tbody>
    </table>  
   <div>
    <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>
   </div>        
   </div>
  </div>
 </div>
);
}
export default StudentReport;