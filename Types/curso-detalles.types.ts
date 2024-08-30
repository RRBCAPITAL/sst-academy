// Define los tipos en "@/Types/curso-detalles.types.ts"

interface Leccion {
    nombre: string;
    video_url: string;
    material_descarga: string;
}

interface Unidad {
    unidad: string;
    unidad_nombre: string;
    lecciones: Leccion[];
}

export interface CursoDetallado {
    curso_id: string;
    curso_nombre: string;
    curso_descripcion: string;
    curso_calificacion: number;
    curso_materiales: string;
    curso_duracion: number;
    curso_precio: number; 
    video_intro: string;
    unidades: Unidad[];
}
