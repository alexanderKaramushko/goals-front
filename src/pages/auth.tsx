import { Button } from '@mui/material';

const Auth = () => {
  return <>
    <Button size='large' onClick={() => {
      const url = new URL(import.meta.env.VITE_GOALS_AUTH_API);

      url.pathname = 'auth/google-oauth/login';

      url.searchParams.append('id', import.meta.env.VITE_APP_ID);

      window.open(url.toString(), '_self', 'noopener noreferrer');
    }}>Войти</Button>
  </>;
};
 
export default Auth;