import React from 'react';
import { Box, Typography, Container, IconButton, Grid, Link as MuiLink } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1F1D0D',
        color: 'white',
        padding: '80px',
        position: 'relative', // Para asegurar el posicionamiento correcto
        bottom: 0,
        width: '100%', // Se asegura de que el footer tome todo el ancho
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          {/* Sección de información */}
          <Grid item xs={12} md={4}>
            <Typography variant="h1" gutterBottom>
              SST Academy
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            {/* <Typography variant="body2">
              © 2024 SST Academy. Todos los derechos reservados.
            </Typography> */}
          </Grid>

          {/* Sección de Links */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'center' } }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFD32B',}}>
              Enlaces útiles
            </Typography>
            <MuiLink href="/" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>
              Inicio
            </MuiLink>
            <MuiLink href="/about" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>
              Sobre Nosotros
            </MuiLink>
            <MuiLink href="/services" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>
              Servicios
            </MuiLink>
            <MuiLink href="/contact" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>
              Contacto
            </MuiLink>
          </Grid>

          {/* Sección de redes sociales */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="h6" gutterBottom>
              Síguenos en nuestras redes
            </Typography>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              sx={{
                color: '#FFD32B',
                marginRight: '10px',
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              sx={{
                color: '#FFD32B',
                marginRight: '10px',
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              sx={{
                color: '#FFD32B',
                marginRight: '10px',
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              sx={{
                color: '#FFD32B',
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
