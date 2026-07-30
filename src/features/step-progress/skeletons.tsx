import { Skeleton } from '@mui/material';
import { nanoid } from 'nanoid';

// eslint-disable-next-line react-refresh/only-export-components
const StepSkeleton = () => <Skeleton height={40} variant="circular" width={40} />;

export const skeletons = [
  {
    id: nanoid(),
    label: (
      <Skeleton height={20} sx={{ display: 'inline-block' }} variant="rectangular" width={80} />
    ),
    StepIcon: StepSkeleton,
  },
  {
    id: nanoid(),
    label: (
      <Skeleton height={20} sx={{ display: 'inline-block' }} variant="rectangular" width={80} />
    ),
    StepIcon: StepSkeleton,
  },
  {
    id: nanoid(),
    label: (
      <Skeleton height={20} sx={{ display: 'inline-block' }} variant="rectangular" width={80} />
    ),
    StepIcon: StepSkeleton,
  },
  {
    id: nanoid(),
    label: (
      <Skeleton height={20} sx={{ display: 'inline-block' }} variant="rectangular" width={80} />
    ),
    StepIcon: StepSkeleton,
  },
];

