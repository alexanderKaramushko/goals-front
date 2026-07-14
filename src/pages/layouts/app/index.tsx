import { Box } from '@mui/material';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <Box sx={{ margin: '78px auto', maxWidth: '90%', paddingTop: 4 }}>
      <Outlet />
    </Box>
  );
};

export default AppLayout;

