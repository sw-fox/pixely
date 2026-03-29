import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pixel from './Pixel';

const mockDispatch = vi.fn();
const mockSetIsMouseDown = vi.fn();
let mockIsMouseDown = false;

vi.mock('../../contexts/usePixel', () => ({
  usePixel: () => ({
    dispatch: mockDispatch,
    isMouseDown: mockIsMouseDown,
    setIsMouseDown: mockSetIsMouseDown,
  }),
}));

describe('Pixel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsMouseDown = false;
  });

  it('renders a button with the correct background color', () => {
    render(<Pixel rowIndex={0} colIndex={0} color="#ff0000" />);
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('dispatches draw and sets isMouseDown to true on mousedown', () => {
    render(<Pixel rowIndex={2} colIndex={3} color="#00ff00" />);
    fireEvent.mouseDown(screen.getByRole('button'));
    expect(mockSetIsMouseDown).toHaveBeenCalledWith(true);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'draw', rowIndex: 2, colIndex: 3 });
  });

  it('sets isMouseDown to false on mouseup', () => {
    render(<Pixel rowIndex={0} colIndex={0} color="#fff" />);
    fireEvent.mouseUp(screen.getByRole('button'));
    expect(mockSetIsMouseDown).toHaveBeenCalledWith(false);
  });

  it('does not dispatch on mouseenter when isMouseDown is false', () => {
    render(<Pixel rowIndex={1} colIndex={1} color="#fff" />);
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('dispatches draw on mouseenter when isMouseDown is true', () => {
    mockIsMouseDown = true;
    render(<Pixel rowIndex={1} colIndex={2} color="#fff" />);
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'draw', rowIndex: 1, colIndex: 2 });
  });
});
