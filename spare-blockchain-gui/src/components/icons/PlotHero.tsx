import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import { ReactComponent as PlotHeroIcon } from './images/harddisk.svg';

export default function PlotHero(props: SvgIconProps) {
  return <SvgIcon component={PlotHeroIcon} viewBox="0 0 524 524" {...props} />;
}
