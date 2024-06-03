import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, deleteUser, registration } from '../services/requests';
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
import Input from '@mui/joy/Input';
import Snackbar from '@mui/joy/Snackbar';
import InfoIcon from '@mui/icons-material/Info';
import GridOnIcon from '@mui/icons-material/GridOn';
import MessageBox from '../components/MessageBox';

const DeleteUser = () => {
  const { id_user } = useParams();
  const errorMessage = 'No se encontró un usuario con el id ingresado.';
  const successMessage = 'Usuario eliminado correctamente.';
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState('danger');
  const [loading, setLoading] = useState(false);
  const [buttonCaption, setButtonCaption] = useState('Eliminar usuario');
  const [cities, setCities] = useState({});
  const [formValues, setFormValues] = useState({});
  const userTypes = {
    1: 'Admin',
    2: 'Conductor',
    3: 'Pasajero',
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Datos del usuario.
  useEffect(() => {
    setResult('');
    setFormValues({});

    const getUserData = async () => {
      try {
        const response = await getUser(id_user);
        const userData = response.data;
        setFormValues(userData);
      } catch (error) {
        setResult(errorMessage);
        setSnackbarColor('danger');
        setOpenSnackbar(true);
      }
    };

    getUserData();
  }, [id_user, errorMessage]);

  // Datos para el formulario.
  useEffect(() => {
    const getRegistrationData = async () => {
      try {
        const response = await registration();
        const citiesObject = response.data.reduce((obj, city) => {
          obj[city.id_city] = city.name;
          return obj;
        }, {});

        setCities(citiesObject);
      } catch (error) {
        setCities({});
      }
    };

    getRegistrationData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult('');
    setLoading(true);
    setButtonCaption('');

    try {
      await deleteUser(id_user);
      setResult(successMessage);
      setOpenSnackbar(true);
      setSnackbarColor('success');
      setSuccess(true);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.detail
        : 'Ha ocurrido un error. Intente nuevamente.';
      setResult(errorMessage);
      setOpenSnackbar(true);
      setSnackbarColor('danger');
      setButtonCaption('Eliminar usuario');
      setSuccess(false);
    } finally {
      setLoading(false);
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
              Eliminar usuario
            </Typography>
            {!success ? (
              <form onSubmit={handleSubmit}>
                <Stack gap={2} sx={{ mt: 4 }}>
                  <FormControl>
                    <FormLabel>Id</FormLabel>
                    <Input
                      disabled
                      type="text"
                      name="id_user"
                      placeholder="Id"
                      title="Id"
                      value={formValues.id_user ?? ''}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Correo</FormLabel>
                    <Input
                      disabled
                      type="email"
                      name="email"
                      placeholder="Correo"
                      title="Correo"
                      value={formValues.email ?? ''}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      disabled
                      type="text"
                      name="first_name"
                      placeholder="Nombre"
                      title="Nombre"
                      value={formValues.first_name ?? ''}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Apellido</FormLabel>
                    <Input
                      disabled
                      type="text"
                      name="last_name"
                      placeholder="Apellido"
                      title="Apellido"
                      value={formValues.last_name ?? ''}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Documento de identidad</FormLabel>
                    <Input
                      disabled
                      type="number"
                      name="identity_document"
                      placeholder="Documento de identidad"
                      title="Documento de identidad"
                      value={formValues.identity_document ?? ''}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Celular</FormLabel>
                    <Input
                      disabled
                      type="number"
                      name="phone_number"
                      placeholder="Celular"
                      title="Celular"
                      value={formValues.phone_number ?? ''}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <Input
                      disabled
                      type="date"
                      name="date_of_birth"
                      placeholder="Fecha de nacimiento"
                      title="Fecha de nacimiento"
                      value={formValues.date_of_birth ?? ''}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Input
                      disabled
                      type="text"
                      value={
                        formValues.is_active === undefined
                          ? 'Estado'
                          : formValues.is_active
                          ? 'Activo'
                          : 'Inactivo'
                      }
                      name="is_active"
                      title="Estado"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tipo de usuario</FormLabel>
                    <Input
                      disabled
                      type="text"
                      value={
                        formValues.type === undefined
                          ? 'Tipo de usuario'
                          : userTypes[formValues.type]
                      }
                      name="type"
                      title="Tipo de usuario"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Ciudad de residencia</FormLabel>
                    <Input
                      disabled
                      type="text"
                      value={
                        formValues.residence_city === undefined
                          ? 'Ciudad de residencia'
                          : cities[formValues.residence_city]
                      }
                      name="residence_city"
                      title="Ciudad de residencia"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Último inicio de sesión</FormLabel>
                    <Input
                      disabled
                      type="text"
                      name="last_login"
                      placeholder="Último inicio de sesión"
                      title="Último inicio de sesión"
                      value={formValues.last_login ?? ''}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Fecha de registro</FormLabel>
                    <Input
                      disabled
                      type="text"
                      name="registration_date"
                      placeholder="Fecha de registro"
                      title="Fecha de registro"
                      value={formValues.registration_date ?? ''}
                    />
                  </FormControl>
                </Stack>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button
                    color="danger"
                    type="submit"
                    title="Eliminar usuario"
                    loading={loading}
                    fullWidth
                  >
                    {buttonCaption}
                  </Button>
                  <MessageBox
                    color="danger"
                    message="Está acción no se puede deshacer."
                  />
                  {result}
                </Stack>
              </form>
            ) : (
              <Box sx={{ mt: '10rem' }}>
                <Button
                  fullWidth
                  variant="plain"
                  color="neutral"
                  component="a"
                  aria-pressed="true"
                  href="/list"
                  startDecorator={<GridOnIcon />}
                >
                  Ir a ver usuarios
                </Button>
              </Box>
            )}
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

export default DeleteUser;
