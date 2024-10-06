'use client';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from '@/app/dashboard/admin/components/container/PageContainer';
import DashboardCard from '@/app/dashboard/admin/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios.config'; // Ajusta la ruta según tu estructura
import { DataUser } from '@/Types/user.types';
import TableUsers from '../../components/dashboard/TableUsers';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<DataUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateUser = (updatedUser: DataUser) => {
 
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((user) =>
        user.user_id === updatedUser.user_id ? updatedUser : user
      )
    );
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get<{ user: DataUser[] }>('/api/users'); // Ajusta el endpoint según tu API
        console.log(response.data);
        
        setUsuarios(response.data.user);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);
  console.log('users: ', usuarios);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageContainer title="Shadow" description="this is Shadow">
      {/* title="Todos los usuarios disponibles" */}
      <DashboardCard >
        <Grid container spacing={2}>
          <TableUsers usuarios = {usuarios} onUpdateUser = {updateUser}/>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Usuarios;
