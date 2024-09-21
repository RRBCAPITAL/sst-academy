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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';

const pages = ['Inicio', 'Cursos'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static"  sx={{ boxShadow: 'none'}}>
      <Container maxWidth="xl" sx={{ backgroundColor: '#e8f0ff', color: 'primary.main'}}>
        <Toolbar disableGutters sx={{ padding: '0 30px' }}>
          {/* Logo al principio */}
          <Box sx={{ flexGrow: 0 }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SST ACADEMIA
            </Typography>
          </Box>

          {/* Icono del menú en dispositivos móviles */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{color: 'text.primary'}}
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
                  <Typography textAlign="center" component={Link} href={page === 'Inicio' ? '/' : '/cursos-virtuales'}>
                    {page}
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
                  href="/login"
                >
                  Ingresar
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          {/* Enlaces de navegación en el centro */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                href={page === 'Inicio' ? '/' : '/cursos-virtuales'}
                sx={{ my: 2, color: 'text.primary', display: 'block', fontSize: '16px', fontWeight: 'bold' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Botón de acción al final */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'block' } }}>
            <Button
              variant="contained"
              sx={{
                my: 2,
                backgroundColor: 'white',
                border: '1px solid #1F1D0D',
                color: '#1F1D0D',
                fontWeight: 'bold',
                boxShadow: 'none',
              }}
              component={Link}
              href="/login"
            >
              Ingresar
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
