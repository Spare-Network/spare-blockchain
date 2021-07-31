import { Trans } from '@lingui/macro';
import { FormatBytes } from '@spare/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules/rootReducer';
import FarmCard from '../../farm/card/FarmCard';

export default function FullNodeEstimatedNetworkSpace() {
  const state = useSelector(
    (state: RootState) => state.full_node_state.blockchain_state,
  );

  const loading = state?.space === undefined;
  const value = state?.space;

  return (
    <FarmCard
      loading={loading}
      valueColor="textPrimary"
      title={<Trans>Estimated Network Space</Trans>}
      tooltip={
        <Trans>
          Estimated sum of all the plotted disk space of all farmers in the
          network
        </Trans>
      }
      value={value && <FormatBytes value={value} precision={3} />}
    />
  );
}
