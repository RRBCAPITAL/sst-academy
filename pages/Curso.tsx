"use client"

import { CursoDetallado } from '@/Types/curso-detalles.types';
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axios.config';
import VimeoPlayer from '@/components/VimeoPlayer';

interface NombreDelCurso {
  nombre: string;
}

const Curso = (props: NombreDelCurso) => {

    // Estado para almacenar los cursos
    const [curso, setCurso] = useState<CursoDetallado[]>([]);
    const userId = '';
    const cursoId = 'A-1';

    useEffect(() => {
      // Función para obtener la lista de cursos
      const fetchCursos = async () => {
          // Realiza la solicitud HTTP para obtener los cursos
          const response = await axios.get(`/api/usuario-curso-detallado?user_id=${userId}&curso_id=${cursoId}`); // Cambia la URL según tu configuración de API
          // Actualiza el estado con los cursos obtenidos
          setCurso(response.data.curso);
      };
  
      fetchCursos(); // Llama a la función para obtener los cursos al cargar el componente
    }, []);

    console.log('Este es el curso ', curso);

  return (
    <div className='w-screen p-20 flex flex-row gap-4'>
      <div className='w-1/2 min-h-fit p-4'>
      {curso?.map(curso => (
                <div key={curso.curso_id}>
                    <VimeoPlayer video_url={curso.video_intro} />
                    <h1 className='text-4xl font-bold mt-4 px-10'>{curso.curso_nombre}</h1>
                    <p className='mt-4 font-light px-10'>{curso.curso_descripcion}</p>
                    <button className='bg-blue-500 mt-4 font-light px-10'>Comprar ahora</button>
                    <p className='mt-4 font-light px-10'>15% de dscto.</p>
                    <p className='mt-4 font-light px-10'>S/ {curso.curso_precio}</p>
                    <p className='mt-4 font-light px-10'>{curso.curso_duracion} horas</p>
                    <p className='mt-4 font-light px-10'>{curso.curso_materiales} materiales</p>
                    <p className='mt-4 font-light px-10'>{curso.curso_calificacion} estrellas</p>
                    
                    {/* {curso.unidades.map(unidad => (
                        <div key={unidad.unidad}>
                            <h3>{unidad.unidad_nombre}</h3>
                            {unidad.lecciones.map(leccion => (
                                <div key={leccion.nombre}>
                                    <p>{leccion.nombre}</p>
                                    <a href={leccion.video_url}>Ver Video</a>
                                    <a href={leccion.material_descarga}>Descargar Material</a>
                                </div>
                            ))}
                        </div>
                    ))} */}
                </div>
            ))}
      </div>
      <div className='w-1/2 min-h-fit p-4'>
        <h1 className='font-bold py-4 px-10'>Contenido</h1>
        {curso?.map(curso => (
                <div key={curso.curso_id}>
                    {curso.unidades.map(unidad => (
                        <div key={unidad.unidad} className='py-4'>
                            <h3><strong className='text-blue-500'>{unidad.unidad}:</strong> {unidad.unidad_nombre}</h3>
                            <h2>Temas</h2>
                            {unidad.lecciones.map(leccion => (
                                <div key={leccion.nombre}>                                 
                                    <p> - {leccion.nombre}</p>
                                </div>
                            ))}
                        </div>
                    ))}
    </div>
))}
      </div>
    </div>
  )
}

export default Curso