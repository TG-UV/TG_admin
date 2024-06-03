import { useState, useEffect } from 'react';
import { addUser, registration } from '../services/requests';
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
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Snackbar from '@mui/joy/Snackbar';
import InfoIcon from '@mui/icons-material/Info';
import PasswordInput from '../components/PasswordInput';

const AddUser = () => {
  const successMessage = 'Usuario añadido correctamente.';
  const fieldErrorMessage = 'Error en los campos.';
  const [result, setResult] = useState('');
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState('danger');
  const [loading, setLoading] = useState(false);
  const [buttonCaption, setButtonCaption] = useState('Añadir usuario');
  const [cities, setCities] = useState({});
  const [formValues, setFormValues] = useState({});
  const [formErrorValues, setFormErrorValues] = useState({});
  const userTypes = {
    1: 'Admin',
    2: 'Conductor',
    3: 'Pasajero',
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOnClick = () => {
    setSuccess(false);
    setResult('');
    setFormValues({});
  };

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (newValue, name) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue ?? '',
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
        const response = await addUser(formValues);
        const userData = response.data;
        console.log(userData);
        setResult(successMessage);
        setOpenSnackbar(true);
        setSnackbarColor('success');
        setFormValues(userData);
        setSuccess(true);
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
        setSuccess(false);
      } finally {
        setLoading(false);
        setButtonCaption('Añadir usuario');
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
              Añadir usuario
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack gap={2} sx={{ mt: 4 }}>
                {success ? (
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
                ) : (
                  <></>
                )}
                <FormControl
                  required
                  error={formErrorValues.email ? true : false}
                >
                  <FormLabel>Correo</FormLabel>
                  <Input
                    disabled={success ? true : false}
                    type="email"
                    name="email"
                    placeholder="Correo"
                    title="Correo"
                    value={formValues.email ?? ''}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    {formErrorValues.email
                      ? formErrorValues.email.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  required
                  error={formErrorValues.first_name ? true : false}
                >
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    disabled={success ? true : false}
                    type="text"
                    name="first_name"
                    placeholder="Nombre"
                    title="Nombre"
                    value={formValues.first_name ?? ''}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    {formErrorValues.first_name
                      ? formErrorValues.first_name.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  required
                  error={formErrorValues.last_name ? true : false}
                >
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    disabled={success ? true : false}
                    type="text"
                    name="last_name"
                    placeholder="Apellido"
                    title="Apellido"
                    value={formValues.last_name ?? ''}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    {formErrorValues.last_name
                      ? formErrorValues.last_name.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  required
                  error={formErrorValues.identity_document ? true : false}
                >
                  <FormLabel>Documento de identidad</FormLabel>
                  <Input
                    disabled={success ? true : false}
                    type="number"
                    name="identity_document"
                    placeholder="Documento de identidad"
                    title="Documento de identidad"
                    value={formValues.identity_document ?? ''}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    {formErrorValues.identity_document
                      ? formErrorValues.identity_document.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  required
                  error={formErrorValues.phone_number ? true : false}
                >
                  <FormLabel>Celular</FormLabel>
                  <Input
                    disabled={success ? true : false}
                    type="number"
                    name="phone_number"
                    placeholder="Celular"
                    title="Celular"
                    value={formValues.phone_number ?? ''}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    {formErrorValues.phone_number
                      ? formErrorValues.phone_number.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  required
                  error={formErrorValues.date_of_birth ? true : false}
                >
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <Input
                    disabled={success ? true : false}
                    type="date"
                    name="date_of_birth"
                    placeholder="Fecha de nacimiento"
                    title="Fecha de nacimiento"
                    value={formValues.date_of_birth ?? ''}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    {formErrorValues.date_of_birth
                      ? formErrorValues.date_of_birth.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl error={formErrorValues.is_active ? true : false}>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    disabled={success ? true : false}
                    placeholder={
                      formValues.is_active === undefined
                        ? 'Estado'
                        : formValues.is_active
                        ? 'Activo'
                        : 'Inactivo'
                    }
                    name="is_active"
                    title="Estado"
                    onChange={(e, newValue) => {
                      handleSelectChange(newValue, 'is_active');
                    }}
                  >
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option>
                  </Select>
                  <FormHelperText>
                    {formErrorValues.is_active
                      ? formErrorValues.is_active.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  required
                  error={formErrorValues.type ? true : false}
                >
                  <FormLabel>Tipo de usuario</FormLabel>
                  <Select
                    disabled={success ? true : false}
                    placeholder={
                      formValues.type === undefined
                        ? 'Tipo de usuario'
                        : userTypes[formValues.type]
                    }
                    name="type"
                    title="Tipo de usuario"
                    onChange={(e, newValue) => {
                      handleSelectChange(newValue, 'type');
                    }}
                  >
                    <Option value={1}>Admin</Option>
                    <Option value={2}>Conductor</Option>
                    <Option value={3}>Pasajero</Option>
                  </Select>
                  <FormHelperText>
                    {formErrorValues.type ? formErrorValues.type.join(' ') : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  required
                  error={formErrorValues.residence_city ? true : false}
                >
                  <FormLabel>Ciudad de residencia</FormLabel>
                  <Select
                    disabled={success ? true : false}
                    placeholder={
                      formValues.residence_city === undefined
                        ? 'Ciudad de residencia'
                        : cities[formValues.residence_city]
                    }
                    name="residence_city"
                    title="Ciudad de residencia"
                    onChange={(e, newValue) => {
                      handleSelectChange(newValue, 'residence_city');
                    }}
                  >
                    {Object.keys(cities).map((key) => (
                      <Option value={key} key={key}>
                        {cities[key]}
                      </Option>
                    ))}
                  </Select>
                  <FormHelperText>
                    {formErrorValues.residence_city
                      ? formErrorValues.residence_city.join(' ')
                      : ''}
                  </FormHelperText>
                </FormControl>
                {!success ? (
                  <>
                    <FormControl
                      required
                      error={formErrorValues.password ? true : false}
                    >
                      <FormLabel>Contraseña</FormLabel>
                      <PasswordInput
                        name="password"
                        placeholder="Contraseña"
                        title="Contraseña"
                        value={formValues.password ?? ''}
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
                        value={formValues.confirm_password ?? ''}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {formErrorValues.password
                          ? formErrorValues.password.join(' ')
                          : ''}
                      </FormHelperText>
                    </FormControl>
                  </>
                ) : (
                  <></>
                )}
                {success ? (
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
                ) : (
                  <></>
                )}
              </Stack>
              <Stack gap={4} sx={{ mt: 2 }}>
                {!success ? (
                  <Button
                    color="primary"
                    type="submit"
                    title="Añadir usuario"
                    loading={loading}
                    fullWidth
                  >
                    {buttonCaption}
                  </Button>
                ) : (
                  <Button
                    onClick={handleOnClick}
                    color="success"
                    title="Añadir otro usuario"
                    fullWidth
                  >
                    Añadir otro usuario
                  </Button>
                )}
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

export default AddUser;
