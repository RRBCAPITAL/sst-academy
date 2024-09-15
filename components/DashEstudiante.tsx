import { useState } from 'react';
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel, Drawer, List, ListItem, Card, CardContent, CardMedia, Button, Box, Grid, Divider, CssBaseline, Container } from '@mui/material';

interface Course {
  id: number;
  name: string;
  image: string;
  progress: number;
}

const drawerWidth = 240; // Define el ancho del Drawer

const courses = [
  { id: 1, name: 'Curso 1', image: '/course1.jpg', progress: 0 },
  { id: 2, name: 'Curso 2', image: '/course2.jpg', progress: 50 },
];

const Sidebar = ({
  showActiveCourses,
  showCompletedCourses,
  onActiveChange,
  onCompletedChange,
}: {
  showActiveCourses: boolean;
  showCompletedCourses: boolean;
  onActiveChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompletedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
  >
    <Toolbar />
    <Divider />
    <List>
      <ListItem>
        <FormControlLabel
          control={<Checkbox checked={showActiveCourses} onChange={onActiveChange} />}
          label="Cursos Activos"
        />
      </ListItem>
      <ListItem>
        <FormControlLabel
          control={<Checkbox checked={showCompletedCourses} onChange={onCompletedChange} />}
          label="Cursos Finalizados"
        />
      </ListItem>
    </List>
  </Drawer>
);

const CourseCard = ({ course }: { course: Course }) => (
  <Card sx={{ display: 'flex', marginBottom: 2 }}>
    <CardMedia component="img" sx={{ width: 150 }} image={course.image} alt={course.name} />
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <CardContent>
        <Typography component="div" variant="h6">
          {course.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Progreso: {course.progress}%
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
        {course.progress === 0 ? (
          <Button variant="contained" color="primary">Iniciar curso</Button>
        ) : (
          <Button variant="contained" color="secondary">Continuar curso</Button>
        )}
      </Box>
    </Box>
  </Card>
);

const DashEstudiante = () => {
  const [showActiveCourses, setShowActiveCourses] = useState(true);
  const [showCompletedCourses, setShowCompletedCourses] = useState(false);

  const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowActiveCourses(e.target.checked);
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowCompletedCourses(e.target.checked);
  };

  const activeCourses = courses.filter((course) => course.progress < 100);
  const completedCourses = courses.filter((course) => course.progress === 100);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar
        showActiveCourses={showActiveCourses}
        showCompletedCourses={showCompletedCourses}
        onActiveChange={handleActiveChange}
        onCompletedChange={handleCompletedChange}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: `${drawerWidth}px`,
          width: '80%', // Ocupa el 80% de la pantalla en pantallas grandes
          maxWidth: '1200px', // Máximo ancho de 1200px
          margin: '0 auto', // Centra el contenido
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            marginLeft: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Cursos
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container sx={{ marginTop: 3 }}>
          <Grid container spacing={2}>
            {showActiveCourses && activeCourses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <CourseCard course={course} />
              </Grid>
            ))}
            {showCompletedCourses && completedCourses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashEstudiante;
