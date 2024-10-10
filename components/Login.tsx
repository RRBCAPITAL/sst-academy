"use client";

import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, useMediaQuery, useTheme, InputAdornment, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from '@/utils/axios.config'; // Ajusta la ruta según tu configuración
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Define una interfaz para los datos del formulario de inicio de sesión
interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const router = useRouter(); // Hook para la redirección
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Verifica si es móvil o tablet

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
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
        // Almacena el token y los datos del usuario en las cookies
        Cookies.set('token', res.data.token, { expires: 1 }); // Token con expiración de 1 día
        Cookies.set('user', JSON.stringify(res.data.usuario), { expires: 1 }); // Datos del usuario

        if (res.data.usuario.rol === 'administrador') {
          router.push('/dashboard/admin');
        } else {
          router.push('/campus-virtual');
        }
      } else {
        alert('Credenciales incorrectas.');
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
          <Box sx={{ display: 'flex', flexGrow: 0 }}>
            <Link href="/" passHref>
              <img
                src="/images/logos/logo-sst.png" // Ruta a la imagen de tu logo
                alt="SST Academia Logo"
                style={{
                  display: 'block',
                  width: '260px', // Ajusta el tamaño según sea necesario
                  height: 'auto',
                }}
              />
            </Link>
          </Box>
          <Typography variant="h4" sx={{ padding: '10px 20px', fontSize: '1.2rem', fontWeight: 'bold', color: '#737373' }} gutterBottom>
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
                      type={showPassword ? 'text' : 'password'} // Cambia el tipo según el estado
                      required
                      error={!!errors.password}
                      helperText={errors.password ? 'Contraseña es requerida' : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)} // Alterna el estado
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </Grid>

              <Typography variant="h4" sx={{ padding: '10px 20px', fontSize: '0.8rem', color: '#737373', lineHeight: '1.3' }} gutterBottom>
                Obtén tus credenciales comprando un curso. <Link href={'/'} style={{ color: '#ff7017', fontWeight: 'bold' }}>Comprar</Link>
              </Typography>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
