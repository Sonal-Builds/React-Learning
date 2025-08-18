import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);       // store users
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // UI states
  if (loading) return <p>⏳ Loading...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>
      <button onClick={fetchUsers} style={{ marginBottom: "10px" }}>
        🔄 Refresh
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
