"use client"

import React from 'react';
import LoginForm from '../../components/Login';
import { useEffect } from 'react';

const LoginPage = () => {

  useEffect(() => {

    document.cookie = "token=; Max-Age=0; path=/;";  // Elimina la cookie de 'token'
    document.cookie = "user=; Max-Age=0; path=/;";   // Elimina la cookie de 'user'

    const user = localStorage.getItem("user")
    const parseUser = user && JSON.parse(user)
    parseUser && localStorage.removeItem("user");
  }, [])
  
  return (
      <LoginForm />
  );
};

export default LoginPage;
