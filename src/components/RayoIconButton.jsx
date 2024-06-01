import IconButton from '@mui/joy/IconButton';
import rayoIcon from '/logo.png';
import { useNavigate } from 'react-router-dom';

const RayoIconButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <IconButton
      onClick={handleClick}
      variant="soft"
      color="danger"
      size="lg"
      sx={{ borderRadius: '50%' }}
      title="Rayo"
    >
      <img src={rayoIcon} alt="Logo" className="logo" />
    </IconButton>
  );
};

export default RayoIconButton;
