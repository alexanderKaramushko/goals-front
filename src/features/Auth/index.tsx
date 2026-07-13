import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'motion/react';

import styles from './Auth.module.css';

const Auth = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={styles.container}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Button
        onClick={() => {
          const url = new URL(import.meta.env.VITE_GOALS_AUTH_API);

          url.pathname = 'auth/google-oauth/login';

          url.searchParams.append('id', import.meta.env.VITE_APP_ID);

          window.open(url.toString(), '_self', 'noopener noreferrer');
        }}
        size="large"
        startIcon={<GoogleIcon />}
        variant="outlined"
      >
        Войти
      </Button>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          Войдите, чтобы продолжить в&nbsp;
          <Typography color="primary" component="span" variant="body2">
            "{import.meta.env.VITE_APP_TITLE}"
          </Typography>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Auth;

