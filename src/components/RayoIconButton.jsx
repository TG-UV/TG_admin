import IconButton from '@mui/joy/IconButton';
import rayoIcon from '../../public/logo.png';

const RayoIconButton = () => {
  <IconButton
    variant="soft"
    color="primary"
    size="lg"
    sx={{ borderRadius: '50%' }}
    title="Rayo"
  >
    <img src={ rayoIcon } alt="Logo" className="logo" />
  </IconButton>;
};

export default RayoIconButton;
