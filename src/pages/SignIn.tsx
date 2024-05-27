import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import '../index.css';
import { signIn, me } from '../api/Auth';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import Footer from '../components/Footer';
import RayoIconButton from '../components/RayoIconButton';
import ColorSchemeToggle from '../components/ColorSchemeToggle';
import getRandomImage from '../utils/getRandomImage';
import API from '../api/API';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [buttonCaption, setButtonCaption] = React.useState('Iniciar sesión');
  const [errorAlert, setErrorAlert] = React.useState(<></>);
  const [lightImage, setLightImage] = React.useState('');
  const [darkImage, setDarkImage] = React.useState('');
  React.useEffect(() => setLightImage(getRandomImage('light')), []);
  React.useEffect(() => setDarkImage(getRandomImage('dark')), []);

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    setLoading(true);
    setButtonCaption('');
    setErrorAlert(<></>);

    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
    };

    try {
      const signInResponse: AxiosResponse = await signIn(data);

      API.interceptors.request.use((config) => {
        config.headers.Authorization = `Token ${signInResponse.data.auth_token}`;
        return config;
      });

      const meResponse: AxiosResponse = await me();

      navigate('/home', {
        state: {
          name: meResponse.data.first_name + ' ' + meResponse.data.last_name,
          email: meResponse.data.email,
        },
      });
    } catch (error) {
      const errorMessage = error.response
        ? 'Correo o contraseña incorrecta. Intenta nuevamente.'
        : 'Error del servidor. Intenta más tarde.';
      setErrorAlert(<MessageBox color="danger" message={errorMessage} />);
    } finally {
      setLoading(false);
      setButtonCaption('Iniciar sesión');
    }
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': 'none', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
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
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack
              gap={4}
              sx={{ mb: 2, alignItems: 'center', justifyContent: 'center' }}
            >
              <RayoIconButton />
              <Typography component="h1" level="h1">
                Iniciar sesión
              </Typography>
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    title="Correo"
                    autoComplete="email"
                  />
                </FormControl>
                <FormControl required>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    title="Contraseña"
                    autoComplete="current-password"
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Link level="title-sm" href="/forgot-password">
                    ¿Olvidaste tu contraseña?
                  </Link>
                  <Button
                    type="submit"
                    title="Iniciar sesión"
                    loading={loading}
                    fullWidth
                  >
                    {buttonCaption}
                  </Button>
                  {errorAlert}
                </Stack>
              </form>
            </Stack>
          </Box>
          <Footer />
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${lightImage})`,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage: `url(${darkImage})`,
          },
        })}
      />
    </CssVarsProvider>
  );
}
