import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Layout from '../components/Layout';
import Header from '../components/Header';

const Home = () => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Layout.Root>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.Main>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
};

export default Home;
