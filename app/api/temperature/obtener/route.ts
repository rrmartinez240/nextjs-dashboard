import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://default:4GTVasStJo9U@ep-autumn-base-a4hibfh7-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM ntc');

    // Crea la respuesta con los encabezados CORS
    const response = NextResponse.json(res.rows);

    // Agrega los encabezados CORS
    response.headers.set('Access-Control-Allow-Origin', '*'); // Permite solicitudes desde cualquier dominio
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Encabezados permitidos

    return response;
  } catch (error: any) {
    console.error('Error al recuperar datos:', error);
    return NextResponse.json({
      error: error.message,
      code: error.code,
      severity: error.severity,
    }, { status: 500 });
  }
}
