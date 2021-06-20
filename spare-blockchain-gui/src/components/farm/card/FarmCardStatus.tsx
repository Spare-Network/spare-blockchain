import { Trans } from '@lingui/macro';
import { State, StateIndicator } from '@spare/core';
import React from 'react';
import FarmerStatus from '../../../constants/FarmerStatus';
import useFarmerStatus from '../../../hooks/useFarmerStatus';
import FarmCard from './FarmCard';
import FarmCardNotAvailable from './FarmCardNotAvailable';

export default function FarmCardStatus() {
  const farmerStatus = useFarmerStatus();

  if (farmerStatus === FarmerStatus.SYNCHING) {
    return (
      <FarmCard
        title={<Trans>Farming Status</Trans>}
        value={(
          <StateIndicator state={State.WARNING} indicator>
            <Trans>Syncing</Trans>
          </StateIndicator>
        )}
      />
    );
  }

  if (farmerStatus === FarmerStatus.NOT_AVAILABLE) {
    return (
      <FarmCardNotAvailable
        title={
          <Trans>Farming Status</Trans>
        }
      />
    );
  }

  if (farmerStatus === FarmerStatus.NOT_CONNECTED) {
    return (
      <FarmCard
        title={<Trans>Farming Status</Trans>}
        value={(
          <StateIndicator state={State.ERROR} indicator>
            <Trans>Error</Trans>
          </StateIndicator>
        )}
        description={<Trans>Farmer is not connected</Trans>}
      />
    );
  }

  if (farmerStatus === FarmerStatus.NOT_RUNNING) {
    return (
      <FarmCard
        title={<Trans>Farming Status</Trans>}
        value={(
          <StateIndicator state={State.ERROR} indicator>
            <Trans>Error</Trans>
          </StateIndicator>
        )}
        description={<Trans>Farmer is not running</Trans>}
      />
    );
  }

  return (
    <FarmCard
      title={<Trans>Farming Status</Trans>}
      value={(
        <StateIndicator state={State.SUCCESS} indicator>
          <Trans>Farming</Trans>
        </StateIndicator>
      )}
    />
  );
}
