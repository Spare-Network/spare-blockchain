import { Trans } from '@lingui/macro';
import { Button, Grid, Typography } from '@material-ui/core';
import { CardHero } from '@spare/core';
import { Pool as PoolIcon } from '@spare/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledPoolIcon = styled(PoolIcon)`
  font-size: 4rem;
`;

export default function PoolHero() {
  const history = useHistory();

  function handleJoinPool() {
    history.push('/dashboard/pool/add');
  }

  return (
    <Grid container>
      <Grid xs={12} md={6} lg={5} item>
        <CardHero>
          <StyledPoolIcon color="primary" />
          <Typography variant="body1">
            <Trans>
              Smooth out your XCH farming rewards by joining a pool.
            </Trans>
          </Typography>
          <Button onClick={handleJoinPool} variant="contained" color="primary">
            <Trans>Join a Pool</Trans>
          </Button>
        </CardHero>
      </Grid>
    </Grid>
  );
}
