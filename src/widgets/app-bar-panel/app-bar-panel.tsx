import AdsClickIcon from '@mui/icons-material/AdsClick';
import GroupIcon from '@mui/icons-material/Group';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useNavigate } from 'react-router';

import { appRoutes } from 'app/routing';

import { AppBarMobileDrawer } from 'shared/components';
import { useIsActivePath } from 'shared/utils';

import { ThemeChanger } from 'features/theme-changer';

import { AppBarProfile } from 'widgets/app-bar-profile/app-bar-profile';

const panelRoutes = [
  { icon: <AdsClickIcon />, route: appRoutes.app },
  { icon: <GroupIcon />, route: appRoutes.users },
];

export const AppBarPanel = () => {
  const navigate = useNavigate();
  const isActivePath = useIsActivePath();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <AppBarMobileDrawer>
        <AppBarProfile compact={false} />
        <List>
          {panelRoutes.map(({ icon, route }) => (
            <ListItem disablePadding key={route.path}>
              <ListItemButton
                onClick={() => navigate(route.path)}
                selected={isActivePath(route.path)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={route.handle.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List subheader={<ListSubheader>Настройки</ListSubheader>}>
          <ListItem>
            <ThemeChanger />
          </ListItem>
        </List>
      </AppBarMobileDrawer>
    </Box>
  );
};
