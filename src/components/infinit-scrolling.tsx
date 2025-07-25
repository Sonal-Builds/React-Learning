import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch API
  const fetchItems = async (page) => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    );
    const data = await res.json();
    if (data.length === 0) setHasMore(false);
    setItems((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  // Intersection Observer
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.
