"use client"; // Directiva para indicar que este es un componente de cliente
import { useEffect, useState } from 'react';
import styles from './page.module.css'; // Importar el CSS como módulo

interface TemperatureData {
  id: number;           // Tipo de dato para ID
  temperature: number;  // Tipo de dato para temperatura
  timestamp: string;    // Tipo de dato para timestamp
}

export default function Home() {
  const [data, setData] = useState<TemperatureData[]>([]); // Estado para almacenar datos
  const [loading, setLoading] = useState<boolean>(true);    // Estado para cargar
  const [error, setError] = useState<string | null>(null);   // Estado para errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/temperature/obtener'); // URL de tu API
        if (!response.ok) {
          throw new Error('Error al recuperar los datos'); // Manejo de errores
        }
        const result = await response.json();
        setData(result); // Actualizar el estado con los datos recibidos
      } catch (error: any) {
        setError(error instanceof Error ? error.message : 'Error desconocido'); // Manejo de errores
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    };

    fetchData(); // Llamada a la función fetchData
  }, []);

  if (loading) return <div className={styles.loading}>Cargando datos...</div>; // Mensaje mientras se cargan los datos
  if (error) return <div className={styles.error}>Error: {error}</div>; // Mensaje de error

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Datos de Temperatura</h1>
      <table className={styles.temperatureTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Temperatura (°C)</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.temperature}</td>
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
