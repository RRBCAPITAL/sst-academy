import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const leccionIDParse = url.searchParams.get("leccion_id");
    const leccionID = Number(leccionIDParse);
    const user_id = url.searchParams.get("user_id");

    if (!leccionID) {
      return NextResponse.json({
        success: false,
        error: "Leccion ID is required",
      });
    }

    const queryBase = sql`
            SELECT
    u.unidad_id,
    u.curso_id,
    u.nombre AS unidad_nombre,
    u.descripcion AS unidad_descripcion,
    u.unidad,
    l.leccion_id,
    l.nombre AS leccion_nombre,
    l.video_url,
    l.material_descarga,
    l.leccion,
    p.completado
FROM
    leccion AS l
INNER JOIN
    unidad AS u ON u.unidad_id = l.unidad_id
LEFT JOIN
    progreso AS p ON p.leccion_id = l.leccion_id AND p.user_id = ${user_id}
WHERE
    l.leccion_id = ${leccionID};
        `;

    const { rows: rows } = await queryBase;

    if (rows.length > 0) {
      return NextResponse.json({
        success: true,
        progreso: true,
        InfoLeccion: rows,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No existe info. actualmente.",
      });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
