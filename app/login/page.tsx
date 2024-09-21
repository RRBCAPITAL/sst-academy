"use client"

import React, { useState } from 'react';
import axios from '../../utils/axios.config';
import { useRouter } from 'next/navigation';
import SlotsSignIn from '../../components/Login'
import LoginForm from '../../components/Login';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      // Verifica si la respuesta de la API es exitosa
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
    } catch (error) {
      // Manejar errores en la petición
      console.error('Error en la petición de autenticación', error);
    }
  };

  return (
      <LoginForm />
  );
};

export default LoginPage;
