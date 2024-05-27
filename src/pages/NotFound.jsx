import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import NotFoundImg from '../assets/not_found.svg';
import Stack from '@mui/joy/Stack';
import Footer from '../components/Footer';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import ColorSchemeToggle from '../components/ColorSchemeToggle';

const NotFound = () => {
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          width: '100%',
          px: 2,
        }}
      >
        <Box
          component="header"
          sx={{ pt: 3, gap: 2, display: 'flex', justifyContent: 'right' }}
        >
          <ColorSchemeToggle />
        </Box>
        <Stack
          gap={1}
          sx={{ mb: 2, alignItems: 'center', justifyContent: 'center' }}
        >
          <img src={NotFoundImg} alt="404" className="not_found" />
          <Typography component="h1" level="h1">
            404
          </Typography>
          <Typography color="neutral" level="body-md">
            La página que estás buscando no existe.
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Volver a la página principal
          </Button>
        </Stack>
        <Footer />
      </Box>
    </CssVarsProvider>
  );
};

export default NotFound;
