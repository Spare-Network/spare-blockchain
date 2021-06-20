import { Grid } from '@material-ui/core';
import React from 'react';
import FarmCardBlockRewards from '../card/FarmCardBlockRewards';
import FarmCardExpectedTimeToWin from '../card/FarmCardExpectedTimeToWin';
import FarmCardLastHeightFarmed from '../card/FarmCardLastHeightFarmed';
import FarmCardPlotCount from '../card/FarmCardPlotCount';
import FarmCardStatus from '../card/FarmCardStatus';
import FarmCardTotalNetworkSpace from '../card/FarmCardTotalNetworkSpace';
import FarmCardTotalSizeOfPlots from '../card/FarmCardTotalSizeOfPlots';
import FarmCardTotalSpareFarmed from '../card/FarmCardTotalSpareFarmed';
import FarmCardUserFees from '../card/FarmCardUserFees';

export default function FarmOverviewCards() {
  return (
    <div>
      <Grid spacing={3} alignItems="stretch" container>
        <Grid xs={12} sm={6} md={4} item>
          <FarmCardStatus />
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FarmCardTotalSpareFarmed />
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FarmCardBlockRewards />
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FarmCardUserFees />
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FarmCardLastHeightFarmed />
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FarmCardPlotCount />
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FarmCardTotalSizeOfPlots />
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FarmCardTotalNetworkSpace />
        </Grid>
        <Grid xs={12} md={4} item>
          <FarmCardExpectedTimeToWin />
        </Grid>
      </Grid>
    </div>
  );
}
