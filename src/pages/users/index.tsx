import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import type { FC } from 'react';

import { useRouteHandle } from 'app/routes';

import { useGetUsers, useGetUsersTargets } from 'entities/api';
import type { Target, User } from 'entities/api/types';

const UserCard: FC<{ user: User }> = ({ user }) => {
  const targets = useGetUsersTargets(user.id);

  function getTargets(status: Target['status']) {
    return targets.data.filter((target) => target.status === status);
  }

  const activeTargets = getTargets('active');
  const completedTargets = getTargets('completed');

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 5,
      }}
    >
      <CardContent>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid>
            <Avatar />
          </Grid>
          <Grid sx={{ flex: 1 }}>
            <Typography color="primary" variant="h5">
              {user.fullName}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="caption">
                Выполняемых целей:
                <Typography
                  color="info"
                  component="span"
                  sx={{ fontWeight: 'bold', ml: '4px' }}
                  variant="caption"
                >
                  {activeTargets.length}
                </Typography>
              </Typography>
              <Typography variant="caption">•</Typography>
              <Typography variant="caption">
                Завершенных целей:
                <Typography
                  color="success"
                  component="span"
                  sx={{ fontWeight: 'bold', ml: '4px' }}
                  variant="caption"
                >
                  {completedTargets.length}
                </Typography>
              </Typography>
            </Stack>
          </Grid>
          <Grid>
            <Button endIcon={<ChevronRightIcon />}>Посмотреть цели</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const UsersPage = () => {
  const routeHandle = useRouteHandle();
  const users = useGetUsers();

  return (
    <Grid container spacing={4}>
      <Grid>
        <Typography color="primary" variant="h4">
          {routeHandle?.title}
        </Typography>
        <Typography color="text.primary" variant="body1">
          Отслеживайте прогресс пользователей по целям и назначайте награды
        </Typography>
      </Grid>
      <Grid size={12}>
        <Stack direction="column" spacing={2}>
          {users.data.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UsersPage;

