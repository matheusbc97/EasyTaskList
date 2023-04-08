import React, {PropsWithChildren} from 'react';

import ShowFallbackComponent from './ShowFallbackComponent';
import ErrorMessage from '../ErrorMessage';

export interface ErrorFallbackProps {
  hasError: boolean;
  onTryAgainPress?: () => void;
}

function ErrorFallback({
  hasError,
  children,
  onTryAgainPress,
}: PropsWithChildren<ErrorFallbackProps>) {
  return (
    <ShowFallbackComponent
      showFallback={hasError}
      fallback={<ErrorMessage onTryAgainPress={onTryAgainPress} />}>
      {children}
    </ShowFallbackComponent>
  );
}

export default ErrorFallback;
