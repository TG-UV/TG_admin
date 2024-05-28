import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import { useState } from 'react';

const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      {...props}
      autoComplete="password"
      endDecorator={
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          title={showPassword ? 'Ocultar' : 'Mostrar'}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      }
    />
  );
};

export default PasswordInput;
