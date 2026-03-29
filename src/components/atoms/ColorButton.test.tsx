import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorButton from './ColorButton';

describe('ColorButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a button with the correct background color', () => {
    render(<ColorButton color="#ff0000" onSelectColor={() => {}} selected={false} />);
    expect(screen.getAllByRole('button')[0]).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('calls onSelectColor when clicked in normal mode', async () => {
    const handleSelect = vi.fn();
    render(<ColorButton color="#ff0000" onSelectColor={handleSelect} selected={false} />);
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it('does not call onSelectColor when clicked in edit mode', async () => {
    const handleSelect = vi.fn();
    render(
      <ColorButton color="#ff0000" onSelectColor={handleSelect} selected={false} editMode={true} />
    );
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it('shows a remove button in edit mode when onRemove is provided', () => {
    render(
      <ColorButton
        color="#ff0000"
        onSelectColor={() => {}}
        selected={false}
        editMode={true}
        onRemove={() => {}}
      />
    );
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(2);
  });

  it('does not show a remove button without edit mode', () => {
    render(
      <ColorButton color="#ff0000" onSelectColor={() => {}} selected={false} onRemove={() => {}} />
    );
    expect(screen.getAllByRole('button').length).toBe(1);
  });

  it('calls onRemove with the color when the remove button is clicked', async () => {
    const handleRemove = vi.fn();
    render(
      <ColorButton
        color="#ff0000"
        onSelectColor={() => {}}
        selected={false}
        editMode={true}
        onRemove={handleRemove}
      />
    );
    await userEvent.click(screen.getAllByRole('button')[1]);
    expect(handleRemove).toHaveBeenCalledWith('#ff0000');
  });

  it('opens the color picker modal in edit mode when the color button is clicked', async () => {
    render(
      <ColorButton
        color="#ff0000"
        onSelectColor={() => {}}
        selected={false}
        editMode={true}
        onUpdateColor={() => {}}
      />
    );
    expect(screen.queryAllByRole('button').length).toBe(1);
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(1);
  });

  it('calls onUpdateColor with old and new color when a color is selected in the picker', async () => {
    const handleUpdateColor = vi.fn();
    const { container } = render(
      <ColorButton
        color="#ff0000"
        onSelectColor={() => {}}
        selected={false}
        editMode={true}
        onUpdateColor={handleUpdateColor}
      />
    );
    await userEvent.click(screen.getAllByRole('button')[0]);
    const pixels = container.querySelectorAll('[class*="colorPixel"]');
    await userEvent.click(pixels[20]);
    expect(handleUpdateColor).toHaveBeenCalledTimes(1);
    expect(handleUpdateColor.mock.calls[0][0]).toBe('#ff0000');
  });
});
