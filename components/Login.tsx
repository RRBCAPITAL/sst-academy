import * as React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { AppProvider } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

// Interfaces for props
interface CustomEmailFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CustomPasswordFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickShowPassword: () => void;
  onMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showPassword: boolean;
}

function CustomEmailField({ value, onChange }: CustomEmailFieldProps) {
  return (
    <TextField
      id="username"
      label="Usuario"
      name="username"
      type="text"
      size="small"
      required
      fullWidth
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle fontSize="inherit" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField({
  value,
  onChange,
  onClickShowPassword,
  onMouseDownPassword,
  showPassword
}: CustomPasswordFieldProps) {
  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Contraseña
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClickShowPassword}
              onMouseDown={onMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Inicio de sesión
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/" variant="body2">
      Sign up
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

export default function SlotsSignIn() {
  const theme = useTheme();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Realizar la solicitud API con Axios
    axios.post('/api/login', { username, password })
      .then(response => {
        if (response.data.success) {
          // Realizar acciones en caso de éxito, como redirigir al usuario
          console.log('Usuario autenticado con éxito');
          console.log(response.data.usuario);
          
          // Almacena la información del usuario en el almacenamiento local
          localStorage.setItem('user', JSON.stringify(response.data.usuario));
          console.log('Usuario almacenado en localStorage:', localStorage.getItem('user'));
          // Redirige al usuario a la página de inicio
          router.push('/dashboard/estudiante');
        } else {
          // Manejar caso de error en la autenticación
          console.log('Error de autenticación');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        // Manejar el error aquí
      });
  };

  return (
    <AppProvider theme={theme}>
      <Box
        sx={{
          maxWidth: 400,
          margin: 'auto',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h5" align="center">Iniciar sesión</Typography>
        <form onSubmit={handleSubmit} className='p-10 bg-slate-200'>
          <CustomEmailField value={username} onChange={(e) => setUsername(e.target.value)} />
          <CustomPasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClickShowPassword={handleClickShowPassword}
            onMouseDownPassword={handleMouseDownPassword}
            showPassword={showPassword}
          />
          <CustomButton />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2
            }}
          >
            <SignUpLink />
            <ForgotPasswordLink />
          </Box>
        </form>
      </Box>
    </AppProvider>
  );
}
