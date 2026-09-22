import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { type FC, type ReactNode, useState } from 'react';

import { Popper, SwipeableDrawer, Tooltip } from 'shared/components';
import { useAdaptive } from 'shared/utils';

import type { RewardTarget as RewardTargetType } from 'entities/api/types';

import { StepProgress } from 'features/step-progress';

type RewardTargetProps = {
  actions?: ReactNode;
  target: RewardTargetType;
};

export const RewardTarget: FC<RewardTargetProps> = ({ actions, target }) => {
  const { description, id, reward, status, title } = target;
  const [rewardAnchorEl, setRewardAnchorEl] = useState<HTMLElement | null>(null);
  const { isMobile } = useAdaptive();

  const rewardTitleId = `target-${id}-reward-title`;
  const rewardContent = reward && (
    <List disablePadding>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: '#FDF2E2' }}>
            <CardGiftcardIcon sx={{ fill: (theme) => theme.palette.warning.main }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={reward.title} secondary={reward.description} />
      </ListItem>
    </List>
  );

  return (
    <>
      <Card
        key={id}
        sx={{
          borderRadius: 4,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Grid container sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Grid sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      alignItems: 'flex-start',
                      display: 'flex',
                      maxWidth: '100%',
                      width: 'fit-content',
                    }}
                  >
                    <Typography
                      component="h3"
                      gutterBottom
                      noWrap
                      sx={{ margin: 0, minWidth: 0 }}
                      variant={isMobile ? 'h6' : 'h5'}
                    >
                      {title}
                    </Typography>
                    {reward && (
                      <Tooltip placement="top" title="Назначенная награда">
                        <Badge
                          badgeContent={1}
                          color="secondary"
                          onClick={(event) => setRewardAnchorEl(event.currentTarget)}
                          sx={{ cursor: 'pointer', flexShrink: 0, ml: 0.5, mr: 1, mt: '-5px' }}
                        >
                          <WorkspacePremiumIcon
                            sx={{ fill: (theme) => theme.palette.warning.main }}
                          />
                        </Badge>
                      </Tooltip>
                    )}
                  </Box>
                  <Box sx={{ mt: 1.5 }}>
                    <Typography sx={{ color: 'text.secondary' }} variant="body2">
                      {description}
                    </Typography>
                  </Box>
                </Grid>
                {!isMobile && actions && <Grid>{actions}</Grid>}
              </Grid>
            </Grid>
            {!!target.steps.length && (
              <Grid size={12}>
                <StepProgress readOnly steps={target.steps} targetId={id} targetStatus={status} />
              </Grid>
            )}
          </Grid>
        </CardContent>
        {isMobile && actions && <CardActions disableSpacing>{actions}</CardActions>}
      </Card>
      {reward &&
        (isMobile ? (
          <SwipeableDrawer
            onClose={() => setRewardAnchorEl(null)}
            open={Boolean(rewardAnchorEl)}
            title="Назначенная награда"
            titleId={rewardTitleId}
          >
            {rewardContent}
          </SwipeableDrawer>
        ) : (
          <Popper
            anchorEl={rewardAnchorEl}
            id={rewardAnchorEl ? `target-${id}-reward` : undefined}
            onClickAway={() => setRewardAnchorEl(null)}
            open={Boolean(rewardAnchorEl)}
            placement="right"
            sx={{ width: '300px' }}
          >
            <Typography component="h2" id={rewardTitleId} variant="subtitle1">
              Назначенная награда
            </Typography>
            {rewardContent}
          </Popper>
        ))}
    </>
  );
};
