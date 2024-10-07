"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from '@/utils/axios.config';
import { CertificadoData } from '@/Types/certificado.types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

interface CertificadoProps {
  params: {
    codigo: string;
  };
}

const Certificado: React.FC<CertificadoProps> = ({ params }) => {
  const [certificadoData, setCertificadoData] = useState<CertificadoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const { codigo } = params;
  const cursoID = codigo ? codigo.substring(0, 3) : '';
  const userDNI = codigo ? codigo.substring(3) : '';

  const fetchCertificadoData = async () => {
    try {
      const response = await axios.get(`/api/usuario-curso-info-acreditacion?curso_id=${cursoID}&user_dni=${userDNI}`);
      if (response?.data?.success) {
        setCertificadoData(response.data.response);
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    if (userDNI && cursoID) {
      fetchCertificadoData();
    } else {
      setLoading(false);
      setError(true);
    }
  }, [userDNI, cursoID]);

  const formatearFecha = (fecha: Date | string): string => {
    const fechaDate = typeof fecha === 'string' ? new Date(fecha) : fecha;
    const dia = fechaDate.getDate();
    const mesFormato = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fechaDate);
    const año = fechaDate.getFullYear();
    return `${dia} de ${mesFormato.charAt(0).toUpperCase() + mesFormato.slice(1)} del ${año}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Cargando...</Typography>
      </Box>
    );
  }

  if (error || !certificadoData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">No se encontró información para este certificado o ocurrió un error.</Typography>
      </Box>
    );
  }

  const { usuario_nombre, usuario_apellidos, curso_nombre, curso_calificacion, fecha_calificacion } = certificadoData;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'fixed',
        minWidth: '100vw',
        minHeight: '100vh',
        backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/07/05/09/59/students-5372390_1280.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <TableContainer component={Paper} sx={{ opacity: 0.95, maxWidth: '1200px', padding: '4px' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            padding: 2,
            textAlign: 'center',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '16px',
            background: '#ff914d',
            color: 'white',
          }}
        >
          Detalles del estudiante
        </Typography>

        {!isMobile ? (
          // Vista en modo escritorio (tabla horizontal)
          <Table sx={{ minWidth: '600px' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center', fontSize: '16px' }}>
                  <strong>Código</strong>
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center', fontSize: '16px' }}>
                  <strong>Nombre y Apellidos</strong>
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center', fontSize: '16px' }}>
                  <strong>Programa de Especialización</strong>
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center', fontSize: '16px' }}>
                  <strong>Estado</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center', fontSize: '16px' }}>{codigo}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center', fontSize: '16px' }}>
                  {`${usuario_nombre} ${usuario_apellidos}`}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center', fontSize: '16px' }}>
                  {curso_nombre}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center', fontSize: '20px' }}>
                  <FileDownloadDoneIcon style={{ color: '#45c600' }} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          // Vista en modo móvil (formato vertical, campos a la izquierda, valores a la derecha)
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingX: 2,
                border: '1px solid #ddd',
                paddingY: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Código
              </Typography>
              <Typography textAlign="left" sx={{marginRight: '60px'}}>{codigo}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingX: 2,
                border: '1px solid #ddd',
                paddingY: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Nombre y Apellidos
              </Typography>
              <Typography textAlign="left">{`${usuario_nombre} ${usuario_apellidos}`}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingX: 2,
                border: '1px solid #ddd',
                paddingY: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Programa de Especialización
              </Typography>
              <Typography textAlign="left">{curso_nombre}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingX: 2,
                border: '1px solid #ddd',
                paddingY: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Estado
              </Typography>
              <FileDownloadDoneIcon style={{ color: '#45c600', marginRight: '120px' }} />
            </Box>
          </Box>
        )}
      </TableContainer>
    </Box>
  );
};

export default Certificado;
