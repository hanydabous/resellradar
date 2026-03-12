import { useEffect, useState } from "react";

const STORAGE_KEY = "resellradar-items";

export default function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Vinted");
  const [cost, setCost] = useState("");
  const [salePrice, setSalePrice] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      title,
      platform,
      cost: Number(cost),
      salePrice: Number(salePrice)
    };

    setItems([newItem, ...items]);
    setTitle("");
    setCost("");
    setSalePrice("");
  };

  const profit = (item) => item.salePrice - item.cost;

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>ResellRadar</h1>

      <form onSubmit={addItem}>
        <input
          placeholder="Item name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Vinted</option>
          <option>Depop</option>
          <option>eBay</option>
        </select>

        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <input
          type="number"
          placeholder="Sale Price"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <h2 style={{ marginTop: 40 }}>Items</h2>

      {items.map((item) => (
        <div key={item.id}>
          {item.title} ({item.platform}) — Profit: £{profit(item)}
        </div>
      ))}
    </div>
  );
}
