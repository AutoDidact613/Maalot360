import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

function Login() {
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      loginUser(formData.email, formData.password);
      navigate('/');
  };
  

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="login-container">
            <h2>התחברות</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>אימייל:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>סיסמא:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">התחבר</button>
            </form>
        </div>
    );
}

export default Login;
