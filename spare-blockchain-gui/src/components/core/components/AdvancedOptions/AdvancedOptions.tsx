import React, { useState, ReactNode } from 'react';
import Flex from '../Flex';
import Accordion from '../Accordion';

type Props = {
  children?: ReactNode,
  expanded: boolean,
};

export default function AdvancedOptions(props: Props) {
  const { children, expanded: defaultExpanded } = props;

  return (
    <Flex flexDirection="column" gap={1}>
      <Accordion expanded={true}>
        {children}
      </Accordion>
    </Flex>
  )
}

AdvancedOptions.defaultProps = {
  expanded: false,
  children: undefined,
};
