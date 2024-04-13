import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActivateAccount from '../pages/ActivateAccount';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home name={'admin'} />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/rayo-activate/:id_user/:token"
          element={<ActivateAccount />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
