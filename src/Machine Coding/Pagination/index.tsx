import React, { useEffect, useState } from "react";

export default function UserPagination() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // show 10 per page

  // Fetch once
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        // Simulate 100 users (API only gives 10)
        console.log(data)
        const expandedUsers = Array.from({ length: 100 }, (_, i) => ({
          ...data[i % data.length],
          id: i + 1,
        }));
        setUsers(expandedUsers);
      });
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users (Client-side Pagination)</h1>

      {/* User List */}
      <ul className="space-y-2">
        {currentUsers.map(user => (
          <li
            key={user.id}
            className="p-3 border rounded shadow-sm bg-gray-50"
          >
            {user.id}. {user.name} ({user.email})
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex gap-2 justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
