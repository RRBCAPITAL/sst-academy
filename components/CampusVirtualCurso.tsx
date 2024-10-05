"use client";

import { CursoDetallado } from "@/Types/curso-detalles.types";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios.config";
import VimeoPlayer from "@/components/VimeoPlayer";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Collapse,
  IconButton,
  LinearProgress,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ProgresoCurso } from "@/Types/progreso-curso.types";
import Link from "next/link";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface User {
  user_id: number;
  nombres: string;
  apellidos: string;
}

const CampusVirtualCurso = (props: any) => {
  const [curso, setCurso] = useState<CursoDetallado[]>([]);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  const [user, setUser] = useState<User>();
  const [cursoProgreso, setCursoProgreso] = useState<ProgresoCurso[]>();
  const [dataLeccionActual, SetDataLeccionActual] = useState<any>();
  const [dataLeccionSeleccionada, setDataLeccionSeleccionada] = useState<any>(null);
  const [leccionHecha, setLeccionHecha] = useState<Boolean>(false);

  useEffect(() => {
    const userParse = localStorage.getItem("user");
    const userLocal = userParse ? JSON.parse(userParse) : null;
    setUser(userLocal);

    const fetchCursos = async () => {
      try {
        // usuario - curso especifico + unidades + lecciones + completado
        const res1 = await axios.get(
          `/api/usuario-curso-detallado?curso_id=${props?.curso_id}&user_id=${userLocal?.user_id}`
        );
        setCurso(res1.data.curso);

        // usuario - curso - porcentaje completado, total de lecciones completadas de un curso
        const res2 = await axios.get(`/api/usuario-curso-info-progreso?user_id=${userLocal?.user_id}`);
        res2.data.success && setCursoProgreso(res2.data.progresoCurso);

        // usuario - curso - informacion del curso y completado es true o false - leccion actual
        const res3 = await axios.get(`/api/usuario-curso-progreso?user_id=${userLocal?.user_id}&curso_id=${props?.curso_id}`);
        res3.data.success && SetDataLeccionActual(res3.data.startCurso);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (!props.curso_id || !userLocal.user_id) return;
    fetchCursos();
  }, [props?.curso_id, user?.user_id]);

  const progreso = cursoProgreso?.find((i) => i.curso_id === props?.curso_id);

  const handleUnitClick = (unidadId: string) => {
    setExpandedUnit(expandedUnit === unidadId ? null : unidadId);
  };

  const videoUrl = dataLeccionSeleccionada?.[0]?.video_url || dataLeccionActual?.[0]?.video_intro;
  const leccionNombre = dataLeccionSeleccionada?.[0]?.leccion_nombre || dataLeccionActual?.[0]?.leccion_nombre;
  const unidadActual = dataLeccionSeleccionada?.[0]?.unidad || dataLeccionActual?.[0]?.unidad;
  const leccionActual = dataLeccionSeleccionada?.[0]?.leccion || dataLeccionActual?.[0]?.leccion;

  const handleChangeLeccion = async (leccion_id: number) => {
    try {
      console.log('seleccione ', leccion_id);
      
      setDataLeccionSeleccionada(null);
      const res = await axios.get(`/api/usuario-leccion-seleccionada?leccion_id=${leccion_id}&user_id=${user?.user_id}`);
      if (res.data?.InfoLeccion) {
        setDataLeccionSeleccionada(res.data.InfoLeccion);
      }
      console.log('respuesta de lo seleccionado', res);
      
    } catch (error) {
      console.error("Error fetching: ", error);
    }
  };

  const handleLeccionHecha = async () => {
    try {
      const leccionId = dataLeccionSeleccionada?.[0]?.leccion_id || dataLeccionActual?.[0]?.leccion_id;
  
      if (!leccionId || !user?.user_id) {
        console.log("Faltan datos de la lección o del usuario");
        return;
      }
  
      const data = {
        user_id: user.user_id,
        leccion_id: leccionId,
      };
  
      const res = await axios.post(`/api/usuario-leccion-hecha`, data);
      
      if (res.data?.success) {
        setLeccionHecha(!leccionHecha);
  
        // Actualizar el progreso de la lección completada dentro del curso
        setCurso((prevCurso) =>
          prevCurso.map((cursoItem) => {
            if (cursoItem.curso_id === props?.curso_id) {
              return {
                ...cursoItem,
                unidades: cursoItem.unidades.map((unidad) => ({
                  ...unidad,
                  lecciones: unidad.lecciones.map((leccion) =>
                    leccion.leccion_id === leccionId ? { ...leccion, completado: true } : leccion
                  ),
                })),
              };
            }
            return cursoItem;
          })
        );
      }
    } catch (error) {
      console.error("Error al marcar la lección como hecha:", error);
    }
  };

  const DataMaterialsExamen = [
    {
      curso_id: 'A-1',
      materiales_url: '',
      examen_url: ''
    },
    {
      curso_id: 'B-1',
      materiales_url: '',
      examen_url: ''
    },
    {
      curso_id: 'C-1',
      materiales_url: '',
      examen_url: ''
    },
    {
      curso_id: 'D-1',
      materiales_url: '',
      examen_url: ''
    },
    {
      curso_id: 'E-1',
      materiales_url: '',
      examen_url: ''
    },
    {
      curso_id: 'F-1',
      materiales_url: '',
      examen_url: ''
    },
    {
      curso_id: 'G-1',
      materiales_url: '',
      examen_url: ''
    },
    {
      curso_id: 'H-1',
      materiales_url: '',
      examen_url: ''
    },
    {
      curso_id: 'I-1',
      materiales_url: '',
      examen_url: ''
    },
  ]

  const MaterialExamen = DataMaterialsExamen.find(i => i.curso_id === props?.curso_id)

  return (
    <Box sx={{ paddingBottom: "0px", minHeight: "100vh", maxWidth: "100vw", margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ff914d",
          width: "100%",
          height: "124px",
          textAlign: "center",
          fontSize: "2rem",
          color: "white",
          fontWeight: "500",
          overflowX: "hidden",
          padding: "0",
          margin: "auto",
        }}
      >
        {curso?.length > 0 ? curso[0].curso_nombre : "Cargando..."}
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <LinearProgress
          variant="determinate"
          value={Math.round(Number(progreso?.porcentaje_completado))}
          sx={{
            height: "10px",
            borderRadius: "5px",
            backgroundColor: "#e9d7cd",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#ff914d",
            },
          }}
        />
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "1200px",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={8} sx={{ position: "relative" }}>
          {curso &&
            curso?.map((curso) => {
              const leccionActualId = dataLeccionSeleccionada?.[0]?.leccion_id  ||  dataLeccionActual?.[0]?.leccion_id;

              const unidadActual = curso.unidades.find((unidad) =>
                unidad.lecciones.some((leccion) => leccion.leccion_id === leccionActualId)
              );

              const leccionActual = unidadActual?.lecciones.find(
                (leccion) => leccion.leccion_id === leccionActualId
              );

              const leccionCompletada = leccionActual?.completado;
              console.log('leccion actual id ', leccionActualId);
              console.log('unidad actual ', unidadActual);
              console.log('leccionactual ', leccionActual);
              console.log('leccion completada ', leccionCompletada);
 
              return (
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
                  }}
                >
                  <VimeoPlayer video_url={videoUrl} />
                </Box>
                <CardContent
                  sx={{
                    background: "#292625",
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    variant="h4"
                    paragraph
                    sx={{
                      my: 0,
                      marginBottom: "0px",
                      marginLeft: "20px",
                      fontSize: "1rem",
                      color: "white",
                      fontWeight: "bold",
                      textShadow: "0 0 1px rgba(0, 0, 0, 0.1);",
                    }}
                  >
                    {leccionNombre}
                  </Typography>
                  {leccionCompletada ? (
                    <Typography sx={{ background: '#38bb00', color: 'white', padding: '4px 8px', borderRadius: '6px' }}>
                      LECCIÓN COMPLETADA
                    </Typography>
                  ) : (
                    <Button sx={{ background: '#ff7f3f', color: 'white' }} onClick={() => handleLeccionHecha()}>
                      Marcar como hecho
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
            })}
        </Grid>
        {/* Listado de unidades y lecciones */}
        <Grid item xs={12} md={4} sx={{ order: { xs: 2, md: 1 } }}>
          {unidadActual && leccionActual && (
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
              {unidadActual}{" - "}{leccionActual}
            </Typography>
          )}
          {curso &&
            curso?.map((curso) => (
              <Box key={curso.curso_id}>
                {curso.unidades.map((unidad) => {
                  // Verificar si todas las lecciones de la unidad están completadas
                  const allLessonsCompleted = unidad.lecciones.every((leccion) => leccion.completado);
                  const isCurrentUnit = unidad.unidad === unidadActual;

                  return (
                    <Card
                      key={unidad.unidad}
                      variant="outlined"
                      sx={{
                        mb: 1,
                        width: "100%",
                        border: `1px solid ${allLessonsCompleted ? "#01ff3c" : '#ff914d'}`,
                        background: allLessonsCompleted ? "#c7ffd4" : (isCurrentUnit ? "#ffe6d9" : "#f6f3f0"),
                        color: "#281e1e",
                      }}
                    >
                      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                        <Box
                          onClick={() => handleUnitClick(unidad.unidad)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            userSelect: "none",
                            px: 1,
                            py: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontSize: "1rem",
                              color: isCurrentUnit ? "#ff914d" : "#737373",
                              fontWeight: "bold",
                              flexGrow: 1,
                              textOverflow: "ellipsis",
                            }}
                          >
                            <strong>{unidad.unidad}:</strong> {unidad.unidad_nombre}
                          </Typography>
                          <IconButton
                            aria-label={expandedUnit === unidad.unidad ? "Ocultar Temas" : "Ver Temas"}
                            sx={{ p: 1 }}
                          >
                            {expandedUnit === unidad.unidad ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </Box>
                        <Collapse in={expandedUnit === unidad.unidad}>
                          <Box sx={{ width: "100%" }}>
                            {unidad.lecciones
                              .sort((a, b) => a.leccion_id - b.leccion_id) // Ordenar según leccion_id
                              .map((leccion, index) => {
                                const isCurrentLesson =
                                  leccion.leccion_id === (dataLeccionSeleccionada?.[0]?.leccion_id || dataLeccionActual?.[0]?.leccion_id);
                                const isCompletedLesson = leccion.completado;

                                return (
                                  <Typography
                                    key={leccion.leccion_id}
                                    variant="body2"
                                    sx={{
                                      my: 1,
                                      py: 1,
                                      px: 1,
                                      fontSize: "0.8rem",
                                      background: isCompletedLesson ? "#40d400" : (isCurrentLesson ? "#ff914d" : "#ffffff"),
                                      color: isCompletedLesson ? "#ffffff" : (isCurrentLesson ? "#ffffff" : "#2c2927"),
                                      cursor: "pointer",
                                      borderRadius: "5px",
                                    }}
                                    onClick={() => handleChangeLeccion(leccion.leccion_id)}
                                  >
                                    ● <strong>Lección {index + 1}</strong> - {leccion.nombre}
                                  </Typography>
                                );
                              })}
                          </Box>
                        </Collapse>
                      </CardContent>
                    </Card>
                  );
                })}

                    <Card
                    variant="outlined"
                    sx={{
                      mb: 1,
                      width: "100%",
                      border: '2px solid #ff7931',
                      background: "#f6f3f0",
                      "&:hover": {
                      border: '2px solid #ff914d', // Cambia el color del borde al pasar el mouse
                      background: "#fff5e6", // Cambia el fondo al pasar el mouse
                      },
                    }}
                  >
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                      <Box
                        onClick={() => handleUnitClick('1')}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          userSelect: "none",
                          px: 1,
                          py: 1,
                        }}
                      >
                        <Link
                          href={MaterialExamen?.materiales_url || ""}
                          style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            flexGrow: 1,
                            textOverflow: "ellipsis",
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            color: "#ff7f3a",
                          }}
                        >
                          Descargar Materiales
                          <FileDownloadIcon />
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{
                      mb: 1,
                      width: "100%",
                      border: '2px solid #ff7931',
                      background: "#f6f3f0",
                      "&:hover": {
                      border: '2px solid #ff914d', // Cambia el color del borde al pasar el mouse
                      background: "#fff5e6", // Cambia el fondo al pasar el mouse
                      },
                    }}
                  >
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                      <Box
                        onClick={() => handleUnitClick('1')}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          userSelect: "none",
                          px: 1,
                          py: 1,
                        }}
                      >
                        <Link
                          href={MaterialExamen?.examen_url || ""}
                          style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            flexGrow: 1,
                            textOverflow: "ellipsis",
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            color: "#ff7f3a",
                          }}
                        >
                          Ir al Examen Final
                          <EditNoteIcon />
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>
              </Box>
              
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampusVirtualCurso;
