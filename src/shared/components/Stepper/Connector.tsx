import { Grid, StepContext, type StepContextType } from '@mui/material';
import { type FC, useContext } from 'react';

import styles from './styles.module.css';

type ConnectorProps = {
  /**
   * @example ['red', 'linear-gradient(#e66465, #9198e5);']
   */
  colors: string[];
};

export const Connector: FC<ConnectorProps> = ({ colors }) => {
  const stepContext = useContext<StepContextType>(StepContext);

  return (
    <Grid className={styles.simpleConnector} container>
      <Grid
        className={styles.connectorLine}
        sx={{
          background: colors[stepContext.index - 1],
        }}
      ></Grid>
    </Grid>
  );
};

