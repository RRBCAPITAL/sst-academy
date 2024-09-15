"use client"

import { useParams } from 'next/navigation'
import CursoDashboard from '@/pages/CursoDashboard'

const RouteCursoDetalle = () => {

  const params = useParams();
  const curso_id = params?.curso_id as string | undefined;

  if (!curso_id) {
    return <p>Cargando...</p>;  // O cualquier otra UI de carga o error
  }

  return (
    <div>
        <CursoDashboard curso_id = {curso_id}/>
    </div>
  )
}

export default RouteCursoDetalle;
