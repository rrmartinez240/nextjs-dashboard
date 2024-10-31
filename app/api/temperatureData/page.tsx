// app/api/temperatureData/page.tsx
"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function TemperaturesPage() {
  const [temperatures, setTemperatures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Cambia la URL según el entorno
      const apiUrl = process.env.NODE_ENV === 'production' 
          ? 'https://nextjs-dashboard-iota-one-79.vercel.app/api/temperatureData/getTemperature' 
          : 'http://localhost:3000/api/temperatureData/getTemperature';

      try {
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          setTemperatures(data);
        } else {
          console.error("Failed to fetch data", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
