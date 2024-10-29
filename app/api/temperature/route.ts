import { db } from '@vercel/postgres';

const client = await db.connect();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { temperature } = data; // Obtener la temperatura del cuerpo de la solicitud

    // Insertar la temperatura en la tabla NTC
    await client.sql`
      INSERT INTO NTC (temperature)
      VALUES (${temperature});
    `;

    return new Response(JSON.stringify({ message: 'Datos recibidos y guardados exitosamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al insertar datos:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar los datos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
