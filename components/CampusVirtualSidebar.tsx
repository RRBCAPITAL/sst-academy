import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';

import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
  } from "@mui/material";
import CampusVirtualInicio from './CampusVirtualInicio';
import { usePathname } from 'next/navigation';
import CampusVirtualCurso from './CampusVirtualCurso';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function CampusVirtualSidebar(props: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const pathname = usePathname();
  const [user, setUser] = React.useState<any>()

  React.useEffect(() => {
    const parseUser = localStorage.getItem('user')
    const user = parseUser && JSON.parse(parseUser);
    setUser(user)
  }, [])
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const frasesDinamicas = ['Bienvenido al campus virtual', 'Hoy es un gran día para aprender.', "Felices de ayudarte a crecer.", "Recuerda repasar lo que aprendas.", "Mucha suerte con tus clases hoy."]

  // Estado para almacenar el índice de la frase actual
  const [currentFraseIndex, setCurrentFraseIndex] = React.useState(0);

  React.useEffect(() => {
    // Intervalo para cambiar la frase cada 3 segundos
    const interval = setInterval(() => {
      setCurrentFraseIndex((prevIndex) =>
        prevIndex === frasesDinamicas.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    // { text: 'Mi perfil', url: '/' },
    { text: 'Cursos Activos', url: '/campus-virtual' },
    // { text: 'Cursos Finalizados', url: '/campus-virtual/cursos-finalizados' },
    // { text: 'Mi Progreso', url: '/progreso' },
    { text: 'Cerrar Sesión', url: '/campus-virtual-login' },
  ];
  
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white', boxShadow: 'none'}}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexGrow: 0 }}>
            <Link href="/campus-virtual" passHref>
              <img
                src="/images/logos/logo-sst.png" // Ruta a la imagen de tu logo
                alt="SST Academia Logo"
                style={{
                  display: 'block',
                  width: '180px', // Ajusta el tamaño según sea necesario
                  height: 'auto',
                }}
              />
            </Link>
            {" "}Campus Virtual
          </Box>
        </Toolbar>

        {pathname === '/campus-virtual' && <Box
      sx={{ 
        display: 'flex', // Para habilitar flexbox
        flexDirection: 'column',
        justifyContent: 'center', // Centrado horizontal
        alignItems: 'center', // Centrado vertical
        background: '#ff914d',
        width: '96.3%',
        height: '124px',
        textAlign: 'center',
        fontSize: '1.5rem',
        color: 'white',
        fontWeight: '500',
        overflowX: 'hidden',
        margin: '0 auto',
        marginTop: '24.1px',
        padding: '0',
      }}
      >
        <Typography sx={{
        width: '100%',
        textAlign: 'center',
        fontSize: '2rem',
        color: 'white',
        fontWeight: '500',
        margin: '0',
        padding: '0'}}>
        ¡Hola {user ? user.nombres : 'estudiante'}! 
        </Typography>
        <Typography sx={{
        width: '100%',
        textAlign: 'center',
        fontSize: '1.5rem',
        color: 'white',
        //fontWeight: '500',
        margin: '0',
        marginTop: '12px',
        padding: '0'}}>
        {frasesDinamicas[currentFraseIndex]}
        </Typography>
      </Box>}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
      {menuItems.map((item, index) => (
        <ListItem key={item.text} disablePadding >
          <Link href={item.url}
          style={{
            background:
              (pathname === item.url) || 
              (item.url === '/campus-virtual' && pathname?.startsWith('/campus-virtual/curso/')) // Marca 'Cursos Activos' si estamos en un curso
                ? '#ff914d' 
                : '#ffffff', // Fondo blanco por defecto
            border: '2px solid #e4721a',
            borderRadius: '10px',
            margin: '4px 4px',
            width: '100%',
            textDecoration: 'none'
          }}
          passHref >
            <ListItemButton  sx={{
          '&:hover': {
            backgroundColor: '#ff914d',  // Cambia el color de fondo al hacer hover
            borderColor: '#ff7017',      // Cambia el borde al hacer hover
          },
        }}>
              <ListItemIcon>
                {index % 2 === 0 ? <AppRegistrationIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'black'}}>
                {item.text}
              </Typography>
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
     
      <Main open={open}>
        {/* <DrawerHeader /> */}
        {pathname === '/campus-virtual' ? <CampusVirtualInicio /> : pathname?.startsWith('/campus-virtual/curso') ? <CampusVirtualCurso curso_id = {props && props?.curso_id} /> : ''}
      </Main>
    </Box>
  );
}
