"use client";

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Typography, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText, FormControlLabel, FormGroup, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import axios from '@/utils/axios.config'; // Ajusta la ruta según tu configuración

const CreateUserForm = () => {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [selectedCursos, setSelectedCursos] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('/api/cursos'); // Ajusta el endpoint si es necesario
        setCursos(response.data.curso);
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const dataR = {
        nombres: data.nombres,
        apellidos: data.apellidos,
        dni: data.dni,
        celular: data.celular,
        correo: data.correo,
        usuario: data.usuario,
        contrasenia: data.contrasenia,
        rol: data.rol,
      };

      const res = await axios.post('/api/users', dataR, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Obtener el ID del usuario recién creado
      const userId = res.data.user.user_id;

      // Asignar los cursos al nuevo usuario
      await axios.post('/api/usuario-cursos', {
        userId: userId,
        cursos: selectedCursos,
      });

      alert('Usuario creado y cursos asignados correctamente');
    } catch (error) {
      console.error('Error creating user or assigning cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCursoChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCursos(value);
    setValue('cursos', value); // Actualizar el valor del formulario
  };

  // Función para cambiar el estado de mostrar/ocultar contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{marginBottom: '30px', fontSize: '1.1rem'}}>
        Crear Usuario
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombres"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.nombres}
                  helperText={errors.nombres ? 'Nombre es requerido' : ''}
                />
              )}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="apellidos"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellidos"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.apellidos}
                  helperText={errors.apellidos ? 'Apellidos son requeridos' : ''}
                />
              )}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="dni"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="DNI"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.dni}
                  helperText={errors.dni ? 'DNI es requerido' : ''}
                />
              )}
              rules={{ required: true, maxLength: 8 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="celular"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Celular"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.celular}
                  helperText={errors.celular ? 'Celular es requerido' : ''}
                />
              )}
              rules={{ required: true, maxLength: 15 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="correo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  error={!!errors.correo}
                  helperText={errors.correo ? 'Correo es requerido' : ''}
                />
              )}
              rules={{ required: true, maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="usuario"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Usuario"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.usuario}
                  helperText={errors.usuario ? 'Usuario es requerido' : ''}
                />
              )}
              rules={{ required: true, maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="contrasenia"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  required
                  error={!!errors.contrasenia}
                  helperText={errors.contrasenia ? 'Contraseña es requerida' : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />} {/* Mostrar el icono correspondiente */}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              rules={{ required: true, maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="rol"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth required error={!!errors.rol}>
                  <InputLabel id="rol-label">Rol</InputLabel>
                  <Select
                    {...field}
                    labelId="rol-label"
                    label="Rol"
                    defaultValue=""
                    sx={{
                      '& .MuiSelect-select': {
                        paddingTop: '16px', // Ajusta el padding según tus necesidades
                      },
                      '& .MuiInputLabel-root': {
                        top: '-12px', // Ajusta la posición de la etiqueta
                        left: 0, // Asegúrate de que la etiqueta esté alineada
                        color: errors.rol ? 'error.main' : 'text.primary',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderTop: 'none', // Asegúrate de que el borde superior se elimine
                        },
                      },
                    }}
                  >
                    <MenuItem value="administrador">Administrador</MenuItem>
                    <MenuItem value="estudiante">Estudiante</MenuItem>
                  </Select>
                  {errors.rol && <Typography color="error">Rol es requerido</Typography>}
                </FormControl>
              )}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="cursos"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormControl fullWidth required error={!!errors.cursos}>
                  <Typography variant="h6" gutterBottom>
                    Cursos
                  </Typography>
                  <FormGroup>
                    {cursos.map((curso) => (
                      <FormControlLabel
                        key={curso.curso_id}
                        control={
                          <Checkbox
                            checked={selectedCursos.indexOf(curso.curso_id) > -1}
                            onChange={(event) => {
                              const { checked, value } = event.target;
                              const newSelectedCursos = checked
                                ? [...selectedCursos, value]
                                : selectedCursos.filter(id => id !== value);
                              setSelectedCursos(newSelectedCursos);
                              setValue('cursos', newSelectedCursos);
                            }}
                            value={curso.curso_id}
                          />
                        }
                        label={curso.nombre}
                      />
                    ))}
                  </FormGroup>
                  {errors.cursos && <Typography color="error">Seleccionar al menos un curso</Typography>}
                </FormControl>
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
              sx={{color: 'white', fontWeight: 'bold'}}
            >
              {loading ? 'Creando...' : 'Crear Usuario'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateUserForm;
