import { Metadata } from 'next';
import Curso from '@/pages/Curso';
import { deslugify } from '@/utils/deslugify';
import { MetaDataCursos } from '@/utils/MetaDataCursos';

// Crear el Map para los metadatos de cursos
const MetaDataCursosMap = new Map([
  ['seguridad y salud en el trabajo', MetaDataCursos[0]],
  ['power bi con enfoque a ssoma', MetaDataCursos[1]],
  ['supervisor en trabajos de alto riesgo', MetaDataCursos[2]],
  ['sistema integrado de gestion', MetaDataCursos[3]],
  ['auditor interno en sistemas integrados de gestion', MetaDataCursos[4]],
  ['gestion y manejo integral de residuos solidos', MetaDataCursos[5]],
  ['sunafil fiscalizacion en seguridad y salud en el trabajo', MetaDataCursos[6]],
  ['elaboracion de tesis y proyectos', MetaDataCursos[7]],
]);

// Función para generar los metadatos dinámicamente en el servidor
export async function generateMetadata({ params }: { params: { nombre: string } }): Promise<Metadata> {
  const nombreDeslugified = deslugify(params.nombre);

  // Si no se encuentra el nombre o es incorrecto, devolver metadatos por defecto
  if (!nombreDeslugified) {
    return {
      title: "Curso no encontrado | SST Academy",
      description: "El curso solicitado no está disponible en nuestra plataforma.",
      keywords: ["curso no encontrado", "sst academy"],
      alternates: {
        canonical: `https://www.sstacademia.com/cursos-virtuales/${params.nombre}`,
      },
    };
  }

  // Buscar los metadatos correspondientes en el Map
  const metaData = MetaDataCursosMap.get(nombreDeslugified.toLowerCase());

  // Si se encuentran los metadatos, devolverlos, de lo contrario, devolver los metadatos por defecto
  if (metaData) {
    return metaData;
  } else {
    return {
      title: "Curso no encontrado | SST Academy",
      description: "El curso solicitado no está disponible en nuestra plataforma.",
      keywords: ["curso no encontrado", "sst academy"],
      alternates: {
        canonical: `https://www.sstacademia.com/cursos-virtuales/${params.nombre}`,
      },
    };
  }
}

const RouteCursoDetalle = () => {
  return (
    <>
      <Curso />
    </>
  );
};

export default RouteCursoDetalle;
