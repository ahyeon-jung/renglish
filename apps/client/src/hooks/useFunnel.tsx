import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export interface FunnelContextType<TStep, TData> {
  step: TStep;
  setStep: (step: TStep) => void;
  data: TData;
  setData: Dispatch<SetStateAction<TData>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FunnelContext = createContext<FunnelContextType<any, any> | undefined>(undefined);

export function useFunnel<TStep, TData>(
  initialStep: TStep,
  data: TData,
  setData: Dispatch<SetStateAction<TData>>,
): [
  ({ children }: { children: React.ReactNode }) => React.JSX.Element,
  TStep,
  Dispatch<SetStateAction<TStep>>,
] {
  const [step, setStep] = useState<TStep>(initialStep);

  const Funnel = ({ children }: { children: React.ReactNode }) => {
    return (
      <FunnelContext.Provider value={{ step, setStep, data, setData }}>
        {children}
      </FunnelContext.Provider>
    );
  };

  return [Funnel, step, setStep] as const;
}

export const Step = <TStep, TData>({
  currentStep,
  children,
}: {
  currentStep: TStep;
  children: React.ReactNode;
}) => {
  const context = useContext<FunnelContextType<TStep, TData> | undefined>(FunnelContext);

  if (!context) {
    throw new Error("Step must be used within a Funnel");
  }

  const { step } = context;
  return step === currentStep ? <>{children}</> : null;
};
