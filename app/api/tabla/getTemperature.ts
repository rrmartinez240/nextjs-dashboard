import { db } from '@vercel/postgres';

export async function GET() {
   try {
      const result = await db.query("SELECT * FROM NTC"); // Suponiendo que `NTC` es tu tabla
      return new Response(JSON.stringify(result.rows), {
         status: 200,
         headers: { "Content-Type": "application/json" },
      });
   } catch (error) {
      console.error("Error al obtener los datos:", error);
      return new Response(JSON.stringify({ error: "Error al obtener datos" }), {
         status: 500,
         headers: { "Content-Type": "application/json" },
      });
   }
}

