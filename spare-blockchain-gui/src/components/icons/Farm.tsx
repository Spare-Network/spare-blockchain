import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';
import { ReactComponent as FarmIcon } from './images/icon-farm.svg';

export default function Farm(props: SvgIconProps) {
  return <SvgIcon component={FarmIcon} viewBox="8 0 30 47" {...props} />;
}
