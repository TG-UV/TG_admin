import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home name={'admin'} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
