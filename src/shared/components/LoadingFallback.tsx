import React from 'react';

import ShowFallbackComponent from './ShowFallbackComponent';
import LoadingIndicator from './LoadingIndicator';

interface LoadingFallbackProps {
  isLoading: boolean;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  isLoading,
  children,
}) => (
  <ShowFallbackComponent
    showFallback={isLoading}
    fallback={<LoadingIndicator />}>
    {children}
  </ShowFallbackComponent>
);

export default LoadingFallback;
