import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import RayoIconButton from '../components/RayoIconButton';
import ColorSchemeToggle from '../components/ColorSchemeToggle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutMenuItem from './LogoutMenuItem';
import ProfileMenuItem from './ProfileMenuItem';
import { useNavigate } from 'react-router-dom';
import { me } from '../services/requests';

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [searchParam, setSearchParam] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
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

  const handleChange = (event) => {
    setSearchParam(event.target.value);
  };

  const search = () => {
    if (searchParam !== '') {
      navigate('/edit/' + searchParam);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <RayoIconButton />
        <Button
          variant="plain"
          color="neutral"
          component="a"
          aria-pressed="true"
          href="#"
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          Usuarios
        </Button>
        <Button
          variant="plain"
          color="success"
          component="a"
          aria-pressed="true"
          href="/add"
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          + Añadir
        </Button>
      </Stack>
      <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
        </Drawer>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <Input
          size="sm"
          value={searchParam}
          onChange={handleChange}
          variant="outlined"
          placeholder="Buscar usuario por id…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              onClick={search}
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: 'background.level1' }}
            >
              <Typography level="title-sm" textColor="text.icon">
                Buscar
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: 'center',
            display: { xs: 'none', sm: 'flex' },
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
            alignSelf: 'center',
          }}
        >
          <SearchRoundedIcon />
        </IconButton>
        <ColorSchemeToggle />
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: '32px',
              maxHeight: '32px',
              borderRadius: '9999999px',
            }}
          >
            <PersonIcon />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: '99999',
              p: 1,
              gap: 1,
              '--ListItem-radius': 'var(--joy-radius-sm)',
            }}
          >
            <ProfileMenuItem name={name} email={email} />
            <MenuItem
              title="Ir al sitio"
              onClick={() => {
                window.open('https://uv-tg-backend.vercel.app/admin', '_blank');
              }}
            >
              <LaunchIcon />
              Más funciones
            </MenuItem>
            <ListDivider />
            <LogoutMenuItem />
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
};

export default Header;
