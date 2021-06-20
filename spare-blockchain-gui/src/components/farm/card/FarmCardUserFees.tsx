import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useCurrencyCode from '../../../hooks/useCurrencyCode';
import type { RootState } from '../../../modules/rootReducer';
import { graviton_to_spare } from '../../../util/spare';
import FarmCard from './FarmCard';

export default function FarmCardUserFees() {
  const currencyCode = useCurrencyCode();
  const loading = useSelector(
    (state: RootState) => !state.wallet_state.farmed_amount,
  );

  const feeAmount = useSelector(
    (state: RootState) => state.wallet_state.farmed_amount?.fee_amount,
  );

  const userTransactionFees = useMemo(() => {
    if (feeAmount !== undefined) {
      const val = BigInt(feeAmount.toString());
      return graviton_to_spare(val);
    }
  }, [feeAmount]);

  return (
    <FarmCard
      title={<Trans>{currencyCode} User Transaction Fees</Trans>}
      value={userTransactionFees}
      loading={loading}
    />
  );
}
