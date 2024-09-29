import React from 'react';
import Cursos from '@/pages/Cursos';
import { Container, Typography, Box } from '@mui/material';
import Rutas from '@/components/Rutas';

const CursosVirtuales: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '24px 0px' }}>
      <Rutas />
        <Cursos />
      </Box>
    </Container>
  );
};

export default CursosVirtuales;
