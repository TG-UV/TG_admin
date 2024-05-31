import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuItem from '@mui/joy/MenuItem';
import { removeToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LogoutMenuItem = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <MenuItem onClick={handleLogout} title="Cerrar sesión">
      <LogoutRoundedIcon />
      Cerrar sesión
    </MenuItem>
  );
};

export default LogoutMenuItem;
