import { Box } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Box sx={{ margin: '0 auto', maxWidth: '90%', paddingTop: 4 }}>{children}</Box>;
};

export default AppLayout;

