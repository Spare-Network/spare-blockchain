import { Trans } from '@lingui/macro';
import {
    Typography
} from '@material-ui/core';
import { Card, Table } from '@spare/core';
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../modules/rootReducer';
import type { Row } from '../core/components/Table/Table';

const cols = [
  {
    minWidth: '200px',
    tooltip: true,
    field: 'signage_point.challenge_hash',
    title: (
      <Trans>Challenge Hash</Trans>
    ),
  },
  {
    field: (row: Row) => row.signage_point.signage_point_index,
    title: <Trans>Index</Trans>,
  },
];

export default function FarmLatestBlockChallenges() {
  const signagePoints = useSelector(
    (state: RootState) => state.farming_state.farmer.signage_points ?? [],
  );

  const plots = useSelector(
    (state: RootState) => state.farming_state.harvester.plots,
  );

  const hasPlots = !!plots && plots.length > 0;
  const reducedSignagePoints = signagePoints;

  return (
    <Card
      title={(
        <Typography gutterBottom>
            <span style={ { color: "#E9398D", fontSize: 24, fontWeight:400, fontFamily:"Josefin" }}><Trans>Latest Block Challenges</Trans></span>
          </Typography>
      )}
      tooltip={hasPlots ? (
        <Trans>
          Below are the current block challenges. You may or may not have
          a proof of space for these challenges. These blocks do not
          currently contain a proof of time.
        </Trans>
      ): undefined}
    >
      
      <Table
        cols={cols}
        rows={reducedSignagePoints}
        rowsPerPageOptions={[5, 10, 25, 100]}
        rowsPerPage={5}
        pages
      />
    </Card>
  );
}
