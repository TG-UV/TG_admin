import BadgeIcon from '@mui/icons-material/Badge';
import MenuItem from '@mui/joy/MenuItem';
import { useNavigate } from 'react-router-dom';
import { getIdUser } from '../services/authService';

const ProfileMenuItem = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate('/edit/' + getIdUser() + '/');
  };

  return (
    <MenuItem onClick={handleClick} title="Ver perfil">
      <BadgeIcon />
      Perfil
    </MenuItem>
  );
};

export default ProfileMenuItem;
