import { Grid, Typography } from '@mui/material';
import { motion } from 'motion/react';

import MelkorDivider from 'shared/icons/melkor-divider-symbol.svg?react';
import { useAdaptive } from 'shared/utils';

import Auth from 'features/Auth';

import styles from './styles.module.css';

const AuthPage = () => {
  const isMobile = useAdaptive();

  return (
    <div className={styles.root}>
      <Grid container spacing={4} sx={{ alignItems: 'center', flexDirection: 'column' }}>
        <Grid>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <MelkorDivider />
            <Typography component="h2" variant={isMobile ? 'h4' : 'h3'}>
              {import.meta.env.VITE_APP_TITLE}
            </Typography>
          </motion.div>
        </Grid>
        <Grid>
          <Auth />
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthPage;
