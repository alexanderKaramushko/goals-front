import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { goalsServiceApiClient } from 'shared/libs/api-client';

import './App.css';

import Auth from './pages/auth';

function App() {
  const okResult = useQuery({
    queryFn: () => goalsServiceApiClient.get('app/health'),
    queryKey: ['health'],
    retry: 0,
  });

  return (
    <>
      <Typography variant='h1'>{import.meta.env.VITE_APP_TITLE}</Typography>
      <Auth />
      <Typography variant='body1'>
        {okResult.isSuccess && okResult.data.data}
      </Typography>
    </>
  );
}

export default App;
