import React, { createContext, useState, useContext } from 'react';

const UserContext1 = createContext({
    users: [],
    currentUser: null,
    isAdmin: false,
});

function UserProvider({ children }) {
    const [users, setUsers] = useState([
        { password: 1, name: 'manager', email: 'manager@gmail.com', isAdmin: true },
        { password: 2, name: 'yaeli', email: 'y@gmail.com', isAdmin: false },
        { password: 3, name: 'miri', email: 'm@gmail.com', isAdmin: false },
        { password: 4, name: 'bimyamin', email: 'bimyamin@gmail.com', isAdmin: false },
    ]);

    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // הגדרת מצב isAdmin

    // login function
    const loginUser = (email, password) => {
        const user = users.find(
            (user) => user.email === email && user.password === password
        );
        if (user) {
            setCurrentUser(user);
            setIsAdmin(user.isAdmin); // שימוש נכון ב-setIsAdmin
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <UserContext1.Provider value={{ users, currentUser, isAdmin, loginUser }}>
            {children}
        </UserContext1.Provider>
    );
}

function AdminPanel() {
    const { users, isAdmin } = useContext(UserContext1);
    if (!isAdmin) {
        return <div>You are not authorized to view this page.</div>;
    }
    return (
        <div>
            <h2>פאנל מנהל</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.email}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { UserProvider, UserContext1, AdminPanel };
