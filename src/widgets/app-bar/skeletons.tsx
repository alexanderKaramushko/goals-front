import { Skeleton, Stack } from '@mui/material';

export const TabsSkeletonDesktop = () => (
  <Stack direction="row" spacing={4} sx={{ display: { md: 'flex', sx: 'none' }, ml: '48px' }}>
    <Skeleton height={24} variant="rectangular" width={58} />
    <Skeleton height={24} variant="rectangular" width={114} />
  </Stack>
);

export const AvatarSkeleton = () => <Skeleton height={40} variant="circular" width={40} />;

