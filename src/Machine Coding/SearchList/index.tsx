import { useEffect, useState, useMemo } from "react";

type List = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export default function SearchList() {
  const [dataList, setDataList] = useState<List[]>([]);
  const [formData, setFormData] = useState({ OPTIONS: "", inputKey: "" });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setDataList(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Derived filtered data (no extra state)
  const filteredData = useMemo(() => {
    if (!formData.OPTIONS || !formData.inputKey) return dataList;

    return dataList.filter((item) => {
      const value = String(item[formData.OPTIONS as keyof List]).toLowerCase();
      return value.startsWith(formData.inputKey.toLowerCase());
    });
  }, [formData, dataList]);

  return (
    <div>
      <h3>Search List</h3>
      <form>
        <select
          onChange={handleChange}
          name="OPTIONS"
          value={formData.OPTIONS}
        >
          <option value="">Select</option>
          <option value="id">id</option>
          <option value="userId">userId</option>
          <option value="title">title</option>
          <option value="completed">completed</option>
        </select>
        <input
          type="text"
          name="inputKey"
          onChange={handleChange}
          value={formData.inputKey}
          placeholder="Enter search text"
        />
      </form>

      <table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>userId</th>
            <th>title</th>
            <th>completed</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{item.title}</td>
              <td>{item.completed ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
