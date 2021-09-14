import React from 'react';

interface ShowFallbackComponentProps {
  showFallback: boolean;
  fallback: React.ReactNode;
}

const ShowFallbackComponent: React.FC<ShowFallbackComponentProps> = ({
  showFallback,
  fallback,
  children,
}) => {
  if (showFallback) {
    return fallback;
  }

  return children;
};

export default ShowFallbackComponent;
