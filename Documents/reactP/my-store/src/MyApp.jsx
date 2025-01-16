import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import CartPage from "./components/CartPage";
import PerchasePage from "./components/PerchasePage";
import ProductsPage from "./components/ProductsPage";
import { useState } from 'react';
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";

const MyApp = () => {

  
  return (
    <>
        <div>
      <h1>Welcome to My Summer Camp Store!</h1>
      <ProductsPage products={Products} />
    </div>
      <header>
        <h1>Pack To Camp</h1>
        <nav>
          {/* ניווט בין הדפים באתר */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/purchase">Perchase Page</Link>
        </nav>
      </header>
      
      <main>
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/purchase" element={<PerchasePage />} />
  <Route path="/products" element={<ProductsPage products={Products} addToCart={addToCart} />} />
  <Route path="/products/:id" element={<ProductDetails products={Products}  />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>

      </main>
      
      <footer>
        <p>כל הזכויות שמורות</p>
      </footer>
    </>
  );
};

export default MyApp;
