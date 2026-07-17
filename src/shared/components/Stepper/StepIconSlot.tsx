import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, IconButton, StepIcon as MuiStepIcon, type StepIconProps } from '@mui/material';
import type { FC } from 'react';

import styles from './styles.module.css';

export type StepIconSlotProps = StepIconProps & {
  isComplete?: boolean;
  onDeleteClick?: () => void;
};

export const StepIconSlot: FC<StepIconSlotProps> = ({ isComplete, onDeleteClick, ...props }) => {
  return (
    <Box className={styles.stepIconRoot}>
      {onDeleteClick && (
        <IconButton
          className={styles.deleteButton}
          color="primary"
          onClick={(event) => {
            event.stopPropagation();
            onDeleteClick();
          }}
          size="small"
        >
          <HighlightOffIcon />
        </IconButton>
      )}
      {isComplete ? (
        <CheckCircleIcon
          className={styles.completeIcon}
          sx={{
            fontSize: '48px',
            height: '48px',
            width: '48px',
          }}
        />
      ) : (
        <MuiStepIcon
          {...props}
          active={false}
          className={styles.stepIcon}
          sx={{
            fontSize: '40px',
            height: '40px',
            width: '40px',
          }}
        />
      )}
    </Box>
  );
};

