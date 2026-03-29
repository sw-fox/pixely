import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './ThemeToggle';

const mockToggleTheme = vi.fn();
let mockIsDarkMode = false;

vi.mock('../../contexts/useTheme', () => ({
  useTheme: () => ({
    isDarkMode: mockIsDarkMode,
    toggleTheme: mockToggleTheme,
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsDarkMode = false;
  });

  it('renders a button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls toggleTheme when the button is clicked', async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('renders an SVG icon in light mode', () => {
    mockIsDarkMode = false;
    render(<ThemeToggle />);
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('renders an SVG icon in dark mode', () => {
    mockIsDarkMode = true;
    render(<ThemeToggle />);
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });
});
