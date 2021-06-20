import { Trans } from '@lingui/macro';
import { Box, Divider, ListItemIcon, MenuItem, Typography } from '@material-ui/core';
import {
    DeleteForever as DeleteForeverIcon,
    Info as InfoIcon
} from '@material-ui/icons';
import { ConfirmDialog, More } from '@spare/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import PlotStatus from '../../../constants/PlotStatus';
import useOpenDialog from '../../../hooks/useOpenDialog';
import { stopPlotting } from '../../../modules/plotter_messages';
import type PlotQueueItem from '../../../types/PlotQueueItem';
import isWindows from '../../../util/isWindows';
import PlotQueueLogDialog from './PlotQueueLogDialog';

type Props = {
  queueItem: PlotQueueItem;
};

export default function PlotQueueAction(props: Props) {
  const {
    queueItem: {
      id,
      state,
    }
  } = props;

  const dispatch = useDispatch();
  const openDialog = useOpenDialog();
  const canDelete = state !== PlotStatus.REMOVING && !isWindows;

  async function handleDeletePlot() {
    if (!canDelete) {
      return;
    }

    const deleteConfirmed = await openDialog((
      <ConfirmDialog
        title={<Trans>Delete Plot</Trans>}
        confirmTitle={<Trans>Delete</Trans>}
        confirmColor="danger"
      >
        <Trans>
          Are you sure you want to delete the plot? The plot cannot be
          recovered.
        </Trans>
      </ConfirmDialog>
    ));

    // @ts-ignore
    if (deleteConfirmed) {
      dispatch(stopPlotting(id));
    }
  }

  function handleViewLog() {
    openDialog((
      <PlotQueueLogDialog id={id} />
    ));
  }

  return (
    <More>
      {({ onClose }) => (
        <Box>
          {state === PlotStatus.RUNNING && (
            <>
              <MenuItem onClick={() => { onClose(); handleViewLog(); }}>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  <Trans>View Log</Trans>
                </Typography>
              </MenuItem>
              <Divider />
            </>
          )}

          <MenuItem onClick={() => { onClose(); handleDeletePlot(); }} disabled={!canDelete}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              <Trans>Delete</Trans>
            </Typography>
          </MenuItem>
        </Box>
      )}
    </More>
  );
}
