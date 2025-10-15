import { useEffect, useState } from "react";
import "./index.css";

// ✅ Define type for recipe
type Recipe = {
  id: number;
  name: string;
  [key: string]: any; // in case the API sends extra fields
};

export default function Autocomplete() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<Recipe[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [cache, setCache] = useState<Record<string, Recipe[]>>({});

  useEffect(() => {
    if (!search.trim()) {
      setResult([]);
      return;
    }

    if (cache[search]) {
      setResult(cache[search]);
      return;
    }

    const timer = setTimeout(fetchApi, 300); // debounce

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  async function fetchApi() {
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${search}`
      );
      const data = await response.json();

      setResult(data?.recipes || []);
      setCache((prev) => ({ ...prev, [search]: data?.recipes || [] }));
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowResult(true);
  };

  return (
    <div className="App">
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          type="text"
          value={search}
          className="searchbox"
          onChange={handleInput}
          onFocus={() => setShowResult(true)}
          onBlur={() => {
            setTimeout(() => setShowResult(false), 200); // ✅ delay so click works
          }}
        />
      </div>

      {showResult && result.length > 0 && (
        <div className="result-box">
          {result.map((r) => (
            <div
              key={r.id}
              className="result"
              onMouseDown={() => {
                setSearch(r.name); // ✅ set selected item
                setShowResult(false);
              }}
            >
              {r.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
