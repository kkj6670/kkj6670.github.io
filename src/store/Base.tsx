import React, { createContext, useContext, useReducer, Dispatch } from 'react';

interface IBoardDataDetail {
  id: number;
  fileName: string;
  title: string;
  date: string;
  tag: string[];
}

// TODO :: typescript 적용법
interface IBoardData {
  [key: string]: IBoardDataDetail[];
}

interface IBaseState {
  theme: string;
  // selectedMenu: string;
  // selectedBoard: string;
  boardData: any;
}

interface IBaseAction {
  type: string;
  value: any;
}

const INITIAL_STATE: IBaseState = {
  theme: 'dark',
  // selectedMenu: 'JavaScript',
  // selectedBoard: '',
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
    // case 'MENU_CHANGE': {
    //   nextState.selectedMenu = value;
    //   return nextState;
    // }
    // case 'BOARD_CHANGE': {
    //   nextState.selectedMenu = value;
    //   return nextState;
    // }
    case 'SET_BOARD_DATA': {
      nextState.boardData = value;
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
