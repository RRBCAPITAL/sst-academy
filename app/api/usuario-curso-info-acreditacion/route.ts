import { NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userDNI = url.searchParams.get('user_dni') || null;
        const cursoID = url.searchParams.get('curso_id') || null;

        // Verificamos si el DNI y el curso_id son válidos
        if (!userDNI || !cursoID) {
            return NextResponse.json({ success: false, message: 'Missing user_dni or curso_id' });
        }

        // Consulta para obtener la información del usuario basado en el DNI
        let queryUsuario = sql`
            SELECT nombres, apellidos, user_id 
            FROM usuario 
            WHERE dni = ${userDNI}
        `;

        const { rows: usuarioRows } = await queryUsuario;

        if (usuarioRows.length === 0) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }

        const userID = usuarioRows[0].user_id;
        const usuarioNombre = usuarioRows[0].nombres;
        const usuarioApellidos = usuarioRows[0].apellidos;

        // Consulta para obtener la información del curso basado en el cursoID
        let queryCurso = sql`
            SELECT nombre 
            FROM curso 
            WHERE curso_id = ${cursoID}
        `;

        const { rows: cursoRows } = await queryCurso;

        if (cursoRows.length === 0) {
            return NextResponse.json({ success: false, message: 'Course not found' });
        }

        const cursoNombre = cursoRows[0].nombre;

        // Consulta para obtener la calificación del usuario en el curso
        let queryCalificacion = sql`
            SELECT calificacion, fecha_calificacion 
            FROM calificacion 
            WHERE curso_id = ${cursoID} 
              AND user_id = ${userID}
        `;

        const { rows: calificacionRows } = await queryCalificacion;

        if (calificacionRows.length === 0) {
            return NextResponse.json({ success: false, message: 'Calification not found' });
        }

        const cursoCalificacion = calificacionRows[0].calificacion;
        const fechaCalificacion = calificacionRows[0].fecha_calificacion;

        // Construimos el objeto response
        const response = {
            'usuario_nombre': usuarioNombre,
            'usuario_apellidos': usuarioApellidos,
            'usuario_dni': userDNI,
            'curso_nombre': cursoNombre,
            'curso_calificacion': cursoCalificacion,
            'fecha_calificacion': fechaCalificacion
        };

        // Respuesta exitosa con los datos
        return NextResponse.json({ success: true, response });

    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}
