import { db } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows: temperatures } = await db.sql`SELECT * FROM NTC ORDER BY timestamp DESC;`;
    return new Response(JSON.stringify(temperatures), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener los datos.' }), { status: 500 });
  }
}
