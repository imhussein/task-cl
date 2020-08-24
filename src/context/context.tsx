import React, { useReducer, createContext, ReactNode } from "react";

export interface ProviderComponentProps {
  children: ReactNode;
}

export interface ContextAction {
  [key: string]: Function;
}

// App Global Context
export default function appContext<ContextState>(
  reducer: (state: ContextState, action: ContextAction) => ContextState,
  actions: ContextAction,
  initialState: ContextState
): {
  Provider: ({ children }: ProviderComponentProps) => JSX.Element;
  Context: any;
} {
  const Context = createContext<ContextState>(initialState as any);

  const Provider = ({ children }: ProviderComponentProps): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const restActions: ContextAction = {};

    for (let action in actions) {
      restActions[action] = actions[action](dispatch);
    }

    return (
      <Context.Provider value={{ ...restActions, ...state }}>
        {children}
      </Context.Provider>
    );
  };

  return {
    Context,
    Provider,
  };
}
