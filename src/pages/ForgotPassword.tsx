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
import { sendPasswordResetLink } from '../api/Auth';
import { AxiosResponse } from 'axios';
import MessageBox from '../components/MessageBox';
import ColorSchemeToggle from '../components/ColorSchemeToggle';
import Footer from '../components/Footer';
import RayoIconButton from '../components/RayoIconButton';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function ForgotPassword() {
  const [loading, setLoading] = React.useState(false);
  const [buttonCaption, setButtonCaption] = React.useState('Enviar enlace');
  const [emailSent, setEmailSent] = React.useState(false);
  const [alert, setAlert] = React.useState(<></>);

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    setLoading(true);
    setButtonCaption('');
    setAlert(<></>);

    const data = {
      email: formElements.email.value,
    };

    try {
      const res: AxiosResponse = await sendPasswordResetLink(data);

      if (res.status < 400) {
        setEmailSent(true);
        const status =
          'Te hemos enviado un correo para restablecer la contraseña.';
        setAlert(<MessageBox color="success" message={status} />);
      } else {
        const status =
          '(' + res.status + ') Ha ocurrido un error. Intente nuevamente.';
        setAlert(<MessageBox color="danger" message={status} />);
      }
    } catch (error) {
      const message = 'Error del servidor. Intente más tarde.';
      setAlert(<MessageBox color="danger" message={message} />);
    } finally {
      setLoading(false);
      setButtonCaption('Enviar enlace');
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
            sx={{
              pt: 3,
              gap: 2,
              display: 'flex',
              justifyContent: 'right',
            }}
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
              sx={{ mb: 0, alignItems: 'center', justifyContent: 'center' }}
            >
              <RayoIconButton />
              <Typography component="h3" level="h3">
                Restablecer contraseña
              </Typography>
              <Typography color="neutral" level="body-md">
                Ingresa tu correo y te enviaremos un enlace para que puedas
                restablecer tu contraseña.
              </Typography>
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required disabled={emailSent}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    title="Correo"
                    autoComplete="email"
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    title="Enviar enlace"
                    loading={loading}
                    fullWidth
                    disabled={emailSent}
                  >
                    {buttonCaption}
                  </Button>
                  {alert}
                </Stack>
              </form>
            </Stack>
          </Box>
          <Footer />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
