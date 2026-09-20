import { Box, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';

import { useGetUserProfile } from 'entities/api';

type AppBarProfileProps = {
  compact?: boolean;
};

export const AppBarProfile: FC<AppBarProfileProps> = ({ compact = true }) => {
  const profile = useGetUserProfile();

  const letters = profile.data?.name
    ?.trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('');

  if (profile.loading) {
    if (compact) {
      return (
        <Box sx={{ p: 2 }}>
          <Skeleton height={40} variant="circular" width={40} />
        </Box>
      );
    } else {
      return (
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1, p: 2 }}>
          <Skeleton height={40} variant="circular" width={40} />
          <Skeleton height={22} variant="rectangular" width={111} />
        </Stack>
      );
    }
  }

  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 1, p: 2 }}>
      <IconButton sx={{ p: 0 }}>
        {profile.loading ? (
          <Skeleton height={40} variant="circular" width={40} />
        ) : (
          <>
            <Avatar>{compact && letters}</Avatar>
          </>
        )}
      </IconButton>
      {!compact && (
        <Typography noWrap sx={{ mt: 1 }} variant="subtitle2">
          {profile.data?.name}
        </Typography>
      )}
    </Stack>
  );
};
