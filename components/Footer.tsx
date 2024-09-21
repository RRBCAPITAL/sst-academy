"use client"

import React from 'react';
import { Box, Typography, Container, IconButton, Grid, Link as MuiLink } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const Footer = (props: any) => {
  
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: '#1f140d',
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
          <Box sx={{ display: 'flex', flexGrow: 0, position: 'absolute', top: '18px', left: '0', padding: '0 100px', width: '100%', borderBottom: '1px solid #737373' }}>
            <Link href="/" passHref style={{outline: 'none', textDecoration: 'none', color: 'white', fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '18px'}}>
              <strong style={{color: '#ff914d'}} >SST</strong> ACADEMY
            </Link>
          </Box>
            
            <Box sx={{width: '240px'}}>
            <Typography sx={{ margin: '15px 0', fontSize: '1.1rem', fontWeight:'bold' }}>
             Verifica el certificado
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
             Valida el certificado SST ACADEMY ingresando el código único.
            </Typography>
            <Button
                  variant="contained"
                  sx={{color: 'white', fontWeight: 'bold', padding: '8px'}}
                  onClick={() => router.push('/validar-certificado')}
                  fullWidth
                >
                Verificar Certificado
            </Button>
            </Box>

            {/* <Typography variant="body2">
              © 2024 SST Academy. Todos los derechos reservados.
            </Typography> */}
          </Grid>

          {/* Sección de Links */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'center' } }}>
            <Typography variant="h6" gutterBottom color='secondary'>
              Enlaces
            </Typography>
            <MuiLink href="/" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>
              Inicio
            </MuiLink>
            <MuiLink href="/" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>
              Cursos Virtuales
            </MuiLink>
            <MuiLink href="/aula-virtual-login" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>
              Aula Virtual
            </MuiLink>
            {/* <MuiLink href="/contact" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '10px' }}>
              Contacto
            </MuiLink> */}
          </Grid>

          {/* Sección de redes sociales */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="h6" gutterBottom>
              Síguenos en nuestras redes
            </Typography>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              color='secondary'
              sx={{
                marginRight: '10px',
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              color='secondary'
              sx={{
                marginRight: '10px',
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              color='secondary'
              sx={{
                marginRight: '10px',
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              color='secondary'
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
