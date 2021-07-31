import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HomeIcon } from './images/icon-node.svg';

function getColor({ theme, color }) {
  if (color !== 'inherit') {
    return color;
  }
  return theme.palette.type === 'dark' ? 'white' : '#757575';
}

const StyledHomeIcon = styled(HomeIcon)`
  path {
    stroke: ${getColor};
    stroke-width: 2;
  }
`;

export default function Home(props: SvgIconProps) {
  return <SvgIcon fontSize='large'	component={StyledHomeIcon} viewBox="0 0 38 40" {...props} />;
}
