import { Trans } from '@lingui/macro';
import React from 'react';
import useCurrencyCode from '../../../hooks/useCurrencyCode';
import useWallet from '../../../hooks/useWallet';
import { graviton_to_spare_string } from '../../../util/spare';
import FarmCard from '../../farm/card/FarmCard';

type Props = {
  wallet_id: number;
};

export default function WalletCardPendingChange(props: Props) {
  const { wallet_id } = props;

  const { wallet, loading } = useWallet(wallet_id);
  const currencyCode = useCurrencyCode();

  const value = wallet?.wallet_balance?.pending_change;

  return (
    <FarmCard
      loading={loading}
      valueColor="secondary"
      title={<Trans>Pending Change</Trans>}
      tooltip={
        <Trans>
          This is the pending change, which are change coins which you have sent
          to yourself, but have not been confirmed yet.
        </Trans>
      }
      value={
        <>
          {graviton_to_spare_string(value)} {currencyCode}
        </>
      }
    />
  );
}
