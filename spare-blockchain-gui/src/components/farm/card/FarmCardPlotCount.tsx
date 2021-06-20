import { Trans } from '@lingui/macro';
import { FormatLargeNumber } from '@spare/core';
import React from 'react';
import usePlots from '../../../hooks/usePlots';
import FarmCard from './FarmCard';

export default function FarmCardPlotCount() {
  const { uniquePlots } = usePlots();

  return (
    <FarmCard
      title={<Trans>Plot Count</Trans>}
      value={<FormatLargeNumber value={uniquePlots?.length} />}
      loading={!uniquePlots}
    />
  );
}
