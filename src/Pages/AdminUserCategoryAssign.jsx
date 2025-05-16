import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminUserCategoryAssign.css';

const CATEGORIES = ['HTML', 'Matte', 'DB', 'CSS', 'JS'];

const AdminUserCategoryAssign = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    if (!user || user.access_level !== 1) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch('https://localhost:7266/api/user', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();

        setUsers(data);

        const mapped = {};
        data.forEach(u => {
          mapped[u.id] = u.category ? u.category.split(',') : [];
        });

        setAssignments(mapped);
      } catch (err) {
        console.error('Kunde inte hämta användare:', err);
      }
    };

    fetchUsers();
  }, [user]);

  const toggleCategory = (userId, category) => {
    setAssignments(prev => {
      const current = prev[userId] || [];
      const updated = current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category];

      return { ...prev, [userId]: updated };
    });
  };

  const saveCategories = async (userId) => {
    try {
      const updated = assignments[userId].join(',');
      const res = await fetch(`https://localhost:7266/api/user/${userId}/category`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ category: updated })
      });

      if (res.ok) {
        alert('✅ Kategorier uppdaterades!');
      } else {
        alert('❌ Misslyckades att spara.');
      }
    } catch (err) {
      console.error('Fel vid uppdatering:', err);
    }
  };

  if (!user || user.access_level !== 1) {
    return <p>⛔ Du har inte behörighet att se denna sida.</p>;
  }

  return (
    <div className="quiz-container">
      <h2>🛠️ Hantera Användarkategorier</h2>

      {users.map(u => (
        <div key={u.id} className="user-block">
          <h4>{u.name} ({u.email})</h4>
          <div className="category-checkboxes">
            {CATEGORIES.map(cat => (
              <label key={cat}>
                <input
                  type="checkbox"
                  checked={(assignments[u.id] || []).includes(cat)}
                  onChange={() => toggleCategory(u.id, cat)}
                />
                {cat}
              </label>
            ))}
          </div>
          <button onClick={() => saveCategories(u.id)} className="save-btn">
            💾 Spara
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminUserCategoryAssign;
