// app/api/temperatureData/page.tsx
"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function TemperaturesPage() {
  const [temperatures, setTemperatures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/temperatureData/getTemperature');
      if (res.ok) {
        const data = await res.json();
        setTemperatures(data);
      } else {
        console.error("Failed to fetch data");
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Temperaturas Registradas</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Temperature</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {temperatures.map((temp: any) => (
            <tr key={temp.id}>
              <td>{temp.id}</td>
              <td>{temp.temperature}</td>
              <td>{new Date(temp.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
