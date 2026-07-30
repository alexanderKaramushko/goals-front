import { Skeleton, Stack } from '@mui/material';

export const Skeletons = () => (
  <Stack direction="column" spacing={2}>
    <Skeleton
      height={56}
      sx={{ borderRadius: 1, boxShadow: 1 }}
      variant="rectangular"
      width="100%"
    />
    <Skeleton
      height={56}
      sx={{ borderRadius: 1, boxShadow: 1 }}
      variant="rectangular"
      width="100%"
    />
    <Skeleton
      height={56}
      sx={{ borderRadius: 1, boxShadow: 1 }}
      variant="rectangular"
      width="100%"
    />
    <Skeleton
      height={56}
      sx={{ borderRadius: 1, boxShadow: 1 }}
      variant="rectangular"
      width="100%"
    />
  </Stack>
);

