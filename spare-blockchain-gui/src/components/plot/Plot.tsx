import { Trans } from '@lingui/macro';
import { Flex, Link } from '@spare/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LayoutMain from '../layout/LayoutMain';
import PlotAdd from './add/PlotAdd';
import PlotOverview from './overview/PlotOverview';
import { PlotHeaderTarget } from './PlotHeader';

export default function Plot() {
  const { path } = useRouteMatch();

  return (
    <LayoutMain
      title={(
        <>
          <Link to="/dashboard/plot" color="textPrimary">
            <Trans>Plot</Trans>
          </Link>
          <PlotHeaderTarget />
        </>
      )}
    >
      <Flex flexDirection="column" gap={3}>
        <Switch>
          <Route path={path} exact>
            <PlotOverview />
          </Route>
          <Route path={`${path}/add`}>
            <PlotAdd />
          </Route>
        </Switch>
      </Flex>
    </LayoutMain>
  );
}
