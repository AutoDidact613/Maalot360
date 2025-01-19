import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import EditProducts from './EditProducts'; // ייבוא רכיב עריכת מוצרים

const AdminPanel = () => {
  const { users, isAdmin, products, updateProduct } = useContext(UserContext); // קבלת המידע מהקונטקסט

  if (!isAdmin) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div className="admin-panel">
      <h2>פאנל מנהל</h2>

      <h3>רשימת משתמשים</h3>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <h3>עריכת מוצרים</h3>
      <EditProducts products={products} updateProduct={updateProduct} /> {/* העברת פונקציה לעדכון המוצר */}
    </div>
  );
};

export default AdminPanel;
