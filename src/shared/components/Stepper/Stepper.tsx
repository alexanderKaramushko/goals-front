import {
  Step as MuiStep,
  type StepIconProps,
  StepLabel,
  type StepLabelProps,
  Stepper as MuiStepper,
  type StepperProps as MuiStepperProps,
  type StepProps,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import cn from 'classnames';
import { type CSSProperties, type FC, type MouseEventHandler, type ReactNode } from 'react';

import styles from './styles.module.css';

type CustomStepIconProps = { isCompleted?: boolean; onDeleteClick?: () => void };

type StepperItem = {
  id: string;
  isSelected?: boolean;
  label: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  stepProps?: Omit<StepProps, 'children'>;
  stepLabelProps?: Omit<StepLabelProps, 'children' | 'onClick' | 'slots'>;
  stepIconProps?: Partial<StepIconProps> & CustomStepIconProps;
  StepIcon: (props: StepIconProps & CustomStepIconProps) => ReactNode | Promise<ReactNode>;
};

type StepperProps = Omit<MuiStepperProps, 'children'> & {
  items: StepperItem[];
};

export const Stepper: FC<StepperProps> = ({ className, items, style, sx, ...props }) => {
  const theme = useTheme();

  const stepperStyle: CSSProperties = {
    '--shared-stepper-background-default': theme.palette.background.default,
    '--shared-stepper-complete-color': theme.palette.primary.main,
    '--shared-stepper-connector-color': theme.palette.primary.light,
    '--shared-stepper-glow-color-1': alpha(theme.palette.primary.main, 0.12),
    '--shared-stepper-glow-color-2': alpha(theme.palette.primary.main, 0.22),
    '--shared-stepper-glow-color-3': alpha(theme.palette.primary.light, 0.1),
    '--shared-stepper-icon-color': theme.palette.primary.main,
    ...style,
  } as CSSProperties;

  return (
    <MuiStepper
      alternativeLabel
      className={cn(styles.root, className)}
      style={stepperStyle}
      sx={sx}
      {...props}
    >
      {items.map(
        ({
          id,
          isSelected,
          label,
          onClick,
          StepIcon,
          stepIconProps,
          stepLabelProps,
          stepProps,
        }) => {
          const {
            className: stepLabelClassName,
            sx: stepLabelSx,
            ...restStepLabelProps
          } = stepLabelProps ?? {};

          const { className: stepClassName, sx: stepSx, ...restStepProps } = stepProps ?? {};

          return (
            <MuiStep
              {...restStepProps}
              className={cn(styles.step, stepClassName)}
              key={id}
              sx={stepSx}
            >
              <StepLabel
                {...restStepLabelProps}
                className={cn(
                  styles.stepLabel,
                  isSelected && styles.stepLabelSelected,
                  stepLabelClassName,
                )}
                onClick={onClick}
                slotProps={{
                  stepIcon: stepIconProps,
                }}
                slots={{
                  stepIcon: StepIcon,
                }}
                sx={stepLabelSx}
              >
                {label}
              </StepLabel>
            </MuiStep>
          );
        },
      )}
    </MuiStepper>
  );
};

export type { StepperItem, StepperProps };

