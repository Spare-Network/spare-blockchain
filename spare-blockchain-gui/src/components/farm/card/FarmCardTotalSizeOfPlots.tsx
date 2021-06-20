import { Trans } from '@lingui/macro';
import { FormatBytes } from '@spare/core';
import React from 'react';
import usePlots from '../../../hooks/usePlots';
import FarmCard from './FarmCard';

export default function FarmCardTotalSizeOfPlots() {
  const { size } = usePlots();

  return (
    <FarmCard
      title={
        <Trans>Total Size of Plots</Trans>
      }
      value={<FormatBytes value={size} precision={3} />}
    />
  );
}
