"use client"

import { useParams } from 'next/navigation'
import CursoDashboard from '@/pages/CursoDashboard'

const RouteCursoDetalle = () => {

    const { curso_id } = useParams();


  return (
    <div>
        <CursoDashboard curso_id = {curso_id}/>
    </div>
  )
}

export default RouteCursoDetalle