import React, { useState } from 'react';
import '../css/EditProducts.css';


const EditProducts = ({ products, updateProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleSave = () => {
    updateProduct(selectedProduct);
    setSelectedProduct(null);
  };

  return (
    <div className="edit-products-container">
      <h3 className="title">ניהול מוצרים</h3>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <span className="product-name">{product.name}</span>
            <span className="product-price">{product.price}</span>
                <span className="product-quantity">{product.quantity}</span>
                <span className="product-description">{product.description}</span>
                <span className="product-image">{product.image}</span>
            <button className="edit-button" onClick={() => handleEdit(product)}>
              ערוך
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="edit-section">
          <h4>עריכת מוצר: {selectedProduct.name}</h4>
          <input
            type="text"
            className="edit-input"
            value={selectedProduct.name}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, name: e.target.value })
            }
          />
          <button className="save-button" onClick={handleSave}>
            שמור
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProducts;
