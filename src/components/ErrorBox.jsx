/* eslint-disable react/prop-types */
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const ErrorBox = ({ message }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography color="danger" level="body-sm">
      {message}
    </Typography>
  </Box>
);

export default ErrorBox;
