import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';
import { ReactComponent as KeysIcon } from './images/icon-keys.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={KeysIcon} viewBox="8 0 35 51" {...props} />;
}
