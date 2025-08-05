import { useEffect, useState } from "react";

export default function InfiniteScroll() {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [page, setPage] = useState(1);

  const loadMore = () => {
    setItems(prev => [...prev, ...Array.from({ length: 20 })]);
    setPage(p => p + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {items.map((_, index) => (
        <div key={index} className="item">
          Item {index + 1}
        </div>
      ))}
    </div>
  );
}
