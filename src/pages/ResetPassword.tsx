import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { resetPassword } from '../services/requests';
import MessageBox from '../components/MessageBox';
import ColorSchemeToggle from '../components/ColorSchemeToggle';
import Footer from '../components/Footer';
import RayoIconButton from '../components/RayoIconButton';
import PasswordInput from '../components/PasswordInput';
import { useParams } from 'react-router-dom';

interface FormElements extends HTMLFormControlsCollection {
  newPassword: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}
interface ResetPasswordFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const ResetPassword = () => {
  const { id_user, token } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [buttonCaption, setButtonCaption] = React.useState(
    'Restablecer contraseña'
  );
  const [passwordSent, setPasswordSent] = React.useState(false);
  const [alert, setAlert] = React.useState(<></>);
  const successMessage =
    'Se ha restablecido tu contraseña. Ya puedes iniciar sesión con tu nueva contraseña';
  const serverErrorMessage = 'Error del servidor. Intenta más tarde.';
  const expiredLinkMessage = `Enlace incorrecto o expirado. 
  Solicita el envío del enlace de restablecimiento nuevamente.`;
  const noMatchMessage = 'Las contraseñas no coinciden.';

  const handleSubmit = async (
    event: React.FormEvent<ResetPasswordFormElement>
  ) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      uid: id_user,
      token: token,
      new_password: formElements.newPassword.value,
    };

    if (formElements.newPassword.value === formElements.confirmPassword.value) {
      setLoading(true);
      setButtonCaption('');
      setAlert(<></>);

      try {
        await resetPassword(data);
        setPasswordSent(true);
        setAlert(<MessageBox color="success" message={successMessage} />);
      } catch (error) {
        const message =
          error.response && error.response.status < 500
            ? error.response.data && error.response.data.new_password
              ? error.response.data.new_password.join(' ')
              : expiredLinkMessage
            : serverErrorMessage;
        setAlert(<MessageBox color="danger" message={message} />);
      } finally {
        setLoading(false);
        setButtonCaption('Restablecer contraseña');
      }
    } else {
      setAlert(<MessageBox color="danger" message={noMatchMessage} />);
    }
  };

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
              borderRadius: 'sm',
              '& form': { display: 'flex', flexDirection: 'column', gap: 2 },
              [`& .MuiFormLabel-asterisk`]: { visibility: 'hidden' },
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
                Crea una nueva contraseña para reemplazar la que no recuerdas.
              </Typography>
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required disabled={passwordSent}>
                  <PasswordInput
                    name="newPassword"
                    placeholder="Nueva contraseña"
                    title="Nueva contraseña"
                  />
                </FormControl>
                <FormControl required disabled={passwordSent}>
                  <PasswordInput
                    name="confirmPassword"
                    placeholder="Confirmar nueva contraseña"
                    title="Confirmar nueva contraseña"
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    title="Restablecer contraseña"
                    loading={loading}
                    fullWidth
                    disabled={passwordSent}
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
};

export default ResetPassword;
