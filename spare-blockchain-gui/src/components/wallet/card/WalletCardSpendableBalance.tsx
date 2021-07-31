import { Trans } from '@lingui/macro';
import React from 'react';
import useCurrencyCode from '../../../hooks/useCurrencyCode';
import useWallet from '../../../hooks/useWallet';
import { graviton_to_spare_string } from '../../../util/spare';
import FarmCard from '../../farm/card/FarmCard';

type Props = {
  wallet_id: number;
};

export default function WalletCardSpendableBalance(props: Props) {
  const { wallet_id } = props;

  const { wallet, loading } = useWallet(wallet_id);
  const currencyCode = useCurrencyCode();

  const value = wallet?.wallet_balance?.spendable_balance;

  return (
    <FarmCard
      loading={loading}
      valueColor="secondary"
      title={<Trans>Spendable Balance</Trans>}
      tooltip={
        <Trans>
          This is the amount of Spare that you can currently use to make
          transactions. It does not include pending farming rewards, pending
          incoming transactions, and Spare that you have just spent but is not
          yet in the blockchain.
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
