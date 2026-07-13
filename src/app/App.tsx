import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';

import { Background } from 'shared/components/Background/Background';
import { goalsServiceApiClient } from 'shared/libs/api-client';

import Auth from '../pages/auth';
import styles from './App.module.css';

function App() {
  const okResult = useQuery({
    queryFn: () => goalsServiceApiClient.get('app/health'),
    queryKey: ['health'],
    retry: 0,
  });

  return (
    <Background>
      <div className={styles.root}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h3">{import.meta.env.VITE_APP_TITLE}</Typography>
          </motion.div>
          <Auth />
          <Typography variant="body1">{okResult.isSuccess && okResult.data.data}</Typography>
        </div>
      </div>
    </Background>
  );
}

export default App;
