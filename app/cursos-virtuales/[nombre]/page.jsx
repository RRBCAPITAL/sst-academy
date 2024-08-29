"use client"

import { useParams } from 'next/navigation'
import { deslugify } from '@/utils/deslugify'
import Curso from '@/pages/Curso'

const page = () => {

    const { nombre } = useParams();
    
    const formatNombre = deslugify(nombre);

  return (
    <div>
        <Curso nombre = {formatNombre}/>
    </div>
  )
}

export default page