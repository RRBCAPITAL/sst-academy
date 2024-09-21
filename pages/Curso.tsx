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

interface NombreDelCurso {
  nombre: string;
}

const Curso: React.FC<NombreDelCurso> = (props) => {
  const [curso, setCurso] = useState<CursoDetallado[]>([]);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  useEffect(() => {
    const nombreCurso = deslugify(props?.nombre);
    console.log("props ", props.nombre);
    console.log(nombreCurso);

    if (!nombreCurso) return;

    const fetchCursos = async () => {
      try {
        const response = await axios.get(
          `/api/usuario-curso-detallado?curso_nombre=${nombreCurso}`
        );
        setCurso(response.data.curso);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (nombreCurso) {
      fetchCursos();
    }
  }, [props.nombre]);

  const handleUnitClick = (unidadId: string) => {
    setExpandedUnit(expandedUnit === unidadId ? null : unidadId);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4, minHeight: "100vh" }}>
      <Rutas />
      <Grid container spacing={4}
      sx={{ 
      flexDirection: { xs: "column", md: "row" } // Para pantallas pequeñas, columna; para grandes, fila
      }}
      >
        <Grid item xs={12} md={8} sx={{ position: "relative"}} >
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
                    background: "#eaeaf1",
                    border: "2px solid #002fff",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                      color: "blue",
                      fontWeight: "bold",
                      fontSize: "2.6rem",
                      lineHeight: "1.1",
                    }}
                  >
                    {curso.curso_nombre}
                  </Typography>
                  <Typography
                    variant="h4"
                    paragraph
                    sx={{
                      my: 4,
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
                          fontSize: "1rem",
                          color: "white",
                          fontWeight: "bold",
                          padding: '2px 20px',
                          background: "#da0000",
                        }}
                      >
                      15% de dscto.
                      </Typography>
                      <Typography
                        variant="h1"
                        color="text.secondary"
                        sx={{ fontSize: "1.6rem", color: "#0e0538" }}
                      >
                        S/ {curso.curso_precio}{" "}
                        {/* Cambia este valor si es necesario */}
                      </Typography>
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
                      <AccessTimeIcon sx={{paddingRight: '4px'}} /> {curso.curso_duracion} horas
                    </Typography>
                    {/* <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "1rem" }}
                    >
                      <strong>Materiales:</strong> {curso.curso_materiales}
                    </Typography> */}
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
                    color="primary"
                    sx={{
                      mt: 2,
                      mb: 4,
                      fontSize: "1rem",
                      fontWeight: "500",
                      padding: "10px 0",
                      borderRadius: "10px",
                      width: "100%",
                      backgroundColor: "#1976d2",
                      "&:hover": { backgroundColor: "#115293" },
                    }}
                  >
                   <WhatsAppIcon sx={{paddingRight: '4px'}}/> Comprar ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
        </Grid>
        <Grid item xs={12} md={4} sx={{order: { xs: 2, md: 1 }}}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              mb: 2,
              color: "blue",
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
                      border: "1px solid #002fff",
                      color: "#3f3f3f",
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
                            fontWeight: "bold",
                            flexGrow: 1,
                            //overflowWrap: "break-word",
                            //whiteSpace: "nowrap",
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
                          {unidad.lecciones.map((leccion) => (
                            <Typography
                              key={leccion.nombre}
                              variant="body2"
                              sx={{ mb: 1, fontSize: "1rem" }}
                            >
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
