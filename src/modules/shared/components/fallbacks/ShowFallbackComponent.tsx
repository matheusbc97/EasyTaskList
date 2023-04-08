import React, {PropsWithChildren, ReactElement} from 'react';

interface ShowFallbackComponentProps {
  showFallback: boolean;
  fallback: ReactElement;
}

function ShowFallbackComponent({
  showFallback,
  fallback,
  children,
}: PropsWithChildren<ShowFallbackComponentProps>) {
  return <>{showFallback ? fallback : children}</>;
}

export default ShowFallbackComponent;
