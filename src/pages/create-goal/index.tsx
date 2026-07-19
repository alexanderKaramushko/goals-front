import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { appRoutes, useRouteHandle } from 'app/routes';

import { CreateTarget } from 'features/create-target';

const CreateGoalPage = () => {
  const routeHandle = useRouteHandle();
  const navigate = useNavigate();

  return (
    <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid size={12}>
        <Typography color="primary" variant="h4">
          {routeHandle.title}
        </Typography>
        <Typography color="text.primary" variant="body1">
          Заполните шаги цели и сохраните
        </Typography>
      </Grid>
      <Grid size={12}>
        <CreateTarget onSuccess={() => navigate(appRoutes.app.path)} />
      </Grid>
    </Grid>
  );
};

export default CreateGoalPage;

