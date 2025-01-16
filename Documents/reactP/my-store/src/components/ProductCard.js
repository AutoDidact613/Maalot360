import React from 'react';
import '../css/ProductsCard.css';
export const ProductCard = ({ product }) => {
   return (
     <div className="product-card">
       <h3 className="product-title">{product.name}</h3>
       <img 
         src={product.image} 
         alt={product.name} 
         className="product-image"
       />
       <div className="product-price">₪{product.price}</div>
       {product.showDetails && (
         <p className="product-description">{product.description}</p>
       )}
     </div>
   );
};

export const ProductsGrid = ({ products }) => {
   return (
     <div className="products-grid">
       {products.map(product => (
         <ProductCard key={product.id} product={product} />
       ))}
     </div>
   );
};
