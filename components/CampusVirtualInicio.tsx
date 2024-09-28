"use client"

import React from 'react'
import { useState, useEffect } from "react";
import { Curso } from "@/Types/curso.types";
import axios from "../utils/axios.config";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    Skeleton,
    LinearProgress,
  } from "@mui/material";
  import { ProgresoCurso } from '@/Types/progreso-curso.types';
  

interface User {
    user_id: number;
    nombres: string;
    apellidos: string;
  }

const CampusVirtualInicio = () => {

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar la carga
  const [user, setUser] = useState<User>()
  const [cursoProgreso, setCursoProgreso] = useState<ProgresoCurso[]>()
    
  useEffect(() => {
    // Función para obtener la lista de cursos

    const userParse = localStorage.getItem("user");
    const userLocal = userParse ? JSON.parse(userParse) : null;
    setUser(userLocal);

    const fetchCursos = async () => {
      try {
        // Realiza la solicitud HTTP para obtener los cursos
        const res1 = await axios.get(`/api/usuario-cursos?user_id=${userLocal?.user_id}`); // Cambia la URL según tu configuración de API
        setCursos(res1.data.curso);

        const res2 = await axios.get(`/api/usuario-curso-info-progreso?user_id=${userLocal?.user_id}`);
        res2.data.success && setCursoProgreso(res2.data.progresoCurso);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    user && fetchCursos();
  }, [user?.user_id]);

  return (
    <Grid sx={{maxWidth: '1200px',}}>
        <Typography sx={{marginTop: '150px', marginLeft: '34px', fontWeight: 'bold', color: '#737373'}}>TUS CURSOS ACTIVOS</Typography>
    <Grid container spacing={4} paddingTop={0} sx={{width:'100%', alignItems: 'center', margin: 'auto'
    }}>
    {loading ? (
      // Muestra un skeleton mientras se cargan los datos
      <Grid item xs={12}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Grid>
    ) : cursos.length > 0 ? (
      cursos.map((curso) => {
        const progreso = cursoProgreso?.find((i) => i.curso_id === curso.curso_id);
        
        return (
            <Grid item xs={12} sm={6} md={4} key={curso.curso_id} sx={{marginTop: '0px'}}>
          <Card sx={{ boxShadow: "none" }}>
            <CardMedia
              component="img"
              height="240"
              image={
                curso.imagen ||
                "https://www.dfk.pe/wp-content/uploads/2022/06/ref-1064x480.png"
              } // Usa una imagen predeterminada si no hay imagen del curso
              alt={`Imagen de ${curso.nombre}`}
            />

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

            <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    color: "white",
                    background: "#ff914d",
                    width: "fit-content",
                    textAlign: "center",
                    marginTop: '12px'
                  }}
                >
                  Progreso {Math.round(Number(progreso?.porcentaje_completado))}%
                </Typography>

            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  padding: "2px 0",
                  fontSize: "1.2rem",
                  color: "#37423B",
                  //height: "60px",
                }}
              >
                {curso.nombre}
              </Typography>
              
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between", // Alinea los elementos a los extremos
                  gap: 2,
                  width: "100%", // Asegura que ocupe todo el ancho disponible
                }}
              > 
              </Box>
              <Link
                href={`/campus-virtual/curso/${curso?.curso_id}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 2,
                    fontSize: "1rem",
                    fontWeight: "500",
                    background: "none",
                    border: "2px solid #ff914d",
                    color: "#ff7017",
                    transition: "background 0.3s ease, color 0.3s ease", // Transición suave entre los estados

                    "&:hover": {
                      background: "#ff914d", // Fondo naranja al hacer hover
                      color: "white", // Texto blanco al hacer hover
                      borderColor: "#ff914d", // Mantener el borde naranja
                    },
                  }}
                >
                 {Math.round(Number(progreso?.porcentaje_completado)) > 0 ? 'Continuar curso' : 'Empezar curso'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        )
        
})
    ) : (
      <Grid item xs={12}>
        <Typography variant="body1">No se encontraron cursos.</Typography>
      </Grid>
    )}
    </Grid>
  </Grid>
  )
}

export default CampusVirtualInicio