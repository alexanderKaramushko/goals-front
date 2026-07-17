import { Box } from '@mui/material';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <Box sx={{ margin: '0 auto', maxWidth: '90%', pb: 4, pt: '120px' }}>
      <Outlet />
    </Box>
  );
};

export default AppLayout;

