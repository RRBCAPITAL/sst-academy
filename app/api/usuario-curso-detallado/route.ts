import { NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('user_id');
        const cursoId = url.searchParams.get('curso_id');

        // Verifica si userId está vacío o nulo
        let query;

        if (!userId) {
            // Si userId es nulo o vacío, devuelve solo la primera lección de la primera unidad
            query = sql`
                WITH lecciones_agregadas AS (
                    SELECT
                        u.curso_id,
                        u.unidad,
                        u.nombre AS unidad_nombre,
                        l.nombre AS leccion_nombre,
                        l.video_url,
                        l.material_descarga
                    FROM unidad u
                    LEFT JOIN leccion l ON u.unidad_id = l.unidad_id
                    WHERE u.curso_id = ${cursoId}
                ),
                unidades_agregadas AS (
                    SELECT
                        curso_id,
                        unidad,
                        unidad_nombre,
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'nombre', leccion_nombre,
                                'video_url', video_url,
                                'material_descarga', material_descarga
                            )
                        ) AS lecciones
                    FROM lecciones_agregadas
                    GROUP BY curso_id, unidad, unidad_nombre
                )
                SELECT
                    c.curso_id,
                    c.nombre AS curso_nombre,
                    c.descripcion AS curso_descripcion,
                    c.calificacion as curso_calificacion,
                    c.materiales as curso_materiales,
                    c.duracion as curso_duracion,
                    c.precio AS curso_precio,
                    c.video_intro AS video_intro,
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'unidad', unidad,
                            'unidad_nombre', unidad_nombre,
                            'lecciones', lecciones
                        )
                    ) AS unidades
                FROM curso c
                LEFT JOIN unidades_agregadas ua ON c.curso_id = ua.curso_id
                WHERE c.curso_id = ${cursoId}
                GROUP BY c.curso_id, c.nombre, c.descripcion, c.video_intro;
            `;
        } else {
            // Si userId no es nulo o vacío, devuelve las unidades y lecciones asignadas al usuario
            query = sql`
                WITH lecciones_agregadas AS (
                    SELECT
                        u.curso_id,
                        u.unidad,
                        u.nombre AS unidad_nombre,
                        l.nombre AS leccion_nombre,
                        l.video_url,
                        l.material_descarga
                    FROM unidad u
                    LEFT JOIN leccion l ON u.unidad_id = l.unidad_id
                    WHERE u.curso_id IN (
                        SELECT curso_id FROM usuario_curso WHERE user_id = ${userId} AND curso_id = ${cursoId}
                    )
                ),
                unidades_agregadas AS (
                    SELECT
                        curso_id,
                        unidad,
                        unidad_nombre,
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'nombre', leccion_nombre,
                                'video_url', video_url,
                                'material_descarga', material_descarga
                            )
                        ) AS lecciones
                    FROM lecciones_agregadas
                    GROUP BY curso_id, unidad, unidad_nombre
                )
                SELECT
                    c.curso_id,
                    c.nombre AS curso_nombre,
                    c.descripcion AS curso_descripcion,
                    c.precio AS curso_precio,
                    c.video_intro AS video_intro,
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'unidad', unidad,
                            'unidad_nombre', unidad_nombre,
                            'lecciones', lecciones
                        )
                    ) AS unidades
                FROM curso c
                LEFT JOIN unidades_agregadas ua ON c.curso_id = ua.curso_id
                WHERE c.curso_id IN (
                    SELECT curso_id FROM usuario_curso WHERE user_id = ${userId} AND curso_id = ${cursoId}
                )
                GROUP BY c.curso_id, c.nombre;
            `;
        }

        const { rows } = await query;
        return NextResponse.json({ curso: rows });

    } catch (error) {
        return NextResponse.json({ error });
    }
}
