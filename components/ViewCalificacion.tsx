"use client"

import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
import { DataUser } from '@/Types/user.types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataCalificacion } from '@/Types/calificacion.types';

interface ViewCalificacionProps {
  data: DataCalificacion | null;
  onClose: () => void;
}

const ViewCalificacion: React.FC<ViewCalificacionProps> = ({ data, onClose }) => {
  const [notaFinal, setNotaFinal] = useState<string>(''); // Estado para manejar la nota final
  const [loading, setLoading] = useState<boolean>(false); // Estado para manejar la carga

  useEffect(() => {
    if (!data) return; // Verificar si hay un usuario antes de ejecutar el efecto
  }, [data]);

  // Maneja el cambio del input para la nota final
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotaFinal(event.target.value);
  };

  // Maneja el envío de la calificación
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Previene la recarga de la página al enviar el formulario

    if (!notaFinal) {
      alert('Por favor, ingrese una calificación.');
      return;
    }

    try {
      setLoading(true); // Indicador de carga
      // Enviar la calificación al backend
      const res = await axios.post('/api/calificacion', {
        curso_id: data?.curso_id,
        user_id: data?.user_id,
        calificacion: parseFloat(notaFinal), // Convertimos la nota a número
      });

      if (res.data.success) {
        alert('Calificación registrada exitosamente.');
      } else {
        alert('Error al registrar la calificación.');
      }
    } catch (error) {
      console.error('Error al enviar la calificación:', error);
      alert('Hubo un error al intentar registrar la calificación.');
    } finally {
      setLoading(false); // Desactivamos el indicador de carga
    }
  };

  if (!data) {
    return null; // Si no hay datos de calificación, no mostramos nada
  }

  return (
    <Dialog open={!!data} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: '#ff8c2e' }}>Calificación del curso</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <strong>Curso:</strong> {data.curso_nombre}
        </Typography>
        <Typography variant="body1">
          <strong>Estudiante:</strong> {data.user_nombre}
        </Typography>
        <Typography variant="body1">
          <strong>Porcentaje de Avance:</strong> {data.porcentaje_avance}%
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nota Final"
            type="number"
            value={notaFinal}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            inputProps={{ min: 0, max: 100 }} // Limitamos la nota entre 0 y 100
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{color: 'white', fontWeight: 'bold'}}
            disabled={loading} // Desactivar el botón mientras se carga
          >
            {loading ? 'Enviando...' : 'Calificar'}
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewCalificacion;
