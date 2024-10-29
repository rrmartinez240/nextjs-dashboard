import { db } from '@vercel/postgres';

export async function GET() {
  try {
    // Realizar la consulta para obtener los datos de la tabla NTC
    const result = await db.sql`SELECT * FROM NTC`;
    const temperatures = result.rows;

    // Devolver los datos en formato JSON
    return new Response(JSON.stringify(temperatures), { status: 200 });
  } catch (error) {
    // Manejar errores y devolver un mensaje de error simple
    return new Response('Error al obtener los datos', { status: 500 });
  }
}
