import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listUsers, registration } from '../services/requests';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Snackbar from '@mui/joy/Snackbar';
import InfoIcon from '@mui/icons-material/Info';
import UsersTable from '../components/UsersTable';

const ListUsers = () => {
  const { page } = useParams();
  const errorMessage = 'Ha ocurrido un error. Recargue la página.';
  const [result, setResult] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState('danger');
  const [showTable, setShowTable] = useState(<></>);
  const [cities, setCities] = useState({});
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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

  useEffect(() => {
    const userTypes = {
      1: 'Admin',
      2: 'Conductor',
      3: 'Pasajero',
    };

    setResult('');

    const getUsers = async () => {
      try {
        const response = await listUsers(page);
        setShowTable(
          <UsersTable
            rows={response.data.results}
            userTypes={userTypes}
            cities={cities}
            count={response.data.count}
            next={response.data.next}
            previous={response.data.previous}
            actual={page}
          />
        );
      } catch (error) {
        setResult(errorMessage);
        setSnackbarColor('danger');
        setOpenSnackbar(true);
      }
    };

    getUsers();
  }, [page, errorMessage, cities]);

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
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '86dvh',
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography level="h2" component="h1">
            Usuarios
          </Typography>
        </Box>
        {showTable}
      </Box>
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
    </CssVarsProvider>
  );
};

export default ListUsers;
