import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddColorButton from './AddColorButton';

describe('AddColorButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a button', () => {
    render(<AddColorButton onAddColor={() => {}} existingColors={[]} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens the color picker modal when the button is clicked', async () => {
    render(<AddColorButton onAddColor={() => {}} existingColors={[]} />);
    expect(screen.queryAllByRole('button').length).toBe(1);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getAllByRole('button').length).toBeGreaterThan(1);
  });

  it('closes the modal when the close button is clicked', async () => {
    render(<AddColorButton onAddColor={() => {}} existingColors={[]} />);
    await userEvent.click(screen.getByRole('button'));
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[buttons.length - 1]);
    expect(screen.getAllByRole('button').length).toBe(1);
  });

  it('calls onAddColor and closes the modal when a color is selected', async () => {
    const handleAddColor = vi.fn();
    const { container } = render(
      <AddColorButton onAddColor={handleAddColor} existingColors={[]} />
    );
    await userEvent.click(screen.getByRole('button'));
    const pixels = container.querySelectorAll('[class*="colorPixel"]');
    await userEvent.click(pixels[20]);
    expect(handleAddColor).toHaveBeenCalledTimes(1);
    expect(handleAddColor.mock.calls[0][0] as string).toMatch(/^hsl\(/);
    expect(screen.getAllByRole('button').length).toBe(1);
  });

  it('closes the modal when the overlay is clicked', async () => {
    render(<AddColorButton onAddColor={() => {}} existingColors={[]} />);
    await userEvent.click(screen.getByRole('button'));
    const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
    if (overlay) {
      await userEvent.click(overlay);
    }
    expect(screen.getAllByRole('button').length).toBe(1);
  });
});
