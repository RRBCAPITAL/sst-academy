import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userIdParse = url.searchParams.get('user_id');
        const cursoIdParse = url.searchParams.get('curso_id');

        const userId = String(userIdParse).trim();
        const cursoId = String(cursoIdParse).trim();

        if (!userId || !cursoId) {
            return NextResponse.json({ success: false, error: 'User ID and Course ID are required' });
        }

        // Consulta para obtener todas las lecciones completadas del usuario
        const queryProgreso = sql`
            SELECT 
                l.leccion_id,
                l.nombre AS leccion_nombre,
                l.leccion,
                u.unidad_id,
                u.nombre AS unidad_nombre,
                u.unidad,
                p.completado
            FROM 
                progreso p
            INNER JOIN 
                leccion l ON p.leccion_id = l.leccion_id
            INNER JOIN 
                unidad u ON l.unidad_id = u.unidad_id
            INNER JOIN 
                curso c ON u.curso_id = c.curso_id
            WHERE 
                p.user_id = ${userId}
                AND c.curso_id = ${cursoId}
                AND p.completado = true
            ORDER BY 
                u.unidad_id, l.leccion_id;
        `;

        const { rows: rowsProgreso } = await queryProgreso;

        if (rowsProgreso.length > 0) {
            // Obtener la última lección completada
            const ultimaLeccion = rowsProgreso[rowsProgreso.length - 1];
            
            // Consulta para obtener la siguiente lección en la misma unidad
            const querySiguienteLeccion = sql`
                SELECT
                    l.leccion_id,
                    l.nombre AS leccion_nombre,
                    l.leccion,
                    u.unidad_id,
                    u.nombre AS unidad_nombre,
                    u.unidad,
                    l.video_url AS video_intro,
                    l.material_descarga
                FROM 
                    leccion l
                INNER JOIN 
                    unidad u ON l.unidad_id = u.unidad_id
                WHERE 
                    l.unidad_id = ${ultimaLeccion.unidad_id}
                    AND l.leccion_id > ${ultimaLeccion.leccion_id}
                ORDER BY 
                    l.leccion_id
                LIMIT 1;
            `;

            const { rows: rowsSiguienteLeccion } = await querySiguienteLeccion;

            if (rowsSiguienteLeccion.length > 0) {
                // Devolver la siguiente lección dentro de la misma unidad
                return NextResponse.json({ success: true, progreso: true, startCurso: rowsSiguienteLeccion });
            } else {
                // Si no hay más lecciones en la misma unidad, buscar la primera lección de la siguiente unidad
                const queryPrimeraLeccionSiguienteUnidad = sql`
                    SELECT
                        l.leccion_id,
                        l.nombre AS leccion_nombre,
                        l.leccion,
                        u.unidad_id,
                        u.nombre AS unidad_nombre,
                        u.unidad,
                        l.video_url AS video_intro,
                        l.material_descarga
                    FROM 
                        leccion l
                    INNER JOIN 
                        unidad u ON l.unidad_id = u.unidad_id
                    WHERE 
                        u.unidad_id > ${ultimaLeccion.unidad_id}
                    ORDER BY 
                        u.unidad_id, l.leccion_id
                    LIMIT 1;
                `;

                const { rows: rowsPrimeraLeccion } = await queryPrimeraLeccionSiguienteUnidad;

                if (rowsPrimeraLeccion.length > 0) {
                    // Devolver la primera lección de la siguiente unidad
                    return NextResponse.json({ success: true, progreso: true, startCurso: rowsPrimeraLeccion });
                } else {
                    return NextResponse.json({ success: false, message: 'No hay más lecciones disponibles.' });
                }
            }
        } else {
            // Si no hay progreso, obtener la primera unidad y primera lección del curso
            const queryPrimeraLeccion = sql`
                SELECT 
                    c.curso_id,
                    c.nombre AS curso_nombre,
                    u.unidad_id,
                    u.nombre AS nombre_unidad,
                    u.unidad,
                    l.leccion_id,
                    l.nombre AS leccion_nombre,
                    l.leccion,
                    l.video_url AS video_intro,
                    l.material_descarga,
                    0 AS completado
                FROM 
                    curso c
                INNER JOIN 
                    unidad u ON c.curso_id = u.curso_id
                INNER JOIN 
                    leccion l ON u.unidad_id = l.unidad_id
                WHERE 
                    c.curso_id = ${cursoId}
                ORDER BY 
                    u.unidad_id, l.leccion_id
                LIMIT 1;
            `;

            const { rows: rowsPrimeraLeccion } = await queryPrimeraLeccion;

            if (rowsPrimeraLeccion.length > 0) {
                return NextResponse.json({ success: true, progreso: false, startCurso: rowsPrimeraLeccion });
            } else {
                return NextResponse.json({ success: false, message: 'No se encontraron unidades ni lecciones.' });
            }
        }
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return NextResponse.json({ success: false, error: error });
    }
}
