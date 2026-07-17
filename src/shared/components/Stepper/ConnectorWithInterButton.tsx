import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Grid, IconButton, StepContext, Tooltip, type TooltipProps } from '@mui/material';
import { type FC, type ReactNode, useContext } from 'react';

import styles from './styles.module.css';

export type ConnectorWithInterButtonProps = {
  connectorAriaLabel?: string;
  connectorIcon?: ReactNode;
  connectorTooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  connectorTooltipTitle?: ReactNode;
  onConnectorClick?: (index: number) => void;
};

export const ConnectorWithInterButton: FC<ConnectorWithInterButtonProps> = ({
  connectorAriaLabel = 'Добавить шаг',
  connectorIcon = <ControlPointIcon />,
  connectorTooltipProps,
  connectorTooltipTitle = 'Добавить промежуточный шаг',
  onConnectorClick,
}) => {
  const stepContext = useContext(StepContext);

  if (!stepContext || !('index' in stepContext)) {
    return null;
  }

  return (
    <Grid className={styles.connector} container>
      <Grid className={styles.connectorLine}></Grid>
      <Grid>
        <Tooltip title={connectorTooltipTitle} {...connectorTooltipProps}>
          <IconButton
            aria-label={connectorAriaLabel}
            color="primary"
            disabled={!onConnectorClick}
            onClick={() => onConnectorClick?.(stepContext.index)}
          >
            {connectorIcon}
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid className={styles.connectorLine}></Grid>
    </Grid>
  );
};

