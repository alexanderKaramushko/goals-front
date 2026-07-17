import { Grid } from '@mui/material';
import type { FC } from 'react';

import styles from './styles.module.css';

export const Connector: FC = () => {
  return (
    <Grid className={styles.simpleConnector} container>
      <Grid className={styles.connectorLine}></Grid>
    </Grid>
  );
};

