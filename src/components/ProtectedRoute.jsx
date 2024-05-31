import { Navigate } from 'react-router-dom';
import { getToken } from '../services/authService';

const ProtectedRoute = ({ component: Component }) => {
  return getToken() ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
