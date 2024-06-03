import { useState } from 'react';
import { editUser } from '../services/requests';
import { getIdUser } from '../services/authService';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Snackbar from '@mui/joy/Snackbar';
import InfoIcon from '@mui/icons-material/Info';
import PasswordInput from '../components/PasswordInput';

const Settings = () => {
  const successMessage = 'Contraseña actualizada correctamente.';
  const fieldErrorMessage = 'Error en los campos.';
  const [result, setResult] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState('danger');
  const [loading, setLoading] = useState(false);
  const [buttonCaption, setButtonCaption] = useState('Cambiar contraseña');
  const [formValues, setFormValues] = useState({});
  const [formErrorValues, setFormErrorValues] = useState({});

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formValues.password === formValues.confirm_password) {
      setResult('');
      setLoading(true);
      setButtonCaption('');
      setFormErrorValues({});
      try {
        const response = await editUser(getIdUser(), formValues);
        const userData = response.data;
        console.log(userData);
        setResult(successMessage);
        setOpenSnackbar(true);
        setSnackbarColor('success');
        setFormValues(userData);
      } catch (error) {
        if (error.response) {
          setFormErrorValues(error.response.data);
        }
        const errorMessage = error.response
          ? fieldErrorMessage
          : 'Ha ocurrido un error.';
        setResult(errorMessage);
        setOpenSnackbar(true);
        setSnackbarColor('danger');
      } finally {
        setLoading(false);
        setButtonCaption('Cambiar contraseña');
      }
    } else {
      setFormErrorValues({ password: ['Las contraseñas no coinciden.'] });
      setResult(fieldErrorMessage);
      setOpenSnackbar(true);
      setSnackbarColor('danger');
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
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Box
        sx={() => ({
          width: { xs: '100%', md: '100%' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
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
            component="main"
            sx={{
              py: '2rem',
              pb: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              textAlign: 'center',
            }}
          >
            <Typography component="h2" level="h2">
              Cambiar mi contraseña
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack gap={2} sx={{ mt: 4 }}>
                <FormControl
                  required
                  error={formErrorValues.password ? true : false}
                >
                  <FormLabel>Contraseña</FormLabel>
                  <PasswordInput
                    name="password"
                    placeholder="Contraseña"
                    title="Contraseña"
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    {formErrorValues.password
                      ? formErrorValues.password.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  required
                  error={formErrorValues.password ? true : false}
                >
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <PasswordInput
                    name="confirm_password"
                    placeholder="Confirmar contraseña"
                    title="Confirmar contraseña"
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    {formErrorValues.password
                      ? formErrorValues.password.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
              </Stack>
              <Stack gap={4} sx={{ mt: 2 }}>
                <Button
                  color="primary"
                  type="submit"
                  title="Cambiar contraseña"
                  loading={loading}
                  fullWidth
                >
                  {buttonCaption}
                </Button>
                {result}
              </Stack>
            </form>
            <Snackbar
              autoHideDuration={3000}
              color={snackbarColor}
              variant="solid"
              open={openSnackbar}
              onClose={handleCloseSnackbar}
              startDecorator={<InfoIcon />}
            >
              {result}
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default Settings;
