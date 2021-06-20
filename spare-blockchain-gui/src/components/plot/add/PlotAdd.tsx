import { Trans } from '@lingui/macro';
import { Button } from '@material-ui/core';
import { ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import { Flex, Form } from '@spare/core';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import plotSizes, { defaultPlotSize } from '../../../constants/plotSizes';
import { plotQueueAdd } from '../../../modules/plotQueue';
import type { RootState } from '../../../modules/rootReducer';
import PlotAddConfig from '../../../types/PlotAdd';
import { PlotHeaderSource } from '../PlotHeader';
import PlotAddChooseSize from './PlotAddChooseSize';
import PlotAddNumberOfPlots from './PlotAddNumberOfPlots';
import PlotAddSelectFinalDirectory from './PlotAddSelectFinalDirectory';
import PlotAddSelectTemporaryDirectory from './PlotAddSelectTemporaryDirectory';

type FormData = PlotAddConfig;

export default function PlotAdd() {
  const history = useHistory();
  const dispatch = useDispatch();
  const fingerprint = useSelector((state: RootState) => state.wallet_state.selected_fingerprint);

  const methods = useForm<FormData>({
    shouldUnregister: false,
    defaultValues: {
      plotSize: defaultPlotSize.value,
      plotCount: 1,
      maxRam: defaultPlotSize.defaultRam,
      numThreads: 2,
      numBuckets: 128,
      queue: "default",
      finalLocation: '',
      workspaceLocation: '',
      workspaceLocation2: '',
      delay: 0,
      parallel: false,
      disableBitfieldPlotting: false,
      excludeFinalDir: false,
    },
  });

  const { watch, setValue } = methods;
  const plotSize = watch('plotSize');

  useEffect(() => {
    const plotSizeConfig = plotSizes.find(item => item.value === plotSize);
    if (plotSizeConfig) {
      setValue('maxRam', plotSizeConfig.defaultRam);
    }
  }, [plotSize, setValue]);

  const handleSubmit: SubmitHandler<FormData> = (data) => {
    const { delay } = data;

    dispatch(plotQueueAdd(fingerprint ? {
      ...data,
      fingerprint,
      delay: delay * 60,
    } : {
      ...data,
      delay: delay * 60,
    }));

    history.push('/dashboard/plot');
  }

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}>
      <PlotHeaderSource>
        <Flex alignItems="center">
          <ChevronRightIcon color="secondary" />
          <Trans>
            Add Plot Directory
          </Trans>
        </Flex>
      </PlotHeaderSource>
      <Flex flexDirection="column" gap={3}>
        <PlotAddChooseSize />
        <PlotAddNumberOfPlots />
        <PlotAddSelectTemporaryDirectory />
        <PlotAddSelectFinalDirectory />
        <div>
          <Button color="primary" type="submit" variant="contained">
            <Trans>
              Create Plot
            </Trans>
          </Button>
        </div>
      </Flex>
    </Form>
  );
}
