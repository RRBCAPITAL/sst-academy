"use client"

import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Curso } from '../Types/curso.types';

const Inicio = () => {

    // Estado para almacenar los cursos
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    // Función para obtener la lista de cursos
    const fetchCursos = async () => {
        // Realiza la solicitud HTTP para obtener los cursos
        const response = await axios.get('/api/cursos'); // Cambia la URL según tu configuración de API
        // Actualiza el estado con los cursos obtenidos
        setCursos(response.data.curso);
    };

    fetchCursos(); // Llama a la función para obtener los cursos al cargar el componente
  }, []);

  console.log(cursos);
  

  return (
    <div>
    <h1>Lista de Cursos</h1>
    <ul>
      {cursos.length > 0 ? (
        cursos.map(curso => (
          <li key={curso.curso_id}>
            <h2 className='text-white'>Curso {curso.nombre}</h2>
            {/* Puedes agregar más detalles del curso aquí */}
          </li>
        ))
      ) : (
        <p>No hay cursos disponibles.</p>
      )}
    </ul>
  </div>
  )
}

export default Inicio