import { Trans } from '@lingui/macro';
import React from 'react';
import useCurrencyCode from '../../../hooks/useCurrencyCode';
import useWallet from '../../../hooks/useWallet';
import { graviton_to_spare_string } from '../../../util/spare';
import FarmCard from '../../farm/card/FarmCard';

type Props = {
  wallet_id: number;
};

export default function WalletCardPendingBalance(props: Props) {
  const { wallet_id } = props;

  const { wallet, loading } = useWallet(wallet_id);
  const currencyCode = useCurrencyCode();

  const value = wallet?.wallet_balance?.pending_balance;

  return (
    <FarmCard
      loading={loading}
      valueColor="secondary"
      title={<Trans>Pending Balance</Trans>}
      tooltip={
        <Trans>
          This is the sum of the incoming and outgoing pending transactions (not
          yet included into the blockchain). This does not include farming
          rewards.
        </Trans>
      }
      value={
        <span>
          {graviton_to_spare_string(value)} {currencyCode}
        </span>
      }
    />
  );
}
