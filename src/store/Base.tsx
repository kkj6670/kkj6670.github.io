import React, { createContext, useContext, useReducer, Dispatch, useEffect } from 'react';

interface IBaseState {
  theme: string;
}

interface IBaseAction {
  type: string;
  value: string;
}

const INITIAL_STATE: IBaseState = {
  theme: 'dark',
};

// BaseUpdateContext type
type dispatchType = Dispatch<IBaseAction>;

const BaseContext = createContext<IBaseState>(INITIAL_STATE);
const BaseUpdateContext = createContext<dispatchType>(() => null);

const useBase = () => useContext(BaseContext);
const useBaseUpdate = () => useContext(BaseUpdateContext);

function BaseReducer(state: IBaseState, action: IBaseAction) {
  const nextState = { ...state };
  const { type, value } = action;
  switch (type) {
    case 'THEME_CHANGE': {
      nextState.theme = value;
      localStorage.setItem('blogTheme', value);
      return nextState;
    }
    default: {
      console.error(`Unhandled action type: ${type}`);
      return {
        ...state,
      };
    }
  }
}

interface IBase {
  children: React.ReactNode;
}

const BaseProvider = function ({ children }: IBase) {
  const [state, dispatch] = useReducer(BaseReducer, INITIAL_STATE);

  useEffect(() => {
    const value = localStorage.getItem('blogTheme') || 'dark';
    dispatch({ type: 'THEME_CHANGE', value });
  }, [dispatch]);

  return (
    <BaseContext.Provider value={state}>
      <BaseUpdateContext.Provider value={dispatch}>{children}</BaseUpdateContext.Provider>
    </BaseContext.Provider>
  );
};

export default BaseProvider;
export { useBase, useBaseUpdate };
