import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3 }}>
      <Typography level="body-xs" textAlign="center">
        © {new Date().getFullYear()} · Rayo
      </Typography>
    </Box>
  );
};

export default Footer;
