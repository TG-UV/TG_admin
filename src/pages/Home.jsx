import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const { name } = location.state || {};

  return (
    <>
      <h1>Bienvenido:</h1>
      <h2>{name}</h2>
    </>
  );
}
export default Home;
