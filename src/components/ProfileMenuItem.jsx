import Box from '@mui/joy/Box';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { getIdUser } from '../services/authService';

const ProfileMenuItem = ({ name, email }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/edit/' + getIdUser() + '/');
  };

  return (
    <MenuItem onClick={handleClick} title="Ver perfil">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PersonIcon />
        <Box sx={{ ml: 1.5 }}>
          <Typography level="title-sm" textColor="text.primary">
            {name}
          </Typography>
          <Typography level="body-xs" textColor="text.tertiary">
            {email}
          </Typography>
        </Box>
      </Box>
    </MenuItem>
  );
};

export default ProfileMenuItem;
