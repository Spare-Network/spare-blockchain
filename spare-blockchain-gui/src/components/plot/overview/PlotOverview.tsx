import { Grid } from '@material-ui/core';
import { Flex, Loading } from '@spare/core';
import React from 'react';
import usePlots from '../../../hooks/usePlots';
import PlotsFailed from '../PlotsFailed';
import PlotsNotFound from '../PlotsNotFound';
import PlotHero from './PlotOverviewHero';
import PlotOverviewPlots from './PlotOverviewPlots';

export default function PlotOverview() {
  const { loading, hasPlots, hasQueue } = usePlots();

  return (
    <Flex flexDirection="column" gap={3}>
      {loading && (
        <Flex alignItems="center" justifyContent="center">
          <Loading />
        </Flex>
      )}

      {!loading && (
        <>
          {(hasPlots || hasQueue) ? (
            <PlotOverviewPlots />
          ) : (
            <Grid container spacing={3}>
              <Grid xs={12} item>
                <PlotHero />
              </Grid>
            </Grid>
          )}

          <PlotsFailed />
          <PlotsNotFound />
        </>
      )}
    </Flex>
  );
}
