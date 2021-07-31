import { Trans } from '@lingui/macro';
import { FormatLargeNumber } from '@spare/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules/rootReducer';
import FarmCard from '../../farm/card/FarmCard';

export default function FullNodeCardPeakHeight() {
  const state = useSelector(
    (state: RootState) => state.full_node_state.blockchain_state,
  );

  const loading = !state;
  const value = state?.peak?.height ?? 0;

  return (
    <FarmCard
      loading={loading}
      valueColor="textPrimary"
      title={<Trans>Peak Height</Trans>}
      value={<FormatLargeNumber value={value} />}
    />
  );
}
