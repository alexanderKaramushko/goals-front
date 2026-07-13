import { Button } from '@mui/material';
import { motion } from 'motion/react';

const Auth = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Button
        size="large"
        onClick={() => {
          const url = new URL(import.meta.env.VITE_GOALS_AUTH_API);

          url.pathname = 'auth/google-oauth/login';

          url.searchParams.append('id', import.meta.env.VITE_APP_ID);

          window.open(url.toString(), '_self', 'noopener noreferrer');
        }}
      >
        Войти
      </Button>
    </motion.div>
  );
};

export default Auth;

