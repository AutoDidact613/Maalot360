import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  currentUser: null,
  logoutUser: () => {},
  loginUser: () => {},
  registerUser: () => {},
  users: [],
  addUser: () => {},
  getUsers: () => [],
  isAdmin: false  // הוספת שדה לזהות אם המשתמש הוא מנהל
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);  // מצב לזיהוי אם המשתמש הוא מנהל

  const addUser = (userData) => {
    setUsers((prevUsers) => [...prevUsers, userData]);
  };

  const getUsers = () => users;

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAdmin(false);  // נוודא שכאשר המשתמש מתנתק, הסטטוס לא יהיה מנהל
  };

  const loginUser = (userData) => {
    setCurrentUser(userData);

    const adminPassword = "1234"; 
    const adminEmail="manager@gmail.com";

     // תעודת זהות של המנהל
    if (userData.password === adminPassword &&userData.email===adminEmail) {
      setIsAdmin(true);  //  , הפוך את המשתמש למנהל
    } else {
      setIsAdmin(false);
    }
  };

  const registerUser = (userData) => {
    setCurrentUser(userData);
    addUser(userData);

    const adminID = "123456789";  // תעודת זהות של המנהל
    if (userData.idNumber === adminID) {
      setIsAdmin(true);  // אם תעודת הזהות היא של המנהל, הפוך את המשתמש למנהל
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
        addUser,
        getUsers,
        isAdmin  // נוסיף את הסטטוס של המנהל פה
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
