import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

const AdminPanel = () => {
  const { users } = useContext(UserContext);  // קבלת רשימת המשתמשים

  return (
    <div>
      <h1>פאנל המנהל</h1>
      <h2>רשימת המשתמשים:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
