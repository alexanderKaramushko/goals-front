import { useMediaQuery } from '@mui/material';

export const useAdaptive = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('laptop'));

  return { isMobile };
};
