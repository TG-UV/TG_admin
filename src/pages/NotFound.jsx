import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import NotFoundImg from '../assets/not_found.svg';
import Stack from '@mui/joy/Stack';

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
        <IconButton
          component={Link}
          to="/"
          variant="soft"
          color="primary"
          size="lg"
          sx={{ borderRadius: '50%' }}
          title="Rayo"
        >
          <img src="/logo.png" alt="Logo" className="logo" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default NotFound;
