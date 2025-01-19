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
      <h3 className="title">Product Management</h3>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <span className="product-name">{product.name}</span>
            <span className="product-price">Price: ${product.price}</span>
            <span className="product-quantity">Quantity: {product.quantity}</span>
            <span className="product-description">Description: {product.description}</span>
            <span className="product-image">Image: {product.image}</span>
            <button className="edit-button" onClick={() => handleEdit(product)}>
              Edit
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="edit-section">
          <h4>Edit Product: {selectedProduct.name}</h4>
          <input
            type="text"
            className="edit-input"
            value={selectedProduct.name}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, name: e.target.value })
            }
            placeholder="Product Name"
          />
          <input
            type="number"
            className="edit-input"
            value={selectedProduct.price}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })
            }
            placeholder="Product Price"
          />
          <input
            type="number"
            className="edit-input"
            value={selectedProduct.quantity}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, quantity: parseInt(e.target.value) })
            }
            placeholder="Product Quantity"
          />
          <textarea
            className="edit-input"
            value={selectedProduct.description}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, description: e.target.value })
            }
            placeholder="Product Description"
          />
          <input
            type="text"
            className="edit-input"
            value={selectedProduct.image}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, image: e.target.value })
            }
            placeholder="Product Image URL"
          />
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProducts;
