import React, {PropsWithChildren} from 'react';

import ShowFallbackComponent from './ShowFallbackComponent';
import LoadingIndicator from '../loadings/LoadingIndicator';

interface LoadingFallbackProps {
  isLoading: boolean;
}

function LoadingFallback({
  isLoading,
  children,
}: PropsWithChildren<LoadingFallbackProps>) {
  return (
    <ShowFallbackComponent
      showFallback={isLoading}
      fallback={<LoadingIndicator />}>
      {children}
    </ShowFallbackComponent>
  );
}

export default LoadingFallback;
