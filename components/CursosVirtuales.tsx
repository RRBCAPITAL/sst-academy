import React from 'react';
import Cursos from '@/pages/Cursos';
import { Container, Typography, Box } from '@mui/material';
import Rutas from '@/components/Rutas';

const CursosVirtuales: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: {sm: '0px', md: '0px 0px'} }}>
        <Cursos />
      </Box>
    </Container>
  );
};

export default CursosVirtuales;
