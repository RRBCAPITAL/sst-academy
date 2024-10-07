import InicioPage from "@/pages/InicioPage";

export const metadata = {
  title: "Programas Virtuales | SST Academy",
  description:
    "Potencia tus habilidades en las áreas de seguridad y salud en el trabajo, sistemas integrados de gestión, auditor trinorma, iso 45001, iso 14001, iso 9001, residuos sólidos y estudio de impacto ambiental con la plataforma de programas virtuales de SST Academy. ¡Conoce más!",
  keywords: [
    "seguridad",
    "prevencionista de riesgos",
    "medio ambiente",
    "gestión ambiental",
  ],
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL('https://www.sstacademia.com/'),
  alternates: {
    canonical: "https://www.sstacademia.com/",
  },
  authors: [{ name: "RRB CAPITAL" }],
  publisher: 'RRB CAPITAL',
};

const Inicio = () => {

  return (
    <InicioPage />
  );
};

export default Inicio;
