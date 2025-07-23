import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Fetch API
  const fetchItems = async (page) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    const data = await res.json();
    if (data.length === 0) setHasMore(false);
    setItems((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  // Observer for last element
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Infinite Scroll Example</h2>
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <div
              ref={lastItemRef}
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
          );
        } else {
          return (
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
          );
        }
      })}
      {hasMore && (
        <p ref={loaderRef} style={{ textAlign: "center", padding: "10px" }}>
          Loading...
        </p>
      )}
      {!hasMore && <p style={{ textAlign: "center" }}>No more data</p>}
    </div>
  );
};

export default InfiniteScroll;
