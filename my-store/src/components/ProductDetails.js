import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import '../css/ProductDetails.css';
import { useCart } from '../Context/CartContext'; 
const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const navigate = useNavigate(); // Navigation
  const { addToCart } = useCart(); // Access addToCart function from the context

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    // הוספת המוצר לסל דרך הקונטקסט
    // הלחיצה על הוסף לסל יפעיל את הפוקציה שהוגדרה בקונטקסט ותוסיף את המוצר לסל
    addToCart(product);
    // מעבר לעמוד CartPage
    navigate('/cart');
  };

  return (
    <div className="product-details">
      <h1 className="product-title">{product.name}</h1>
      <img src={`/${product.image}`} alt={product.name} className="product-image" />
      <div className="product-info">
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-description">{product.description}</p>
        {/* בלחיצה פה נשלח לפנקציה שהוגדרה בקונטקסט */}
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
