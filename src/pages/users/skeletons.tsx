import { Skeleton, Stack } from '@mui/material';

export const Skeletons = () => (
  <Stack direction="column" spacing={2}>
    <Skeleton
      height={100}
      sx={{ borderRadius: 4, boxShadow: 1 }}
      variant="rectangular"
      width="100%"
    />
    <Skeleton
      height={100}
      sx={{ borderRadius: 4, boxShadow: 1 }}
      variant="rectangular"
      width="100%"
    />
    <Skeleton
      height={100}
      sx={{ borderRadius: 4, boxShadow: 1 }}
      variant="rectangular"
      width="100%"
    />
  </Stack>
);

