import { Trans } from '@lingui/macro';
import { AdvancedOptions, Flex } from '@spare/core';
import React from 'react';
import { useSelector } from 'react-redux';
import usePlots from '../../hooks/usePlots';
import type { RootState } from '../../modules/rootReducer';
import LayoutMain from '../layout/LayoutMain';
import FarmFullNodeConnections from './FarmFullNodeConnections';
import FarmLastAttemptedProof from './FarmLastAttemptedProof';
import FarmLatestBlockChallenges from './FarmLatestBlockChallenges';
import FarmYourHarvesterNetwork from './FarmYourHarvesterNetwork';
import FarmOverview from './overview/FarmOverview';

export default function Farm() {
  const { hasPlots } = usePlots();
  const hasHarvesterConnections = !!useSelector((state: RootState) =>
    state.farming_state.farmer.connections.find(
      (connection) => connection.type === 2,
    ),
  );

  return (
    <LayoutMain title={<Trans>Farming</Trans>}>
      <Flex flexDirection="column" gap={3}>
        <FarmOverview />

        {hasPlots ? (
          <>
            <FarmLastAttemptedProof />
            <FarmLatestBlockChallenges />
            <AdvancedOptions>
              <Flex flexDirection="column" gap={3}>
                <FarmFullNodeConnections />
                <FarmYourHarvesterNetwork />
              </Flex>
            </AdvancedOptions>
          </>
        ) : (
          <>
            <FarmLatestBlockChallenges />
            {hasHarvesterConnections && (
              <AdvancedOptions>
                <Flex flexDirection="column" gap={3}>
                  <FarmYourHarvesterNetwork />
                </Flex>
              </AdvancedOptions>
            )}
          </>
        )}
      </Flex>
    </LayoutMain>
  );
}
