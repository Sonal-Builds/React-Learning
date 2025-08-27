import React, { useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";

// Helper: debounce
function useDebouncedCallback(callback, delay) {
  const timer = useRef();
  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(...args), delay);
  };
}

const LIMIT = 1000; // items per page

export default function InfiniteList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users with pagination (+ simulated search filter)
  const fetchUsers = async ({ page, query }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${LIMIT}`
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();

      // NOTE: JSONPlaceholder doesn't support server-side search
      // so we filter the current page locally just for demo.
      const filtered = query
        ? data.filter((u) =>
            u.name.toLowerCase().includes(query.toLowerCase())
          )
        : data;

      if (page === 1) {
        setUsers(filtered);
      } else {
        setUsers((prev) => [...prev, ...filtered]);
      }

      // If fewer than LIMIT items returned -> no more pages
      setHasMore(filtered.length === LIMIT);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page or query changes
  useEffect(() => {
    fetchUsers({ page, query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  // Debounced search: reset list & go back to page 1
  const onSearchChange = useDebouncedCallback((value) => {
    setUsers([]);
    setHasMore(true);
    setPage(1);
    setQuery(value.trim());
  }, 500);

  // react-window row count includes an extra "loader" row when hasMore
  const itemCount = users.length + (hasMore ? 1 : 0);

  // Row renderer
  const Row = ({ index, style }) => {
    if (index < users.length) {
      const user = users[index];
      return (
        <div style={{ ...style, padding: "8px 12px", borderBottom: "1px solid #eee" }}>
          <strong>{user.name}</strong> — {user.email}
        </div>
      );
    }
    // Loader row
    return (
      <div style={{ ...style, padding: "8px 12px", textAlign: "center" }}>
        {loading ? "⏳ Loading..." : "— End —"}
      </div>
    );
  };

  // When the last visible index reaches the final data row, load next page
  const handleItemsRendered = useMemo(
    () => ({ visibleStopIndex }) => {
      const reachedEnd = visibleStopIndex >= users.length - 1;
      if (reachedEnd && hasMore && !loading) {
        setPage((p) => p + 1);
      }
    },
    [users.length, hasMore, loading]
  );

  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <h2>🔍 Search + Infinite Scroll (Virtualized)</h2>

      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 12 }}
      />

      {error && (
        <div style={{ marginBottom: 8, color: "crimson" }}>❌ {error}</div>
      )}

      <List
        height={400}          // viewport height
        itemCount={itemCount} // data rows + optional loader row
        itemSize={48}         // row height
        width={"100%"}
        onItemsRendered={handleItemsRendered}
      >
        {Row}
      </List>

      {!loading && users.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 8 }}>⚠️ No users found</p>
      )}
    </div>
  );
}
