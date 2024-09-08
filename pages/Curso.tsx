"use client";

import { CursoDetallado } from '@/types/curso-detalles.types';
import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios.config';
import VimeoPlayer from '@/components/VimeoPlayer';
import { Box, Container, Typography, Button, Card, CardContent, Grid, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface NombreDelCurso {
  nombre: string;
}

const Curso: React.FC<NombreDelCurso> = (props) => {
  const [curso, setCurso] = useState<CursoDetallado[]>([]);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const userId = ''; // Implementar lógica para obtener el userId real
  const cursoId = 'A-1'; // Implementar lógica para obtener el cursoId real

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get(`/api/usuario-curso-detallado?user_id=${userId}&curso_id=${cursoId}`);
        setCurso(response.data.curso);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCursos();
  }, [userId, cursoId]);

  const handleUnitClick = (unidadId: string) => {
    setExpandedUnit(expandedUnit === unidadId ? null : unidadId);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4, minHeight: '100vh' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} sx={{ position: 'relative' }}>
          {curso.map(curso => (
            <Card key={curso.curso_id} variant="outlined" sx={{ display: 'flex', flexDirection: 'column', mb: 4 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%', // Proporción 16:9
                  mb: 2,
                }}
              >
                <VimeoPlayer video_url={curso.video_intro} />
              </Box>
              <CardContent>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'blue', fontWeight: 'bold', fontSize: '2rem' }}>
                  {curso.curso_nombre}
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  {curso.curso_descripcion}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                    <strong>Precio:</strong> S/ {curso.curso_precio}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                    <strong>Duración:</strong> {curso.curso_duracion} horas
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                    <strong>Materiales:</strong> {curso.curso_materiales}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                    <strong>Calificación:</strong> {curso.curso_calificacion} estrellas
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" sx={{ mt: 2, mb: 4, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}>
                  Comprar ahora
                </Button>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  15% de descuento
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, color: 'blue', fontWeight: 'bold', fontSize: '1.5rem' }}>
            Contenido del Curso
          </Typography>
          {curso.map(curso => (
            <Box key={curso.curso_id}>
              {curso.unidades.map(unidad => (
                <Card key={unidad.unidad} variant="outlined" sx={{ mb: 1, width: '100%', border: '1px solid #3f3f3f', color: '#3f3f3f'}}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box 
                      onClick={() => handleUnitClick(unidad.unidad)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        userSelect: 'none', // Prevenir selección de texto
                        px: 2,
                        py: 1
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          flexGrow: 1,
                          overflowWrap: 'break-word',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        <strong>{unidad.unidad}:</strong> {unidad.unidad_nombre}
                      </Typography>
                      <IconButton
                        aria-label={expandedUnit === unidad.unidad ? 'Ocultar Temas' : 'Ver Temas'}
                        sx={{ p: 1 }}
                      >
                        {expandedUnit === unidad.unidad ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Box>
                    <Collapse in={expandedUnit === unidad.unidad}>
                      <Box sx={{ pl: 2, width: '100%' }}>
                        <Typography variant="subtitle1" component="h4" sx={{ mb: 1, fontSize: '1.125rem' }}>
                          Temas
                        </Typography>
                        {unidad.lecciones.map(leccion => (
                          <Typography key={leccion.nombre} variant="body2" sx={{ mb: 1, fontSize: '1rem' }}>
                            - {leccion.nombre}
                          </Typography>
                        ))}
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Curso;
