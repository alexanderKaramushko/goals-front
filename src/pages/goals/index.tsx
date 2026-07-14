import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Button, Grid, Typography } from '@mui/material';

import { Background } from 'shared/components';

import AppLayout from 'pages/layouts/app';

import styles from './styles.module.css';

const GoalsPage = () => {
  return (
    <Background>
      <AppLayout>
        <div className={styles.root}>
          <Grid
            container
            spacing={4}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Grid>
              <Typography color="primary" variant="h4">
                Цели
              </Typography>
              <Typography color="text.primary" variant="body1">
                Планируйте, отслеживайте прогресс и достигайте результатов
              </Typography>
            </Grid>
            <Grid>
              <Button startIcon={<ControlPointIcon />} variant="contained">
                Создать цель
              </Button>
            </Grid>
          </Grid>
        </div>
      </AppLayout>
    </Background>
  );
};

export default GoalsPage;

