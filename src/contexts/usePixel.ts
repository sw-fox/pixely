import { useContext } from 'react';
import PixelContext, { type PixelContextType } from './PixelContext';

export const usePixel = (): PixelContextType => {
  const context = useContext(PixelContext);
  if (context === undefined) {
    throw new Error('usePixel must be used within a PixelProvider');
  }
  return context;
};
