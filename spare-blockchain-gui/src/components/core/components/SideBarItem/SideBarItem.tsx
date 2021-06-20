import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const StyledListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  align-items: center;
  padding-left: 0;
  padding-right: 0;
  min-height: 150px;
  padding-top: 50px;
  `;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: auto;
  with: 100%;
`;

const StyledListItemText = styled(ListItemText)`
  white-space: initial !important;
  text-align: center;
`;

type Props = {
  to: string;
  title: ReactNode;
  icon: ReactNode;
  exact?: boolean;
  onSelect?: () => void;
};

export default function SideBarItem(props: Props) {
  const { to, title, icon, exact, onSelect } = props;
  const history = useHistory();
  const match = useRouteMatch(to);


  async function handleClick() {
    if (onSelect) {
      await onSelect();
    }
    history.push(to);
  }

  return (
    <StyledListItem button onClick={() => handleClick()}>
      <StyledListItemIcon>{icon}</StyledListItemIcon>
      <StyledListItemText primary={title} />
    </StyledListItem>
  );
}

SideBarItem.defaultProps = {
  exact: false,
  onSelect: undefined,
};
