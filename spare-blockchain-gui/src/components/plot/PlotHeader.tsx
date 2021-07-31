import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Folder as FolderIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons';
import { Flex, More } from '@spare/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTeleporter } from 'react-teleporter';
import useOpenDialog from '../../hooks/useOpenDialog';
import { refreshPlots } from '../../modules/harvesterMessages';
import PlotAddDirectoryDialog from './PlotAddDirectoryDialog';

type Props = {
  children?: ReactNode;
};

const PlotHeaderTeleporter = createTeleporter();

export const PlotHeaderSource = PlotHeaderTeleporter.Source;

export const PlotHeaderTarget = PlotHeaderTeleporter.Target;

export default function PlotHeader(props: Props) {
  const { children } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const openDialog = useOpenDialog();

  function handleRefreshPlots() {
    dispatch(refreshPlots());
  }

  function handleAddPlot() {
    history.push('/dashboard/plot/add');
  }

  function handleAddPlotDirectory() {
    openDialog(<PlotAddDirectoryDialog />);
  }

  return (
    <div>
      <Flex alignItems="center">
        <Flex flexGrow={1}>{children}</Flex>
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddPlot}
            startIcon={<AddIcon />}
          >
            <Trans>Add Plot Directory</Trans>
          </Button>{' '}
          <More>
            {({ onClose }) => (
              <Box>
                <MenuItem
                  onClick={() => {
                    onClose();
                    handleRefreshPlots();
                  }}
                >
                  <ListItemIcon>
                    <RefreshIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit" noWrap>
                    <Trans>Refresh Plots</Trans>
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClose();
                    handleAddPlotDirectory();
                  }}
                >
                  <ListItemIcon>
                    <FolderIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit" noWrap>
                    <Trans>Add Plot Directory</Trans>
                  </Typography>
                </MenuItem>
              </Box>
            )}
          </More>
        </div>
      </Flex>
    </div>
  );
}
