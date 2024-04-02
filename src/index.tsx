import { createContext, useContext } from "react";

export function createCustomModel<
  F extends (props: any) => any,
  T = ReturnType<F>,
  ProviderProps = React.PropsWithChildren<{ value?: Parameters<F>[0] }>,
>(useHook: F) {
  const Context = createContext<T | undefined>(undefined);

  // @ts-expect-error
  function Provider({ children, value }: ProviderProps) {
    const state = useHook(value ?? {});
    return <Context.Provider value={state}>{children}</Context.Provider>;
  }

  function useModel(): T {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error("useModel must be used within a Provider");
    }
    return context;
  }

  return { Provider, useModel };
}
