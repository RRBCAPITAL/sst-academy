"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from '@/utils/axios.config';
import { CertificadoData } from '@/Types/certificado.types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

interface CertificadoProps {
  params: {
    codigo: string;
  };
}

const Certificado: React.FC<CertificadoProps> = ({ params }) => {
  const [certificadoData, setCertificadoData] = useState<CertificadoData | null>(null); // Estado para almacenar los datos del certificado
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(false); // Estado de error para manejo de fallos

  // Extraer el parámetro 'codigo' de las props
  const { codigo } = params;

  // Dividir el cursoID y el userDNI
  const cursoID = codigo ? codigo.substring(0, 3) : '';
  const userDNI = codigo ? codigo.substring(3) : '';

  // Función para obtener los datos del certificado desde la API
  const fetchCertificadoData = async () => {
    try {
      console.log("Curso ID:", cursoID);
      console.log("Usuario DNI:", userDNI);
      
      // Llama a la API con los parámetros de 'dni' y 'curso_id'
      const response = await axios.get(`/api/usuario-curso-info-acreditacion?curso_id=${cursoID}&user_dni=${userDNI}`);
      console.log("Respuesta API:", response);
      
      // Verificamos si la respuesta fue exitosa
      if (response?.data?.success) {
        setCertificadoData(response.data.response); // Guarda los datos de la API en el estado
        setLoading(false);
        setError(false);
      } else {
        console.error('Error en la validación:', response?.data?.message || 'Respuesta inválida');
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      setLoading(false);
      setError(true);
    }
  };

  // Ejecuta la función para obtener los datos cuando se monta el componente
  useEffect(() => {
    if (userDNI && cursoID) {
      fetchCertificadoData();
    } else {
      setLoading(false);
      setError(true); // Si no hay parámetros, mostramos error
    }
  }, [userDNI, cursoID]);

 // Función para formatear la fecha, aceptando tanto 'Date' como 'string' en formato ISO
 const formatearFecha = (fecha: Date | string): string => {
  const fechaDate = typeof fecha === 'string' ? new Date(fecha) : fecha; // Si es string, convertir a Date
  const dia = fechaDate.getDate(); // Obtiene el día del mes
  const mesFormato = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fechaDate); // Obtiene el nombre del mes en español
  const año = fechaDate.getFullYear(); // Obtiene el año
  return `${dia} de ${mesFormato.charAt(0).toUpperCase() + mesFormato.slice(1)} del ${año}`; // Formato: "15 de Setiembre del 2024"
};

  // Estilos mejorados para el certificado
  const paperStyle = {
    padding: '40px',
    margin: '40px auto',
    maxWidth: '900px',
    textAlign: 'center',
    border: '10px solid #3e518d', // Borde decorativo
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: 'serif', // Fuente formal para certificados
  };

  const titleStyle = {
    color: '#3e518d', // Color formal
    fontFamily: 'Georgia, serif',
    marginBottom: '20px',
    textTransform: 'uppercase',
    fontSize: '28px',
    fontWeight: 'bold',
  };

  const subtitleStyle = {
    fontSize: '18px',
    marginBottom: '10px',
    fontStyle: 'italic',
    color: '#555',
  };

  const bodyTextStyle = {
    fontSize: '18px',
    marginBottom: '30px',
    lineHeight: '1.5',
  };

  const nameStyle = {
    fontWeight: 'bold',
    fontSize: '22px',
  };

  const highlightStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    textDecoration: 'underline',
  };

  const footerStyle = {
    marginTop: '40px',
    fontSize: '16px',
    color: '#888',
  };

  // Muestra un mensaje de carga mientras se obtiene la información
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Cargando...</Typography>
      </Box>
    );
  }

  // Muestra un mensaje de error si ocurrió algún problema
  if (error || !certificadoData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">No se encontró información para este certificado o ocurrió un error.</Typography>
      </Box>
    );
  }

  const { usuario_nombre, usuario_apellidos, curso_nombre, curso_calificacion, fecha_calificacion } = certificadoData;

  return (
    <Box display="flex" justifyContent="center" alignItems="center"
    sx={{
      position: 'fixed', // Asegura que los elementos hijos se posicionen en relación con este Box
      minWidth: '100vw',
      minHeight: '100vh', // Hace que el contenedor ocupe toda la pantalla
      backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/07/05/09/59/students-5372390_1280.jpg)', // Ruta de la imagen de fondo
      backgroundSize: 'cover', // Hace que la imagen cubra todo el contenedor
      backgroundPosition: 'center', // Centra la imagen de fondo
      backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
      display: 'flex', // Centra el contenido
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}
    >

      <TableContainer component={Paper} sx={{ opacity: 0.95, maxWidth: '1200px'}}>
      {/* Título encima de la tabla */}
      <Typography variant="h6" component="div" sx={{ padding: 2, textAlign: 'center', border: '1px solid #ddd', fontSize: '16px' }}>
        Detalles del estudiante
      </Typography>

      <Table>
        {/* Encabezado de la tabla */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: '1px solid #ddd', textAlign:'center', fontSize: '16px' }}><strong>Código</strong></TableCell>
            <TableCell sx={{ border: '1px solid #ddd', textAlign:'center', fontSize: '16px'}}><strong>Nombre y Apellidos</strong></TableCell>
            <TableCell sx={{ border: '1px solid #ddd', textAlign:'center', fontSize: '16px'}}><strong>Programa de Especialización</strong></TableCell>
            <TableCell sx={{ border: '1px solid #ddd', textAlign:'center', fontSize: '16px' }}><strong>Estado</strong></TableCell>
          </TableRow>
        </TableHead>

        {/* Cuerpo de la tabla (una sola fila) */}
        <TableBody>
          <TableRow>
            <TableCell sx={{ border: '1px solid #ddd', textAlign:'center',fontSize: '16px' }}>{codigo}</TableCell>
            <TableCell sx={{ border: '1px solid #ddd', textAlign:'center',fontSize: '16px' }}>{`${usuario_nombre} ${usuario_apellidos}`}</TableCell>
            <TableCell sx={{ border: '1px solid #ddd', textAlign:'center',fontSize: '16px' }}>{curso_nombre}</TableCell>
            <TableCell sx={{ border: '1px solid #ddd', textAlign:'center',fontSize: '20px' }}><FileDownloadDoneIcon style={{color: '#45c600'}} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default Certificado;
