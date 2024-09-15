import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET: Obtener cursos asignados a un usuario
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('user_id');

        const { rows } = await sql`SELECT *
            FROM curso
            WHERE curso_id IN (SELECT curso_id FROM usuario_curso WHERE user_id = ${userId});`;
        return NextResponse.json({ curso: rows });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

// PUT: Agregar o quitar cursos a un usuario
export async function PUT(request: Request) {
    try {
        const { userId, cursoIds } = await request.json();

        if (!userId || !cursoIds) {
            return NextResponse.json({ error: 'Faltan parámetros necesarios.' }, { status: 400 });
        }

        if (!Array.isArray(cursoIds)) {
            return NextResponse.json({ error: 'cursoIds debe ser un array.' }, { status: 400 });
        }
            await sql`DELETE FROM usuario_curso where user_id = ${userId}`
            
            await Promise.all(cursoIds.map(cursoId => 
                sql`
                    INSERT INTO usuario_curso (user_id, curso_id)
                    VALUES (${userId}, ${cursoId})
                    ON CONFLICT (user_id, curso_id) DO NOTHING;`
            ));
            return NextResponse.json({ message: 'Cursos agregados al usuario exitosamente.' });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

// POST: Asignar varios cursos a un nuevo usuario
export async function POST(request: Request) {
    try {
        const { userId, cursos } = await request.json();

        // Asigna cursos al nuevo usuario si se proporcionaron
        if (cursos && Array.isArray(cursos)) {
            await Promise.all(cursos.map(cursoId => 
                sql`
                    INSERT INTO usuario_curso (user_id, curso_id)
                    VALUES (${userId}, ${cursoId})
                    ON CONFLICT (user_id, curso_id) DO NOTHING;`
            ));
        }

        return NextResponse.json({ user: { user_id: userId } });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
