import React, { useState, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>אימייל</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label>סיסמא</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>אימות סיסמא</label>
          <input
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type='submit'>הרשמה</button>
      </form>
    </div>
  );
};

export default Register;
