import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';

type AppBarProfileProps = {
  loading: boolean;
  name?: string;
};

export const AppBarProfile: FC<AppBarProfileProps> = ({ loading, name }) => {
  const letters = name
    ?.trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('');

  return (
    <IconButton sx={{ p: 0 }}>
      {loading ? (
        <Skeleton height={40} variant="circular" width={40} />
      ) : (
        <Avatar>{letters}</Avatar>
      )}
    </IconButton>
  );
};
