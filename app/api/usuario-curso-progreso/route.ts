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

        // Consulta para obtener el progreso del usuario
        const queryBase = sql`
            SELECT 
                p.completado,
                l.leccion  -- Agregar el campo l.leccion aquí
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
            ORDER BY 
                u.unidad_id, l.leccion_id;
        `;

        const { rows: rowsProgreso } = await queryBase;

        if (rowsProgreso && rowsProgreso[0]?.completado) {
            const queryLeccionActual = sql`
            WITH ÚltimaLección AS (
                SELECT
                    p.user_id,
                    l.unidad_id,
                    l.leccion_id,
                    l.nombre AS leccion_nombre,
                    l.leccion,  -- Agregar el campo l.leccion aquí
                    ROW_NUMBER() OVER (PARTITION BY l.unidad_id ORDER BY l.leccion_id DESC) AS rn
                FROM
                    progreso p
                INNER JOIN
                    leccion l ON p.leccion_id = l.leccion_id
                WHERE
                    p.user_id = ${userId}
                    AND p.completado = true
            ),
            ÚltimaLecciónUnidad AS (
                SELECT
                    unidad_id,
                    leccion_id,
                    leccion_nombre,
                    leccion  -- Agregar el campo l.leccion aquí
                FROM
                    ÚltimaLección
                WHERE
                    rn = 1
            ),
            SiguienteLección AS (
                SELECT
                    l.unidad_id,
                    l.leccion_id,
                    l.nombre AS leccion_nombre,
                    l.leccion,  -- Agregar el campo l.leccion aquí
                    l.video_url AS video_intro,
                    l.material_descarga
                FROM
                    leccion l
                INNER JOIN
                    ÚltimaLecciónUnidad u ON l.unidad_id = u.unidad_id
                WHERE
                    l.leccion_id = (
                        SELECT MIN(leccion_id)
                        FROM leccion
                        WHERE unidad_id = u.unidad_id
                          AND leccion_id > u.leccion_id
                    )
            ),
            PrimeraLecciónSiguienteUnidad AS (
                SELECT
                    l.unidad_id,
                    l.leccion_id,
                    l.nombre AS leccion_nombre,
                    l.leccion,  -- Agregar el campo l.leccion aquí
                    l.video_url AS video_intro,
                    l.material_descarga
                FROM
                    leccion l
                INNER JOIN
                    (SELECT MIN(unidad_id) AS siguiente_unidad
                     FROM leccion
                     WHERE unidad_id > (SELECT unidad_id FROM ÚltimaLecciónUnidad)
                     LIMIT 1) su ON l.unidad_id = su.siguiente_unidad
                WHERE
                    l.leccion_id = (
                        SELECT MIN(leccion_id)
                        FROM leccion
                        WHERE unidad_id = su.siguiente_unidad
                    )
            )
            SELECT
                c.curso_id,
                c.nombre AS curso_nombre,
                u.unidad_id,
                u.nombre AS unidad_nombre,
                COALESCE(s.leccion_id, ps.leccion_id) AS leccion_id,
                COALESCE(s.leccion_nombre, ps.leccion_nombre) AS leccion_nombre,
                COALESCE(s.leccion, ps.leccion) AS leccion,  -- Agregar el campo COALESCE(s.leccion, ps.leccion) aquí
                COALESCE(s.video_intro, ps.video_intro) AS video_intro,
                COALESCE(s.material_descarga, ps.material_descarga) AS material_descarga
            FROM
                curso c
            INNER JOIN
                unidad u ON c.curso_id = u.curso_id
            LEFT JOIN
                SiguienteLección s ON u.unidad_id = s.unidad_id
            LEFT JOIN
                PrimeraLecciónSiguienteUnidad ps ON u.unidad_id = ps.unidad_id
            WHERE
                c.curso_id = ${cursoId}
            ORDER BY
                CASE
                    WHEN s.leccion_id IS NOT NULL THEN 1
                    WHEN ps.leccion_id IS NOT NULL THEN 2
                    ELSE 3
                END
            LIMIT 1;
            `;

            const { rows: rowsLeccionActual } = await queryLeccionActual;
            if (rowsLeccionActual.length > 0) {
                return NextResponse.json({ success: true, progreso: true, startCurso: rowsLeccionActual });
            } else {
                return NextResponse.json({ success: false, message: 'No existe info. actualmente.' });
            }         
        } else {
            // Consulta para obtener la primera unidad y primera lección del curso
            const noneProgreso = sql`
                SELECT 
                    c.curso_id,
                    c.nombre AS curso_nombre,
                    u.unidad_id,
                    u.nombre AS nombre_unidad,
                    l.leccion_id,
                    l.nombre AS leccion_nombre,
                    l.leccion,  -- Agregar el campo l.leccion aquí
                    l.video_url AS video_intro,
                    l.material_descarga,
                    0 AS completado  -- No completado
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

            const { rows: rowsNoneProgreso } = await noneProgreso;

            if (rowsNoneProgreso.length > 0) {
                return NextResponse.json({ success: true, progreso: false, startCurso: rowsNoneProgreso });
            } else {
                return NextResponse.json({ success: false, message: 'No se encontraron unidades ni lecciones', user: userId, curso: cursoId });
            }
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
