import React, { useContext } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import '../css/HomePage.css';
import bestImage from '../images/best.png'; // ייבוא התמונה
import { UserContext } from '../Context/UserContext';  // יבוא מ-Context של המשתמשים
import '../css/AdminButton.css';
const HomePage = () => {
  const { isAdmin } = useContext(UserContext);  // קבלת סטטוס המנהל
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');  // עובר לדף של המנהל
  };

  return (
    <div className="home-container">
      <Navbar />
        {/* כפתור המנהל */}
        {isAdmin && (
          <div className="admin-button-container">
            <button onClick={handleAdminClick}> manager Profile </button>
          </div>
        )}
      <main className="main-content">
        <h1 className="main-title">Pack For Camp</h1>

        <section className="welcome-section">
          <h2>All Your Summer Camp Needs Under One Roof</h2>
          <p>Soft Trunks, Labels, Laundry, Bunk Essentials & More </p>
          <p>Our mission is to provide high-quality products at affordable prices.</p>
          <p>At Pack For Camp, we believe summer should be filled with unforgettable memories, not stressful packing.</p> 
          <p>That’s why we provide high-quality products at affordable prices, making it easier than ever to prepare for camp.</p>
          <p>From durable trunks and personalized labels to cozy bedding and essential laundry supplies — we’ve got everything you need to make your camp experience smooth and enjoyable.</p>
        </section>
        
      

        {/* תמונה ברוחב מלא */}
        <div className="image-banner">
          <img src={bestImage} alt="Best Camp Gear" />
        </div>
        
        <p>All rights reserved Ⓒ </p>
      </main>
    </div>
  );
};

export default HomePage;
