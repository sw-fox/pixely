import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorWheel from './ColorWheel';

describe('ColorWheel', () => {
  it('renders 420 color pixels (20 grayscale + 20x20 color grid)', () => {
    const { container } = render(<ColorWheel onSelectColor={() => {}} />);
    const pixels = container.querySelectorAll('[class*="colorPixel"]');
    expect(pixels.length).toBe(20 + 20 * 20);
  });

  it('calls onSelectColor with an HSL color string when a color pixel is clicked', async () => {
    const handleSelectColor = vi.fn();
    const { container } = render(<ColorWheel onSelectColor={handleSelectColor} />);
    const pixels = container.querySelectorAll('[class*="colorPixel"]');
    await userEvent.click(pixels[20]);
    expect(handleSelectColor).toHaveBeenCalledTimes(1);
    expect(handleSelectColor.mock.calls[0][0] as string).toMatch(/^hsl\(/);
  });

  it('updates lightness when a grayscale pixel is clicked', async () => {
    const handleSelectColor = vi.fn();
    const { container } = render(<ColorWheel onSelectColor={handleSelectColor} />);
    const pixels = container.querySelectorAll('[class*="colorPixel"]');
    await userEvent.click(pixels[19]);
    await userEvent.click(pixels[20]);
    expect(handleSelectColor).toHaveBeenCalledTimes(1);
    expect(handleSelectColor.mock.calls[0][0] as string).toContain('100%');
  });

  it('renders grayscale pixels with correct background colors', () => {
    const { container } = render(<ColorWheel onSelectColor={() => {}} />);
    const pixels = container.querySelectorAll('[class*="colorPixel"]');
    expect((pixels[0] as HTMLElement).style.backgroundColor).toBe('rgb(0, 0, 0)');
    expect((pixels[19] as HTMLElement).style.backgroundColor).toBe('rgb(255, 255, 255)');
  });
});
