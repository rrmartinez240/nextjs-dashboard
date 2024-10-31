// app/api/temperatureData/page.tsx
"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Temperature {
  id: number;
  temperature: number;
  created_at: string;
}

export default function TemperaturesPage() {
  const [temperatures, setTemperatures] = useState<Temperature[]>([]);
  const [error, setError] = useState<string | null>(null);

  // app/api/temperatureData/page.tsx
useEffect(() => {
   async function fetchTemperatureData() {
     try {
       const res = await fetch('app/api/tabla');
       
       if (!res.ok) {
         const errorResponse = await res.json();
         throw new Error(errorResponse.error || 'Error al obtener los datos');
       }
       
       const data: Temperature[] = await res.json();
       setTemperatures(data);
     } catch (error) {
       console.error('Error al obtener los datos:', error);
       setError((error as Error).message);
     }
   }
   fetchTemperatureData();
 }, []);

  return (
    <div>
      <h1>Temperaturas Registradas</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Temperature</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {temperatures.map((temp) => (
              <tr key={temp.id}>
                <td>{temp.id}</td>
                <td>{temp.temperature}</td>
                <td>{new Date(temp.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
