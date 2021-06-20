import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HomeIcon } from './images/icon-node.svg';

const StyledHomeIcon = styled(HomeIcon)`
  path {
    stroke: ${({ theme }) =>
      theme.palette.type === 'dark' ? 'white' : '#757575'};
    stroke-width: 1;
  }
`;

export default function Home(props: SvgIconProps) {
  return <SvgIcon fontSize='large'	component={StyledHomeIcon} viewBox="0 0 38 40" {...props} />;
}
