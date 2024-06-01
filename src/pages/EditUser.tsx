import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getUser, editUser } from '../services/requests';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import '../index.css';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AxiosResponse } from 'axios';
import MessageBox from '../components/MessageBox';

interface FormElements extends HTMLFormControlsCollection {
  id_user: HTMLInputElement;
  email: HTMLInputElement;
  first_name: HTMLInputElement;
  last_name: HTMLInputElement;
  identity_document: HTMLInputElement;
  phone_number: HTMLInputElement;
  date_of_birth: HTMLInputElement;
  is_active: HTMLInputElement;
  last_login: HTMLInputElement;
  registration_date: HTMLInputElement;
  residence_city: HTMLInputElement;
  type: HTMLInputElement;
}
interface EditUserFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const EditUser = () => {
  const { id_user } = useParams();
  const errorMessage = 'No se encontró un usuario con ese id';
  const [result, setResult] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [buttonCaption, setButtonCaption] = React.useState('Guardar');
  const [errorAlert, setErrorAlert] = React.useState(<></>);
  const cleanValues = {
    id_user: '',
    email: '',
    first_name: '',
    last_name: '',
    identity_document: '',
    phone_number: '',
    date_of_birth: '',
    is_active: true,
    last_login: '',
    registration_date: '',
    residence_city: 1,
    type: 1,
  };
  const [formValues, setFormValues] = React.useState(cleanValues);

  React.useEffect(() => {
    setResult('');
    setFormValues(cleanValues);

    const getData = async () => {
      try {
        const response = await getUser(id_user);
        const userData = response.data;
        setFormValues({
          id_user: userData.id_user,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          identity_document: userData.identity_document,
          phone_number: userData.phone_number,
          date_of_birth: userData.date_of_birth,
          is_active: userData.is_active,
          last_login: userData.last_login,
          registration_date: userData.registration_date,
          residence_city: userData.residence_city,
          type: userData.type,
        });
      } catch (error) {
        setResult(errorMessage);
      }
    };

    getData();
  }, [id_user, errorMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<EditUserFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    setLoading(true);
    setButtonCaption('');
    setErrorAlert(<></>);
    console.log(formValues);

    try {
      const response: AxiosResponse = await editUser(id_user, formValues);
      const userData = response.data;
      setResult('Usuario editado correctamente');
      setFormValues({
        id_user: userData.id_user,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        identity_document: userData.identity_document,
        phone_number: userData.phone_number,
        date_of_birth: userData.date_of_birth,
        is_active: userData.is_active,
        last_login: userData.last_login,
        registration_date: userData.registration_date,
        residence_city: userData.residence_city,
        type: userData.type,
      });
    } catch (error) {
      console.log(error);
      const errorMessage = 'Ha ocurrido un error';
      setErrorAlert(<MessageBox color="danger" message={errorMessage} />);
    } finally {
      setLoading(false);
      setButtonCaption('Guardar');
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
      <Layout.Root
        sx={{
          ...{ height: '100vh', overflow: 'hidden', overflowY: 'auto' },
        }}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.Main>
          <Box
            sx={() => ({
              width: { xs: '100%', md: '100vw' },
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
                  py: 0,
                  pb: 0,
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
                  Editar usuario
                </Typography>
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
                        value={formValues.id_user}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Correo</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Correo"
                        title="Correo"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        type="text"
                        name="first_name"
                        placeholder="Nombre"
                        title="Nombre"
                        value={formValues.first_name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Apellido</FormLabel>
                      <Input
                        type="text"
                        name="last_name"
                        placeholder="Apellido"
                        title="Apellido"
                        value={formValues.last_name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Documento de identidad</FormLabel>
                      <Input
                        type="number"
                        name="identity_document"
                        placeholder="Documento de identidad"
                        title="Documento de identidad"
                        value={formValues.identity_document}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Celular</FormLabel>
                      <Input
                        type="number"
                        name="phone_number"
                        placeholder="Celular"
                        title="Celular"
                        value={formValues.phone_number}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Fecha de nacimiento</FormLabel>
                      <Input
                        type="date"
                        name="date_of_birth"
                        placeholder="Fecha de nacimiento"
                        title="Fecha de nacimiento"
                        value={formValues.date_of_birth}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Estado</FormLabel>
                      <Select
                        value={formValues.is_active ? 'true' : 'false'}
                        name="is_active"
                        placeholder="Estado"
                        title="Estado"
                        onChange={handleChange}
                      >
                        <Option value="true">Activo</Option>
                        <Option value="false">Inactivo</Option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Último inicio de sesión</FormLabel>
                      <Input
                        disabled
                        type="text"
                        name="last_login"
                        placeholder="Último inicio de sesión"
                        title="Último inicio de sesión"
                        value={formValues.last_login}
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
                        value={formValues.registration_date}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Tipo de usuario</FormLabel>
                      <Input
                        disabled
                        type="text"
                        name="registration_date"
                        placeholder="Tipo de usuario"
                        title="Tipo de usuario"
                        value={
                          formValues.type === 1
                            ? 'Admin'
                            : formValues.type === 2
                            ? 'Conductor'
                            : 'Pasajero'
                        }
                      />
                    </FormControl>
                  </Stack>
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      title="Guardar"
                      loading={loading}
                      fullWidth
                    >
                      {buttonCaption}
                    </Button>
                    {errorAlert}
                  </Stack>
                </form>
                <Typography level="body-md" style={{ whiteSpace: 'pre-line' }}>
                  {result}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
};

export default EditUser;
