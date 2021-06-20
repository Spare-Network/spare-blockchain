import { Trans } from '@lingui/macro';
import { Box, CircularProgress, ListItemIcon, MenuItem, Typography } from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';
import { Flex, More } from '@spare/core';
import React from 'react';
import { useSelector } from 'react-redux';
import useOpenDialog from '../../../hooks/useOpenDialog';
import type { RootState } from '../../../modules/rootReducer';
import FarmManageFarmingRewards from '../FarmManageFarmingRewards';
import FarmOverviewCards from './FarmOverviewCards';
import FarmOverviewHero from './FarmOverviewHero';

export default function FarmOverview() {
  const openDialog = useOpenDialog();
  const plots = useSelector(
    (state: RootState) => state.farming_state.harvester.plots,
  );
  const loading = !plots;
  const hasPlots = !!plots && plots.length > 0;

  function handleManageFarmingRewards() {
    // @ts-ignore
    openDialog((
      <FarmManageFarmingRewards />
    ));
  }

  return (
    <>
      <Flex gap={2} alignItems="center">
        <Flex flexGrow={1}>
            <Typography gutterBottom>
              <span style={ { color: "#E9398D", fontSize: 24, fontWeight:400, fontFamily:"Josefin" }}><Trans>Your Farm Overview</Trans></span>
            </Typography>
        </Flex>
        <More>
          {({ onClose }) => (
            <Box>
              <MenuItem onClick={() => { onClose(); handleManageFarmingRewards(); }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  <Trans>Manage Farming Rewards</Trans>
                </Typography>
              </MenuItem>
            </Box>
          )}
        </More>
      </Flex>

      {loading ? (
        <CircularProgress />
      ) : (hasPlots ? (
        <FarmOverviewCards />
      ) : (
        <FarmOverviewHero />
      ))}

      
    </>
  );
}
