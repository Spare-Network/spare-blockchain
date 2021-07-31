import { Trans } from '@lingui/macro';
import { Flex, Link } from '@spare/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import usePlotNFTs from '../../hooks/usePlotNFTs';
import LayoutMain from '../layout/LayoutMain';
import PlotNFTAbsorbRewards from '../plotNFT/PlotNFTAbsorbRewards';
import PlotNFTAdd from '../plotNFT/PlotNFTAdd';
import PlotNFTChangePool from '../plotNFT/PlotNFTChangePool';
import { PoolHeaderSource, PoolHeaderTarget } from './PoolHeader';
import PoolOverview from './PoolOverview';

export default function Pool() {
  const { path } = useRouteMatch();
  const { loading } = usePlotNFTs();

  return (
    <LayoutMain
      loading={loading}
      loadingTitle={<Trans>Loading Plot NFTs</Trans>}
      title={
        <>
          <Link to="/dashboard/pool" color="textPrimary">
            <Trans>Pool</Trans>
          </Link>
          <PoolHeaderTarget />
        </>
      }
    >
      <Flex flexDirection="column" gap={3}>
        <Switch>
          <Route path={path} exact>
            <PoolOverview />
          </Route>
          <Route path={`${path}/add`} exact>
            <PlotNFTAdd headerTag={PoolHeaderSource} />
          </Route>
          <Route path={`${path}/:plotNFTId/change-pool`} exact>
            <PlotNFTChangePool headerTag={PoolHeaderSource} />
          </Route>
          <Route path={`${path}/:plotNFTId/absorb-rewards`} exact>
            <PlotNFTAbsorbRewards headerTag={PoolHeaderSource} />
          </Route>
        </Switch>
      </Flex>
    </LayoutMain>
  );
}
