import { NextResponse } from 'next/server'
import { sql } from "@vercel/postgres";
 
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const user_id = url.searchParams.get('user_id');
        const { rows } = await sql`SELECT * FROM calificacion where user_id = ${user_id}`;
        return NextResponse.json({ success: true, calificacion: rows })

    } catch (error) {
        return NextResponse.json({ error })
    }
}

export async function POST(request: Request) {
    try {
        const { user_id, curso_id, calificacion } = await request.json();
        const calificacion_id = 1;
        const calificacionN = parseFloat(calificacion)
        // Inserción de datos en la tabla usuario
        await sql`
        DELETE FROM calificacion where curso_id =  ${curso_id} AND user_id = ${user_id}
        RETURNING *;`;

        const { rows } = await sql`
            INSERT INTO calificacion (calificacion_id, user_id, calificacion, curso_id)
            VALUES (${calificacion_id}, ${user_id}, ${calificacionN}, ${curso_id})
            RETURNING *;`; // Devuelve el registro insertado para confirmar la operación

        return NextResponse.json({ success: true, calificacion: rows[0] }); // Devuelve el usuario insertado como respuesta

    } catch (error) {
        return NextResponse.json({ error }); // Devuelve el mensaje de error en caso de fallo
    }
}