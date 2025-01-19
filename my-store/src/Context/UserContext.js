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

export const UserProvider = ({ children, products, setProducts }) => {
  const [users, setUsers] = useState([
    { password: '1234', name: 'manager', email: 'manager@gmail.com', isAdmin: true },
    { password: '124', name: 'moshe', email: 'm@gmail.com', isAdmin: false },

  ]);

  const [currentUser, setCurrentUser] = useState(null);
  //האם מנהל? מאותחל בשקר
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
//פונקצצית כניסה  למערכת
  const loginUser = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      // בדיקה אם המשתמש הוא מנהל
      setIsAdmin(user.isAdmin);
    } else {
      alert('Invalid email or password');
    }
  };

  const registerUser = (userData) => {
    const existingUser = users.find(user => user.email === userData.email);
  
    if (existingUser) {
      alert('This email is already registered.');
      return;
    }
  
    setCurrentUser(userData);
    addUser(userData);
  
//הגדרה מיהוא המנהל
    const adminEmail = 'manager@gmail.com';
    const adminPassword = '1234';
    //אם כל הנתונים שהוזמנו תואמים לנתוני המנהל אז זה יהיה אמת אם לא שקר.
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
        updateProduct,
        isAdmin,
      }}
    >
      {children} 
    </UserContext.Provider>
  );
};
