import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);  // Count of items in cart
  const [totalAmount, setTotalAmount] = useState(0);  // Total price
   const[itemsInCart,setItemsInCart]=useState(0);
  const clearCart = () => {
    setCart([]);
    setTotalAmount(0); 
    setItemsInCart(0);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    }
    setCartCount(prevCount => prevCount + 1);
    setTotalAmount(prevTotal => prevTotal + product.price);
  };


  const increaseQuantity = (id) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const updatedCart = cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      setCartCount(prevCount => prevCount + 1);
      setTotalAmount(prevTotal => prevTotal + item.price);
    }
  };

  const decreaseQuantity = (id) => {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
      const updatedCart = cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
      setCartCount(prevCount => prevCount - 1);
      setTotalAmount(prevTotal => prevTotal - item.price);
    } else {
      removeItem(id);
    }
  };

  const removeItem = (id) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
      setCartCount(prevCount => prevCount - item.quantity);
      setTotalAmount(prevTotal => prevTotal - item.price * item.quantity);
    }
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, totalAmount, addToCart, increaseQuantity, decreaseQuantity, removeItem ,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
