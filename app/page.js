'use client';

import { useEffect, useState } from 'react';
import { sortHandler } from '../utils/naturalSort';
import './page.module.css'

export default function Home() {
  const [items, setItems] = useState([]);
  const [sortMode, setSortMode] = useState('createdAt');

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const getSortedItems = () => {
    const sorted = [...items];
    if (sortMode === 'createdAt') {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortMode === 'filenameAsc') {
      sorted.sort((a, b) => sortHandler(a.filename, b.filename));
    } else if (sortMode === 'filenameDesc') {
      sorted.sort((a, b) => sortHandler(b.filename, a.filename));
    }
    return sorted;
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 space">CSV Sorter</h1>
      <select onChange={e => setSortMode(e.target.value)} className="mb-4 p-2 border">
        <option value="createdAt">Sort by Created At</option>
        <option value="filenameAsc">Filename ↑</option>
        <option value="filenameDesc">Filename ↓</option>
      </select>
      <ul className="space-y-1 list-space">
        {getSortedItems().map((item, i) => (
          <li key={i}>
            {item.createdAt} — {item.filename}
          </li>
        ))}
      </ul>
    </main>
  );
}
