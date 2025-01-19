import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import EditProducts from './EditProducts'; // ייבוא רכיב עריכת מוצרים
import '../css/AdminPanel.css';


const AdminPanel = () => {
  const { users, isAdmin, products, updateProduct } = useContext(UserContext); // קבלת המידע מהקונטקסט
 // בדיקה אם המשתמש הוא מנהל
 // במידה והמשתמש לא מנהל יוצג הודעה שהוא לא מורשה
  if (!isAdmin) {
    return <div>You are not authorized to view this page.</div>;
  }
// במידה והמשתמש מנהל יוצג פאנל מנהל שיכול לערוך מוצרים ולהוסיף מוצרים חדשים
  return (
    <div className="admin-panel">
      <h2>פאנל מנהל</h2>

 
      <h3>List of Users</h3>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.email} className="user-card">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
            <div className="user-role">{user.isAdmin ? 'Admin' : 'User'}</div>
          </div>
        ))}
  </div>

<EditProducts products={products} updateProduct={updateProduct} />
</div>
  );
};

export default AdminPanel;
