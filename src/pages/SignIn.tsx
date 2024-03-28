import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import '../index.css';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      title="Modo claro/Modo oscuro"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...other}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

function getImage(urls: string[]): string {
  const index: number = Math.floor(Math.random() * urls.length);
  return urls[index];
}

const lightImagesUrls: string[] = [
  'https://images.unsplash.com/photo-1515256722043-0f2b082ddadc?q=80&w=1451&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=1374&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520052205864-92d242b3a76b?q=80&w=1469&auto=format&fit=crop',
];

const darkImagesUrls: string[] = [
  'https://images.unsplash.com/photo-1492573637402-25691cd9eac2?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560324212-d10118dbd8cc?q=80&w=1527&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1546964372-c96876b9dc95?q=80&w=1471&auto=format&fit=crop',
];

export default function JoySignInSideTemplate() {
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
          width: { xs: '100%', md: '50vw' },
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
              sx={{ mb: 2, alignItems: 'center', justifyContent: 'center' }}
            >
              <IconButton
                variant="soft"
                color="primary"
                size="lg"
                sx={{ borderRadius: '50%' }}
                title="Rayo"
              >
                <img src="/logo.png" alt="Logo" className="logo" />
              </IconButton>
              <Typography component="h1" level="h1">
                Iniciar sesión
              </Typography>
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form
                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    email: formElements.email.value,
                    password: formElements.password.value,
                  };
                  alert(JSON.stringify(data, null, 2));
                }}
              >
                <FormControl required>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    title="Correo"
                    autoComplete="email"
                  />
                </FormControl>
                <FormControl required>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    title="Contraseña"
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Link level="title-sm" href="#">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </Box>
                  <Button type="submit" title="Iniciar sesión" fullWidth>
                    Iniciar sesión
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © {new Date().getFullYear()} · Rayo
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${getImage(lightImagesUrls)})`,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage: `url(${getImage(darkImagesUrls)})`,
          },
        })}
      />
    </CssVarsProvider>
  );
}
