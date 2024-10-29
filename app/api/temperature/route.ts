import { db } from '@vercel/postgres';

const client = await db.connect();

async function insertTemperature(temperature: number) {
  await client.sql`
    INSERT INTO NTC (temperature)
    VALUES (${temperature})
    ON CONFLICT (id) DO NOTHING;  -- Asegúrate de que la tabla tiene un id único para evitar duplicados
  `;
}

export async function POST(request: Request) {
  try {
    const { temperature } = await request.json(); // Obtiene la temperatura del cuerpo de la solicitud

    if (typeof temperature !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid temperature value' }), { status: 400 });
    }

    await client.sql`BEGIN`;
    await insertTemperature(temperature);
    await client.sql`COMMIT`;

    return new Response(JSON.stringify({ message: 'Temperature inserted successfully' }), { status: 200 });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
