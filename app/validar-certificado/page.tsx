"use client"

import React from 'react'
import { Container } from '@mui/material'
import ValidarCertificado from '../../components/ValidarCertificado'
import { useState } from 'react'

const PageValidarCertificado = () => {

  const [open, setOpen] = useState<boolean>(true);
  const [codigo, setCodigo] = useState<string>("");

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        maxWidth: "1440px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
      }}
    >
    {open &&  <ValidarCertificado setOpen = {setOpen} open = {open} codigo = {codigo} setCodigo = {setCodigo} /> }
    </Container>
  )
}

export default PageValidarCertificado