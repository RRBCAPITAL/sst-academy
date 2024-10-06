"use client";

import { useState, useEffect } from "react";
import { Curso } from "@/Types/curso.types";
import axios from "@/utils/axios.config";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { packs } from "@/utils/DataPacks";

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
    <Grid container spacing={4} paddingTop={0} padding={0}>
      {loading ? (
        // Muestra un skeleton mientras se cargan los datos
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%" height={200} />
        </Grid>
      ) : cursos.length > 0 ? (
        cursos.map((curso) => (
          <Grid item xs={12} sm={6} md={4} key={curso.curso_id}>
            <Card>
              <CardMedia
                component="img"
                height="240"
                image={
                  curso.imagen ||
                  "https://www.dfk.pe/wp-content/uploads/2022/06/ref-1064x480.png"
                } // Usa una imagen predeterminada si no hay imagen del curso
                alt={`Imagen de ${curso.nombre}`}
              />
              <CardContent>
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
                  }}
                >
                  Programa de especialización
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    padding: "10px 0",
                    fontSize: "1.2rem",
                    color: "#37423B",
                    height: "55px",
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ff7017",
                    }}
                  >
                    <GroupAddIcon sx={{marginRight: '10px', fontSize: '1.6rem'}} /> {curso.duracion} estudiantes
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    {/* Precio con descuento tachado */}
    <Typography
      variant="h1"
      color="text.secondary"
      sx={{
        fontSize: "0.9rem",
        color: '#494949',
        fontWeight: '400',
        textDecoration: 'line-through', // Tachado
      }}
    >
      S/ {Math.floor(curso.precio * 1.20)} {/* Aplica el 15% de descuento */}
    </Typography>

    {/* Precio original */}
    <Typography
      variant="h1"
      color="text.secondary"
      sx={{
        fontSize: "1.4rem",
        color: '#ff7f3a',
        fontWeight: 'bold',
      }}
    >
      S/ {Math.floor(curso.precio)}
    </Typography>
  </Box>
                </Box>
                <Link
                  href={`/cursos-virtuales/${slugify(curso.nombre)}`}
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
      )}

       {/* Mostrar Packs debajo de los cursos */}
       {/* <Grid item xs={12}>
        <Typography variant="h5" component="div" sx={{ }}>
          Packs Disponibles
        </Typography>
      </Grid> */}
      {packs.map((pack) => (
        <Grid item xs={12} sm={6} md={4} key={pack.id}>
          <Card>
            <CardMedia
              component="img"
              width="100%"
              height="fit-content"
              image={pack.imagenInicio}
              alt={`Imagen de ${pack.nombre}`}
            />
            <CardContent>
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
                }}
              >
                Pack de Documentos
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  padding: "10px 0",
                  fontSize: "1.2rem",
                  color: "#37423B",
                  height: "40px",
                }}
              >
                {pack.nombre}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ff7017",
                  }}
                >
                  <GroupAddIcon sx={{ marginRight: '10px', fontSize: '1.6rem' }} /> {pack.estudiantes} estudiantes
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {/* Precio con descuento tachado */}
                  <Typography
                    variant="h1"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.9rem",
                      color: '#494949',
                      fontWeight: '400',
                      textDecoration: 'line-through', // Tachado
                    }}
                  >
                    S/ {Math.floor(pack.precio * 0.80)} {/* Aplica el 15% de descuento */}
                  </Typography>

                  {/* Precio original */}
                  <Typography
                    variant="h1"
                    color="text.secondary"
                    sx={{
                      fontSize: "1.4rem",
                      color: '#ff7f3a',
                      fontWeight: 'bold',
                    }}
                  >
                    S/ {Math.floor(pack.precio)}
                  </Typography>
                </Box>
              </Box>
              <Link
                href={`/packs/${pack.id}`}
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
                    transition: "background 0.3s ease, color 0.3s ease",

                    "&:hover": {
                      background: "#ff914d",
                      color: "white",
                      borderColor: "#ff914d",
                    },
                  }}
                >
                  Ver Pack
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
         ))}
    </Grid>
  );
};

export default Cursos;
