import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import NotFoundImg from '../assets/not_found.svg';
import Stack from '@mui/joy/Stack';
import Footer from '../components/Footer';
import RayoIconButton from '../components/RayoIconButton';

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Stack
        gap={1}
        sx={{ mb: 2, alignItems: 'center', justifyContent: 'center' }}
      >
        <img src={NotFoundImg} alt="404" className="not_found" />
        <Typography variant="h1" gutterBottom>
          404 - Página no encontrada
        </Typography>
        <Typography variant="body1">
          La página que estás buscando no existe.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Volver a la página principal
        </Button>
        <RayoIconButton />
      </Stack>
      <Footer />
    </Box>
  );
};

export default NotFound;
