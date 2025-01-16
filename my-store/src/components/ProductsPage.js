import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ProductsPage.css';

const ProductsPage = ({ products }) => {
  return (
    <div>
      <h1 className="products-title">Our Products</h1>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-title">{product.name}</h3>
            <Link to={`/products/${product.id}`} className="product-link">
              <button className="product-button">View More Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
