// app/api/temperature/obtener/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';  // Importa la librería pg

// Carga la configuración de conexión desde el archivo .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://default:4GTVasStJo9U@ep-autumn-base-a4hibfh7-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

export async function GET() {
  try {
    // Realiza la consulta a la base de datos
    const res = await pool.query('SELECT * FROM ntc');
    return NextResponse.json(res.rows);
  } catch (error: any) { // Captura cualquier error
    console.error('Error al recuperar datos:', error);
    return NextResponse.json({
      error: error.message,
      code: error.code,
      severity: error.severity,
    }, { status: 500 });
  }
}
