"use client";

import { useState, useEffect } from "react";
import { Curso } from "@/Types/curso.types";
import axios from "../../../utils/axios.config"
import Link from "next/link";
import { slugify } from "@/utils/slugify";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    // Recupera la información del usuario desde el almacenamiento local
    const userData = localStorage.getItem('user');
    const userParse = JSON.parse(userData);
    console.log("user data: ", userData);
    
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // const fetchCursos = async () => {
    //     // Realiza la solicitud HTTP para obtener los cursos
    //     const response = await axios.get(`/api/usuario-curso-info-progreso?user_id=${userParse.user_id}`); // Cambia la URL según tu configuración de API
    //     // Actualiza el estado con los cursos obtenidos
    //     setCursos(response.data.cursos);
    //   };
  
    //   fetchCursos(); // Llama a la función para obtener los cursos al cargar el componente

    const fetchProgresoCursos = async () => {
        // Realiza la solicitud HTTP para obtener los cursos
        const response = await axios.get(`/api/usuario-curso-info-progreso?user_id=${userParse.user_id}&`); // Cambia la URL según tu configuración de API
        // Actualiza el estado con los cursos obtenidos
        console.log('cursos 1 ', response);
        setCursos(response.data.progresoCurso);
      };

      fetchProgresoCursos();
  }, []);

  return (
    <div className="px-10">
      <h1 className='text-4xl mt-10'>{user && user.nombres + ' ' + user.apellidos}</h1>
      {/* Resto del contenido del dashboard */}
      <div>
        <h1 className="mt-10">CURSOS ACTIVOS</h1>
        <ul>
        {cursos && cursos.length > 0 ? (
          cursos.map((curso) => (
            <li
              key={curso.curso_id}
              className="bg-blue-500 w-fit h-fit mt-4 p-4"
            >

                <h2 className="text-white mb-10 text-2xl">Curso {curso.nombre_curso}</h2>
                <h3>Total de lecciones del curso: {curso.total_lecciones}</h3>
                <h3>Lecciones completadas: {curso.lecciones_completadas}</h3>
                <h3 className="mb-4">Porcentaje completado: {parseInt(curso.porcentaje_completado)}%</h3>

             {curso.lecciones_completadas === "0" ?  <Link href={`/dashboard/estudiante/cursos-virtuales/${curso.curso_id}`} className="bg-blue-800 mt-4 px-2 py-1">Empezar curso</Link> :  <Link href={`/dashboard/estudiante/cursos-virtuales/${curso.curso_id}`} className="bg-blue-800 mt-4 px-2 py-1">Continuar curso</Link>}
            </li>
          ))
        ) : (
          <p></p>
        )}
      </ul>
      </div>
    </div>
  );
};

export default Dashboard;
