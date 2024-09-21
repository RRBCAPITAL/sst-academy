import React from 'react';
import Cursos from '@/pages/Cursos';
import { Container, Typography, Box } from '@mui/material';
import Rutas from '@/components/Rutas';

const Page: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '32px 0px' }}>
      <Rutas />
        <Typography variant="h4" component="h1" gutterBottom>
          Cursos Disponibles
        </Typography>
        <Cursos />
      </Box>
    </Container>
  );
};

export default Page;
