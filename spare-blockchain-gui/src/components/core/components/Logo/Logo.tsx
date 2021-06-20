import { Box, BoxProps } from '@material-ui/core';
import { Spare } from '@spare/icons';
import React from 'react';
import styled from 'styled-components';

const StyledSpare = styled(Spare)`
  max-width: 100%;
  width: auto;
  height: auto;
`;

export default function Logo(props: BoxProps) {
  return (
    <Box {...props}>
      <StyledSpare />
    </Box>
  );
}
