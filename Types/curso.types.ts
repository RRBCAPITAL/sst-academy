export interface Curso {
    curso_id: string;          // Identificador único del curso
    nombre: string;           // Nombre del curso
    descripcion: string;      // Descripción del curso
    calificacion: number | null; // Calificación del curso (puede ser nulo si no se ha calificado)
    materiales: string;       // Materiales del curso (puede ser una URL o un texto)
    imagen: string;           // URL de la imagen del curso
    duracion: string;         // Duración del curso (por ejemplo, "10 horas")
    precio: number;           // Precio del curso
    fecha_creacion: Date;     // Fecha de creación del curso
    fecha_actualizacion: Date; // Fecha de última actualización del curso
  }