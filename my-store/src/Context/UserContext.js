import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  currentUser: null,
  logoutUser: () => {},
  loginUser: () => {},
  registerUser: () => {},
  users: [],
  products: [],
  addUser: () => {},
  getUsers: () => [],
  updateProduct: () => {}, 
  isAdmin: false,
});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { password: '1234', name: 'manager', email: 'manager@gmail.com', isAdmin: true },
    { password: '2', name: 'yaeli', email: 'y@gmail.com', isAdmin: false },
    { password: '3', name: 'miri', email: 'm@gmail.com', isAdmin: false },
    { password: '4', name: 'bimyamin', email: 'bimyamin@gmail.com', isAdmin: false },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ]);

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const addUser = (userData) => {
    setUsers((prevUsers) => [...prevUsers, userData]);
  };

  const getUsers = () => users;

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const loginUser = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.isAdmin);

    } else {
      alert('Invalid email or password');
    }
  };

  const registerUser = (userData) => {
    setCurrentUser(userData);
    addUser(userData);

    const adminEmail = 'manager@gmail.com';
    const adminPassword = '1234';
    if (userData.email === adminEmail && userData.password === adminPassword) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        logoutUser,
        loginUser,
        registerUser,
        users,
        products,
        addUser,
        getUsers,
        updateProduct, // הוספת הפונקציה לפנל של הקונטקסט
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
