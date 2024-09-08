import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconUser,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Inicio",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Info",
  },
  {
    id: uniqueId(),
    title: "Usuarios",
    icon: IconUser,
    href: "/dashboard/admin/informacion/usuarios",
  },
  {
    id: uniqueId(),
    title: "Cursos",
    icon: IconCopy,
    href: "/informacion/cursos",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Registrar",
    icon: IconUserPlus,
    href: "/dashboard/admin/action/crear-usuario",
  },
  {
    navlabel: true,
    subheader: "REGRESAR",
  },
  {
    id: uniqueId(),
    title: "Inicio",
    icon: IconMoodHappy,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Cursos Virtuales",
    icon: IconAperture,
    href: "/cursos-virtuales",
  },
];

export default Menuitems;
