import { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { me } from '../services/requests';
import Box from '@mui/joy/Box';

const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getData = async () => {
      const meResponse = await me();
      const fullName =
        meResponse.data.first_name + ' ' + meResponse.data.last_name;
      const email = meResponse.data.email;

      setName(fullName);
      setEmail(email);
    };

    getData();
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          padding: '2rem',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
          gap: { xs: '2rem', md: '20rem' },
        }}
      >
        <Typography
          level="h1"
          fontWeight="xl"
          fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        >
          Bienvenido
        </Typography>
        <Box>
          <Typography level="h1" fontWeight="xl" fontSize="2rem">
            {name}
          </Typography>
          <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
            {email}
          </Typography>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default Home;
