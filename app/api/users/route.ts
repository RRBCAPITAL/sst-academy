import { NextResponse } from 'next/server'
import { sql } from "@vercel/postgres";
 
export async function GET(request: Request) {
    try {
        const { rows } = await sql`SELECT * FROM usuario`;
        return NextResponse.json({ user: rows })

    } catch (error) {
        return NextResponse.json({ error })
    }
}

export async function POST(request: Request) {
    try {
        const { nombres, apellidos, dni, celular, correo, usuario, contrasenia, rol } = await request.json();

        // Inserción de datos en la tabla usuario
        const { rows } = await sql`
            INSERT INTO usuario (nombres, apellidos, dni, celular, correo, usuario, contrasenia, rol)
            VALUES (${nombres}, ${apellidos}, ${dni}, ${celular}, ${correo}, ${usuario}, ${contrasenia}, ${rol})
            RETURNING *;`; // Devuelve el registro insertado para confirmar la operación

        return NextResponse.json({ user: rows[0] }); // Devuelve el usuario insertado como respuesta

    } catch (error) {
        return NextResponse.json({ error }); // Devuelve el mensaje de error en caso de fallo
    }
}

export async function PUT(request: Request) {
    try {
        const { user_id, nombres, apellidos, dni, celular, correo, usuario, contrasenia, rol } = await request.json();

        // Consulta SQL de actualización
        const { rows } = await sql`
            UPDATE usuario
            SET nombres = COALESCE(${nombres}, nombres),
                apellidos = COALESCE(${apellidos}, apellidos),
                dni = COALESCE(${dni}, dni),
                celular = COALESCE(${celular}, celular),
                correo = COALESCE(${correo}, correo),
                usuario = COALESCE(${usuario}, usuario),
                contrasenia = COALESCE(${contrasenia}, contrasenia),
                rol = COALESCE(${rol}, rol)
            WHERE user_id = ${user_id}
            RETURNING *;`; // Devuelve el registro actualizado para confirmar la operación

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Usuario no encontrado' });
        }

        return NextResponse.json({ user: rows[0] }); // Devuelve el usuario actualizado como respuesta

    } catch (error) {
        return NextResponse.json({ error }); // Devuelve el mensaje de error en caso de fallo
    }
}