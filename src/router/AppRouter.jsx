import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActivateAccount from '../pages/ActivateAccount';
import ResetPassword from '../pages/ResetPassword';
import Home from '../pages/Home';
import EditUser from '../pages/EditUser';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/edit/:id_user" element={<ProtectedRoute component={EditUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/rayo-activate/:id_user/:token"
          element={<ActivateAccount />}
        />
        <Route
          path="/rayo-password-reset/:id_user/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
