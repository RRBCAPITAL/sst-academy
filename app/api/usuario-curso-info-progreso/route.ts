import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server';

interface CursoProgreso {
    curso_id: number;
    nombre_curso: string;
    descripcion_curso: string;
    imagen_curso: string;
    lecciones_completadas: number;
    total_lecciones: number;
    porcentaje_completado: number;
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('user_id');

        if (!userId) {
            return NextResponse.json({ success: false, error: 'User ID is required' });
        }

        // Consulta para obtener el progreso del usuario
        const queryBase = sql<CursoProgreso[]>`
            WITH TotalLecciones AS (
                SELECT 
                    un.curso_id,
                    COUNT(*) AS total_lecciones
                FROM 
                    unidad un
                INNER JOIN 
                    leccion l ON un.unidad_id = l.unidad_id
                GROUP BY 
                    un.curso_id
            ),
            LeccionesCompletadas AS (
                SELECT 
                    p.user_id,
                    u.curso_id,
                    COUNT(*) AS lecciones_completadas
                FROM 
                    progreso p
                INNER JOIN 
                    leccion l ON p.leccion_id = l.leccion_id
                INNER JOIN 
                    unidad u ON l.unidad_id = u.unidad_id
                WHERE 
                    p.user_id = ${userId}
                GROUP BY 
                    p.user_id, u.curso_id
            ),
            ProgresoPorCurso AS (
                SELECT 
                    uc.curso_id,
                    c.nombre AS nombre_curso,
                    c.descripcion AS descripcion_curso,
                    c.imagen AS imagen_curso,
                    COALESCE(lc.lecciones_completadas, 0) AS lecciones_completadas,
                    tl.total_lecciones,
                    CASE 
                        WHEN tl.total_lecciones = 0 THEN 0
                        ELSE (COALESCE(lc.lecciones_completadas, 0) * 100.0 / tl.total_lecciones)
                    END AS porcentaje_completado
                FROM 
                    usuario_curso uc
                INNER JOIN 
                    curso c ON uc.curso_id = c.curso_id
                LEFT JOIN 
                    TotalLecciones tl ON uc.curso_id = tl.curso_id
                LEFT JOIN 
                    LeccionesCompletadas lc ON uc.curso_id = lc.curso_id
                WHERE 
                    uc.user_id = ${userId}
            )

            SELECT * FROM ProgresoPorCurso;
        `;

        // Ejecutar la consulta y obtener los resultados
        const result = await queryBase;
        const rowsProgreso = result.rows;

        // Verificar si se encontraron resultados
        if (rowsProgreso.length === 0) {
            return NextResponse.json({ success: false, error: 'No progress found for the specified user' });
        }

        // Devolver los resultados como JSON
        return NextResponse.json({ success: true, progresoCurso: rowsProgreso });
    } catch (error) {
        console.error('Error fetching user progress:', error);
        return NextResponse.json({ success: false, error: 'An error occurred while fetching user progress' });
    }
}
