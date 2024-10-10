"use client";

import { CursoDetallado } from "@/Types/curso-detalles.types";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios.config";
import VimeoPlayer from "@/components/VimeoPlayer";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { deslugify } from "@/utils/deslugify";
import Rutas from "@/components/Rutas";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useTheme, useMediaQuery } from "@mui/material";

import { useParams } from 'next/navigation';

const Curso = () => {
  const params = useParams();  
  const nombre = params?.nombre as string | undefined;

  // Llamamos los hooks siempre, sin condicionales
  const [curso, setCurso] = useState<CursoDetallado[]>([]);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (!nombre) return;

    const fetchCursos = async () => {
      const nombreCurso = deslugify(nombre);
      if (!nombreCurso) return; 
      try {
        const response = await axios.get(
          `/api/usuario-curso-detallado?curso_nombre=${nombreCurso}`
        );
        setCurso(response.data.curso);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCursos();
  }, [nombre]);

  const handleUnitClick = (unidadId: string) => {
    setExpandedUnit(expandedUnit === unidadId ? null : unidadId);
  };

  // Aquí gestionamos el caso en que `nombre` no exista
  if (!nombre) {
    return <p>Cargando...</p>;
  }

  return (
    <Box sx={{ paddingBottom: '20px', minHeight: "100vh", maxWidth: '100vw', overflowX: 'hidden' }}>
      <Box
      sx={{ 
        display: 'flex', // Para habilitar flexbox
        justifyContent: 'center', // Centrado horizontal
        alignItems: 'center', // Centrado vertical
        background: '#ff914d',
        width: '100%',
        height: '124px',
        textAlign: 'center',
        fontSize: '2rem',
        color: 'white',
        fontWeight: '500',
        overflowX: 'hidden',
        margin: '0',
        lineHeight: {xs: '1.1'},
        padding: {xs: '0 10px'}
      }}
      >
         {curso?.length > 0 ? curso[0].curso_nombre : "Cargando..."}
      </Box>
     
      <Grid container spacing={0}
      sx={{ 
      flexDirection: { xs: "column", md: "row" }, // Para pantallas pequeñas, columna; para grandes, fila
      maxWidth: '1200px',
      margin: 'auto',
      padding: '10px'
      }}
      >
         <Rutas />
        <Grid item xs={12} md={8} sx={{ position: "relative", padding: {xs: '0px', md: '20px'}, margin: {xs: '0px', md: '0px'}, marginTop: {xs: '20px', md: '0px'} }} >
          {curso &&
            curso?.map((curso) => (
              <Card
                key={curso.curso_id}
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%", // Proporción 16:9
                    mb: 2,
                  }}
                >
                  <VimeoPlayer video_url={curso.video_intro} />
                </Box>
                <CardContent
                  sx={{
                    background: "#f1edea",
                    border: "2px solid #ff914d",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    variant="h4"
                    paragraph
                    sx={{
                      my: 0,
                      marginBottom: '40px',
                      fontSize: "1.2rem",
                      color: "black",
                      textShadow: " 0 0 1px rgba(0, 0, 0, 0.1);",
                    }}
                  >
                    {curso.curso_descripcion}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      mb: 4,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between", // Alinea los elementos a los extremos
                        gap: 2,
                        width: "100%", // Asegura que ocupe todo el ancho disponible
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: {xs: '0.7rem', md: "1rem"},
                          color: "white",
                          fontWeight: "bold",
                          padding: {xs: '2px 10px', md: '2px 20px'},
                          background: "#ff0000",
                        }}
                      >
                      20% de dscto.
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    {/* Precio con descuento tachado */}
    <Typography
      variant="h1"
      color="text.secondary"
      sx={{
        fontSize: {xs: "0.9rem", md: "1.1rem"},
        color: '#494949',
        fontWeight: '400',
        textDecoration: 'line-through', // Tachado
      }}
    >
      S/ {Math.floor(curso.curso_precio * 1.2)} {/* Aplica el 15% de descuento */}
    </Typography>

    {/* Precio original */}
    <Typography
      variant="h1"
      color="text.secondary"
      sx={{
        fontSize: {xs: "1.4rem", md: "1.6rem"},
        color: '#ff7f3a',
        fontWeight: 'bold',
      }}
    >
      S/ {Math.floor(curso.curso_precio)}
    </Typography>
  </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between", // Alinea los elementos a los extremos
                        gap: 2,
                        width: "100%", // Asegura que ocupe todo el ancho disponible
                      }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <GroupAddIcon sx={{marginRight: '10px', fontSize: '1.6rem'}} /> {curso.curso_duracion} {isMdUp && 'estudiantes'}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                     <StarBorderIcon /> 4.5{" "}
                    </Typography>
                    </Box>
                  </Box>
                  <Button
  variant="contained"
  sx={{
    mt: 2,
    mb: 4,
    fontSize: "1rem",
    fontWeight: "500",
    padding: "10px 0",
    borderRadius: "10px",
    width: "100%",
    color: 'white'
  }}
  onClick={() => {
    const phoneNumber = '932271898'; // Reemplaza con el número de WhatsApp
    const message = `¡Hola! Estoy interesado en comprar el Programa de especialización ${curso.curso_nombre}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }}
>
  <WhatsAppIcon sx={{ paddingRight: '4px' }} /> Comprar ahora
</Button>
                </CardContent>
              </Card>
            ))}
        </Grid>
        <Grid item xs={12} md={4} sx={{order: { xs: 2, md: 1 }, padding: {xs: '20px 6px', md: '20px 0'}}}>
          <Typography
            variant="h5"
            component="h2"
            color="primary"
            gutterBottom
            sx={{
              mb: 2,
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Contenido del Curso
          </Typography>
          {curso &&
            curso?.map((curso) => (
              <Box key={curso.curso_id}>
                {curso.unidades.map((unidad) => (
                  <Card
                    key={unidad.unidad}
                    variant="outlined"
                    sx={{
                      mb: 1,
                      width: "100%",
                      border: "1px solid #ff914d",
                      background: "#f6f3f0",
                      color: "#281e1e",
                    }}
                  >
                    <CardContent
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Box
                        onClick={() => handleUnitClick(unidad.unidad)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          userSelect: "none", // Prevenir selección de texto
                          px: 1,
                          py: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontSize: "1rem",
                            color:'#737373',
                            fontWeight: "bold",
                            flexGrow: 1,
                            textOverflow: "ellipsis",
                          }}
                        >
                          <strong>{unidad.unidad}:</strong>{" "}
                          {unidad.unidad_nombre}
                        </Typography>
                        <IconButton
                          aria-label={
                            expandedUnit === unidad.unidad
                              ? "Ocultar Temas"
                              : "Ver Temas"
                          }
                          sx={{ p: 1 }}
                        >
                          {expandedUnit === unidad.unidad ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </IconButton>
                      </Box>
                      <Collapse in={expandedUnit === unidad.unidad}>
                        <Box sx={{ pl: 2, width: "100%" }}>
                          <Typography
                            variant="subtitle1"
                            component="h4"
                            sx={{ mb: 1, fontSize: "1.125rem" }}
                          >
                            Temas
                          </Typography>
                          {unidad.lecciones.map((leccion, leccionIndex) => (
                            (["C-1", "E-1", "F-1", "G-1", "I-1"].includes(curso.curso_id)) ? (
                              leccion.nombre?.split(" - ")?.map((frase, index) => (
                                <div key={`${leccionIndex}-${index}`}>
                                  {index + 1}. {frase.trim()}
                                </div>
                              ))
                            ) : (
                              <Typography
                                key={leccion.nombre}
                                variant="body2"
                                sx={{ mb: 1, fontSize: "1rem" }}
                              >
                                - {leccion.nombre}
                              </Typography>
                            )
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
    </Box>
  );
};

export default Curso;
