import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

function Register() {
    const navigate = useNavigate();
    const { registerUser } = useContext(UserContext);
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

const handleChange=(e)=>{
    setformData({ ...formData,[e.target.name]:e.target.value })
}
const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
        registerUser(formData);
        navigate('/login');
    } else {
        alert('הסיסמאות אינן תואמות');
    }
};


    return (
        <div className='register-container'>
            <h2>הרשמה</h2>
 <form onSubmit={handleSubmit}>
 <div>
    <label>שם מלא</label>
    <input
    type='text'
    name='name'
    value={formData.name}   
    onChange={handleChange}
    required
    />
  
 </div>

 <div>
    <label>אימייל </label>
    <input
    type='email'
    name='email'
    value={formData.email}   
    onChange={handleChange}
    required
    />
  
 </div>
 <div>
    <label>סיסמא: </label>
    <input
    type='password'
    name='password'
    value={formData.password}   
    onChange={handleChange}
    required
    />
  
 </div>

 <div>
    <label> אימות סיסמא:</label>
    <input
    type='password'
    name='confirmPassword'
    value={formData.confirmPassword}   
    onChange={handleChange}
    required
    />
 </div>
 <button type='submit' >הרשמה</button>
 </form>
        </div>
    )
}
export default Register