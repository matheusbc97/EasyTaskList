import React from 'react';

import ShowFallbackComponent from './ShowFallbackComponent';
import ErrorMessage from './ErrorMessage';

export interface ErrorFallbackProps {
  hasError: boolean;
  onTryAgainPress?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  hasError,
  children,
  onTryAgainPress,
}) => (
  <ShowFallbackComponent
    showFallback={hasError}
    fallback={<ErrorMessage onTryAgainPress={onTryAgainPress} />}>
    {children}
  </ShowFallbackComponent>
);

export default ErrorFallback;
