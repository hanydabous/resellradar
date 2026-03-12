import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "resellradar-items";

export default function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Vintage Nike Hoodie",
            platform: "Vinted",
            cost: 12,
            salePrice: 32,
            fees: 2.5,
            shipping: 3.2,
            status: "Sold",
            category: "Fashion"
          },
          {
            id: 2,
            title: "Y2K Denim Jacket",
            platform: "Depop",
            cost: 18,
            salePrice: 45,
            fees: 4.5,
            shipping: 3.8,
            status: "Sold",
            category: "Fashion"
          }
        ];
  });

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Vinted");
  const [cost, setCost] = useState("");
  const [salePrice, setSalePrice] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const profit = (item) =>
    item.salePrice - item.cost - item.fees - item.shipping;

  const totalProfit = useMemo(() => {
    return items.reduce((sum, item) => sum + profit(item), 0);
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      title,
      platform,
      cost: Number(cost),
      salePrice: Number(salePrice),
      fees: 0,
      shipping: 0,
      status: "Listed",
      category: "General"
    };

    setItems([newItem, ...items]);
    setTitle("");
    setCost("");
    setSalePrice("");
  };

  const removeItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>ResellRadar</h1>
      <p>Track reseller profits across platforms</p>

      <h2>Total Profit: £{totalProfit.toFixed(2)}</h2>

      <form onSubmit={addItem} style={{ marginTop: 20 }}>
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
          placeholder="Cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <input
          placeholder="Sale price"
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />

        <button type="submit">Add Item</button>
      </form>

      <h2 style={{ marginTop: 40 }}>Inventory</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginTop: 10
          }}
        >
          <b>{item.title}</b> ({item.platform})
          <p>Sale: £{item.salePrice}</p>
          <p>Profit: £{profit(item).toFixed(2)}</p>

          <button onClick={() => removeItem(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
