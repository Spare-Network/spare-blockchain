import { Trans } from '@lingui/macro';
import { FormatLargeNumber } from '@spare/core';
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../modules/rootReducer';
import FarmCard from '../../farm/card/FarmCard';

export default function FullNodeCardTotalIterations() {
  const state = useSelector(
    (state: RootState) => state.full_node_state.blockchain_state,
  );

  const loading = !state?.peak;
  const value = state?.peak?.total_iters ?? 0;

  return (
    <FarmCard
      loading={loading}
      valueColor="textPrimary"
      title={<Trans>Total Iterations</Trans>}
      tooltip={
        <Trans>Total iterations since the start of the blockchain</Trans>
      }
      value={<FormatLargeNumber value={value} />}
    />
  );
}
