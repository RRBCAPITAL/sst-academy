"use client";

import React, { useEffect, useState } from "react";
import axios from "@/utils/axios.config";
import VimeoPlayer from "@/components/VimeoPlayer";
import { Box, Container, Typography, Button, Paper, CircularProgress } from "@mui/material";

interface CursoId {
  curso_id: string;
}

const CursoDashboard = (props: CursoId) => {
  // Estado para almacenar los cursos
  const [curso, setCurso] = useState<any>([]);
  const [user, setUser] = useState<any>(null); // Cambiado a null
  const [changeLeccion, setChangeLeccion] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const curso_id = props.curso_id;

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const userParse = JSON.parse(userData);
        setUser(userParse);
      }
    };

    fetchUserData();
  }, []); // Solo se ejecuta una vez al montar el componente

  useEffect(() => {
    const fetchCursos = async () => {
      if (!user || !user.user_id) return; // Asegúrate de que user_id esté definido

      try {
        setLoading(true); // Activar estado de carga
        // Realiza la solicitud HTTP para obtener los cursos
        const response = await axios.get(
          `/api/usuario-curso-progreso?user_id=${user.user_id}&curso_id=${curso_id}`
        );

        // Actualiza el estado con los cursos obtenidos
        setCurso(response.data.startCurso);
      } catch (error) {
        console.error("Error al obtener el progreso del curso:", error);
      } finally {
        setLoading(false); // Desactivar estado de carga
      }
    };

    fetchCursos(); // Llama a la función para obtener los cursos cuando `user` y `curso_id` estén disponibles
  }, [user, curso_id, changeLeccion]); // Dependencias del efecto

  const handleLeccionHecha = async (leccion_id: any) => {
    if (!user || !user.user_id) return; // Asegúrate de que user_id esté definido

    try {
      const response = await axios.post(
        `/api/usuario-leccion-hecha`,
        {
          user_id: user.user_id,
          leccion_id,
        }
      );

      if (response.data.success) {
        setChangeLeccion(!changeLeccion);   
      }
    } catch (error) {
      console.error("Error al marcar lección como hecha:", error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        minHeight: '100vh', // Altura mínima de pantalla completa
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centra el contenido verticalmente
        alignItems: 'center', // Centra el contenido horizontalmente
        p: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: '100%',
          maxWidth: '70%', // Ocupa el 70% del ancho en pantallas grandes
          height: '100%', // Asegúrate de que el Box ocupe toda la altura disponible
          overflow: 'hidden', // Evita el desbordamiento
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          curso?.map((curso: any) => (
            <Paper key={curso.curso_id} elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem' }}> {/* Aumento del tamaño de fuente */}
                {curso.curso_nombre}
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingTop: '70%', // Ocupa el 70% de la altura del contenedor
                }}
              >
                <VimeoPlayer video_url={curso.video_intro} />
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>{curso.leccion}:</strong> {curso.leccion_nombre}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => handleLeccionHecha(curso.leccion_id)}
              >
                Marcar como hecho
              </Button>
            </Paper>
          ))
        )}
      </Box>
    </Container>
  );
};

export default CursoDashboard;
