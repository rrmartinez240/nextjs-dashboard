import { db } from '@vercel/postgres';
import { temperatureData } from '../lib/placeholder-data'; // Asegúrate de que la ruta sea corrcta

const client = await db.connect();

async function seedNTCTable() {
  await client.sql`CREATE TABLE IF NOT EXISTS NTC (
    id SERIAL PRIMARY KEY,
    temperature FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

  const insertedTemperatures = await Promise.all(
    temperatureData.map((temp) =>
      client.sql`
        INSERT INTO NTC (temperature)
        VALUES (${temp})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedTemperatures;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedNTCTable();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Tabla NTC creada y datos insertados exitosamente' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
