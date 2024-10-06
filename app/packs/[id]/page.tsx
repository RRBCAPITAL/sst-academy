"use client";

import { useParams } from 'next/navigation';
import { deslugify } from '@/utils/deslugify';
import Packs from '@/pages/Packs';

const RoutePacksDetalle = () => {
  const params = useParams();  // Puede ser null o un objeto con parámetros

  // Asegúrate de que params y nombre existan
  const id = params?.id as string | undefined;

  // Maneja el caso donde `nombre` sea undefined
  if (!id) {
    return <p>Cargando...</p>;  // O cualquier otra UI de carga o error
  }

  return <Packs id={id} />;
};

export default RoutePacksDetalle;
