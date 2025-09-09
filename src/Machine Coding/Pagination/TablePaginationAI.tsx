import { useEffect, useMemo, useState } from "react";

type Product = { id:number; title:string; price:number; description?:string };

export default function TablePaginationAI() {
  const [products, setProducts] = useState<Product[]>([]);
  const [dropDownCount, setDropDownCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch: if query present → semantic search API; else → raw API
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const url = query
          ? `/api/semantic-search?q=${encodeURIComponent(query)}&limit=100`
          : `https://dummyjson.com/products?limit=100`;
        const res = await fetch(url);
        const data = await res.json();
        const list: Product[] = query ? data.results : data.products;
        if (!cancelled) {
          setProducts(list.map((p:any) => ({
            id: p.id, title: p.title, price: p.price, description: p.description
          })));
          setCurrentPage(1); // reset page on new search
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [query]);

  const totalPage = Math.max(1, Math.ceil(products.length / dropDownCount));
  const startIndex = (currentPage - 1) * dropDownCount;
  const endIndex = startIndex + dropDownCount;

  const displayProduct = useMemo(
    () => products.slice(startIndex, endIndex),
    [products, startIndex, endIndex]
  );

  return (
    <div style={{ margin: "0 auto", width: "60%", padding: 16 }}>
      <h3>Products {query ? "(AI Search)" : "(All)"}</h3>

      {/* AI-powered search */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="🔎 Try: 'budget smartphone', 'running shoes', '4K monitor'..."
          style={{ flex: 1, padding: 8 }}
        />
        {query && (
          <button onClick={() => setQuery("")}>Clear</button>
        )}
      </div>

      {loading ? <p>Searching… 🤖</p> : null}

      <table border={1} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {displayProduct.map(item => (
            <tr key={item.id} style={{ textAlign: "center" }}>
              <td>{item.id}</td>
              <td title={item.description}>{item.title}</td>
              <td>${item.price}</td>
            </tr>
          ))}
          {!displayProduct.length && !loading && (
            <tr><td colSpan={3} style={{ textAlign:"center" }}>No results</td></tr>
          )}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <div>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
          <span style={{ margin: "0 8px" }}>{currentPage} of {totalPage}</span>
          <button disabled={currentPage === totalPage} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
        <div>
          <select
            value={dropDownCount}
            onChange={(e) => {
              setDropDownCount(Number(e.target.value));
              setCurrentPage(1);
            }}>
            {[5, 10, 15, 20].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
