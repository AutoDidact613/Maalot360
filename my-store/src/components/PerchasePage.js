import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import '../css/purchasePage.css';
const PerchasePage = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleConfirmPerchase = () => {
    setIsConfirmed(true);

    setTimeout(() => {
      clearCart(); // ריקון העגלה אחרי 3 שניות
    }, 7000);

    setTimeout(() => {
      navigate('/'); // ניווט לדף הבית אחרי 6 שנייה
    }, 6000);
  };

  const handleGoToProducts = () => {
    navigate('/products'); // ניווט לדף המוצרים
  };

  return (
    <div className="purchase-page">
      <h1>Purchase Summary</h1>
      {cart.length === 0 ? (
        <div>
          <p className="empty-cart-message">Your cart is empty, please add items to proceed.</p>
          <button 
            className="go-to-products-btn" 
            onClick={handleGoToProducts}
          >
            Go to Products
          </button>
        </div>
      ) : (
        <div>
          <ul className="purchase-items">
            {cart.map((product, index) => (
              <li key={index} className="purchase-item">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="item-image"
                />
                <div className="item-details">
                  <h3 className="item-name">{product.name}</h3>
                  <p className="item-price">₪{product.price} x {product.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div class="total-container">
  <p class="total">Total:$ {totalAmount}</p>
  <p class="invoice-info">A confirmation email with the invoice will be sent to your email address.</p>
</div>


          {/* כפתור "Confirm Purchase" יוצג רק אם יש מוצרים בעגלה */}
          {cart.length > 0 && !isConfirmed && (
            <button 
              className="confirm-btn"
              onClick={handleConfirmPerchase}
            >
              Confirm Purchase
            </button>
          )}

          {isConfirmed && (
            <p>Thank you for your purchase! An invoice has been sent to your email.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PerchasePage;
