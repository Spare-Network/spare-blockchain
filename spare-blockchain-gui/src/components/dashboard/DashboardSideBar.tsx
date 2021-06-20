import { Trans } from '@lingui/macro';
import { List } from '@material-ui/core';
import { Flex, SideBarItem } from '@spare/core';
import {
    Farm as FarmIcon, Home as HomeIcon, Keys as KeysIcon, Plot as PlotIcon, Wallet as WalletIcon
} from '@spare/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logOut } from '../../modules/message';

const StyledRoot = styled(Flex)`
  height: 100%;
  padding-top: 50px;
  overflow-y: auto;
`;

const StyledList = styled(List)`
  width: 100%;
  justify-content: start;
  display: flex;
  flex-direction: column;
`;

export default function DashboardSideBar() {
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(logOut('log_out', {}));
  }

  return (
    <StyledRoot>
      <StyledList disablePadding>
        <SideBarItem
          to="/dashboard"
          icon={<HomeIcon fontSize="large" />}
          title={<Trans>Full Node</Trans>}
          exact
        />
        <SideBarItem
          to="/dashboard/wallets"
          icon={<WalletIcon fontSize="large" />}
          title={<Trans>Wallets</Trans>}
        />
        <SideBarItem
          to="/dashboard/plot"
          icon={<PlotIcon fontSize="large" />}
          title={<Trans>Plots</Trans>}
        />
        <SideBarItem
          to="/dashboard/farm"
          icon={<FarmIcon fontSize="large" />}
          title={<Trans>Farm</Trans>}
        />
        <SideBarItem
          to="/"
          icon={<KeysIcon fontSize="large" />}
          onSelect={handleLogOut}
          title={<Trans>Keys</Trans>}
          exact
        />
      </StyledList>
    </StyledRoot>
  );
}
