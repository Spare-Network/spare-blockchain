import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';
import { ReactComponent as PlotIcon } from './images/icon-plots.svg';

export default function Plot(props: SvgIconProps) {
  return <SvgIcon component={PlotIcon} viewBox="5 0 35 45" {...props} />; 
}
