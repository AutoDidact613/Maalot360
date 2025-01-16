import React from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../css/CartPage.css';

const CartPage = () => {
  const { cart, totalAmount, cartCount, increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const handleProceedToPurchase = () => {
    navigate('/purchase');
  };

  const handleGoToProducts = () => {
    navigate('/products');
  };

  return (
    <div className='cart-page'>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <ul className="cart-items">
          {cart.map((product, index) => (
            <li key={index} className="cart-item">
              <img 
                src={product.image} 
                alt={product.name} 
                className="item-image"
              />
              <div className="item-details">
                <h3 className="item-name">{product.name}</h3>
                <p className="item-price">${product.price}</p>
              </div>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  −
                </button>
                <span className="quantity">{product.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeItem(product.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
        <h3 className="total">Total: ${totalAmount}</h3>
        <h4 className="items-count">Items in cart: {cartCount}</h4>
      </div>
      <div className="cart-buttons">
        {cart.length > 0 && (
          <button 
            className="payment-btn"
            onClick={handleProceedToPurchase}
          >
            Proceed to Purchase
          </button>
        )}
        <button  className="back-to-products-btn"    onClick={handleGoToProducts}  >    ← Back to Products </button>  
      </div>
    </div>
  );
};

export default CartPage;
