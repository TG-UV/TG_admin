import IconButton from '@mui/joy/IconButton';
import rayoIcon from '/logo.png';
import { Link } from 'react-router-dom';

const RayoIconButton = () => {
  return (
    <IconButton
      component={Link}
      to="/"
      variant="soft"
      color="primary"
      size="lg"
      sx={{ borderRadius: '50%' }}
      title="Rayo"
    >
      <img src={rayoIcon} alt="Logo" className="logo" />
    </IconButton>
  );
};

export default RayoIconButton;
