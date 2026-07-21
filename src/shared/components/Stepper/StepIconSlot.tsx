import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, IconButton, StepIcon as MuiStepIcon, type StepIconProps } from '@mui/material';
import cn from 'classnames';
import type { FC } from 'react';

import styles from './styles.module.css';

export type StepIconSlotProps = StepIconProps & {
  /**
   * Если не передан, то определения состояния завершенности берется из StepIconProps['completed']
   */
  isCompleted?: boolean;
  onDeleteClick?: () => void;
};

export const StepIcon: FC<StepIconSlotProps> = ({ isCompleted, onDeleteClick, ...props }) => {
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
      {isCompleted ? (
        <CheckCircleIcon
          className={cn(styles.completeIcon, { [styles.active]: props.active })}
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
          className={cn(styles.stepIcon, { [styles.active]: props.active })}
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

