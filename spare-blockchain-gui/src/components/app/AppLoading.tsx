import { Spinner } from '@spare/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules/rootReducer';

export default function AppLoading() {
  const showProgressIndicator = useSelector(
    (state: RootState) => state.progress.progress_indicator,
  );

  return <Spinner show={showProgressIndicator} />;
}
