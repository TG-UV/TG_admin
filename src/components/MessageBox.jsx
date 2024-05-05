import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const MessageBox = ({ color, message }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography color={color} level="body-sm">
      {message}
    </Typography>
  </Box>
);

export default MessageBox;
