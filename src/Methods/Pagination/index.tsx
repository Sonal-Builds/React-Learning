import { useEffect, useState } from "react";

export default function Pagination() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products?limit=1000");
      if (!response.ok) throw new Error("Products Fetching Failed");
      const data = await response.json();
      setProducts(data.products);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const DisplayProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ width: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Pagination</h1>

      {/* Products Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {DisplayProducts.map((item) => (
          <div key={item.id}>
            <img
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              src={item.images[0]}
              alt={item.title}
            />
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: "5px" }}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                margin: "0 3px",
                backgroundColor: page === currentPage ? "blue" : "gray",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          style={{ marginLeft: "5px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
