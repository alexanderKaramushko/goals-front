import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import styles from './App.module.css';
import { Background } from './Background';
import Auth from './pages/auth';

function App() {
  const okResult = useQuery({
    queryFn: () => goalsServiceApiClient.get('app/health'),
    queryKey: ['health'],
    retry: 0,
  });

  return (
    <>
      <Background>
        <div className={styles.root}>
          <div className={styles.content}>
            <Typography variant='h4'>{import.meta.env.VITE_APP_TITLE}</Typography>
            <Auth />
            <Typography variant='body1'>
              {okResult.isSuccess && okResult.data.data}
            </Typography>
          </div>
        </div>
      </Background>
    </>
  );
}

export default App;
