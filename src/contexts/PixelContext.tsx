import React, { createContext, useReducer, type ReactNode, useState } from 'react';
import { pixelReducer, type PixelAction, type PixelState } from './PixelReducer';


export interface PixelContextType {
  state: PixelState;
  dispatch: React.Dispatch<PixelAction>;
  isMouseDown: boolean;
  setIsMouseDown: (isDown: boolean) => void;
}

const PixelContext = createContext<PixelContextType | undefined>(undefined);

interface PixelProviderProps {
  children: ReactNode;
}

const initialPixelState: PixelState = {
  color: "#000",
  pixelGrid: Array(8).fill(null).map(() => Array(8).fill("#fff")),
  history: [],
};


export const PixelProvider: React.FC<PixelProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(pixelReducer, initialPixelState);
  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <PixelContext.Provider value={{ state, dispatch, isMouseDown, setIsMouseDown }}>
      {children}
    </PixelContext.Provider>
  );
};

export default PixelContext;
