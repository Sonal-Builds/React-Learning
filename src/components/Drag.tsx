import React, { useEffect, useState } from "react";

export default function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    const data = await res.json();
    if (data.length === 0) setHasMore(false);
    setItems((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        if (hasMore) setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Infinite Scroll (Window Scroll)</h2>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "15px",
            margin: "10px 0",
            background: "#f3f3f3",
            borderRadius: "8px",
          }}
        >
          <strong>{item.id}</strong> - {item.title}
        </div>
      ))}
      {!hasMore && <p>No more data</p>}
    </div>
  );
}
