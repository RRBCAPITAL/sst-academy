"use client";

import { CursoDetallado } from "@/Types/curso-detalles.types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import VimeoPlayer from "@/components/VimeoPlayer";

interface CursoId {
  curso_id: string;
}

const CursoDashboard = (props: CursoId) => {
  // Estado para almacenar los cursos
  const [curso, setCurso] = useState<any>([]);
  const [user, setUser] = useState<any>([]);
  const [changeLeccion, setChangeLeccion] = useState<any>(false);
  const curso_id = props.curso_id;
  const user_id = user.user_id;

  useEffect(() => {
    const userData = localStorage.getItem("user");

    // Asegurarse de que userData no sea null antes de intentar parsear
    if (userData) {
      const userParse = JSON.parse(userData);
      setUser(userParse);
    }
    }, []);

  useEffect(() => {
    
      const fetchCursos = async () => {
        try {
          // Realiza la solicitud HTTP para obtener los cursos
          const response = await axios.get(
            `/api/usuario-curso-progreso?user_id=${user_id}&curso_id=${curso_id}`
          );

          // Actualiza el estado con los cursos obtenidos
          console.log(response);
          setCurso(response.data.startCurso);
        } catch (error) {
          console.error("Error al obtener el progreso del curso:", error);
        }
      };

      fetchCursos(); // Llama a la función para obtener los cursos al cargar el componente
 
  }, [user, changeLeccion]); // Dependencias de useEffect

  const handleLeccionHecha = async (leccion_id: any) => {

    const response = await axios.post(
      `/api/usuario-leccion-hecha`,
      {
        user_id,
        leccion_id,
      }
    );

    response.data.success && setChangeLeccion(!changeLeccion);   

  }

  console.log("Este es el curso gg", curso);

  return (
    <div className="w-screen p-20 flex flex-row gap-4">
      <div className="w-1/2 min-h-fit p-4">
        {curso?.map((curso: any) => (
          <div key={curso.curso_id}>
            <h1 className="text-4xl font-bold mt-4 mb-4 px-10">{curso.curso_nombre}</h1>
            <VimeoPlayer video_url={curso.video_intro} />
            <p className="mt-4 font-light mb-4 px-10"><strong className="">{curso.leccion}:</strong> {curso.leccion_nombre}</p>
            <button onClick={() => handleLeccionHecha(curso.leccion_id)} className="bg-red-500 p-4">Marcar como hecho</button>
            {/* <button className="bg-blue-500 p-4">Siguiente lección</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CursoDashboard;
