// app/api/temperatureData/getTemperature.ts

import { db } from '@vercel/postgres';

export async function GET() {
  const client = await db.connect();

  try {
    const result = await client.sql`SELECT * FROM NTC ORDER BY timestamp DESC`;
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  } finally {
    client.release();
  }
}
