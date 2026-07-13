import { Typography } from '@mui/material';
import { motion } from 'motion/react';

import { Background } from 'shared/components';

import Auth from 'features/Auth';

import styles from './Auth.module.css';

const AuthPage = () => {
  return (
    <Background>
      <div className={styles.root}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3">{import.meta.env.VITE_APP_TITLE}</Typography>
          </motion.div>
          <Auth />
        </div>
      </div>
    </Background>
  );
};

export default AuthPage;
