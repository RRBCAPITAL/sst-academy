"use client";

import React, { useState, useEffect } from "react";
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
import ValidarCertificado from "@/components/ValidarCertificado";
import CursosVirtuales from "@/components/CursosVirtuales";
import ContenidoLandingInicio from "@/components/ContenidoLandingInicio";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Icono para subir

const Inicio = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [codigo, setCodigo] = useState<string>("");
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  // Mostrar el botón cuando el usuario ha hecho scroll hacia abajo
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  // Subir al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Añadir evento de scroll para mostrar u ocultar el botón
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <Box sx={{with: '100vw',  overflowX: 'hidden',}}>
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
        lineHeight: {xs: '1.1'},
        marginBottom: {xs: '30px'}
      }}
      >
        Programas de Especialización
      </Box>
      <Container
      sx={{
        maxWidth: "1440px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: {sm: '0px', md: "0px"},
      }}
    >
      <CursosVirtuales />
      
    </Container>
    <ContenidoLandingInicio />
     {open &&  <ValidarCertificado setOpen = {setOpen} open = {open} codigo = {codigo} setCodigo = {setCodigo} /> }
      <Footer setOpen = {setOpen}/>

      {/* Botón flotante para subir al inicio */}
      {showScrollButton && (
        <Fab
          color="primary"
          aria-label="scroll to top"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            color: 'white'
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Inicio;
