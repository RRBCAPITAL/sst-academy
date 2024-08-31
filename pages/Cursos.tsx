"use client";

import { useState, useEffect } from "react";
import { Curso } from "@/Types/curso.types";
import axios from "axios";
import Link from "next/link";
import { slugify } from "@/utils/slugify";

const Cursos = () => {
  // Estado para almacenar los cursos
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    // Función para obtener la lista de cursos
    const fetchCursos = async () => {
      // Realiza la solicitud HTTP para obtener los cursos
      const response = await axios.get("/api/cursos"); // Cambia la URL según tu configuración de API
      // Actualiza el estado con los cursos obtenidos
      setCursos(response.data.curso);
    };

    fetchCursos(); // Llama a la función para obtener los cursos al cargar el componente
  }, []);

  return (
    <div>
      <ul>
        {cursos.length > 0 ? (
          cursos.map((curso) => (
            <li
              key={curso.curso_id}
              className="bg-blue-500 w-fit h-fit mt-4 p-4"
            >
              <Link href={`/cursos-virtuales/${slugify(curso.nombre)}`}>
                <h2 className="text-white">Curso {curso.nombre}</h2>
                {/* Puedes agregar más detalles del curso aquí */}
              </Link>
            </li>
          ))
        ) : (
          <p></p>
        )}
      </ul>
    </div>
  );
};

export default Cursos;
