"use client";

import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from '@/utils/axios.config'; // Ajusta la ruta según tu configuración
import { useRouter } from 'next/navigation';

// Define una interfaz para los datos del formulario de inicio de sesión
interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Hook para la redirección
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Verifica si es móvil o tablet

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      console.log('credenciales ', data);

      // Enviar los datos de inicio de sesión al backend
      const res = await axios.post('/api/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Verifica si la respuesta indica éxito
      if (res.data.success) {
        // Almacena la información del usuario en el localStorage
        localStorage.setItem('user', JSON.stringify(res.data.usuario));

        if (res.data.usuario.rol === 'Administrador') {
          router.push('/dashboard/admin');
        } else {
          // Redirige al usuario a la página de inicio
          router.push('/dashboard/estudiante');
        }
      } else {
        alert('Credenciales incorrectas.'); // Manejo de error específico
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Error en el inicio de sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Imagen en pantallas grandes */}
      {!isMobile && (
        <Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="https://zegelvirtual.nyc3.cdn.digitaloceanspaces.com/assets/business/zegel-virtual/login-portada.png" // Cambia la ruta a la imagen que deseas mostrar
            alt="Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Grid>
      )}

      {/* Formulario de inicio de sesión */}
      <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3 }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: '#fff42',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 1,
            padding: 3,
          }}
        >
          <Typography variant="h4" sx={{padding: '10px 0px', fontSize: '30px'}} gutterBottom>
            SST ACADEMIA
          </Typography>
          <Typography variant="h4" sx={{padding: '10px 0px'}} gutterBottom>
            Iniciar Sesión
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: '100%' }}
          >
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Usuario"
                      variant="outlined"
                      fullWidth
                      required
                      error={!!errors.username}
                      helperText={errors.username ? 'Usuario es requerido' : ''}
                    />
                  )}
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Contraseña"
                      variant="outlined"
                      fullWidth
                      type="password"
                      required
                      error={!!errors.password}
                      helperText={errors.password ? 'Contraseña es requerida' : ''}
                    />
                  )}
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
