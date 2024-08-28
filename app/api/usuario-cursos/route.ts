import { NextResponse } from 'next/server'
import { sql } from "@vercel/postgres";
 
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('user_id');

        const { rows } = await sql`SELECT *
FROM curso
WHERE curso_id IN (SELECT curso_id FROM usuario_curso WHERE user_id = ${userId}); `;
        return NextResponse.json({ curso: rows })

    } catch (error) {
        return NextResponse.json({ error })
    }
}

export async function PUT(request: Request) {
    try {
        // Obtiene los parámetros de la solicitud
        const url = new URL(request.url);
        const userId = url.searchParams.get('user_id');
        const cursoId = url.searchParams.get('curso_id');
        const action = url.searchParams.get('action'); // 'add' o 'remove'

        if (!userId || !cursoId || !action) {
            return NextResponse.json({ error: 'Faltan parámetros necesarios.' }, { status: 400 });
        }

        if (action === 'add') {
            // Agrega el usuario al curso
            await sql`
                INSERT INTO usuario_curso (user_id, curso_id)
                VALUES (${userId}, ${cursoId})
                ON CONFLICT (user_id, curso_id) DO NOTHING;  -- Evita duplicados
            `;
            return NextResponse.json({ message: 'Usuario agregado al curso exitosamente.' });
        } else if (action === 'remove') {
            // Quita al usuario del curso
            await sql`
                DELETE FROM usuario_curso
                WHERE user_id = ${userId} AND curso_id = ${cursoId};
            `;
            return NextResponse.json({ message: 'Usuario eliminado del curso exitosamente.' });
        } else {
            return NextResponse.json({ error: 'Acción no válida.' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}