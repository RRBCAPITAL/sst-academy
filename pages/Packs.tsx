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
import { packs } from "@/utils/DataPacks";

interface IDDelPack {
  id: string;
}

const Packs: React.FC<IDDelPack> = (props) => {
  const [pack, setPack] = useState<any>(null);

  useEffect(() => {

    if (!props.id) return;

    const fetchCursos = async () => {
        const data: any = packs.find(i => i.id === props.id);
        data && setPack(data);
    };

    if (props.id) {
      fetchCursos();
    }
  }, [props.id]);

  console.log('data ', pack);
  

  return (
    <Box sx={{ paddingBottom: '20px', minHeight: "100vh", maxWidth: '100vw' }}>
      <Grid container spacing={4}
      sx={{ 
      flexDirection: { xs: "column", md: "row" }, // Para pantallas pequeñas, columna; para grandes, fila
      maxWidth: '1200px',
      margin: 'auto'
      }}
      >
         <Rutas />
        <Grid item xs={12} md={12} sx={{ position: "relative"}} >
              <Card
                key={pack?.id}
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 4,
                  maxWidth: '800px',
                  margin: 'auto'
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    mb: 2,
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img src={pack?.imagenDetalle} alt={pack?.nombre} style={{maxWidth: '500px', height: 'fit-content'}}/>
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
                    {pack?.descripcion}
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
        fontSize: "1.1rem",
        color: '#494949',
        fontWeight: '400',
        textDecoration: 'line-through', // Tachado
      }}
    >
      S/ {Math.floor(pack?.precio * 1.20)} {/* Aplica el 15% de descuento */}
    </Typography>

    {/* Precio original */}
    <Typography
      variant="h1"
      color="text.secondary"
      sx={{
        fontSize: "1.6rem",
        color: '#ff7f3a',
        fontWeight: 'bold',
      }}
    >
      S/ {Math.floor(pack?.precio)}
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
                      <GroupAddIcon sx={{marginRight: '10px', fontSize: '1.6rem'}} /> {pack?.estudiantes} estudiantes
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
                     <StarBorderIcon /> {pack?.puntuacion}{" "}
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
    const message = `¡Hola! Estoy interesado en comprar el ${pack?.nombre}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }}
>
  <WhatsAppIcon sx={{ paddingRight: '4px' }} /> Comprar ahora
</Button>
                </CardContent>
              </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Packs;
