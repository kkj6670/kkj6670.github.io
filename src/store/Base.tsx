import React, { createContext, useContext, useReducer, Dispatch } from 'react';

import boardData from '../../public/static/data/boardData.json';

export interface IBoardDataDetail {
  fileName: string;
  title: string;
  date: string;
  tag?: string[];
  content: string;
}

export interface IBoardDataList {
  [key: string]: IBoardDataDetail;
}

export interface IBoardData {
  [key: string]: IBoardDataList;
}

interface IBaseState {
  theme: string;
  boardData: IBoardData;
  categoryLen: ICategoryLen;
}

interface IBaseAction {
  type: string;
  value: string;
}

// TODO :: LocalStorage 적용
// const blogTheme = localStorage.getItem('blogTheme');
const INITIAL_STATE: IBaseState = {
  theme: 'dark',
  boardData,
  categoryLen: {},
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

  return (
    <BaseContext.Provider value={state}>
      <BaseUpdateContext.Provider value={dispatch}>{children}</BaseUpdateContext.Provider>
    </BaseContext.Provider>
  );
};

export default BaseProvider;
export { useBase, useBaseUpdate };
