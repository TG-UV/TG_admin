import { useParams } from 'react-router-dom';
import { activateAccount } from '../services/requests';
import { useEffect, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Skeleton from '@mui/joy/Skeleton';
import '../index.css';
import ColorSchemeToggle from '../components/ColorSchemeToggle';
import Footer from '../components/Footer';
import RayoIconButton from '../components/RayoIconButton';

const ActivateAccount = () => {
  const { id_user, token } = useParams();
  const [loading, setLoading] = useState(true);
  const successMessage = `Tu cuenta ha sido activada exitosamente. 
  ¡Regresa a la app y empieza a disfrutar de los viajes compartidos universitarios!`;
  const errorMessage = `Enlace incorrecto o expirado. 
  Solicita en la app el envío del email de activación nuevamente.`;
  const [result, setResult] = useState(successMessage);
  const [resultColor, setResultColor] = useState('success');

  useEffect(() => {
    const data = {
      uid: id_user,
      token: token,
    };

    const sendData = async () => {
      try {
        await activateAccount(data);
      } catch (error) {
        setResult(errorMessage);
        setResultColor('warning');
      } finally {
        setLoading(false);
      }
    };

    sendData();
  }, [id_user, token, errorMessage]);

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': 'none',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '100vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(255 255 255 / 0.9)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.9)',
          },
        })}
      >
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
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 0,
              pb: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
            }}
          >
            <Stack
              gap={4}
              sx={{ mb: 0, alignItems: 'center', justifyContent: 'center' }}
            >
              <RayoIconButton />
              <Typography component="h3" level="h3">
                Activar cuenta
              </Typography>
              <Typography
                color={resultColor}
                level="body-md"
                style={{ whiteSpace: 'pre-line' }}
              >
                {loading ? <Skeleton>{successMessage}</Skeleton> : result}
              </Typography>
            </Stack>
          </Box>
          <Footer />
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default ActivateAccount;
