import { Trans } from '@lingui/macro';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Flex } from '@spare/core';
import { PlotHero as PlotHeroIcon } from '@spare/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useOpenDialog from '../../../hooks/useOpenDialog';
import PlotAddDirectoryDialog from '../PlotAddDirectoryDialog';

export default function PlotOverviewHero() {
  const history = useHistory();
  const openDialog = useOpenDialog();

  function handleAddPlot() {
    history.push('/dashboard/plot/add');
  }

  function handleAddPlotDirectory() {
    openDialog((
      <PlotAddDirectoryDialog />
    ));
  }

  const StyledPlotIcon = styled(PlotHeroIcon)`
  path {
    stroke: 'white';
  }
`;


  const StyledContent = styled(CardContent)`
    padding: ${({ theme }) => `${theme.spacing(5)}px ${theme.spacing(4)}px !important`};
    background: transparent;
    `;

  const StyledCard = styled(Card)`
    background: transparent;
    box-shadow: none;
    `;


  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid  md={6}  item>
        <StyledCard>
          <StyledContent>
            <Flex flexDirection="column" gap={3}>
            <Grid container direction="row"
              justify="center"
              alignItems="center">
              <Grid  md={4}  item >
              <StyledPlotIcon  style={{ fontSize: 120 }}/>
              </Grid >
              </Grid >
              <Typography variant="body1">
                <Trans>
                Add old plots and start mining on both networks simultaneously
                </Trans>
              </Typography>
              <Button
                onClick={handleAddPlotDirectory} 
                variant="contained"
                color="primary"
              >
                <Trans>Add Plot Directory</Trans>
              </Button>
            </Flex>
          </StyledContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
}
