import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Select, MenuItem, InputLabel, FormControl, TextField, SelectChangeEvent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { DataUser } from '@/Types/user.types';
import EditUserForm from '@/components/EditUserForm';
import { User } from '@/Types/user.types';
import ViewUser from '@/components/ViewUser';
import { Curso } from '@/Types/curso.types';

interface HeadCell {
  id: keyof DataUser;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

// Definir las columnas de la tabla (headCells)
const headCells: readonly HeadCell[] = [
  { id: 'user_id', numeric: false, disablePadding: true, label: 'N.' },
  { id: 'nombres', numeric: false, disablePadding: false, label: 'Nombres' },
  { id: 'apellidos', numeric: false, disablePadding: false, label: 'Apellidos' },
  { id: 'dni', numeric: false, disablePadding: false, label: 'DNI' },
  { id: 'correo', numeric: false, disablePadding: false, label: 'Correo' },
  { id: 'usuario', numeric: false, disablePadding: false, label: 'Usuario' },
  { id: 'contrasenia', numeric: false, disablePadding: false, label: 'Contraseña' },
  { id: 'rol', numeric: false, disablePadding: false, label: 'Rol' },
  { id: 'fecha_creacion', numeric: false, disablePadding: false, label: 'Creado el' },
];

interface TableUsersProps {
  usuarios: DataUser[];
  onUpdateUser: (onUpdateUser: DataUser) => void
}

export default function TableUsers({ usuarios, onUpdateUser }: TableUsersProps) {
  const [selectedUser, setSelectedUser] = React.useState<DataUser | null>(null);
  const [viewingUser, setViewingUser] = React.useState<DataUser | null>(null); // Para visualizar
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataUser>('user_id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterRole, setFilterRole] = React.useState<string>('Todos');
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [cursosActivos, setCursosActivos] = React.useState<Curso[]>([]);

  // user edit
  const handleEditClick = (user: DataUser) => {
    setSelectedUser(user);
  };

  const handleCloseEditForm = () => {
    setSelectedUser(null); // Cerramos el formulario de visualización
  };

  //user view
  const handleViewClick = (user: DataUser) => {
    setViewingUser(user);
  };

  const handleCloseViewUser = () => {
    setCursosActivos([]);
    setViewingUser(null); // Cerramos el formulario de visualización
  };

  // Maneja la selección del rol
  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setFilterRole(event.target.value as string);
  };

  // Maneja la búsqueda por texto
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Maneja la solicitud de ordenación
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DataUser) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Maneja la selección de todos los elementos
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = usuarios.map((n) => n.user_id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  // Maneja la selección individual de filas
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // Maneja el cambio de página
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Maneja el cambio de número de filas por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Maneja el cambio en la densidad de la tabla
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Maneja la eliminación de usuarios
  const handleDeleteUsers = async () => {
    try {
      // Aquí va la llamada a la API para eliminar los usuarios
      // Por ejemplo, podrías usar fetch o axios para hacer la solicitud
      await fetch('/api/deleteUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_ids: selected }),
      });
      // Actualiza el estado después de eliminar
      setSelected([]);
    } catch (error) {
      console.error('Error al eliminar usuarios:', error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const openDeleteDialogT = () => {
    setOpenDeleteDialog(true);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Filtrar usuarios por rol y por el término de búsqueda
  const filteredUsers = usuarios.filter((usuario) => {
    const searchFilter =
      usuario.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(searchTerm.toLowerCase());

    const roleFilter = filterRole === 'Todos' || usuario.rol.toLowerCase() === filterRole.toLowerCase();

    return searchFilter && roleFilter;
  });

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...filteredUsers]
        .sort((a, b) => {
          if (order === 'asc') {
            return a[orderBy] > b[orderBy] ? 1 : -1;
          } else {
            return a[orderBy] < b[orderBy] ? 1 : -1;
          }
        })
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredUsers],
  );

  if (selectedUser) {
    // Si se seleccionó un usuario para editar, renderizamos el formulario de edición
    return <EditUserForm user={selectedUser} onClose={handleCloseEditForm} onUpdateUser = {onUpdateUser}/>;
  }
  // } else if(viewingUser){
  //   return <ViewUser user={viewingUser} onClose={handleCloseViewUser}/>;
  // }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Usuarios
          </Typography>

          {/* Icono de eliminar */}
          {selected.length > 0 && (
            <Tooltip title="Eliminar">
              <IconButton
                color="error"
                onClick={openDeleteDialogT}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Input de búsqueda */}
          <TextField
            label="Buscar"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginRight: 2 }}
          />

          {/* Filtro por rol */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="filter-role-label">Filtrar por Rol</InputLabel>
            <Select
              labelId="filter-role-label"
              id="filter-role"
              value={filterRole}
              onChange={handleRoleChange}
              label="Filtrar por Rol"
            >
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="Estudiante">Estudiante</MenuItem>
              <MenuItem value="Administrador">Administrador</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selected.length === usuarios.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all users' }}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    onClick={(event) => handleRequestSort(event, headCell.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.user_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.user_id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.user_id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{row.nombres}</TableCell>
                    <TableCell align="left">{row.apellidos}</TableCell>
                    <TableCell align="left">{row.dni}</TableCell>
                    <TableCell align="left">{row.correo}</TableCell>
                    <TableCell align="left">{row.usuario}</TableCell>
                    <TableCell align="left">{row.contrasenia}</TableCell>
                    <TableCell align="left">{row.rol}</TableCell>
                    <TableCell align="left">
                      {new Date(row.fecha_creacion).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleViewClick(row)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleEditClick(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

      {/* Modal de confirmación de eliminación */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar {selected.length} usuario(s)?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDeleteUsers} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
      <ViewUser user={viewingUser} cursosActivos={cursosActivos} setCursosActivos={setCursosActivos} onClose={handleCloseViewUser} />
    </Box>
  );
}
