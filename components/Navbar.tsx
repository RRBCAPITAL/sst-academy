import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const pages = ['Especializaciones'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 'none', overflowX: 'hidden' }}>
      <Container sx={{ minWidth: '100%', background: "#f1edea", color: 'primary.main', overflowX: 'hidden' }}>
        <Toolbar disableGutters sx={{ maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 'auto' }}>
          {/* Logo al principio */}
          <Box sx={{ display: 'flex', flexGrow: 0 }}>
            <Link href="/" passHref>
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
          </Box>

          {/* Icono del menú en dispositivos móviles */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    href={page === 'Especializaciones' ? '/' : ''}
                    sx={{textDecoration:'none', fontWeight: 'bold', color: '#818181', fontSize: '1.2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1}}
                  >
                   <FactCheckIcon sx={{color: '#ff914d'}} /> {page}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href="/campus-virtual-login"
                  sx={{color: 'white'}}
                >
                  Campus Virtual
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          {/* Botón de acción al final */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '50px',
                padding: '8px 20px',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: 'none',
              }}
              component={Link}
              href="/campus-virtual-login"
            >
              Campus Virtual
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
