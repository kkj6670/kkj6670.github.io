import React, { createContext, useContext, useReducer, Dispatch } from 'react';

interface IBoardData {
  id?: number;
}

interface IBaseState {
  theme: string;
  selectedMenu: string;
  selectedBoard: string;
  boardData: IBoardData;
}

interface IBaseAction {
  type: string;
  value: string;
}

const INITIAL_STATE: IBaseState = {
  theme: 'dark',
  selectedMenu: 'JavaScript',
  selectedBoard: '',
  boardData: {},
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
    case 'MENU_CHANGE': {
      nextState.selectedMenu = value;
      return nextState;
    }
    case 'BOARD_CHANGE': {
      nextState.selectedMenu = value;
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

export default function BaseProvider({ children }: IBase) {
  const [state, dispatch] = useReducer(BaseReducer, INITIAL_STATE);

  return (
    <BaseContext.Provider value={state}>
      <BaseUpdateContext.Provider value={dispatch}>{children}</BaseUpdateContext.Provider>
    </BaseContext.Provider>
  );
}

export { useBase, useBaseUpdate };
