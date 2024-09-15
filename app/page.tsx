"use client";

import React, { useState } from "react";
import {
  Fab,
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "@/utils/axios.config";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const Inicio = () => {
  const [open, setOpen] = useState(false);
  const [codigo, setCodigo] = useState("");
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigo(e.target.value);
  };

  const handleBuscar = async () => {
    const cursoID = codigo.substring(0, 3);
    const userDNI = codigo.substring(3);

    try {
      const response = await axios.get(
        `/api/usuario-curso-info-acreditacion?curso_id=${cursoID}&user_dni=${userDNI}`
      );

      if (response.data.success) {
        router.push(`/certificado/${codigo}`);
      } else {
        alert("Ingresa un código válido.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }

    handleClose();
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        maxWidth: "1440px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Sección de portada */}
      <Box
  sx={{
    width: "100%",
    marginBottom: "50px",
    backgroundColor: "#1F1D0D", // Fondo negro
    padding: { xs: "40px", md:"60px 80px",},
    borderRadius: "10px",
  }}
>
  <Grid container spacing={2} alignItems="center">
    {/* Contenido a la izquierda */}
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          textAlign: { xs: "center", md: "left" }, // Centrado en pantallas pequeñas, alineado a la izquierda en grandes
          paddingRight: { md: "10px" }, // Espacio entre el contenido y la imagen en pantallas grandes
          fontWeight: 'bold'
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            color: "white", // Título en amarillo
            fontSize: { xs: "2rem", md: "3.5rem" }, // Ajuste de tamaño de fuente para diferentes pantallas
          }}
        >
         La Mejor Plataforma de Cursos Virtuales
        </Typography>
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontSize: { xs: "0.8rem", md: "1rem" }, // Aumento del tamaño de la fuente
          }}
        >
          Aprende desde cualquier lugar con cursos diseñados por expertos.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: "20px", backgroundColor: '#F7FF62', color: '#1F1D0D', fontWeight: 'bold', fontSize: '18px', padding: '10px 40px', borderRadius: '10px' }}
        >
          Ver Cursos
        </Button>
      </Box>
    </Grid>

    {/* Imagen a la derecha */}
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <img
          src="https://html.merku.love/collab/assets/images/banner/hero_banner_img_1.jpg" // Cambia esta ruta por la imagen que quieras usar
          alt="Portada Cursos Virtuales"
          style={{
            width: "100%",
            maxWidth: "500px", // Tamaño máximo de la imagen en dispositivos grandes
            borderRadius: "10px",
          }}
        />
      </Box>
    </Grid>
  </Grid>
</Box>

     {/* Sección de ventajas */}
<Box sx={{ width: "100%", marginTop: "50px", padding: {xs:'0px 20px', md: '0px 100px'} }}>
  <Grid container spacing={4} alignItems="center">
    {/* Título, descripción e imagen a la izquierda */}
    <Grid item xs={12} md={6}>
      <Box>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: "black",
            fontSize: { xs: "2rem", md: "2.5rem" }, // Ajuste de tamaño de fuente para diferentes pantallas
            fontWeight: 'bold'
          }}
        >
          Mira nuestros cursos ya!
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" }, // Ajuste de tamaño de fuente
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          Los cursos virtuales que harán desarrollar tu potencial.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <img
            src="https://html.merku.love/collab/assets/images/about/about_image_1.jpg" // Cambia esta ruta por la imagen que quieras usar
            alt="Imagen de Ventajas"
            style={{
              width: "100%",
              maxWidth: "500px", // Tamaño máximo de la imagen en dispositivos grandes
              borderRadius: "10px",
            }}
          />
        </Box>
      </Box>
    </Grid>

    {/* Tarjetas a la derecha en columna */}
    <Grid item xs={12} md={6}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://pandorafms.com/blog/wp-content/uploads/2017/09/Ventajas-y-desventajas-de-los-horarios-flexibles-para-tu-empresa.png"
              alt="Ventaja 1"
            />
            <CardContent>
              <Typography gutterBottom variant="h3">
                Flexibilidad
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px' }}>
                Estudia a tu propio ritmo con acceso las 24 horas del día.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://keystoneacademic-res.cloudinary.com/image/upload/v1672925563/iStock-1446731558_eafgly.jpg"
              alt="Ventaja 2"
            />
            <CardContent>
              <Typography gutterBottom variant="h3">
                Certificación
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px' }}>
                Obtén un certificado al finalizar cada curso.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://talent-match.es/wp-content/uploads/2023/01/blogfoto-48.png"
              alt="Ventaja 3"
            />
            <CardContent>
              <Typography gutterBottom variant="h3">
                Comunidad
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px' }}>
                Únete a una comunidad de estudiantes y profesionales.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Box>



      {/* Sección de puntuaciones */}
      <Box sx={{ width: "80%", marginTop: "50px" }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Opiniones de nuestros estudiantes
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Juan Pérez</Typography>
                <Rating value={5} readOnly />
                <Typography variant="body2" color="textSecondary">
                  Excelente plataforma, los cursos son muy completos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">María López</Typography>
                <Rating value={4} readOnly />
                <Typography variant="body2" color="textSecondary">
                  Me encantó la flexibilidad y la calidad del contenido.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Carlos Martínez</Typography>
                <Rating value={5} readOnly />
                <Typography variant="body2" color="textSecondary">
                  Recomiendo 100%, aprendí mucho con esta plataforma.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Modal para ingresar el código */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
        }}
      >
        <AddIcon />
      </Fab>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Ingresar Código
          </Typography>
          <TextField
            label="Código del Curso"
            variant="outlined"
            fullWidth
            value={codigo}
            onChange={handleCodigoChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleBuscar}
          >
            Buscar
          </Button>
        </Box>
      </Modal> 
      <Footer />
    </Container>
  );
};

export default Inicio;
