import { NextResponse } from 'next/server'
import { sql } from "@vercel/postgres";
 
export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const { rows } = await sql`SELECT * FROM usuario where usuario = ${username} AND contrasenia = ${password}`;

        if (rows.length > 0) {
            // Usuario autenticado, devuelve la información del usuario
            return NextResponse.json({ success: true, usuario: rows[0] });
          } else {
            // Usuario no autenticado
            return NextResponse.json({ success: false, message: 'Credenciales incorrectas' });
          }

    } catch (error) {
        console.error('Error en la autenticación:', error);
        return NextResponse.json({ success: false, message: 'Error en el servidor', error: error });
    }
}

