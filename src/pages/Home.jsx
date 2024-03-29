/* eslint-disable react/prop-types */
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const { name } = location.state || {};

  return (
    <>
      <h1>{name}</h1>
    </>
  );
}
export default Home;
