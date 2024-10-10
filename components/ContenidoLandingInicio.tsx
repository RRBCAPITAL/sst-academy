"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Grid, Typography, Box, Paper, Avatar } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';

const ContenidoLandingInicio = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Iniciar AOS con una duración de 1000ms
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        padding: "40px 0px",
        background: "#e3dee6",
        textAlign: "center",
        color: "#737373",
        margin: 'auto',
        marginTop: '40px',
        overflowX: 'hidden', 
        overflowY: 'hidden'
      }}
    >
      {/* Título principal */}
      <Box
  data-aos="fade-top"
  sx={{
    maxWidth: "1200px",
    display: "flex",
    flexDirection: { xs: "column", md: "row" }, // Cambia flexDirection según el tamaño de pantalla
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginY: "40px",
    fontSize: { xs: "20px", md: "26px" }, // Cambia fontSize según el tamaño de pantalla
  }}
>
  <Typography fontSize="26px">Educación online</Typography>
  <Typography fontSize="26px" style={{ fontWeight: "bold" }}>
    para tu crecimiento
  </Typography>
  <Typography fontSize="26px">profesional</Typography>
</Box>


      {/* Sección con los tres cuadros */}
      <Grid container spacing={0} justifyContent="center" sx={{maxWidth: "1200px", margin:'auto'}}>
        {/* Cuadro 1 */}
        <Grid item xs={12} sm={4} data-aos="fade-up" sx={{margin: '10px'}}>
          <Paper
            elevation={1}
            sx={{
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
              gap: "20px",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <GroupAddIcon sx={{ fontSize: "50px", color: "#ff843d" }} />
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#737373" }}
              >
                +1122
              </Typography>
              <Typography variant="body1">Estudiantes registrados</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Cuadro 2 */}
        <Grid item xs={12} sm={4} data-aos="fade-up" data-aos-delay="200" sx={{margin: '0 10px'}}>
          <Paper
            elevation={1}
            sx={{
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
              gap: "20px",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <VerifiedUserIcon sx={{ fontSize: "50px", color: "#ff843d" }} />
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#737373" }}
              >
                95%
              </Typography>
              <Typography variant="body1">
                De nuestros estudiantes se vuelven más competitivos en el área
                SSOMA
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Cuadro 3 */}
        <Grid item xs={12} sm={4} data-aos="fade-up" data-aos-delay="400" sx={{margin: '10px'}}>
          <Paper elevation={1} sx={{ display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
              gap: "20px", padding: "20px", borderRadius: "10px" }}>
            <StarPurple500Icon sx={{ fontSize: "50px", color: "#ff843d" }}  />
            <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#737373" }}
            >
              4.7/5
            </Typography>
            <Typography variant="body1">Calificaciones</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Nueva sección con imagen a la izquierda y texto a la derecha */}
      <Box
        sx={{
          maxWidth: "1200px",
          margin: 'auto',
          md: { marginTop: "60px" },
          sm: { marginTop: "20px" },
          padding: "40px 20px",
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center"  marginBottom="40px">
          {/* Imagen a la izquierda */}
          <Grid item xs={12} md={6} data-aos="fade-right" data-aos-delay="300">
            <Box
              component="img"
              src="/images/IMG_Certificado.png"
              alt="Certificación"
              sx={{ width: "100%", borderRadius: "10px", objectFit: "cover" }}
            />
          </Grid>

          {/* Texto a la derecha */}
          <Grid item xs={12} md={6} data-aos="fade-left" data-aos-delay="600">
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "30px", md: "36px" },
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: { xs: "center", md: "left" },
                lineHeight: "1",
              }}
            >
              Certifícate al aprobar{" "}
              <strong style={{ color: "#ff6c2d" }}>tus programas</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "40px", fontSize: "16px", textAlign: "left" }}
            >
              Al finalizar un programa tendrás que aprobar un examen y te
              emitiremos un certificado digital que valide tus conocimientos.
            </Typography>
            <Typography
            data-aos="fade-left" data-aos-delay="900"
              variant="body1"
              sx={{ marginBottom: {xs: "15px", md: "30px"}, fontSize: {xs: "14px", md: "20px",}, textAlign: "left" }}
            >
              🔶 <strong>Certificado con código único</strong>
            </Typography>
            <Typography
            data-aos="fade-left" data-aos-delay="1200"
              variant="body1"
              sx={{ marginBottom: {xs: "15px", md: "30px"}, fontSize: {xs: "14px", md: "20px",}, textAlign: "left" }}
            >
              🔶 <strong>Mejora tu CV</strong>
            </Typography>
            <Typography
            data-aos="fade-left" data-aos-delay="1500"
              variant="body1"
              sx={{ fontSize: {xs: "14px", md: "20px",}, textAlign: "left" }}
            >
              🔶 <strong>Impulsa tu carrera profesional</strong>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{
          background: 'white',
          width: '100%',
          margin: 'auto',
          md: { marginTop: "60px" },
          sm: { marginTop: "20px" },
          padding: "10px 30px",
        }}>
      <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          sx={{
            display: "flex",
            maxWidth: "1200px",
            sm: { flexDirection: "column" },
            md: { flexDirection: "row" },
            margin: 'auto',
            marginTop: "40px",
          }}
        >
          {/* Texto a la izquierda */}
          <Grid item xs={12} md={6} sx={{ alignItems: "center" }} data-aos="fade-left" data-aos-delay="400">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "20px",
                padding: '0 20px',
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "30px", md: "36px" },
              }}
            >
              Docentes <strong style={{ color: "#ff6c2d" }}>expertos</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", padding: '0 20px', textAlign: { xs: "center", md: "left" } }}
            >
              Aprenderás de profesionales que trabajan en las principales
              empresas.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", padding: '0 20px', textAlign: { xs: "center", md: "left" } }}
            >
              Aprende de personas que trabajan en el rubro.
            </Typography>
          </Grid>

          {/* Imagen del docente a la derecha */}
          <Grid item xs={12} md={6} sx={{marginTop: {xs:  '30px', md: '0px'}}} data-aos="fade-right" data-aos-delay="800">
            <Box
              component="img"
              src="/images/IMG_docente.png"
              alt="Docente"
              sx={{ borderRadius: "10px", objectFit: "cover", width: {xs: "100%", md: "80%"} }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          sx={{ margin: 'auto', marginY: "40px",  maxWidth: "1200px" }}
        >
          {/* Imagen a la izquierda */}
          <Grid item xs={12} md={6} data-aos="fade-right">
            <Box
              component="img"
              src="/images/IMG_Aulavirtual.png"
              alt="Certificación"
              sx={{ width: "100%", borderRadius: "10px", objectFit: "cover" }}
            />
          </Grid>

          {/* Texto a la derecha */}
          <Grid item xs={12} md={6} data-aos="fade-left" data-aos-delay="400" sx={{marginTop: '20px', paddingLeft: {md: '60px'}}}>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "30px", md: "36px" },
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: { xs: "center", md: "left" },
                lineHeight: "1",
              }}
            >
              Acceso por 6 meses al
              <strong style={{ color: "#ff6c2d" }}> aula virtual</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "40px", fontSize: "16px", textAlign: "left" }}
            >
              Al comprar tu programa de especialización, tendrás acceso a los
              contenidos grabados por 06 meses.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "30px",
                fontSize: {xs: "14px", md: "20px"},
                textAlign: "left",
                marginRight: "10px",               
              }}
            >
              🔶{" "}
              <strong>Accede a tus clases cuando quieras, sin horarios</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: {xs: "0px", md: "30px"}, fontSize: {xs: "14px", md: "20px"}, textAlign: "left" }}
            >
              🔶 <strong>Accede a tus clases las veces que quieras</strong>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ maxWidth: "1200px", margin: 'auto', marginTop: {xs: '0px', md: "60px"}, padding: "40px 20px" }} data-aos="fade">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "40px",
            fontSize: { xs: "30px", md: "36px" },
            color: "#737373",
          }}
        >
          Lo que dicen nuestros
          <strong style={{ color: "#ff6c2d" }}> alumnos</strong>
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Reseña 1 */}
          <Grid item xs={12} sm={4} data-aos="fade-up" data-aos-delay="300">
            <Paper
              elevation={3}
              sx={{
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <Avatar
                src="/images/student1.jpg"
                alt="Alumno 1"
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                Luis Manrique
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontStyle: "italic", color: "#737373" }}
              >
                 &quot;Es el primer programa virtual que llevo, así que me pareció muy
                didáctico y sobre todo entendible.&quot;
              </Typography>
            </Paper>
          </Grid>

          {/* Reseña 2 */}
          <Grid item xs={12} sm={4} data-aos="fade-up" data-aos-delay="600">
            <Paper
              elevation={3}
              sx={{
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <Avatar
                src="/images/student2.jpg"
                alt="Alumno 2"
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                Kátia Valle
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontStyle: "italic", color: "#737373" }}
              >
                 &quot;Gracias a SST Academy pude encontrar un puesto en el área SSOMA
                ya que la mayoría de las empresas buscan que tengas certificados
                adicionales en el área.&quot;
              </Typography>
            </Paper>
          </Grid>

          {/* Reseña 3 */}
          <Grid item xs={12} sm={4} data-aos="fade-up" data-aos-delay="900">
            <Paper
              elevation={3}
              sx={{
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <Avatar
                src="/images/student3.jpg"
                alt="Alumno 3"
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                David León
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontStyle: "italic", color: "#737373" }}
              >
                 &quot;El programa que llevé me ayudó a enriquecer mis conocimientos
                en SST, ahora tengo un panorama más claro del área.&quot;
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ maxWidth: "1200px", margin: 'auto', marginTop: {xs: '10px', md: "60px"}, padding: "40px 20px" }}>
      <Typography
          data-aos="fade"
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "40px",
            fontSize: { xs: "30px", md: "36px" },
            color: "#737373",
          }}
        >
          Convenios con
          <strong style={{ color: "#ff6c2d" }}> empresas</strong>
        </Typography>

        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={3} data-aos="fade-up" data-aos-delay="300">
              <Avatar
                src="/images/E1.png"
                alt="Alumno 1"
                sx={{
                  width: 200,
                  height: 200,
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} data-aos="fade-up" data-aos-delay="600">
              <Avatar
                src="/images/E2.png"
                alt="Alumno 1"
                sx={{
                  width: 200,
                  height: 200,
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} data-aos="fade-up" data-aos-delay="900">
              <Avatar
                src="/images/E3.png"
                alt="Alumno 1"
                sx={{
                  width: 200,
                  height: 200,
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} data-aos="fade-up" data-aos-delay="800">
              <Avatar
                src="/images/E4.png"
                alt="Alumno 1"
                sx={{
                  width: 200,
                  height: 200,
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              />
            </Grid>
          </Grid>
      </Box>
    </Box>
  );
};

export default ContenidoLandingInicio;
