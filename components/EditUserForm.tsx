"use client";

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Typography, MenuItem, Select, InputLabel, FormControl, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from '@/utils/axios.config'; // Ajusta la ruta según tu configuración
import { User } from '@/Types/user.types';
import { DataUser } from '@/Types/user.types';
// Definir los tipos
interface Curso {
  curso_id: number;
  nombre: string;
} 

const EditUserForm = ({ user, onClose,  onUpdateUser }: { user: DataUser; onClose: () => void; onUpdateUser: (updatedUser: DataUser ) => void; }) => {
  const { control, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [cursos, setCursos] = useState<Curso[]>([]); // Lista de todos los cursos
  const [selectedCursos, setSelectedCursos] = useState<number[]>([]); // Cursos seleccionados por el usuario (IDs)

  useEffect(() => {
    // Cargar todos los cursos disponibles y los cursos seleccionados por el usuario
    const fetchCursos = async () => {
      try {
        // Obtener todos los cursos
        const cursosResponse = await axios.get<{ curso: Curso[] }>('/api/cursos');
        setCursos(cursosResponse.data.curso);

        // Obtener los cursos seleccionados por el usuario
        const userCursosResponse = await axios.get<{ curso: Curso[] }>(`/api/usuario-cursos?user_id=${user.user_id}`);
        const userCursos = userCursosResponse.data.curso.map((curso) => curso.curso_id);
        setSelectedCursos(userCursos);

        // Establecer los valores predeterminados en el formulario
        setValue('nombres', user.nombres || '');
        setValue('apellidos', user.apellidos || '');
        setValue('dni', user.dni || '');
        setValue('celular', user.celular || '');
        setValue('correo', user.correo || '');
        setValue('usuario', user.usuario || '');
        setValue('contrasenia', user.contrasenia || '');
        setValue('rol', user.rol || '');
        setValue('cursos', userCursos || []); // Establecer los cursos seleccionados
      } catch (error) {
        console.error('Error fetching user or courses data:', error);
      }
    };

    fetchCursos();
  }, [user.user_id, setValue]);

  const onSubmit = async (data: any) => {
    setLoading(true);

    const currentDatePeru = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());

    const dataR: DataUser = {
      user_id: user.user_id,
      nombres: data.nombres,
      apellidos: data.apellidos,
      dni: data.dni,
      celular: data.celular,
      correo: data.correo,
      usuario: data.usuario,
      contrasenia: data.contrasenia,
      rol: data.rol,
      fecha_creacion: user.fecha_creacion,
      fecha_actualizacion: new Date(currentDatePeru)
    }
    try {
      // Actualizar usuario
      await axios.put(`/api/users`, dataR);
      await axios.put('/api/usuario-cursos', {
        userId: user.user_id,
        cursoIds: selectedCursos,
      })
      onUpdateUser(dataR);
      alert('Usuario actualizado correctamente');
      onClose(); // Cerrar el formulario después de actualizar
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCursoChange = (cursoId: number) => {
    setSelectedCursos((prevSelected) =>
      prevSelected.includes(cursoId)
        ? prevSelected.filter((id) => id !== cursoId)
        : [...prevSelected, cursoId]
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{marginBottom: '30px', fontSize: '1.1rem'}}>
        Editar Usuario
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Nombres */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombres"
              control={control}
              defaultValue={user.nombres}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombres"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>
          {/* Apellidos */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="apellidos"
              control={control}
              defaultValue={user.apellidos}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellidos"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>
          {/* DNI */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="dni"
              control={control}
              defaultValue={user.dni}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="DNI"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>
          {/* Celular */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="celular"
              control={control}
              defaultValue={user.celular}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Celular"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          {/* Correo */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="correo"
              control={control}
              defaultValue={user.correo}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  type="email"
                  required
                />
              )}
            />
          </Grid>
          {/* Usuario */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="usuario"
              control={control}
              defaultValue={user.usuario}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Usuario"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>
          {/* Contraseña */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="contrasenia"
              control={control}
              defaultValue={user.contrasenia}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  type="password"
                />
              )}
            />
          </Grid>
          {/* Rol */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="rol"
              control={control}
              defaultValue={user.rol}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="rol-label">Rol</InputLabel>
                  <Select
                    {...field}
                    labelId="rol-label"
                    label="Rol"
                    fullWidth
                    value={field.value} // Asegura que el valor predeterminado esté seleccionado
                    onChange={field.onChange}
                  >
                    <MenuItem value={user.rol}>{user.rol.charAt(0).toUpperCase() + user.rol.slice(1).toLowerCase()}</MenuItem>
                    {user.rol === 'estudiante' ? <MenuItem value="administrador">Administrador</MenuItem> : <MenuItem value="estudiante">Estudiante</MenuItem>}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          {/* Cursos */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Cursos
            </Typography>
            <FormGroup>
              {cursos.map((curso) => (
                <FormControlLabel
                  key={curso.curso_id}
                  control={
                    <Checkbox
                      checked={selectedCursos.includes(curso.curso_id)}
                      onChange={() => handleCursoChange(curso.curso_id)}
                    />
                  }
                  label={curso.nombre}
                />
              ))}
            </FormGroup>
          </Grid>    
          {/* Botones */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{color: 'white', fontWeight:'bold'}}>
              {loading ? 'Actualizando...' : 'Actualizar Usuario'}
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={onClose} sx={{fontWeight: 'bold'}}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditUserForm;
