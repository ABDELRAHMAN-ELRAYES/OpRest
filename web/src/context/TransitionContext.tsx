// context/TransitionContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
interface TransitionContextType {
  isReady: boolean;
  setIsTransitioning: (transitioning: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export const TransitionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isReady] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <TransitionContext.Provider value={{ isReady, setIsTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    // Return a default context instead of throwing error
    return {
      isReady: true,
      setIsTransitioning: () => {},
    };
  }
  return context;
};
