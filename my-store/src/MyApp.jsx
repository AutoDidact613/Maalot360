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
    <> <div>
      <ProductsPage products={Products} />
    </div>
      <header>
        <nav>
          
        </nav>
      </header>

      <main>
        {/* הגדרנו ניתובים מעצמינו ולאן כל ניתוב יוביל אותנו */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/purchase" element={<PerchasePage />} />
          <Route path="/products" element={<ProductsPage products={Products} addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetails products={Products} />} />
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
