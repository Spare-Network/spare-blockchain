import { Trans } from '@lingui/macro';
import { Typography } from '@material-ui/core';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons';
import React, { ReactNode } from 'react';
import { useToggle } from 'react-use';
import styled from 'styled-components';
import Accordion from '../Accordion';
import Flex from '../Flex';

type Props = {
  children?: ReactNode;
  expanded: boolean;
  hideExpanded?: boolean;
  moreTitle?: ReactNode;
  lessTitle?: ReactNode;
};

const StyledToggleAdvancedOptions = styled(({ expanded, ...rest }) => (
  <Typography {...rest} />
))`
  cursor: pointer;
`;

export default function AdvancedOptions(props: Props) {
  const {
    children,
    expanded: defaultExpanded,
    hideExpanded,
    moreTitle,
    lessTitle,
  } = props;
  const [isExpanded, setIsExpanded] = useToggle(defaultExpanded);

  const hideTitle = hideExpanded && isExpanded;

  function handleToggle() {
    setIsExpanded(!isExpanded);
  }

  return (
    <Flex flexDirection="column" gap={1}>
      {!hideTitle && (
        <StyledToggleAdvancedOptions
          variant="caption"
          expanded={isExpanded}
          onClick={handleToggle}
        >
          {isExpanded ? (
            <Flex alignItems="center">
              <KeyboardArrowUpIcon />
              {lessTitle}
            </Flex>
          ) : (
            <Flex alignItems="center">
              <KeyboardArrowDownIcon />
              {moreTitle}
            </Flex>
          )}
        </StyledToggleAdvancedOptions>
      )}

      <Accordion expanded={isExpanded}>{children}</Accordion>
    </Flex>
  );
}

AdvancedOptions.defaultProps = {
  expanded: false,
  children: undefined,
  hideExpanded: false,
  moreTitle: <Trans>Show Advanced Options</Trans>,
  lessTitle: <Trans>Hide Advanced Options</Trans>,
};
