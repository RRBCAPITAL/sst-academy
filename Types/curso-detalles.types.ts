// Define los tipos en "@/Types/curso-detalles.types.ts"

interface Leccion {
    leccion_id: number;
    nombre: string;
    video_url: string;
    material_descarga: string;
    completado: boolean
}

interface Unidad {
    unidad: string;
    unidad_id: number;
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
    completado: boolean;
    unidades: Unidad[];
}
