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
import ValidarCertificado from "@/components/ValidarCertificado";
import CursosVirtuales from "@/components/CursosVirtuales";
import ContenidoLandingInicio from "@/components/ContenidoLandingInicio";

const Inicio = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [codigo, setCodigo] = useState<string>("");

  return (
    <Box sx={{with: '100vw'}}>
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
        lineHeight: {xs: '1.1'}
      }}
      >
        Programas de Especialización
      </Box>
      <Container
      maxWidth={false}
      sx={{
        maxWidth: "1440px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <CursosVirtuales />
      
    </Container>
    <ContenidoLandingInicio />
     {open &&  <ValidarCertificado setOpen = {setOpen} open = {open} codigo = {codigo} setCodigo = {setCodigo} /> }
      <Footer setOpen = {setOpen}/>
    </Box>
  );
};

export default Inicio;
