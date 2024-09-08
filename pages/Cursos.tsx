"use client";

import { useState, useEffect } from "react";
import { Curso } from "@/types/curso.types";
import axios from "@/utils/axios.config";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Skeleton } from "@mui/material";

// Define el componente Cursos
const Cursos = () => {
  // Estado para almacenar los cursos
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar la carga

  useEffect(() => {
    // Función para obtener la lista de cursos
    const fetchCursos = async () => {
      try {
        // Realiza la solicitud HTTP para obtener los cursos
        const response = await axios.get("/api/cursos"); // Cambia la URL según tu configuración de API
        // Actualiza el estado con los cursos obtenidos
        setCursos(response.data.curso);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos(); // Llama a la función para obtener los cursos al cargar el componente
  }, []);

  return (
    <Grid container spacing={4} paddingTop={2}>
      {loading ? (
        // Muestra un skeleton mientras se cargan los datos
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%" height={200} />
        </Grid>
      ) : (
        cursos.length > 0 ? (
          cursos.map((curso) => (
            <Grid item xs={12} sm={6} md={4} key={curso.curso_id}>
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image={curso.imagen || 'https://www.dfk.pe/wp-content/uploads/2022/06/ref-1064x480.png'} // Usa una imagen predeterminada si no hay imagen del curso
                  alt={`Imagen de ${curso.nombre}`}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{padding: '10px 0  '}}>
                    {curso.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* Agrega una breve descripción si está disponible */}
                    {curso.descripcion || 'Descripción no disponible'}
                  </Typography>
                  <Link href={`/cursos-virtuales/${slugify(curso.nombre)}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                      Ver Curso
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No se encontraron cursos.</Typography>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default Cursos;
