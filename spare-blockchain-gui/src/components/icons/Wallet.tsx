import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';
import { ReactComponent as WalletIcon } from './images/icon-wallet.svg';

export default function Wallet(props: SvgIconProps) {
  return <SvgIcon component={WalletIcon} viewBox="-2 0 35 35" {...props} />;
}
