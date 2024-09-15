"use client";

import { useParams } from 'next/navigation';
import { deslugify } from '@/utils/deslugify';
import Curso from '@/pages/Curso';

const RouteCursoDetalle = () => {
  const params = useParams();  // Puede ser null o un objeto con parámetros

  // Asegúrate de que params y nombre existan
  const nombre = params?.nombre as string | undefined;

  // Maneja el caso donde `nombre` sea undefined
  if (!nombre) {
    return <p>Cargando...</p>;  // O cualquier otra UI de carga o error
  }

  const formatNombre = deslugify(nombre);

  return <Curso nombre={formatNombre} />;
};

export default RouteCursoDetalle;
