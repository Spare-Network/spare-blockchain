import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';
import { ReactComponent as SpareIcon } from './images/icon-logo.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={SpareIcon} viewBox="0 0 50 54" {...props} />;
}
