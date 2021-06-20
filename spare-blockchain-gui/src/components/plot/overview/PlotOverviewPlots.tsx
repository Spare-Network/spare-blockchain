import { Trans } from '@lingui/macro';
import {
  Box, TableCell,
  TableRow,
  Tooltip, Typography
} from '@material-ui/core';
import { Warning as WarningIcon } from '@material-ui/icons';
import { Card, Flex, FormatBytes, StateColor, Table } from '@spare/core';
import React from 'react';
import styled from 'styled-components';
import PlotStatusEnum from '../../../constants/PlotStatus';
import usePlots from '../../../hooks/usePlots';
import type Plot from '../../../types/Plot';
import PlotAction from '../PlotAction';
import PlotHeader from '../PlotHeader';
import PlotStatus from '../PlotStatus';
import PlotQueueActions from '../queue/PlotQueueActions';
import PlotQueueIndicator from '../queue/PlotQueueIndicator';
import PlotQueueSize from '../queue/PlotQueueSize';

const StyledTableRowQueue = styled(TableRow)`
  background-color: ${({ theme }) =>
    theme.palette.type === 'dark' ? '#1C87FB' : '#F6EEDF'};
`;

const StyledWarningIcon = styled(WarningIcon)`
  color: ${StateColor.WARNING};
`;

const cols = [
  {
    field({ file_size, size, duplicates }: Plot) {
      const hasDuplicates = false;
      const [firstDuplicate] = duplicates || [];

      const duplicateTitle = hasDuplicates ? (
        <Trans>Plot is duplicate of {firstDuplicate.filename}</Trans>
      ) : null;

      return (
        <Flex alignItems="center" gap={1}>
          <Box>
            {`K-${size}, `}
            <FormatBytes value={file_size} />
          </Box>
          {hasDuplicates && (
            <Tooltip title={<Box>{duplicateTitle}</Box>} interactive arrow>
              <StyledWarningIcon />
            </Tooltip>
          )}
        </Flex>
      );
    },
    title: <Trans>K-Size</Trans>,
  },
  {
    minWidth: '100px',
    field: 'queue-name',
    tooltip: 'queue-name',
    title: <Trans>Queue name</Trans>,
  },
  {
    minWidth: '100px',
    field: 'plot_public_key',
    tooltip: 'plot_public_key',
    title: <Trans>Plot Key</Trans>,
  },
  {
    minWidth: '100px',
    field: 'pool_public_key',
    tooltip: 'pool_public_key',
    title: <Trans>Pool Key</Trans>,
  },
  {
    minWidth: '100px',
    field: 'filename',
    tooltip: 'filename',
    title: <Trans>Filename</Trans>,
  },
  {
    field: (plot: Plot) => <PlotStatus plot={plot} />,
    title: <Trans>Status</Trans>,
  },
  {
    field: (plot: Plot) => <PlotAction plot={plot} />,
    title: <Trans>Action</Trans>,
  },
];

export default function PlotOverviewPlots() {
  const { plots, size, queue } = usePlots();
  if (!plots) {
    return null;
  }

  const queuePlots = queue?.filter((item) => item.state !== PlotStatusEnum.FINISHED);

  return (
    <>
      <PlotHeader />
      <Card title={<Trans>Local Harvester Plots</Trans>}>
        <Flex gap={1}>
          <Flex flexGrow={1}>
            <Typography variant="body2">
              <Trans>
                Want to earn more Spare? Add more plots to your farm.
              </Trans>
            </Typography>
          </Flex>

          <Typography variant="body2">
            <Trans>Total Plot Size:</Trans>{' '}
            <strong>
              <FormatBytes value={size} precision={3} />
            </strong>
          </Typography>
        </Flex>

        <Table cols={cols} rows={plots} pages>
          {queuePlots
            ? queuePlots.map((item) => {
                const { id } = item;
                return (
                  <StyledTableRowQueue key={id}>
                    <TableCell>
                      <PlotQueueSize queueItem={item} />
                    </TableCell>
                    <TableCell>{item.queue}</TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell>
                      <PlotQueueIndicator queueItem={item} />
                    </TableCell>
                    <TableCell>
                      <PlotQueueActions queueItem={item} />
                    </TableCell>
                  </StyledTableRowQueue>
                );
              })
            : null}
        </Table>
      </Card>
    </>
  );
}
