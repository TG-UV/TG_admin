import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PlaceIcon from '@mui/icons-material/Place';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { useLocation } from 'react-router-dom';

function Home() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();
  const { name, email } = location.state || {};

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Stack
        id="tab-bar"
        direction="row"
        justifyContent="space-around"
        spacing={1}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="#"
          size="sm"
          startDecorator={<GroupIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Usuarios
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="#"
          size="sm"
          startDecorator={<DirectionsCarIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Vehículos
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="#"
          size="sm"
          startDecorator={<PlaceIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Ciudades
        </Button>
      </Stack>
      <Layout.Root
        sx={{
          ...(drawerOpen && { height: '100vh', overflow: 'hidden' }),
        }}
      >
        <Layout.Header>
          <Header name={name} email={email} />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
      </Layout.Root>
    </CssVarsProvider>
  );
}

export default Home;
