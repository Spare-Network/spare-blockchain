import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useCurrencyCode from '../../../hooks/useCurrencyCode';
import type { RootState } from '../../../modules/rootReducer';
import { graviton_to_spare } from '../../../util/spare';
import FarmCard from './FarmCard';

export default function FarmCardTotalSpareFarmed() {
  const currencyCode = useCurrencyCode();

  const loading = useSelector(
    (state: RootState) => !state.wallet_state.farmed_amount,
  );

  const farmedAmount = useSelector(
    (state: RootState) => state.wallet_state.farmed_amount?.farmed_amount,
  );

  const totalSpareFarmed = useMemo(() => {
    if (farmedAmount !== undefined) {
      const val = BigInt(farmedAmount.toString());
      return graviton_to_spare(val);
    }
  }, [farmedAmount]);

  return (
    <FarmCard
      title={<Trans>{currencyCode} Total Spare Farmed</Trans>}
      value={totalSpareFarmed}
      loading={loading}
    />
  );
}
