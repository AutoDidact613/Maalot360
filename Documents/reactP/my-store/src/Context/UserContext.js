import React, { createContext, useState } from 'react';

export const UserContext = createContext({
    currentUser: null,
    logoutUser: () => {},
    loginUser: () => {},
    registerUser: () => {}
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const logoutUser = () => {
        setCurrentUser(null);
    };

    const loginUser = (userData) => {
        setCurrentUser(userData);
    };

    const registerUser = (userData) => {
        setCurrentUser(userData);
    };

    return (
        <UserContext.Provider value={{
            currentUser,
            logoutUser,
            loginUser,
            registerUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
