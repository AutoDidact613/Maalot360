import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import Login from './components/Login';
import Register from './components/Register';
import { UserProvider } from './Context/UserContext';
import './css/App.css';
import { CartProvider } from './Context/CartContext';
import PerchasePage from './components/PerchasePage';
import AdminPanel from './components/AdminPanel'; // ייבוא רכיב דף מנהל


// מידע על המוצרים

function App() {
  const [products,setProducts] = useState([
    {
      id: 1,
      name: 'Nalgene Water Bottle - On the Fly',
      price: 17.00,
      description: 'High-flow drinking spout easy to fill at the fountain or sink.',
      image:'bottle.jpg',
    },
    {
      id: 2,
      name: 'Portable Clip-On Fan - Battery Operated or USB 4-Inch',
      price: 19.00,
      description: 'Keep cool in your bunk, dorm or room!',
      image: 'fan.jpg',
    },
    {
      id: 3,
      name: 'Plush Velour Terry Boys Bathrobe',
      price: 50.00,
      description: 'Great bathrobe for walking to and from the pool.',
      image: 'roob.jpg',
    },
    {
      id: 4,
      name: 'Ozark Trails Folding Camp Chair',
      price: 24.00,
      description: 'This chair is perfect for use at camp, tailgating, or on the sidelines at your children’s game. ',
      image: 'CampChair.jpg',
    },
    {
      id: 5,
      name: 'Extra Large Rolling Soft Trunk Duffel Bag 36" - Personalization Available',
      price: 94.00,
      description: 'Great trunk for air travel, sleep-away camp, college and more! ',
      image: 'duffleBag.jpg',
    },
    {
      id: 6,
      name: 'Popup Shower Caddy',
      price: 9.00,
      description: 'A perfect way to carry all your personal care items right into the shower! ',
      image: 'shower.jpg',
    },
    {
      id: 7,
      name: 'Speedo Hydrospex® Classic Goggles Adult Size',
      price: 50.00,
      description: 'Speedo’s best-selling recreational goggle. A soft one-piece frame fits comfortably against the face and adjusts with a soft silicone split head strap',
      image: 'speedo.jpg',
    },
    {
      id: 8,
      name: 'Make Your Bed Package',
      price: 60.00,
      description: 'Make your bed complete & cozy! Get everything you need for your bed in this neat package, and save money at the same time!',
      image: 'bed_Package.jpg',
    },
    {
      id: 9,
      name: 'Stick-On Clothing Name Labels - Laundry Safe - Cool Designs',
      price: 20.00,
      description: 'Our laundry safe clothing labels will stay on through the wash. No need to iron or sew name tags onto your garments any more. Our stick-on clothing labels are sure to prevent lost clothing and other property. ',
      image: 'label.jpg',
    },

  ]);
  

 

  return (
    <Router>
      <div className="App">
        <Navbar />
        <UserProvider  products={products}setProducts={setProducts} >
        <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage products={products} />} />
          <Route path="/products/:id" element={<ProductDetails products={products} />}   />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/purchase" element={<PerchasePage />} />
          <Route path="/admin" element={<AdminPanel />} />


        </Routes> 
        </CartProvider>
         </UserProvider>

      </div>
    </Router>
  );
}

export default App;
